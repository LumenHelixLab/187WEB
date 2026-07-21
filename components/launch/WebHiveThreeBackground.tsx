"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  webGeometry,
  honeycombGeometry,
  connectorGeometry,
  particlePositions,
  pulsePositions,
  createParticleTexture,
} from "@/lib/webhive";

const NEON = "#39FF14";

const GIANT_RADIUS = 18;
const GIANT_SPOKES = 48;
const GIANT_RINGS = 16;
const GIANT_OPACITY = 0.05;

const HONEY_RADIUS = 0.55;
const HONEY_RING_COUNT = 3;
const HONEY_OPACITY = 0.08;

const MID_RADIUS = 9;
const MID_SPOKES = 40;
const MID_RINGS = 14;
const MID_OPACITY = 0.08;

const OVERLAY_RADIUS = 5;
const OVERLAY_SPOKES = 32;
const OVERLAY_RINGS = 12;
const OVERLAY_OPACITY = 0.16;

const PARTICLE_COUNT = 512;
const PULSE_COUNT = 48;
const CONNECTOR_OPACITY = 0.035;

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
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

function useScrollInputs() {
  const scroll = useRef({ y: 0, progress: 0, height: 1 });
  useEffect(() => {
    const onScroll = () => {
      const h = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scroll.current.y = window.scrollY;
      scroll.current.height = h;
      scroll.current.progress = Math.min(1, window.scrollY / h);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scroll;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function WebHiveScene() {
  const rootRef = useRef<THREE.Group>(null);
  const giantRef = useRef<THREE.Group>(null);
  const honeyRef = useRef<THREE.Group>(null);
  const midRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<THREE.Group>(null);
  const overlayMatRef = useRef<THREE.LineBasicMaterial>(null);
  const connectorRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const pulsesRef = useRef<THREE.Points>(null);

  const reducedMotion = useReducedMotion();
  const pointerTarget = usePointerInputs();
  const scroll = useScrollInputs();
  const { invalidate, camera } = useThree();

  const giantGeometry = useMemo(
    () => webGeometry(GIANT_RADIUS, GIANT_SPOKES, GIANT_RINGS, 64),
    [],
  );
  const honeyGeometry = useMemo(
    () => honeycombGeometry(HONEY_RADIUS, HONEY_RING_COUNT),
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
        HONEY_RADIUS,
        HONEY_RING_COUNT,
      ),
    [],
  );
  const particleTexture = useMemo(() => createParticleTexture(), []);

  const particleData = useMemo(() => {
    const positions = particlePositions(PARTICLE_COUNT, 12);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions, velocities };
  }, []);

  const pulseData = useMemo(() => {
    const positions = pulsePositions(PULSE_COUNT);
    const phases = new Float32Array(PULSE_COUNT);
    const spokes = new Float32Array(PULSE_COUNT);
    const speeds = new Float32Array(PULSE_COUNT);
    for (let i = 0; i < PULSE_COUNT; i++) {
      phases[i] = Math.random();
      spokes[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.15 + Math.random() * 0.25;
    }
    return { positions, phases, spokes, speeds };
  }, []);

  const particlePositionArgs = useMemo(
    () => [particleData.positions, 3] as [Float32Array, number],
    [particleData.positions],
  );
  const pulsePositionArgs = useMemo(
    () => [pulseData.positions, 3] as [Float32Array, number],
    [pulseData.positions],
  );

  const pointerSmooth = useRef({ x: 0, y: 0 });
  const scrollVelocity = useRef(0);
  const lastScrollProgress = useRef(0);
  const timeRef = useRef(0);

  useFrame((_, rawDelta) => {
    if (!rootRef.current || reducedMotion) return;
    const delta = Math.min(rawDelta, 0.1);
    timeRef.current += delta;
    const t = timeRef.current;

    const scrollProgress = scroll.current.progress;
    const rawVelocity =
      (scrollProgress - lastScrollProgress.current) / Math.max(delta, 0.001);
    lastScrollProgress.current = scrollProgress;
    scrollVelocity.current = lerp(scrollVelocity.current, rawVelocity, 0.08);
    const energy = Math.min(1, Math.abs(scrollVelocity.current) * 8);

    pointerSmooth.current.x = lerp(pointerSmooth.current.x, pointerTarget.current.x, 0.06);
    pointerSmooth.current.y = lerp(pointerSmooth.current.y, pointerTarget.current.y, 0.06);
    const px = pointerSmooth.current.x;
    const py = pointerSmooth.current.y;
    const pointerIntensity = Math.max(0, 1 - Math.hypot(px, py));

    // Root tilt: continuous bob + scroll + mouse
    rootRef.current.rotation.x =
      Math.sin(t * 0.22) * 0.04 + scrollProgress * 0.25 + py * 0.07;
    rootRef.current.rotation.y =
      Math.cos(t * 0.17) * 0.03 + scrollProgress * 0.12 + px * 0.07;
    rootRef.current.rotation.z = Math.sin(t * 0.11) * 0.015;
    rootRef.current.position.y = Math.sin(t * 0.45) * 0.04;

    // Giant web: slow counter-rotation, big off-screen radius
    if (giantRef.current) {
      giantRef.current.rotation.y = -t * 0.055 - scrollProgress * 0.08 + px * 0.03;
      giantRef.current.rotation.x = Math.sin(t * 0.13) * 0.025;
      giantRef.current.rotation.z = Math.cos(t * 0.1) * 0.015;
    }

    // Honeycomb: opposite yaw, gentle drift
    if (honeyRef.current) {
      honeyRef.current.rotation.y = t * 0.09 + scrollProgress * 0.05 - px * 0.04;
      honeyRef.current.rotation.z = Math.sin(t * 0.08) * 0.01;
      honeyRef.current.position.y =
        Math.sin(t * 0.28) * 0.05 + scroll.current.y * 0.00012;
    }

    // Mid web: moderate speed, scale reacts to scroll velocity
    if (midRef.current) {
      midRef.current.rotation.y = -t * 0.18 - scrollProgress * 0.1;
      midRef.current.rotation.x = Math.cos(t * 0.2) * 0.02;
      const scale = 1 + Math.sin(t * 2.2) * 0.04 + energy * 0.15;
      midRef.current.scale.setScalar(scale);
    }

    // Overlay web: fast, pulsing, mouse-reactive
    if (overlayRef.current) {
      overlayRef.current.rotation.y = t * 0.55 + scrollProgress * 0.28 + px * 0.1;
      overlayRef.current.rotation.x = Math.cos(t * 0.35) * 0.03 + py * 0.05;
      const pulse =
        1 + Math.sin(t * 4) * 0.07 + energy * 0.25 + pointerIntensity * 0.1;
      overlayRef.current.scale.setScalar(pulse);
    }

    if (overlayMatRef.current) {
      overlayMatRef.current.opacity =
        OVERLAY_OPACITY +
        Math.sin(t * 4) * 0.04 +
        energy * 0.12 +
        pointerIntensity * 0.08;
    }

    // Connector filaments breathe with the overlay
    if (connectorRef.current) {
      connectorRef.current.rotation.y = t * 0.02;
      const s = 1 + Math.sin(t * 3) * 0.02 + energy * 0.05;
      connectorRef.current.scale.setScalar(s);
    }

    // Energy motes drift and wrap
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position
        .array as Float32Array;
      const { velocities } = particleData;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        pos[idx] += velocities[idx] * (1 + energy);
        pos[idx + 1] += velocities[idx + 1] * (1 + energy * 0.5);
        pos[idx + 2] += velocities[idx + 2] * (1 + energy);

        const dist = Math.hypot(pos[idx], pos[idx + 2]);
        if (dist > 12 || Math.abs(pos[idx + 1]) > 4) {
          const theta = Math.random() * Math.PI * 2;
          const r = 2 + Math.random() * 3;
          pos[idx] = Math.cos(theta) * r;
          pos[idx + 1] = (Math.random() - 0.5) * 2;
          pos[idx + 2] = Math.sin(theta) * r;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Data pulses travel along spokes
    if (pulsesRef.current) {
      const pos = pulsesRef.current.geometry.attributes.position
        .array as Float32Array;
      const { phases, spokes, speeds } = pulseData;
      const speedScale = 1 + energy * 2 + pointerIntensity * 0.5;
      for (let i = 0; i < PULSE_COUNT; i++) {
        phases[i] += speeds[i] * delta * speedScale;
        if (phases[i] > 1) {
          phases[i] = 0;
          spokes[i] = Math.random() * Math.PI * 2;
        }
        const radius = phases[i] * GIANT_RADIUS;
        const angle = spokes[i];
        const idx = i * 3;
        pos[idx] = Math.cos(angle) * radius;
        pos[idx + 1] = 0;
        pos[idx + 2] = Math.sin(angle) * radius;
      }
      pulsesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Camera reacts to scroll and mouse
    camera.position.x = lerp(camera.position.x, px * 0.35, 0.04);
    camera.position.y = lerp(camera.position.y, py * 0.25, 0.04);
    camera.position.z = lerp(
      camera.position.z,
      5.5 + scrollProgress * 1.4 + energy * 0.4,
      0.03,
    );
    camera.lookAt(0, 0, 0);

    invalidate();
  });

  return (
    <group ref={rootRef}>
      <group ref={giantRef} position={[0, 0, -4.2]}>
        <lineSegments geometry={giantGeometry}>
          <lineBasicMaterial
            color={NEON}
            transparent
            opacity={GIANT_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      <group ref={connectorRef} position={[0, 0, -2.8]}>
        <lineSegments geometry={connectorGeometryMemo}>
          <lineBasicMaterial
            color={NEON}
            transparent
            opacity={CONNECTOR_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      <group ref={honeyRef} position={[0, 0, -2.0]}>
        <lineSegments geometry={honeyGeometry}>
          <lineBasicMaterial
            color={NEON}
            transparent
            opacity={HONEY_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      <points ref={particlesRef} position={[0, 0, -1.0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={particlePositionArgs}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial
          color={NEON}
          size={0.06}
          map={particleTexture}
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <group ref={midRef} position={[0, 0, -0.5]}>
        <lineSegments geometry={midGeometry}>
          <lineBasicMaterial
            color={NEON}
            transparent
            opacity={MID_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      <group ref={overlayRef} position={[0, 0, 0.9]}>
        <lineSegments geometry={overlayGeometry}>
          <lineBasicMaterial
            ref={overlayMatRef}
            color={NEON}
            transparent
            opacity={OVERLAY_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      <points ref={pulsesRef} position={[0, 0, -4.2]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={pulsePositionArgs}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial
          color={NEON}
          size={0.12}
          map={particleTexture}
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function WebHiveThreeBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at 50% 45%, #07100a 0%, #050608 65%, #000 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 60, near: 0.1, far: 30 }}
        frameloop="demand"
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.25]}
      >
        <WebHiveScene />
      </Canvas>
    </div>
  );
}
