"use client";

/** Error state with retry (RESILIENCE.md #3/#6). role="alert" so it's announced. */
export function ErrorState({
  title = "Something went wrong",
  message = "We hit an unexpected error. Try again — your place is saved.",
  onRetry,
  className = "",
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center gap-3 rounded-2xl border border-[#FF4D8D]/30 bg-[#FF4D8D]/[0.06] p-8 text-center ${className}`}
    >
      <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-[#FF4D8D]/15 text-xl font-bold text-[#FF4D8D]">
        !
      </span>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="max-w-sm text-sm text-white/60">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#060713] transition-transform hover:-translate-y-0.5"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
