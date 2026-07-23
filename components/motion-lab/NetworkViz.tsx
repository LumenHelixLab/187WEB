"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { MOTION_LAB_PRIMARY } from "@/lib/motion/palette";

const NODE_COUNT = 48;
const RADIUS = 3;
const ACCENT = MOTION_LAB_PRIMARY;

function NetworkContent() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const reducedMotion = useReducedMotion();
  const { invalidate } = useThree();
  const timeRef = useRef(0);
  const intro = useRef({ value: reducedMotion ? 1 : 0 });

  const nodes = useMemo(() => {
    const result: { position: THREE.Vector3; phase: number; speed: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      result.push({
        position: new THREE.Vector3(Math.cos(theta) * r * RADIUS, y * RADIUS * 0.6, Math.sin(theta) * r * RADIUS),
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
      });
    }
    return result;
  }, []);

  const edges = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if (d < 1.6) {
          lines.push([nodes[i].position, nodes[j].position]);
        }
      }
    }
    return lines;
  }, [nodes]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (reducedMotion) {
      intro.current.value = 1;
      return;
    }
    const tween = gsap.to(intro.current, {
      value: 1,
      duration: 1.4,
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
    if (!reducedMotion) timeRef.current += dt;
    const t = timeRef.current;
    const p = intro.current.value;

    nodes.forEach((node, i) => {
      const pulse = Math.sin(t * node.speed + node.phase) * 0.15 + 1;
      dummy.position.copy(node.position).multiplyScalar(pulse * 0.2 + 0.8);
      dummy.position.multiplyScalar(p);
      dummy.scale.setScalar((0.08 + Math.sin(t * 2 + node.phase) * 0.03) * p);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    invalidate();
  });

  return (
    <group rotation={[0.2, 0, 0]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.9} />
      </instancedMesh>
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color={ACCENT}
          lineWidth={1}
          transparent
          opacity={0.12}
        />
      ))}
      <ambientLight intensity={0.6} />
      <pointLight color={ACCENT} intensity={1.5} position={[3, 3, 3]} />
    </group>
  );
}

export function NetworkViz() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sc-panel to-sc-void">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50, near: 0.1, far: 30 }}
        frameloop="demand"
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <NetworkContent />
      </Canvas>
    </div>
  );
}
