"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { MOTION_LAB_PRIMARY } from "@/lib/motion/palette";

const GRID_SIZE = 16;
const COUNT = GRID_SIZE * GRID_SIZE;
const ACCENT = MOTION_LAB_PRIMARY;

function AudioContent({ isPlaying }: { isPlaying: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { invalidate } = useThree();
  const reducedMotion = useReducedMotion();

  const audioRef = useRef<{
    ctx: AudioContext | null;
    oscillator: OscillatorNode | null;
    analyser: AnalyserNode | null;
    data: Uint8Array | null;
  }>({ ctx: null, oscillator: null, analyser: null, data: null });

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    if (reducedMotion || !isPlaying) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    oscillator.type = "sawtooth";
    oscillator.frequency.value = 55;
    oscillator.connect(analyser);
    analyser.connect(ctx.destination);
    oscillator.start();

    audioRef.current = { ctx, oscillator, analyser, data: new Uint8Array(analyser.frequencyBinCount) };

    return () => {
      oscillator.stop();
      analyser.disconnect();
      ctx.close();
      audioRef.current = { ctx: null, oscillator: null, analyser: null, data: null };
    };
  }, [isPlaying, reducedMotion]);

  useFrame(() => {
    if (!meshRef.current) return;

    const { analyser, data } = audioRef.current;
    let bins: Uint8Array | null = data;
    if (analyser && bins) {
      analyser.getByteFrequencyData(bins as Uint8Array<ArrayBuffer>);
    } else {
      bins = null;
    }

    const time = performance.now() * 0.001;
    let i = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        const nx = x / GRID_SIZE - 0.5;
        const nz = z / GRID_SIZE - 0.5;
        const dist = Math.hypot(nx, nz);
        const binIndex = Math.min((bins?.length ?? 1) - 1, Math.floor(dist * (bins?.length ?? 1)));
        const amp = bins && bins.length > 0 ? bins[binIndex] / 255 : 0;
        const base = Math.sin(dist * 12 - time * 2) * 0.3;
        const height = isPlaying && !reducedMotion ? base + amp * 1.2 : base * 0.5;

        dummy.position.set(nx * 4, height * 0.5, nz * 4);
        dummy.scale.set(0.18, 0.2 + Math.max(0.05, height + 0.5), 0.18);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        const hue = 0.35 + amp * 0.15 + dist * 0.1;
        color.setHSL(hue, 0.8, 0.4 + amp * 0.4);
        meshRef.current.setColorAt(i, color);
        i++;
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    invalidate();
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={ACCENT} metalness={0.2} roughness={0.4} />
    </instancedMesh>
  );
}

export function AudioMesh() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sc-panel to-sc-void">
      <Canvas
        camera={{ position: [0, 4, 5], fov: 55, near: 0.1, far: 30 }}
        frameloop="demand"
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 3]} intensity={1} />
        <AudioContent isPlaying={isPlaying} />
      </Canvas>
      <button
        type="button"
        onClick={() => setIsPlaying((v) => !v)}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-sc-primary px-4 py-2 text-xs font-bold text-sc-void shadow-lg transition hover:brightness-110"
      >
        {isPlaying ? "Stop audio" : "Start audio"}
      </button>
    </div>
  );
}
