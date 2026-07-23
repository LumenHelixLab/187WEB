"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Torus } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { MOTION_LAB_PRIMARY, MOTION_LAB_SECONDARY, MOTION_LAB_CYAN } from "@/lib/motion/palette";

const ACCENT = MOTION_LAB_PRIMARY;
const SECONDARY = MOTION_LAB_SECONDARY;
const TERTIARY = MOTION_LAB_CYAN;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function HeroContent() {
  const groupRef = useRef<THREE.Group>(null);
  const shardsRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const { invalidate } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const intro = useRef({ value: 0 });

  const shardData = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        position: [
          Math.cos((i / 12) * Math.PI * 2) * 1.6,
          Math.sin((i / 12) * Math.PI * 2) * 0.8,
          Math.sin((i / 12) * Math.PI * 2) * 1.2,
        ] as [number, number, number],
        scale: 0.2 + Math.random() * 0.3,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        speed: 0.4 + Math.random() * 0.6,
        offset: Math.random() * Math.PI * 2,
        color: i % 3 === 0 ? ACCENT : i % 3 === 1 ? SECONDARY : TERTIARY,
      })),
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      intro.current.value = 1;
      return;
    }
    const tween = gsap.to(intro.current, {
      value: 1,
      duration: 1.8,
      ease: "power3.out",
      onUpdate: invalidate,
    });
    return () => {
      tween.kill();
    };
  }, [reducedMotion, invalidate]);

  useFrame((_, delta) => {
    if (!groupRef.current || !shardsRef.current || !ringsRef.current) return;

    const dt = Math.min(delta, 0.1);
    const t = performance.now() * 0.001;
    const prog = reducedMotion ? 1 : easeOutCubic(intro.current.value);

    smooth.current.x += (mouse.current.x - smooth.current.x) * 0.05;
    smooth.current.y += (mouse.current.y - smooth.current.y) * 0.05;

    groupRef.current.rotation.y = t * 0.08 + smooth.current.x * 0.15;
    groupRef.current.rotation.x = smooth.current.y * 0.12;
    groupRef.current.position.x = smooth.current.x * 0.2;
    groupRef.current.position.y = smooth.current.y * 0.15;

    shardsRef.current.children.forEach((child, i) => {
      const data = shardData[i];
      const s = data.scale * (0.5 + prog * 0.5);
      child.scale.setScalar(s);
      child.position.y = data.position[1] + Math.sin(t * data.speed + data.offset) * 0.15 * prog;
      child.rotation.x += dt * data.speed * 0.3;
      child.rotation.y += dt * data.speed * 0.2;
    });

    ringsRef.current.children.forEach((child, i) => {
      const ring = child as THREE.Mesh;
      ring.rotation.z = t * (0.1 + i * 0.04) * (i % 2 === 0 ? 1 : -1);
      ring.scale.setScalar((0.6 + i * 0.25) * prog);
      ring.rotation.x = Math.PI / 2 + Math.sin(t * 0.2 + i) * 0.05;
    });

    invalidate();
  });

  return (
    <group ref={groupRef}>
      <group ref={ringsRef}>
        {[0, 1, 2].map((i) => (
          <Torus key={i} args={[1 + i * 0.6, 0.015, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color={i === 0 ? ACCENT : i === 1 ? SECONDARY : TERTIARY} transparent opacity={0.35} />
          </Torus>
        ))}
      </group>
      <group ref={shardsRef}>
        {shardData.map((data, i) => (
          <Icosahedron key={i} args={[1, 0]} position={data.position} rotation={data.rotation}>
            <meshBasicMaterial color={data.color} transparent opacity={0.85} />
          </Icosahedron>
        ))}
      </group>
      <ambientLight intensity={0.6} />
      <pointLight color={ACCENT} intensity={2} distance={8} position={[2, 2, 2]} />
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sc-panel to-sc-void">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55, near: 0.1, far: 20 }}
        frameloop="demand"
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <HeroContent />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sc-void to-transparent" />
    </div>
  );
}
