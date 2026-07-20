"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NEON = "#39FF14";
const STROKE_OPACITY = 0.12;
const SPOKE_COUNT = 24;
const RING_COUNT = 8;
const RING_SEGMENTS = 48;
const WEB_RADIUS = 3.2;
const HONEY_RING_COUNT = 3;
const HONEY_RADIUS = 0.55;

function hexCorners(cx: number, cy: number, r: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    points.push(new THREE.Vector3(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 0.15));
  }
  return points;
}

function honeycombCenters(radius: number, rings: number): THREE.Vector3[] {
  const centers: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0.15)];
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
        centers.push(new THREE.Vector3(sx + (nx - sx) * t, sy + (ny - sy) * t, 0.15));
      }
    }
  }
  return centers;
}

function buildWebHiveGeometry(): THREE.BufferGeometry {
  const positions: number[] = [];

  // Radial spokes in the XZ plane (y = 0).
  for (let i = 0; i < SPOKE_COUNT; i++) {
    const angle = (i * Math.PI * 2) / SPOKE_COUNT;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    positions.push(0, 0, 0, cos * WEB_RADIUS, 0, sin * WEB_RADIUS);
  }

  // Concentric rings in the XZ plane.
  for (let r = 1; r <= RING_COUNT; r++) {
    const radius = (WEB_RADIUS / RING_COUNT) * r;
    for (let i = 0; i < RING_SEGMENTS; i++) {
      const a1 = (i * Math.PI * 2) / RING_SEGMENTS;
      const a2 = ((i + 1) * Math.PI * 2) / RING_SEGMENTS;
      positions.push(
        Math.cos(a1) * radius,
        0,
        Math.sin(a1) * radius,
        Math.cos(a2) * radius,
        0,
        Math.sin(a2) * radius
      );
    }
  }

  // Honeycomb hex edges, slightly forward on Z.
  const centers = honeycombCenters(HONEY_RADIUS, HONEY_RING_COUNT);
  for (const center of centers) {
    const corners = hexCorners(center.x, center.y, HONEY_RADIUS - 0.04);
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
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const { invalidate } = useThree();
  const geometry = useMemo(() => buildWebHiveGeometry(), []);

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
    if (!groupRef.current || reducedMotion) return;
    const time = performance.now() * 0.00003;
    const scrollRad = scrollRef.current * 0.00005;
    groupRef.current.rotation.y = time + scrollRad;
    groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.03 + scrollRad * 0.2;
    groupRef.current.rotation.z = Math.cos(time * 0.2) * 0.01;
    // Demand-render: schedule the next frame so the ambient rotation keeps playing.
    invalidate();
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color={NEON}
          transparent
          opacity={STROKE_OPACITY}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
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
