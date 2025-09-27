"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type GlitchOverlayProps = {
  /** Average seconds between glitch bursts. Default 3.5 */
  avgIntervalSec?: number;
  /** Duration of a glitch burst in ms. Default 140ms */
  burstDurationMs?: number;
  /** Max horizontal slice shift in px. Default 12 */
  maxShiftPx?: number;
  /** Number of slices per burst [min,max]. Default [2,5] */
  slicesRange?: [number, number];
  /** Additional className */
  className?: string;
  /** Global opacity for the effect (0–1). Default 0.25 */
  opacity?: number;
};

type Slice = { id: number; top: number; height: number; shift: number; hue: number };

/**
 * Lightweight glitch overlay that occasionally renders tinted horizontal slices
 * with small horizontal jitter to simulate CRT glitches.
 * Purely visual; does not interfere with layout or pointer events.
 * Respects prefers-reduced-motion (disables glitches).
 */
export default function GlitchOverlay({
  avgIntervalSec = 3.5,
  burstDurationMs = 140,
  maxShiftPx = 12,
  slicesRange = [2, 5],
  className = "",
  opacity = 0.25,
}: GlitchOverlayProps) {
  const [slices, setSlices] = useState<Slice[]>([]);
  const timerRef = useRef<number | null>(null);
  const activeRef = useRef(false);

  const minSlices = Math.max(1, Math.min(slicesRange[0], slicesRange[1]));
  const maxSlices = Math.max(minSlices, slicesRange[1]);

  const reducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    if (reducedMotion) return; // respect reduced motion

    const scheduleNext = () => {
      const jitter = (Math.random() - 0.5) * 1.5; // ±0.75s jitter
      const nextDelay = Math.max(0.6, avgIntervalSec + jitter) * 1000;
      timerRef.current = window.setTimeout(triggerBurst, nextDelay);
    };

    const triggerBurst = () => {
      if (activeRef.current) return scheduleNext();
      activeRef.current = true;

      const vh = window.innerHeight;
      const count = Math.floor(Math.random() * (maxSlices - minSlices + 1)) + minSlices;
      const newSlices: Slice[] = Array.from({ length: count }, (_, i) => {
        const height = Math.max(2, Math.round(Math.random() * 10) + 2); // 2–12px
        const top = Math.max(0, Math.round(Math.random() * (vh - height)));
        const shiftMag = Math.round((Math.random() * maxShiftPx) | 0);
        const shift = (Math.random() < 0.5 ? -1 : 1) * shiftMag;
        const hue = Math.round(Math.random() * 360);
        return { id: i, top, height, shift, hue };
      });
      setSlices(newSlices);

      window.setTimeout(() => {
        setSlices([]);
        activeRef.current = false;
        scheduleNext();
      }, Math.max(60, burstDurationMs));
    };

    scheduleNext();
    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current);
    };
  }, [avgIntervalSec, burstDurationMs, maxShiftPx, minSlices, maxSlices, reducedMotion]);

  return (
    <div className={`glitch-layer ${className}`} aria-hidden style={{ opacity }}>
      {slices.map((s) => (
        <div
          key={s.id}
          className="absolute left-0 w-full will-change-transform"
          style={{
            top: s.top,
            height: s.height,
            transform: `translateX(${s.shift}px)`
          }}
        >
          {/* twin tinted bars for subtle chromatic effect */}
          <div
            className="pointer-events-none"
            style={{
              height: "100%",
              background:
                `linear-gradient(90deg,
                  hsla(${s.hue}, 85%, 60%, 0.10) 0%,
                  hsla(${(s.hue + 180) % 360}, 85%, 60%, 0.10) 100%)`,
              filter: "saturate(1.2) brightness(1.1)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

