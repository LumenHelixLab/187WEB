"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Cylinder, Box, Torus, Sphere, Cone } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { MOTION_LAB_PRIMARY } from "@/lib/motion/palette";

const ACCENT = MOTION_LAB_PRIMARY;

interface PartDef {
  id: string;
  position: [number, number, number];
  exploded: [number, number, number];
  component: React.ReactNode;
  label: string;
}

function ProductContent() {
  const groupRef = useRef<THREE.Group>(null);
  const [exploded, setExploded] = useState(false);
  const reducedMotion = useReducedMotion();
  const { invalidate } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0.2, y: 0 });
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const autoRotate = useRef(true);
  const explodeProxy = useRef({ value: 0 });

  const parts = useMemo<PartDef[]>(
    () => [
      {
        id: "body",
        position: [0, 0, 0],
        exploded: [0, 0, 0],
        component: (
          <Cylinder args={[0.7, 0.9, 2.2, 32]}>
            <meshStandardMaterial color="#1a1c29" metalness={0.6} roughness={0.3} />
          </Cylinder>
        ),
        label: "Core chassis",
      },
      {
        id: "ring",
        position: [0, 0.6, 0],
        exploded: [0, 0.8, 0],
        component: (
          <Torus args={[1, 0.06, 12, 64]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color={ACCENT} transparent opacity={0.8} />
          </Torus>
        ),
        label: "Status ring",
      },
      {
        id: "antenna",
        position: [0, 1.3, 0],
        exploded: [0, 1.2, 0],
        component: (
          <Cylinder args={[0.06, 0.06, 0.9, 12]}>
            <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.2} />
          </Cylinder>
        ),
        label: "Transmitter",
      },
      {
        id: "optic",
        position: [0, 0.35, 0.55],
        exploded: [0, 0, 0.7],
        component: (
          <Sphere args={[0.25, 24, 24]}>
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.6} metalness={0.2} roughness={0.1} />
          </Sphere>
        ),
        label: "Sensor optic",
      },
      {
        id: "grip",
        position: [0, -1.2, 0],
        exploded: [0, -0.9, 0],
        component: (
          <Cone args={[0.45, 0.9, 32]}>
            <meshStandardMaterial color="#0f111a" metalness={0.4} roughness={0.6} />
          </Cone>
        ),
        label: "Grip base",
      },
      {
        id: "panel",
        position: [0, -0.1, 0.52],
        exploded: [0, 0, 0.8],
        component: (
          <Box args={[0.8, 1.2, 0.08]}>
            <meshStandardMaterial color="#11131f" metalness={0.5} roughness={0.4} />
          </Box>
        ),
        label: "Interface panel",
      },
    ],
    [],
  );

  const partRefs = useRef<(THREE.Group | null)[]>([]);

  useEffect(() => {
    if (reducedMotion) {
      explodeProxy.current.value = exploded ? 1 : 0;
      return;
    }
    const tween = gsap.to(explodeProxy.current, {
      value: exploded ? 1 : 0,
      duration: 0.9,
      ease: "power2.inOut",
      onUpdate: invalidate,
    });
    return () => {
      tween.kill();
    };
  }, [exploded, reducedMotion, invalidate]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (isDragging.current && groupRef.current) {
        const dx = e.clientX - lastPointer.current.x;
        const dy = e.clientY - lastPointer.current.y;
        rotation.current.y += dx * 0.005;
        rotation.current.x += dy * 0.005;
        rotation.current.x = Math.max(-0.6, Math.min(0.6, rotation.current.x));
        autoRotate.current = false;
      }
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      lastPointer.current.x = e.clientX;
      lastPointer.current.y = e.clientY;
    };
    const onUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);

    if (autoRotate.current && !isDragging.current) {
      rotation.current.y += dt * 0.2;
    }

    groupRef.current.rotation.x = rotation.current.x;
    groupRef.current.rotation.y = rotation.current.y;
    groupRef.current.position.x += (mouse.current.x * 0.1 - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (mouse.current.y * 0.08 - groupRef.current.position.y) * 0.05;

    const p = explodeProxy.current.value;
    partRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const part = parts[i];
      ref.position.set(
        part.position[0] + part.exploded[0] * p,
        part.position[1] + part.exploded[1] * p,
        part.position[2] + part.exploded[2] * p,
      );
    });

    invalidate();
  });

  const onPointerDown = () => {
    isDragging.current = true;
    autoRotate.current = false;
  };

  return (
    <group ref={groupRef} onPointerDown={onPointerDown} onClick={() => setExploded((v) => !v)}>
      {parts.map((part, i) => (
        <group
          key={part.id}
          ref={(el) => {
            partRefs.current[i] = el;
          }}
          position={part.position}
        >
          {part.component}
          <Html distanceFactor={6} position={[0.5, 0.4, 0]} style={{ pointerEvents: "none" }}>
            <span
              className={`whitespace-nowrap rounded bg-black/70 px-2 py-1 text-xs font-medium backdrop-blur-sm transition-opacity ${
                exploded ? "opacity-100" : "opacity-0"
              }`}
              style={{ color: ACCENT }}
            >
              {part.label}
            </span>
          </Html>
        </group>
      ))}
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} />
      <pointLight color={ACCENT} intensity={1.5} position={[-2, 2, 2]} />
    </group>
  );
}

export function ProductViewer() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sc-panel to-sc-void">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 20 }}
        frameloop="demand"
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <ProductContent />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-xs text-white/70 backdrop-blur-sm">
        Drag to rotate · click to explode
      </div>
    </div>
  );
}
