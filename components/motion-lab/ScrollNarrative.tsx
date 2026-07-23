"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Octahedron, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useScrollProgress } from "@/lib/motion/useScrollProgress";
import { useGsapTimeline } from "@/lib/motion/useGsapTimeline";
import { MOTION_LAB_PRIMARY, MOTION_LAB_SECONDARY, MOTION_LAB_CYAN, MOTION_LAB_ROSE } from "@/lib/motion/palette";

const ACCENT = MOTION_LAB_PRIMARY;
const SECONDARY = MOTION_LAB_SECONDARY;

function StageContent() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const scroll = useScrollProgress();
  const { camera, invalidate } = useThree();

  const objects = useMemo(
    () =>
      [
        { position: [-2.2, 0.5, 0] as [number, number, number], scale: 0.7, color: ACCENT, type: "icosahedron" as const },
        { position: [0, -0.6, 1.2] as [number, number, number], scale: 0.9, color: SECONDARY, type: "torus" as const },
        { position: [2.1, 0.4, -0.5] as [number, number, number], scale: 0.6, color: MOTION_LAB_CYAN, type: "octahedron" as const },
        { position: [0, 1.4, -0.8] as [number, number, number], scale: 0.5, color: MOTION_LAB_ROSE, type: "sphere" as const },
      ] as const,
    [],
  );

  const cameraProxy = useRef({ x: 0, y: 0, z: 6 });
  const targetProxy = useRef({ x: 0, y: 0, z: 0 });

  useGsapTimeline(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: typeof document !== "undefined" ? document.body : undefined,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: () => {
          const energy = Math.min(1, Math.abs(scroll.current.velocity) * 10);
          gsap.to(targetProxy.current, { x: energy * 0.2, duration: 0.3, overwrite: true });
        },
      },
    });

    tl.fromTo(cameraProxy.current, { x: 0, y: 0, z: 6 }, { x: 1.2, y: 0.6, z: 5, duration: 0.25, ease: "none" }, 0)
      .to(cameraProxy.current, { x: -1.0, y: -0.4, z: 4.2, duration: 0.25, ease: "none" })
      .to(cameraProxy.current, { x: 0.4, y: 1.0, z: 3.5, duration: 0.25, ease: "none" })
      .to(cameraProxy.current, { x: 0, y: 0, z: 6, duration: 0.25, ease: "none" });

    tl.fromTo(targetProxy.current, { x: 0, y: 0, z: 0 }, { x: 0.8, y: -0.2, z: 0, duration: 0.25, ease: "none" }, 0)
      .to(targetProxy.current, { x: -0.6, y: 0.4, z: 0, duration: 0.25, ease: "none" })
      .to(targetProxy.current, { x: 0.2, y: 0.8, z: 0, duration: 0.25, ease: "none" })
      .to(targetProxy.current, { x: 0, y: 0, z: 0, duration: 0.25, ease: "none" });

    return tl;
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      cameraProxy.current = { x: 0, y: 0, z: 6 };
      targetProxy.current = { x: 0, y: 0, z: 0 };
    }
  }, [reducedMotion]);

  useFrame(() => {
    if (reducedMotion) {
      camera.position.set(0, 0, 6);
      camera.lookAt(0, 0, 0);
      invalidate();
      return;
    }

    camera.position.x += (cameraProxy.current.x - camera.position.x) * 0.04;
    camera.position.y += (cameraProxy.current.y - camera.position.y) * 0.04;
    camera.position.z += (cameraProxy.current.z - camera.position.z) * 0.04;
    camera.lookAt(targetProxy.current.x, targetProxy.current.y, targetProxy.current.z);

    if (groupRef.current) {
      const t = performance.now() * 0.001;
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.children.forEach((child, i) => {
        const obj = child as THREE.Mesh;
        obj.rotation.x = t * (0.2 + i * 0.05);
        obj.rotation.y = t * (0.15 + i * 0.03);
      });
    }

    invalidate();
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => {
        const common = (
          <meshStandardMaterial color={obj.color} metalness={0.3} roughness={0.4} emissive={obj.color} emissiveIntensity={0.15} />
        );
        return (
          <group key={i} position={obj.position} scale={obj.scale}>
            {obj.type === "icosahedron" && <Icosahedron args={[1, 0]}>{common}</Icosahedron>}
            {obj.type === "torus" && <Torus args={[1, 0.25, 16, 48]}>{common}</Torus>}
            {obj.type === "octahedron" && <Octahedron args={[1, 0]}>{common}</Octahedron>}
            {obj.type === "sphere" && <Sphere args={[1, 24, 24]}>{common}</Sphere>}
          </group>
        );
      })}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={1.2} />
      <pointLight color={ACCENT} intensity={1.2} position={[-3, 2, 3]} />
    </group>
  );
}

export function ScrollNarrative() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sc-panel to-sc-void">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 20 }}
        frameloop="demand"
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <StageContent />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-xs text-white/70 backdrop-blur-sm">
        Scroll the page to scrub
      </div>
    </div>
  );
}
