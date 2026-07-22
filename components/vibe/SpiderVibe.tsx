"use client";

import { useCallback, useEffect, useRef } from "react";
import { brandAssets } from "@/lib/brand-assets";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";
import { useCalmMode } from "@/lib/motion/calm-mode";

/**
 * 187VIBE spider companion (site-wide):
 * - CORE mascot follows the pointer on a permanent silk line from the top.
 * - Idle escalation when motion allowed; suppressed in Calm Mode / reduced-motion.
 * - Rare wander only when idle and motion allowed.
 */
export function SpiderVibe() {
  const mounted = useClientMounted();
  const reduced = useReducedMotion();
  const { motionSuppressed, calm } = useCalmMode();
  if (!mounted || reduced || motionSuppressed) return null;
  return (
    <>
      <SpiderMouseFollower allowIdleEscalation={!calm} />
      {!calm ? <SpiderWandererIdleBoost /> : null}
    </>
  );
}

const IDLE_START_MS = 2000;
const IDLE_STEP_MS = 3000;

type IdleLevel = 0 | 1 | 2 | 3 | 4;

function SpiderMouseFollower({ allowIdleEscalation = true }: { allowIdleEscalation?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const silkRef = useRef<SVGLineElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const idleLevelRef = useRef<IdleLevel>(0);
  const followingRef = useRef(true);
  const idleAnimRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const swingTweenRef = useRef<gsap.core.Tween | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const escalateTimerRef = useRef<number | null>(null);
  const lastMoveRef = useRef(0);

  const killIdleMotion = useCallback(() => {
    idleAnimRef.current?.kill();
    idleAnimRef.current = null;
    swingTweenRef.current?.kill();
    swingTweenRef.current = null;
    if (imgRef.current) {
      gsap.killTweensOf(imgRef.current);
    }
    if (wrapRef.current) {
      gsap.killTweensOf(wrapRef.current);
    }
  }, []);

  const updateSilk = useCallback((x: number, y: number) => {
    const silk = silkRef.current;
    if (!silk) return;
    // Permanent silk from top of viewport to spider (slightly above center of mascot)
    gsap.set(silk, {
      attr: {
        x1: x,
        y1: 0,
        x2: x,
        y2: Math.max(4, y - 20),
      },
    });
  }, []);

  const startIdleEscalation = useCallback(() => {
    if (escalateTimerRef.current != null) return;

    const bump = () => {
      const next = Math.min(4, idleLevelRef.current + 1) as IdleLevel;
      idleLevelRef.current = next;
      runIdleLevel(next);
      if (next < 4) {
        escalateTimerRef.current = window.setTimeout(bump, IDLE_STEP_MS);
      } else {
        escalateTimerRef.current = null;
      }
    };

    // First response after already waiting IDLE_START_MS
    idleLevelRef.current = 1;
    runIdleLevel(1);
    escalateTimerRef.current = window.setTimeout(bump, IDLE_STEP_MS);

    function runIdleLevel(level: IdleLevel) {
      const img = imgRef.current;
      const wrap = wrapRef.current;
      if (!img || !wrap) return;

      killIdleMotion();

      if (level === 1) {
        // Wiggle
        followingRef.current = true;
        idleAnimRef.current = gsap.to(img, {
          rotation: 12,
          duration: 0.12,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        });
      } else if (level === 2) {
        // Pace a little (local x offset while still near mouse)
        followingRef.current = true;
        gsap.set(img, { rotation: 0 });
        idleAnimRef.current = gsap.timeline({ repeat: -1 })
          .to(img, { x: 14, rotation: 8, duration: 0.35, ease: "power1.inOut" })
          .to(img, { x: -14, rotation: -8, duration: 0.45, ease: "power1.inOut" })
          .to(img, { x: 0, rotation: 0, duration: 0.3, ease: "power1.inOut" });
      } else if (level === 3) {
        // Spin
        followingRef.current = true;
        gsap.set(img, { x: 0 });
        idleAnimRef.current = gsap.to(img, {
          rotation: "+=360",
          duration: 0.7,
          ease: "power2.inOut",
          repeat: -1,
        });
      } else if (level === 4) {
        // Let go — damped pendulum on silk (physics via ticker; no Club plugins)
        followingRef.current = false;
        gsap.set(img, { x: 0, rotation: 0 });
        const anchorX = posRef.current.x;
        const length = Math.min(window.innerHeight * 0.42, Math.max(120, posRef.current.y));
        const state = { angle: 0.9 * (Math.random() > 0.5 ? 1 : -1), vel: 0 };
        const gForce = 18;
        const damping = 0.22;

        gsap.to(wrap, {
          x: anchorX + Math.sin(state.angle) * length * 0.3,
          y: Math.cos(state.angle * 0.3) * length,
          duration: 0.4,
          ease: "power2.out",
        });

        const onSwing = () => {
          const dt = gsap.ticker.deltaRatio(60) * (1 / 60);
          const accel =
            (-gForce / Math.max(0.5, length / 100)) * Math.sin(state.angle) - damping * state.vel;
          state.vel += accel * dt;
          state.angle += state.vel * dt;
          const x = anchorX + Math.sin(state.angle) * length;
          const py = Math.max(48, Math.cos(state.angle) * length);
          gsap.set(wrap, { x, y: py });
          gsap.set(img, { rotation: (state.angle * 180) / Math.PI * 0.85 });
          posRef.current = { x, y: py };
          updateSilk(x, py);
        };
        gsap.ticker.add(onSwing);
        // Store remover on a dummy tween so killIdleMotion can clear via ref
        swingTweenRef.current = {
          kill: () => gsap.ticker.remove(onSwing),
        } as gsap.core.Tween;
        idleAnimRef.current = swingTweenRef.current;
      }
    }
  }, [killIdleMotion, updateSilk]);

  const clearIdleTimers = useCallback(() => {
    if (idleTimerRef.current != null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    if (escalateTimerRef.current != null) {
      window.clearTimeout(escalateTimerRef.current);
      escalateTimerRef.current = null;
    }
  }, []);

  const scheduleIdle = useCallback(() => {
    clearIdleTimers();
    if (!allowIdleEscalation) return;
    idleTimerRef.current = window.setTimeout(() => {
      startIdleEscalation();
    }, IDLE_START_MS);
  }, [allowIdleEscalation, clearIdleTimers, startIdleEscalation]);

  const snapBackToMouse = useCallback(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    clearIdleTimers();
    killIdleMotion();
    idleLevelRef.current = 0;
    followingRef.current = true;

    gsap.set(img, { x: 0, rotation: 0 });
    gsap.to(img, { rotation: 0, duration: 0.35, ease: "power2.out" });
    gsap.to(wrap, {
      x: mouseRef.current.x,
      y: mouseRef.current.y,
      duration: 0.45,
      ease: "back.out(1.4)",
      onUpdate: () => {
        posRef.current.x = Number(gsap.getProperty(wrap, "x"));
        posRef.current.y = Number(gsap.getProperty(wrap, "y"));
        updateSilk(posRef.current.x, posRef.current.y);
      },
      onComplete: () => {
        posRef.current = { ...mouseRef.current };
        scheduleIdle();
      },
    });
  }, [clearIdleTimers, killIdleMotion, scheduleIdle, updateSilk]);

  useEffect(() => {
    if (!wrapRef.current || !imgRef.current) return;
    registerGsap();
    const wrap = wrapRef.current;
    const img = imgRef.current;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseRef.current = { x: cx, y: cy };
    posRef.current = { x: cx, y: cy };
    lastMoveRef.current = performance.now();

    gsap.set(wrap, { xPercent: -50, yPercent: -50, x: cx, y: cy });
    gsap.set(img, { scale: 0, opacity: 0, x: 0, y: 0, rotation: 0 });
    gsap.to(img, { scale: 1, opacity: 0.92, duration: 0.55, ease: "back.out(1.6)", delay: 0.15 });
    updateSilk(cx, cy);

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.7, ease: "power3.out" });
    const rotTo = gsap.quickTo(img, "rotation", { duration: 0.4, ease: "power2.out" });

    let lastX = cx;

    const onMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastMoveRef.current = performance.now();

      // Expose idle depth for wanderer boost
      document.documentElement.dataset.spiderIdle = "0";

      if (!followingRef.current || idleLevelRef.current > 0) {
        snapBackToMouse();
        return;
      }

      const dx = e.clientX - lastX;
      lastX = e.clientX;
      xTo(e.clientX);
      yTo(e.clientY);
      rotTo(gsap.utils.clamp(-18, 18, dx * 0.35));
      posRef.current = { x: e.clientX, y: e.clientY };
      // Silk tracks target; lag makes line feel elastic via pointer pos
      updateSilk(e.clientX, e.clientY);
      scheduleIdle();
    };

    // Keep silk glued while following (reads live transform)
    const ticker = () => {
      if (!followingRef.current) return;
      const x = Number(gsap.getProperty(wrap, "x"));
      const y = Number(gsap.getProperty(wrap, "y"));
      posRef.current = { x, y };
      updateSilk(x, y);
    };
    gsap.ticker.add(ticker);

    const onLeave = () => {
      gsap.to(img, { opacity: 0.4, scale: 0.88, duration: 0.35 });
    };
    const onEnter = () => {
      gsap.to(img, { opacity: 0.92, scale: 1, duration: 0.35 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    scheduleIdle();

    // Broadcast idle level for wanderer
    const idleBroadcast = window.setInterval(() => {
      const idleMs = performance.now() - lastMoveRef.current;
      const level =
        idleMs < IDLE_START_MS
          ? 0
          : Math.min(4, 1 + Math.floor((idleMs - IDLE_START_MS) / IDLE_STEP_MS));
      document.documentElement.dataset.spiderIdle = String(level);
    }, 500);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      clearIdleTimers();
      killIdleMotion();
      window.clearInterval(idleBroadcast);
      delete document.documentElement.dataset.spiderIdle;
    };
  }, [clearIdleTimers, killIdleMotion, scheduleIdle, snapBackToMouse, updateSilk]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[45]" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full overflow-visible opacity-45">
        <line
          ref={silkRef}
          x1="0"
          y1="0"
          x2="0"
          y2="0"
          stroke="rgba(57,255,20,0.4)"
          strokeWidth="1.25"
          strokeDasharray="3 5"
        />
      </svg>
      <div ref={wrapRef} className="fixed left-0 top-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe */}
        <img
          ref={imgRef}
          src={brandAssets.mascotCore}
          alt=""
          width={72}
          height={72}
          className="h-10 w-10 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] sm:h-11 sm:w-11"
          draggable={false}
        />
      </div>
    </div>
  );
}

