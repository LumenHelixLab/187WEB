"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "187web-calm-mode";

type CalmModeContextValue = {
  /** User-requested calm: pauses decorative auto-motion (mascot wander, marquees). */
  calm: boolean;
  setCalm: (v: boolean) => void;
  toggle: () => void;
  /** True when calm OR prefers-reduced-motion. */
  motionSuppressed: boolean;
  reducedMotion: boolean;
};

const CalmModeContext = createContext<CalmModeContextValue | null>(null);

export function CalmModeProvider({ children }: { children: ReactNode }) {
  const [calm, setCalmState] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "1") setCalmState(true);
    } catch {
      /* ignore */
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMq);
    setReady(true);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  const setCalm = useCallback((v: boolean) => {
    setCalmState(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => setCalm(!calm), [calm, setCalm]);

  const value = useMemo(
    () => ({
      calm: ready ? calm : false,
      setCalm,
      toggle,
      motionSuppressed: reducedMotion || calm,
      reducedMotion,
    }),
    [calm, ready, reducedMotion, setCalm, toggle]
  );

  return <CalmModeContext.Provider value={value}>{children}</CalmModeContext.Provider>;
}

export function useCalmMode() {
  const ctx = useContext(CalmModeContext);
  if (!ctx) {
    return {
      calm: false,
      setCalm: () => {},
      toggle: () => {},
      motionSuppressed: false,
      reducedMotion: false,
    } satisfies CalmModeContextValue;
  }
  return ctx;
}

/** Persistent Calm Mode control — WCAG pause/stop/hide for decorative motion. */
export function CalmModeToggle({ className = "" }: { className?: string }) {
  const { calm, toggle, reducedMotion } = useCalmMode();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={calm}
      title={
        reducedMotion
          ? "System prefers reduced motion — decorative motion already off"
          : calm
            ? "Calm Mode on — click to allow decorative motion"
            : "Calm Mode off — click to pause decorative motion"
      }
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF14] ${
        calm
          ? "border-[#39FF14]/50 bg-[#39FF14]/15 text-[#39FF14]"
          : "border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:text-white"
      } ${className}`}
    >
      <span aria-hidden className="text-sm">
        {calm || reducedMotion ? "◎" : "◌"}
      </span>
      {reducedMotion ? "Motion reduced" : calm ? "Calm Mode on" : "Calm Mode"}
    </button>
  );
}
