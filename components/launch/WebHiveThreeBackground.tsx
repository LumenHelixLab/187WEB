"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { LineSegments2 } from "three-stdlib";
import * as THREE from "three";
import {
  webGeometry,
  webRadialSegments,
  honeycombGeometry,
  honeycombSegments,
  buildHoneycombAdjacency,
  connectorGeometry,
  createParticleTexture,
  type Segment,
} from "@/lib/webhive";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useScrollProgress } from "@/lib/motion/useScrollProgress";
import { useGsapTimeline } from "@/lib/motion/useGsapTimeline";
import { gsap } from "@/lib/motion/gsap";

const NEON = "#39FF14";
/** RGYB app palette — background lines slowly shift through these. */
const HIVE_RGYB = ["#f43f5e", "#39FF14", "#facc15", "#3b82f6"] as const;

const GIANT_RADIUS = 18;
const GIANT_SPOKES = 48;
const GIANT_RINGS = 16;
const GIANT_OPACITY = 0.028;

/** Small hex cells; many rings so the field bleeds past the viewport edges. */
const HONEY_RADIUS = 0.22;
const HONEY_RINGS = 18;
const HONEY_OPACITY = 0.045;
/** Extra scale so the lattice extends fully off-screen at camera distance. */
const HONEY_LAYER_SCALE = 1.55;

const MID_RADIUS = 9;
const MID_SPOKES = 40;
const MID_RINGS = 14;
const MID_OPACITY = 0.045;

const OVERLAY_RADIUS = 5;
const OVERLAY_SPOKES = 32;
const OVERLAY_RINGS = 12;
const OVERLAY_OPACITY = 0.09;

const WEB_TELEMETRY = 32;
const HONEY_TELEMETRY = 40;
const CONNECTOR_OPACITY = 0.025;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function eq(a: number, b: number) {
  return Math.abs(a - b) < 1e-5;
}

function nodeKey(x: number, y: number, z: number) {
  return `${x.toFixed(6)},${y.toFixed(6)},${z.toFixed(6)}`;
}

function geometryToPoints(geometry: THREE.BufferGeometry): THREE.Vector3[] {
  const positions = geometry.attributes.position.array as Float32Array;
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < positions.length; i += 3) {
    points.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
  }
  return points;
}

interface Telemetry {
  idx: Uint16Array;
  progress: Float32Array;
  speed: Float32Array;
  reversed: Uint8Array;
  positions: Float32Array;
}

function buildTelemetry(segments: Segment[], count: number): Telemetry {
  const idx = new Uint16Array(count);
  const progress = new Float32Array(count);
  const speed = new Float32Array(count);
  const reversed = new Uint8Array(count);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    idx[i] = Math.floor(Math.random() * segments.length);
    progress[i] = Math.random();
    speed[i] = 0.2 + Math.random() * 0.35;
  }
  return { idx, progress, speed, reversed, positions };
}

function usePointerInputs() {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return target;
}

function useBloomEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const explicit = process.env.NEXT_PUBLIC_WEBHIVE_BLOOM;
    if (explicit === "true" || explicit === "1") {
      setEnabled(true);
      return;
    }
    if (explicit === "false" || explicit === "0") {
      setEnabled(false);
      return;
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
    const isLowPower =
      navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setEnabled(!isMobile && !isLowPower && !prefersReducedMotion);
  }, []);

  return enabled;
}

interface WebHiveSceneProps {
  enableBloom: boolean;
}

