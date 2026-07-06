"use client";

import { useEffect, useState } from "react";

/** Live connection status (RESILIENCE.md #2). Renders only when offline; polite
 *  live region so screen readers hear the change. */
export function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(typeof navigator !== "undefined" && !navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[70] bg-[#FF4D8D] px-4 py-2 text-center text-sm font-medium text-white"
    >
      You&rsquo;re offline — showing the last loaded content. We&rsquo;ll reconnect automatically.
    </div>
  );
}