type Trick = "silkDrop" | "swingIn" | "scurrySide" | "zipAcross" | "bounceCorner" | "rappelOut";
const TRICKS: Trick[] = ["silkDrop", "swingIn", "scurrySide", "zipAcross", "bounceCorner", "rappelOut"];

/**
 * Secondary rare spider — almost never when active; more when user is idle.
 * Does not replace the silk follower.
 */
function SpiderWandererIdleBoost() {
  const silkRef = useRef<HTMLDivElement>(null);
  const spiderRef = useRef<HTMLImageElement>(null);
  const busyRef = useRef(false);

  const playTrick = useCallback((trick: Trick) => {
    if (busyRef.current || !spiderRef.current || !silkRef.current) return;
    // Never while follower is in swing (idle 4)
    if (document.documentElement.dataset.spiderIdle === "4") return;

    const spider = spiderRef.current;
    const silk = silkRef.current;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = 24;
    const size = Math.min(64, Math.max(44, vw * 0.055));
    busyRef.current = true;
    registerGsap();

    const tl = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
        gsap.set([spider, silk], { clearProps: "all" });
        gsap.set(spider, { opacity: 0, visibility: "hidden" });
        gsap.set(silk, { opacity: 0, scaleY: 0 });
      },
    });

    gsap.set(spider, {
      visibility: "visible",
      width: size,
      height: size,
      opacity: 0,
      rotation: 0,
      scale: 1,
      x: 0,
      y: 0,
    });
    gsap.set(silk, { opacity: 0, scaleY: 0, transformOrigin: "top center" });

    const side = Math.random() > 0.5 ? "left" : "right";
    const midX = pad + Math.random() * (vw - size - pad * 2);
    const midY = 100 + Math.random() * (vh * 0.4);

    switch (trick) {
      case "silkDrop": {
        gsap.set(spider, { position: "fixed", left: midX, top: -size, opacity: 0.85 });
        gsap.set(silk, {
          position: "fixed",
          left: midX + size / 2,
          top: 0,
          width: 1,
          height: midY + size / 2,
          opacity: 0.4,
          background: "linear-gradient(to bottom, transparent, rgba(57,255,20,0.35))",
        });
        tl.to(silk, { scaleY: 1, duration: 0.3 })
          .to(spider, { top: midY, duration: 0.75, ease: "bounce.out" }, "-=0.1")
          .to(spider, { top: -size - 20, duration: 0.55, ease: "power2.in" }, "+=0.6")
          .to(silk, { scaleY: 0, opacity: 0, duration: 0.35 }, "-=0.4");
        break;
      }
      case "swingIn": {
        gsap.set(spider, {
          position: "fixed",
          left: midX,
          top: 90,
          opacity: 0.85,
          transformOrigin: "50% 0%",
          rotation: side === "left" ? -50 : 50,
        });
        gsap.set(silk, {
          position: "fixed",
          left: midX + size / 2,
          top: 0,
          width: 1,
          height: 90,
          opacity: 0.4,
          scaleY: 1,
          background: "rgba(57,255,20,0.3)",
        });
        tl.to(spider, { rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" })
          .to(spider, { x: side === "left" ? -vw : vw, opacity: 0, duration: 0.55, ease: "power2.in" }, "+=0.4")
          .to(silk, { opacity: 0, duration: 0.25 }, "-=0.4");
        break;
      }
      case "scurrySide": {
        const y = 140 + Math.random() * (vh - 240);
        gsap.set(spider, {
          position: "fixed",
          left: side === "left" ? -size : vw + 8,
          top: y,
          opacity: 0.85,
        });
        const restX = side === "left" ? pad + 8 : vw - size - pad - 8;
        tl.to(spider, { left: restX, duration: 0.45, ease: "power2.out" })
          .to(spider, { y: "+=8", duration: 0.15, yoyo: true, repeat: 3, ease: "steps(2)" })
          .to(spider, { left: side === "left" ? -size - 20 : vw + 40, duration: 0.45, ease: "power3.in" }, "+=0.5");
        break;
      }
      case "zipAcross": {
        const y = 150 + Math.random() * (vh * 0.3);
        gsap.set(silk, {
          position: "fixed",
          left: 0,
          top: y + size / 2,
          width: vw,
          height: 1,
          opacity: 0,
          scaleY: 1,
          background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.3), transparent)",
        });
        gsap.set(spider, { position: "fixed", left: -size, top: y, opacity: 0.85 });
        tl.to(silk, { opacity: 0.5, duration: 0.2 })
          .to(spider, { left: vw + size, duration: 1, ease: "power1.inOut" })
          .to(silk, { opacity: 0, duration: 0.25 }, "-=0.15");
        break;
      }
      case "bounceCorner": {
        const cornerX = Math.random() > 0.5 ? pad : vw - size - pad;
        const cornerY = Math.random() > 0.5 ? 100 : vh - size - pad;
        gsap.set(spider, { position: "fixed", left: cornerX, top: cornerY, scale: 0, opacity: 0.85 });
        tl.to(spider, { scale: 1, duration: 0.35, ease: "back.out(2)" })
          .to(spider, { rotation: 12, duration: 0.1, yoyo: true, repeat: 4 })
          .to(spider, { scale: 0, opacity: 0, duration: 0.3, ease: "back.in(1.4)" }, "+=0.6");
        break;
      }
      case "rappelOut": {
        gsap.set(spider, { position: "fixed", left: midX, top: midY * 0.35, opacity: 0, scale: 0.7 });
        gsap.set(silk, {
          position: "fixed",
          left: midX + size / 2,
          top: 0,
          width: 1,
          height: midY * 0.35,
          opacity: 0.35,
          scaleY: 1,
          background: "rgba(57,255,20,0.3)",
        });
        tl.to(spider, { opacity: 0.85, scale: 1, duration: 0.25 })
          .to(spider, { top: midY, duration: 0.55, ease: "power2.inOut" })
          .to(
            spider,
            {
              left: side === "left" ? -size : vw + size,
              opacity: 0,
              duration: 0.55,
              ease: "power2.in",
            },
            "+=0.35"
          )
          .to(silk, { opacity: 0, duration: 0.2 }, "-=0.4");
        break;
      }
    }
  }, []);

  useEffect(() => {
    registerGsap();
    let timer = 0;

    const schedule = () => {
      const idle = Number(document.documentElement.dataset.spiderIdle ?? "0");
      // Active mouse: very rare (45–90s). Idle: denser (12–40s) as level rises.
      let delay: number;
      if (idle <= 0) {
        delay = 45000 + Math.random() * 45000;
      } else if (idle === 1) {
        delay = 28000 + Math.random() * 20000;
      } else if (idle === 2) {
        delay = 18000 + Math.random() * 14000;
      } else if (idle === 3) {
        delay = 12000 + Math.random() * 10000;
      } else {
        delay = 9000 + Math.random() * 8000;
      }
      timer = window.setTimeout(() => {
        // Probability scales with idle
        const p = idle <= 0 ? 0.12 : idle === 1 ? 0.35 : idle === 2 ? 0.55 : idle === 3 ? 0.75 : 0.9;
        if (Math.random() < p) {
          playTrick(TRICKS[Math.floor(Math.random() * TRICKS.length)]);
        }
        schedule();
      }, delay);
    };

    // First possible trick only after a long calm period
    timer = window.setTimeout(schedule, 40000);

    return () => window.clearTimeout(timer);
  }, [playTrick]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[44] overflow-hidden" aria-hidden="true">
      <div ref={silkRef} className="pointer-events-none fixed origin-top opacity-0" />
      {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe */}
      <img
        ref={spiderRef}
        src={brandAssets.mascotCore}
        alt=""
        width={72}
        height={72}
        className="pointer-events-none fixed object-contain opacity-0 will-change-transform"
        style={{ visibility: "hidden" }}
        draggable={false}
      />
    </div>
  );
}