function WebHiveScene({ enableBloom }: WebHiveSceneProps) {
  const rootRef = useRef<THREE.Group>(null);
  const giantRef = useRef<THREE.Group>(null);
  const honeyRef = useRef<THREE.Group>(null);
  const midRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<THREE.Group>(null);
  const overlayLineRef = useRef<LineSegments2>(null);
  const connectorRef = useRef<THREE.Group>(null);
  const webTelemetryRef = useRef<THREE.Points>(null);
  const honeyTelemetryRef = useRef<THREE.Points>(null);

  const reducedMotion = useReducedMotion();
  const pointerTarget = usePointerInputs();
  const scroll = useScrollProgress();
  const { invalidate, camera } = useThree();

  const giantGeometry = useMemo(
    () => webGeometry(GIANT_RADIUS, GIANT_SPOKES, GIANT_RINGS, 64),
    [],
  );
  const honeyGeometry = useMemo(
    () => honeycombGeometry(HONEY_RADIUS, HONEY_RINGS),
    [],
  );
  const midGeometry = useMemo(
    () => webGeometry(MID_RADIUS, MID_SPOKES, MID_RINGS, 56),
    [],
  );
  const overlayGeometry = useMemo(
    () => webGeometry(OVERLAY_RADIUS, OVERLAY_SPOKES, OVERLAY_RINGS, 48),
    [],
  );
  const connectorGeometryMemo = useMemo(
    () =>
      connectorGeometry(
        GIANT_RADIUS,
        GIANT_SPOKES,
        GIANT_RINGS,
        HONEY_RADIUS * HONEY_LAYER_SCALE,
        HONEY_RINGS,
        -0.4,
      ),
    [],
  );
  const particleTexture = useMemo(() => createParticleTexture(), []);

  const overlayPoints = useMemo(
    () => geometryToPoints(overlayGeometry),
    [overlayGeometry],
  );
  const connectorPoints = useMemo(
    () => geometryToPoints(connectorGeometryMemo),
    [connectorGeometryMemo],
  );

  const webSegments = useMemo(
    () => webRadialSegments(GIANT_RADIUS, GIANT_SPOKES, GIANT_RINGS),
    [],
  );
  const honeySegments = useMemo(
    () => honeycombSegments(HONEY_RADIUS, HONEY_RINGS),
    [],
  );
  const honeyAdjacency = useMemo(
    () => buildHoneycombAdjacency(honeySegments),
    [honeySegments],
  );

  const webTelemetry = useMemo(
    () => buildTelemetry(webSegments, WEB_TELEMETRY),
    [webSegments],
  );
  const honeyTelemetry = useMemo(
    () => buildTelemetry(honeySegments, HONEY_TELEMETRY),
    [honeySegments],
  );

  const webPositionArgs = useMemo(
    () => [webTelemetry.positions, 3] as [Float32Array, number],
    [webTelemetry.positions],
  );
  const honeyPositionArgs = useMemo(
    () => [honeyTelemetry.positions, 3] as [Float32Array, number],
    [honeyTelemetry.positions],
  );

  const pointerSmooth = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  // GSAP ScrollTrigger scrub: writes scroll progress and smoothed energy into
  // a plain object that useFrame reads each tick. No per-frame React state.
  const scrollProxy = useRef({ progress: 0, energy: 0 });
  useGsapTimeline(() => {
    const proxy = { progress: 0, energy: 0 };
    scrollProxy.current = proxy;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: typeof document !== "undefined" ? document.body : undefined,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          proxy.progress = self.progress;
          const target = Math.min(1, Math.abs(scroll.current.velocity) * 8);
          gsap.to(proxy, { energy: target, duration: 0.25, overwrite: true });
        },
      },
    });
    tl.to(proxy, { progress: 1, duration: 1, ease: "none" });

    return tl;
  }, []);

  const palette = useMemo(() => HIVE_RGYB.map((h) => new THREE.Color(h)), []);
  const colorA = useMemo(() => new THREE.Color(), []);
  const colorB = useMemo(() => new THREE.Color(), []);
  const hiveTint = useMemo(() => new THREE.Color(), []);

  useFrame((_, rawDelta) => {
    if (!rootRef.current || reducedMotion) return;
    const delta = Math.min(rawDelta, 0.1);
    // Slower organic drift than before
    timeRef.current += delta * 0.55;
    const t = timeRef.current;

    // Soft RGYB wash across all hive line/point materials
    {
      const phase = t * 0.07;
      const n = palette.length;
      const wrapped = ((phase % n) + n) % n;
      const idx = Math.floor(wrapped);
      const next = (idx + 1) % n;
      const frac = wrapped - idx;
      const s = frac * frac * (3 - 2 * frac);
      hiveTint.copy(colorA.copy(palette[idx])).lerp(colorB.copy(palette[next]), s);
      rootRef.current.traverse((obj) => {
        const mat = (obj as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
        if (!mat) return;
        const list = Array.isArray(mat) ? mat : [mat];
        for (const m of list) {
          if ("color" in m && (m as THREE.MeshBasicMaterial).color) {
            (m as THREE.MeshBasicMaterial).color.copy(hiveTint);
          }
        }
      });
    }

    const scrollProgress = scrollProxy.current.progress;
    const energy = scrollProxy.current.energy;

    pointerSmooth.current.x = lerp(pointerSmooth.current.x, pointerTarget.current.x, 0.06);
    pointerSmooth.current.y = lerp(pointerSmooth.current.y, pointerTarget.current.y, 0.06);
    const px = pointerSmooth.current.x;
    const py = pointerSmooth.current.y;
    const pointerIntensity = Math.max(0, 1 - Math.hypot(px, py));

    // Root volume: continuous organic drift + scroll + stronger mouse parallax
    rootRef.current.rotation.x =
      Math.sin(t * 0.18) * 0.06 + scrollProgress * 0.28 + py * 0.09;
    rootRef.current.rotation.y =
      Math.cos(t * 0.14) * 0.05 + scrollProgress * 0.14 + px * 0.09;
    rootRef.current.rotation.z = Math.sin(t * 0.09) * 0.025;
    rootRef.current.position.x = px * 0.15;
    rootRef.current.position.y = Math.sin(t * 0.35) * 0.12 + py * 0.08;

    // Giant web: far back, slow counter-rotation
    if (giantRef.current) {
      giantRef.current.rotation.y = -t * 0.045 - scrollProgress * 0.1 + px * 0.05;
      giantRef.current.rotation.x = Math.sin(t * 0.11) * 0.035 + 0.05;
      giantRef.current.rotation.z = Math.cos(t * 0.08) * 0.02;
      giantRef.current.position.y = Math.sin(t * 0.22) * 0.1;
    }

    // Honeycomb field: fine lattice, oversized so edges leave the frame
    if (honeyRef.current) {
      honeyRef.current.rotation.y = t * 0.04 + scrollProgress * 0.05 - px * 0.04;
      honeyRef.current.rotation.x = 0.12 + Math.sin(t * 0.1) * 0.02;
      honeyRef.current.rotation.z = Math.cos(t * 0.06) * 0.012;
      honeyRef.current.position.y = -0.4 + Math.sin(t * 0.18) * 0.08;
      honeyRef.current.position.x = -px * 0.15;
      const breath = 1 + Math.sin(t * 0.12) * 0.012;
      honeyRef.current.scale.setScalar(HONEY_LAYER_SCALE * breath);
    }

    // Mid web: crosses through honeycomb vertically
    if (midRef.current) {
      midRef.current.rotation.y = -t * 0.16 - scrollProgress * 0.12;
      midRef.current.rotation.x = -0.12 + Math.cos(t * 0.17) * 0.025;
      const scale = 1 + Math.sin(t * 2) * 0.04 + energy * 0.15;
      midRef.current.scale.setScalar(scale);
      midRef.current.position.y = 1.1 + Math.sin(t * 0.3) * 0.08;
      midRef.current.position.x = px * 0.15;
    }

    // Overlay web: close, fast, reactive
    if (overlayRef.current) {
      overlayRef.current.rotation.y = t * 0.5 + scrollProgress * 0.32 + px * 0.12;
      overlayRef.current.rotation.x = 0.08 + Math.cos(t * 0.3) * 0.035 + py * 0.06;
      const pulse =
        1 + Math.sin(t * 3.5) * 0.06 + energy * 0.25 + pointerIntensity * 0.1;
      overlayRef.current.scale.setScalar(pulse);
      overlayRef.current.position.y = -0.7 + Math.sin(t * 0.4) * 0.06;
      overlayRef.current.position.x = px * 0.25;
    }

    if (overlayLineRef.current?.material) {
      const mat = overlayLineRef.current.material as THREE.Material & {
        opacity: number;
      };
      mat.opacity =
        OVERLAY_OPACITY +
        Math.sin(t * 3.5) * 0.04 +
        energy * 0.12 +
        pointerIntensity * 0.08;
    }

    // Connector filaments breathe
    if (connectorRef.current) {
      connectorRef.current.rotation.y = t * 0.015;
      const s = 1 + Math.sin(t * 2.5) * 0.02 + energy * 0.05;
      connectorRef.current.scale.setScalar(s);
    }

    // Web telemetry: packets flow outward along radial spokes
    if (webTelemetryRef.current) {
      const pos = webTelemetryRef.current.geometry.attributes.position
        .array as Float32Array;
      const { idx, progress, speed } = webTelemetry;
      const speedScale = 1 + energy * 2;
      for (let i = 0; i < WEB_TELEMETRY; i++) {
        progress[i] += speed[i] * delta * speedScale;
        if (progress[i] >= 1) {
          progress[i] -= 1;
          const ring = idx[i] % GIANT_RINGS;
          const spoke = Math.floor(idx[i] / GIANT_RINGS);
          if (ring === GIANT_RINGS - 1) {
            idx[i] = spoke * GIANT_RINGS;
          } else {
            idx[i] += 1;
          }
        }
        const seg = webSegments[idx[i]];
        const k = i * 3;
        pos[k] = lerp(seg.x1, seg.x2, progress[i]);
        pos[k + 1] = lerp(seg.y1, seg.y2, progress[i]);
        pos[k + 2] = lerp(seg.z1, seg.z2, progress[i]);
      }
      webTelemetryRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Honeycomb telemetry: packets travel the hex network
    if (honeyTelemetryRef.current) {
      const pos = honeyTelemetryRef.current.geometry.attributes.position
        .array as Float32Array;
      const { idx, progress, speed, reversed } = honeyTelemetry;
      const speedScale = 1 + energy * 1.5;
      for (let i = 0; i < HONEY_TELEMETRY; i++) {
        progress[i] += speed[i] * delta * speedScale;
        if (progress[i] >= 1) {
          const seg = honeySegments[idx[i]];
          const rx = reversed[i] ? seg.x1 : seg.x2;
          const ry = reversed[i] ? seg.y1 : seg.y2;
          const rz = reversed[i] ? seg.z1 : seg.z2;
          const candidates = honeyAdjacency.get(nodeKey(rx, ry, rz)) ?? [idx[i]];
          const nextIdx = candidates[Math.floor(Math.random() * candidates.length)];
          const nextSeg = honeySegments[nextIdx];
          idx[i] = nextIdx;
          reversed[i] =
            eq(rx, nextSeg.x2) && eq(ry, nextSeg.y2) && eq(rz, nextSeg.z2) ? 1 : 0;
          progress[i] = 0;
        }
        const seg = honeySegments[idx[i]];
        const ax = reversed[i] ? seg.x2 : seg.x1;
        const ay = reversed[i] ? seg.y2 : seg.y1;
        const az = reversed[i] ? seg.z2 : seg.z1;
        const bx = reversed[i] ? seg.x1 : seg.x2;
        const by = reversed[i] ? seg.y1 : seg.y2;
        const bz = reversed[i] ? seg.z1 : seg.z2;
        const k = i * 3;
        pos[k] = lerp(ax, bx, progress[i]);
        pos[k + 1] = lerp(ay, by, progress[i]);
        pos[k + 2] = lerp(az, bz, progress[i]);
      }
      honeyTelemetryRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Camera reacts to scroll and mouse
    camera.position.x = lerp(camera.position.x, px * 0.45, 0.04);
    camera.position.y = lerp(camera.position.y, py * 0.32, 0.04);
    camera.position.z = lerp(
      camera.position.z,
      5.8 + scrollProgress * 1.4 + energy * 0.4,
      0.03,
    );
    camera.lookAt(0, 0, 0);

    invalidate();
  });

  const baseLineProps = {
    color: NEON,
    transparent: true,
    blending: enableBloom ? THREE.NormalBlending : THREE.AdditiveBlending,
    depthWrite: false,
  };

  return (
    <group ref={rootRef}>
      <group ref={giantRef} position={[0, 0, -5]}>
        <lineSegments geometry={giantGeometry}>
          <lineBasicMaterial
            {...baseLineProps}
            opacity={GIANT_OPACITY}
          />
        </lineSegments>
        <points ref={webTelemetryRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={webPositionArgs}
              usage={THREE.DynamicDrawUsage}
            />
          </bufferGeometry>
          <pointsMaterial
            color={NEON}
            size={0.07}
            map={particleTexture}
            transparent
            opacity={0.9}
            sizeAttenuation
            blending={enableBloom ? THREE.NormalBlending : THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      <group ref={connectorRef} position={[0, -0.3, -3.2]}>
        <Line
          segments
          points={connectorPoints}
          color={NEON}
          lineWidth={1}
          transparent
          opacity={CONNECTOR_OPACITY}
          blending={enableBloom ? THREE.NormalBlending : THREE.AdditiveBlending}
          depthWrite={false}
        />
      </group>

      <group ref={honeyRef} position={[0, -0.4, -2.0]} scale={HONEY_LAYER_SCALE}>
        <lineSegments geometry={honeyGeometry}>
          <lineBasicMaterial
            {...baseLineProps}
            opacity={HONEY_OPACITY}
          />
        </lineSegments>
        <points ref={honeyTelemetryRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={honeyPositionArgs}
              usage={THREE.DynamicDrawUsage}
            />
          </bufferGeometry>
          <pointsMaterial
            color={NEON}
            size={0.06}
            map={particleTexture}
            transparent
            opacity={0.85}
            sizeAttenuation
            blending={enableBloom ? THREE.NormalBlending : THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      <group ref={midRef} position={[0, 1.1, -0.8]}>
        <lineSegments geometry={midGeometry}>
          <lineBasicMaterial
            {...baseLineProps}
            opacity={MID_OPACITY}
          />
        </lineSegments>
      </group>

      <group ref={overlayRef} position={[0, -0.7, 1.2]}>
        <Line
          ref={overlayLineRef}
          segments
          points={overlayPoints}
          color={NEON}
          lineWidth={1}
          transparent
          opacity={OVERLAY_OPACITY}
          blending={enableBloom ? THREE.NormalBlending : THREE.AdditiveBlending}
          depthWrite={false}
        />
      </group>
    </group>
  );
}

export function WebHiveThreeBackground() {
  const reducedMotion = useReducedMotion();
  const enableBloom = useBloomEnabled();

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-55 brightness-[0.62] contrast-[1.05]"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at 50% 45%, #060a08 0%, #050608 65%, #000 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 60, near: 0.1, far: 30 }}
        frameloop="demand"
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.25]}
      >
        <WebHiveScene enableBloom={enableBloom} />
        {enableBloom && (
          <EffectComposer>
            <Bloom
              intensity={0.28}
              luminanceThreshold={0.35}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
