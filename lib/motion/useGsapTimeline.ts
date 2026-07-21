"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "./gsap";

export type TimelineFactory = () => gsap.core.Timeline;

export function useGsapTimeline(
  factory: TimelineFactory,
  deps: React.DependencyList = [],
) {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    registerGsap();
    const tl = factory();
    tlRef.current = tl;
    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, deps);

  return tlRef;
}
