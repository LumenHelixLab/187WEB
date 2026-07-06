"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/Button";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Low-friction capture (skill #11): one field, one action, honest states.
 * Talks to POST /api/lead, which persists when a DB is configured and
 * acknowledges in "preview mode" otherwise. The status line is an aria-live
 * region so screen readers hear the result.
 */
export function LeadForm() {
  const id = useId();
  const statusId = `${id}-status`;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const busy = status === "submitting";
  const done = status === "success";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // The static GitHub Pages export has no /api route — acknowledge client-side
    // instead of firing a fetch that would 404 on a static host.
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
      setStatus("success");
      setMessage("Thanks! This is the static showcase, so nothing was stored — clone the repo to run the live API.");
      setEmail("");
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "showcase" }),
      });
      const data: { ok?: boolean; message?: string; error?: string } = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(data.message ?? "You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error — check your connection and try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={id}
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@studio.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={busy || done}
          aria-describedby={statusId}
          aria-invalid={status === "error"}
          className="h-14 flex-1 rounded-sm border border-line bg-surface px-4 text-ink shadow-sm outline-none transition placeholder:text-muted/70 focus-visible:border-accent focus-visible:shadow-focus disabled:opacity-60"
        />
        <Button type="submit" size="lg" disabled={busy || done}>
          {busy ? "Joining…" : done ? "Joined ✓" : "Join the list"}
        </Button>
      </div>
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={`mt-3 text-sm ${status === "error" ? "text-danger" : "text-muted"}`}
      >
        {message || "No spam. One email when there's something genuinely worth your attention."}
      </p>
    </form>
  );
}
