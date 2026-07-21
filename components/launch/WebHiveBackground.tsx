"use client";

/**
 * Fixed SVG background: a spiderweb + beehive hybrid.
 * Coordinates are rounded so SSR and client always emit identical attributes.
 */

const STROKE = "#39FF14";
const CENTER = 600;
const VIEWBOX = 1200;
/** Stable gradient/mask ids — avoid useId() which can diverge across trees. */
const MASK_FADE = "webhive-fade";
const MASK_VIGNETTE = "webhive-vignette";

function r2(n: number) {
  return Math.round(n * 100) / 100;
}

function hexPoints(cx: number, cy: number, radius: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    points.push(`${r2(cx + radius * Math.cos(angle))},${r2(cy + radius * Math.sin(angle))}`);
  }
  return points.join(" ");
}

function hexGrid(cellR: number, rings: number): { cx: number; cy: number }[] {
  const centers: { cx: number; cy: number }[] = [{ cx: CENTER, cy: CENTER }];
  const w = Math.sqrt(3) * cellR;
  const h = 1.5 * cellR;

  for (let ring = 1; ring <= rings; ring++) {
    for (let side = 0; side < 6; side++) {
      for (let step = 0; step < ring; step++) {
        const startAngle = Math.PI / 6;
        const sx = CENTER + ring * w * Math.cos(startAngle + (side * Math.PI) / 3);
        const sy = CENTER + ring * h * Math.sin(startAngle + (side * Math.PI) / 3);
        const nextAngle = startAngle + ((side + 1) * Math.PI) / 3;
        const nx = CENTER + ring * w * Math.cos(nextAngle);
        const ny = CENTER + ring * h * Math.sin(nextAngle);
        const t = step / ring;
        centers.push({
          cx: r2(sx + (nx - sx) * t),
          cy: r2(sy + (ny - sy) * t),
        });
      }
    }
  }

  return centers;
}

export function WebHiveBackground() {
  const cellR = 44;
  const grid = hexGrid(cellR, 5);

  const visibleGrid = grid.filter(({ cx, cy }) => {
    const dx = cx - CENTER;
    const dy = cy - CENTER;
    return Math.sqrt(dx * dx + dy * dy) <= 540;
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute left-1/2 top-1/2 h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2"
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={MASK_FADE} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="1" />
            <stop offset="70%" stopColor="#000" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <mask id={MASK_VIGNETTE}>
            <rect x="0" y="0" width={VIEWBOX} height={VIEWBOX} fill={`url(#${MASK_FADE})`} />
          </mask>
        </defs>

        <g mask={`url(#${MASK_VIGNETTE})`}>
          <g className="webhive-spokes opacity-15">
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * Math.PI) / 12;
              const x2 = r2(CENTER + 580 * Math.cos(angle));
              const y2 = r2(CENTER + 580 * Math.sin(angle));
              return (
                <line
                  key={`spoke-${i}`}
                  x1={CENTER}
                  y1={CENTER}
                  x2={x2}
                  y2={y2}
                  stroke={STROKE}
                  strokeWidth={0.8}
                />
              );
            })}
          </g>

          <g className="webhive-rings opacity-10">
            {Array.from({ length: 8 }).map((_, i) => {
              const radius = 70 + i * 70;
              return (
                <circle
                  key={`ring-${i}`}
                  cx={CENTER}
                  cy={CENTER}
                  r={radius}
                  fill="none"
                  stroke={STROKE}
                  strokeWidth={0.6}
                />
              );
            })}
          </g>

          <g
            className="webhive-hive opacity-10 motion-safe:animate-[spin_60s_linear_infinite]"
            style={{ transformOrigin: `${CENTER}px ${CENTER}px`, transformBox: "fill-box" }}
          >
            {visibleGrid.map(({ cx, cy }, i) => (
              <polygon
                key={`hex-${i}`}
                points={hexPoints(cx, cy, cellR - 1)}
                fill="none"
                stroke={STROKE}
                strokeWidth={0.7}
                opacity={0.85}
              />
            ))}
          </g>

          <g className="webhive-links opacity-10">
            {visibleGrid.slice(0, 90).map((a, i) =>
              visibleGrid.slice(i + 1, i + 8).map((b, j) => {
                const dx = a.cx - b.cx;
                const dy = a.cy - b.cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > cellR * 2.5) return null;
                return (
                  <line
                    key={`link-${i}-${j}`}
                    x1={a.cx}
                    y1={a.cy}
                    x2={b.cx}
                    y2={b.cy}
                    stroke={STROKE}
                    strokeWidth={0.4}
                    opacity={0.5}
                  />
                );
              })
            )}
          </g>

          <g className="webhive-nodes opacity-20">
            <circle
              cx={CENTER}
              cy={CENTER}
              r={5}
              fill={STROKE}
              className="motion-safe:animate-[pulse_4s_ease-in-out_infinite]"
            />
            {visibleGrid.slice(0, 60).map(({ cx, cy }, i) => (
              <circle
                key={`node-${i}`}
                cx={cx}
                cy={cy}
                r={1.6}
                fill={STROKE}
                className="motion-safe:animate-[pulse_4s_ease-in-out_infinite]"
                style={{ animationDelay: `${(i % 20) * 0.2}s` }}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
