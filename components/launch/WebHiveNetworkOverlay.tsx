"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";
import { HIVE_COLOR_CYCLE_SPEED, RGYB } from "@/lib/brand-palette";

const HEX_RADIUS = 0.85;
const HEX_RINGS = 4;
const LAYERS = 4;
const Z_SPREAD = 4.5;
const MAX_NEIGHBORS = 3;
const EDGE_THRESHOLD = HEX_RADIUS * 1.85;

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildHoneycombNodes(seed: number): THREE.Vector3[] {
  const rand = mulberry32(seed);
  const nodes: THREE.Vector3[] = [];
  const w = Math.sqrt(3) * HEX_RADIUS;
  const h = 1.5 * HEX_RADIUS;

  for (let ring = 0; ring <= HEX_RINGS; ring++) {
    for (let q = -ring; q <= ring; q++) {
      for (let r = Math.max(-ring, -q - ring); r <= Math.min(ring, -q + ring); r++) {
        const x = w * q + (w / 2) * r;
        const y = h * r;
        if (ring === 0 && rand() > 0.35) continue;
        const z = -Z_SPREAD / 2 + rand() * Z_SPREAD;
        const jitterX = (rand() - 0.5) * HEX_RADIUS * 0.25;
        const jitterY = (rand() - 0.5) * HEX_RADIUS * 0.25;
        nodes.push(new THREE.Vector3(x + jitterX, y + jitterY, z));
      }
    }
  }

  const layerNodes = LAYERS * 16;
  for (let i = 0; i < layerNodes; i++) {
    const angle = (i / 16) * Math.PI * 2 + (Math.floor(i / 16) * Math.PI) / LAYERS;
    const radius = 2.2 + (i % 4) * 1.4 + rand() * 0.4;
    nodes.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -Z_SPREAD / 2 + rand() * Z_SPREAD
      )
    );
  }

  return nodes;
}

function buildEdges(nodes: THREE.Vector3[]): [THREE.Vector3, THREE.Vector3][] {
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const neighbors: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const d = nodes[i].distanceTo(nodes[j]);
      if (d < EDGE_THRESHOLD) neighbors.push({ j, d });
    }
    neighbors.sort((a, b) => a.d - b.d);
    for (const { j } of neighbors.slice(0, MAX_NEIGHBORS)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([nodes[i], nodes[j]]);
    }
  }
  return edges;
}

function lerpPalette(
  palette: THREE.Color[],
  phase: number,
  out: THREE.Color,
  a: THREE.Color,
  b: THREE.Color
) {
  const n = palette.length;
  const wrapped = ((phase % n) + n) % n;
  const idx = Math.floor(wrapped);
  const next = (idx + 1) % n;
  const frac = wrapped - idx;
  const s = frac * frac * (3 - 2 * frac);
  return out.copy(a.copy(palette[idx])).lerp(b.copy(palette[next]), s);
}

function NetworkContent() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const edgeMatRef = useRef<THREE.LineBasicMaterial>(null);
  const reducedMotion = useReducedMotion();
  const { invalidate } = useThree();
  const timeRef = useRef(0);
  const intro = useRef({ value: reducedMotion ? 1 : 0 });

  const nodes = useMemo(() => buildHoneycombNodes(0x9e3779b9), []);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const palette = useMemo(() => RGYB.map((hex) => new THREE.Color(hex)), []);
  const colorA = useMemo(() => new THREE.Color(), []);
  const colorB = useMemo(() => new THREE.Color(), []);
  const scratch = useMemo(() => new THREE.Color(), []);

  const edgeGeometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      const o = i * 6;
      positions[o] = a.x;
      positions[o + 1] = a.y;
      positions[o + 2] = a.z;
      positions[o + 3] = b.x;
      positions[o + 4] = b.y;
      positions[o + 5] = b.z;
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [edges]);

  useEffect(() => {
    if (reducedMotion) {
      intro.current.value = 1;
      return;
    }
    const tween = gsap.to(intro.current, {
      value: 1,
      duration: 3.2,
      ease: "power2.out",
      onUpdate: invalidate,
    });
    return () => {
      tween.kill();
    };
  }, [reducedMotion, invalidate]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.1);
    if (!reducedMotion) timeRef.current += dt * 0.18;
    const t = timeRef.current;
    const p = intro.current.value;
    const cycle = t * HIVE_COLOR_CYCLE_SPEED;

    nodes.forEach((node, i) => {
      const pulse = Math.sin(t * 0.55 + node.x * 0.35 + node.y * 0.28) * 0.08 + 1;
      dummy.position.copy(node).multiplyScalar(pulse * 0.12 + 0.88);
      dummy.position.multiplyScalar(p);
      dummy.scale.setScalar((0.05 + Math.sin(t * 0.9 + node.z) * 0.015) * p);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);

      lerpPalette(palette, cycle + i * 0.17 + node.x * 0.04, scratch, colorA, colorB);
      meshRef.current?.setColorAt(i, scratch);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    if (edgeMatRef.current) {
      lerpPalette(palette, cycle * 0.55, scratch, colorA, colorB);
      edgeMatRef.current.color.copy(scratch);
    }

    invalidate();
  });

  return (
    <group rotation={[0.18, 0, 0]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, nodes.length]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial transparent opacity={0.4} toneMapped={false} />
      </instancedMesh>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial ref={edgeMatRef} transparent opacity={0.04} toneMapped={false} />
      </lineSegments>
      <ambientLight intensity={0.3} />
    </group>
  );
}

export function WebHiveNetworkOverlay() {
  const mounted = useClientMounted();
  const reducedMotion = useReducedMotion();
  if (!mounted || reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-65 brightness-[0.7]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, transparent 0%, transparent 28%, rgba(5,6,8,0.78) 100%)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 9.5], fov: 55, near: 0.1, far: 30 }}
        frameloop="demand"
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <NetworkContent />
      </Canvas>
    </div>
  );
}
