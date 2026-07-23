"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { MOTION_LAB_PRIMARY } from "@/lib/motion/palette";

const ACCENT = MOTION_LAB_PRIMARY;

function KineticContent() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const { invalidate } = useThree();
  const letters = useMemo(() => "MOTION".split(""), []);
  const progress = useRef({ value: reducedMotion ? 1 : 0 });

  useEffect(() => {
    if (reducedMotion) {
      progress.current.value = 1;
      return;
    }
    const tween = gsap.to(progress.current, {
      value: 1,
      duration: 1.2,
      ease: "back.out(1.2)",
      delay: 0.2,
      onUpdate: invalidate,
    });
    return () => {
      tween.kill();
    };
  }, [reducedMotion, invalidate]);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = performance.now() * 0.001;
    const p = progress.current.value;

    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const stagger = i / letters.length;
      const local = Math.max(0, Math.min(1, (p - stagger * 0.6) / (1 - stagger * 0.6)));
      mesh.position.z = (1 - local) * 4;
      mesh.rotation.y = (1 - local) * Math.PI * 0.5;
      mesh.scale.setScalar(0.5 + local * 0.5);
      mesh.position.y = Math.sin(t * 2 + i * 0.5) * 0.08 * local;
    });

    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.03;

    invalidate();
  });

  return (
    <group ref={groupRef}>
      {letters.map((letter, i) => (
        <Text
          key={i}
          position={[i * 0.65 - letters.length * 0.3, 0, 0]}
          fontSize={0.9}
          letterSpacing={0.05}
          color={ACCENT}
          anchorX="center"
          anchorY="middle"
        >
          {letter}
        </Text>
      ))}
      <ambientLight intensity={0.8} />
      <pointLight color={ACCENT} intensity={1.5} position={[0, 0, 4]} />
    </group>
  );
}

export function KineticType() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sc-panel to-sc-void">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 20 }}
        frameloop="demand"
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <KineticContent />
      </Canvas>
    </div>
  );
}
