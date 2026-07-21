"use client";

import { useEffect, useState } from "react";

/**
 * False on the server and on the first client render; true after mount.
 * Use for decorative / media-query / random UI so SSR HTML matches the first paint.
 */
export function useClientMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
