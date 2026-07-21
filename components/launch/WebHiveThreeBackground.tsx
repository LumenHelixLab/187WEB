"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NEON = "#39FF14";

const GIANT_RADIUS = 13;
const GIANT_SPOKES = 36;
const GIANT_RINGS = 12;
const GIANT_OPACITY = 0.04;

const HONEY_RADIUS = 0.55;
const HONEY_RING_COUNT = 3;
const HONEY_OPACITY = 0.1;

const OVERLAY_RADIUS = 5;
const OVERLAY_SPOKES = 28;
const OVERLAY_RINGS = 10;
const OVERLAY_OPACITY = 0.14;

function webGeometry(radius: number, spokes: number, rings: number, ringSegments: number): THREE.BufferGeometry {
  const positions: number[] = [];

  // Radial spokes in the XZ plane (y = 0).
  for (let i = 0; i < spokes; i++) {
    const angle = (i * Math.PI * 2) / spokes;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    positions.push(0, 0, 0, cos * radius, 0, sin * radius);
  }

  // Concentric rings in the XZ plane.
  for (let r = 1; r <= rings; r++) {
    const ringRadius = (radius / rings) * r;
    for (let i = 0; i < ringSegments; i++) {
      const a1 = (i * Math.PI * 2) / ringSegments;
      const a2 = ((i + 1) * Math.PI * 2) / ringSegments;
      positions.push(
        Math.cos(a1) * ringRadius,
        0,
        Math.sin(a1) * ringRadius,
        Math.cos(a2) * ringRadius,
        0,
        Math.sin(a2) * ringRadius
      );
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

function hexCorners(cx: number, cy: number, r: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    points.push(new THREE.Vector3(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 0));
  }
  return points;
}

function honeycombCenters(radius: number, rings: number): THREE.Vector3[] {
  const centers: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)];
  const w = Math.sqrt(3) * radius;
  const h = 1.5 * radius;
  for (let ring = 1; ring <= rings; ring++) {
    for (let side = 0; side < 6; side++) {
      for (let step = 0; step < ring; step++) {
        const startAngle = Math.PI / 6;
        const sx = ring * w * Math.cos(startAngle + (side * Math.PI) / 3);
        const sy = ring * h * Math.sin(startAngle + (side * Math.PI) / 3);
        const nextAngle = startAngle + ((side + 1) * Math.PI) / 3;
        const nx = ring * w * Math.cos(nextAngle);
        const ny = ring * h * Math.sin(nextAngle);
        const t = step / ring;
        centers.push(new THREE.Vector3(sx + (nx - sx) * t, sy + (ny - sy) * t, 0));
      }
    }
  }
  return centers;
}

function honeycombGeometry(radius: number, rings: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const centers = honeycombCenters(radius, rings);
  for (const center of centers) {
    const corners = hexCorners(center.x, center.y, radius - 0.04);
    for (let i = 0; i < 6; i++) {
      const a = corners[i];
      const b = corners[(i + 1) % 6];
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

function WebHiveScene() {
  const rootRef = useRef<THREE.Group>(null);
  const giantRef = useRef<THREE.Group>(null);
  const honeyRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<THREE.Group>(null);
  const overlayMatRef = useRef<THREE.LineBasicMaterial>(null);
  const scrollRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const { invalidate, camera } = useThree();

  const giantGeometry = useMemo(() => webGeometry(GIANT_RADIUS, GIANT_SPOKES, GIANT_RINGS, 64), []);
  const honeyGeometry = useMemo(() => honeycombGeometry(HONEY_RADIUS, HONEY_RING_COUNT), []);
  const overlayGeometry = useMemo(() => webGeometry(OVERLAY_RADIUS, OVERLAY_SPOKES, OVERLAY_RINGS, 48), []);

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      scrollRef.current = window.scrollY;
      invalidate();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, invalidate]);

  useFrame(() => {
    if (!rootRef.current || reducedMotion) return;

    const time = performance.now() * 0.00003;
    const scroll = scrollRef.current;
    const scrollRad = scroll * 0.00005;

    // Root group: gentle bob/tip driven by time and scroll.
    rootRef.current.rotation.y = time * 0.04 + scrollRad * 0.08;
    rootRef.current.rotation.x = Math.sin(time * 0.3) * 0.03 + scrollRad * 0.12;
    rootRef.current.rotation.z = Math.cos(time * 0.2) * 0.015;
    rootRef.current.position.y = Math.sin(time * 0.5) * 0.05;

    // Giant web: slowest, extends far off-screen.
    if (giantRef.current) {
      giantRef.current.rotation.y = time * 0.08 + scrollRad * 0.05;
    }

    // Honeycomb: medium speed, opposite direction.
    if (honeyRef.current) {
      honeyRef.current.rotation.y = -time * 0.15 - scrollRad * 0.08;
      honeyRef.current.rotation.z = Math.sin(time * 0.1) * 0.01;
    }

    // Overlay web: fastest, sits visually in front.
    if (overlayRef.current) {
      overlayRef.current.rotation.y = time * 0.35 + scrollRad * 0.15;
      overlayRef.current.rotation.x = Math.cos(time * 0.25) * 0.02;
    }

    // Subtle pulsing opacity on the overlay web.
    if (overlayMatRef.current) {
      overlayMatRef.current.opacity = OVERLAY_OPACITY + Math.sin(time * 2.5) * 0.035;
    }

    // Slight camera z-translation for depth as the user scrolls.
    camera.position.z = 5.8 + scroll * 0.0004;

    // Demand-render: schedule the next frame so the ambient motion keeps playing.
    invalidate();
  });

  return (
    <group ref={rootRef}>
      <group ref={giantRef}>
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

      <group ref={honeyRef} position={[0, 0, 0.2]}>
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

      <group ref={overlayRef} position={[0, 0, 0.4]}>
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
    </group>
  );
}

export function WebHiveThreeBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{ background: "radial-gradient(circle at 50% 45%, #07100a 0%, #050608 65%, #000 100%)" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 60, near: 0.1, far: 20 }}
        frameloop="demand"
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.25]}
      >
        <WebHiveScene />
      </Canvas>
    </div>
  );
}
