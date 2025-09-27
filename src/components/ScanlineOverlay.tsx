"use client";

import { useEffect, useMemo } from "react";

type ScanlineOverlayProps = {
  /** Global opacity for the scanline layer (0–1). Default 0.06 */
  opacity?: number;
  /** Distance between lines in px (pattern height). Default 3 */
  lineHeight?: number;
  /** Thickness of the dark line in px. Default 1 */
  lineThickness?: number;
  /** Subtle vertical drift speed in px per cycle. Set 0 to disable. Default 1 */
  driftPx?: number;
  /** Duration of one drift cycle in seconds. Default 12s */
  driftDurationSec?: number;
  /** Additional className overrides */
  className?: string;
};

/**
 * Fixed, subtle CRT-style horizontal scanlines as a lightweight CSS overlay.
 * Uses a repeating-linear-gradient background and an optional slow vertical drift.
 * Respects prefers-reduced-motion (disables drift).
 */
export default function ScanlineOverlay({
  opacity = 0.06,
  lineHeight = 3,
  lineThickness = 1,
  driftPx = 1,
  driftDurationSec = 12,
  className = "",
}: ScanlineOverlayProps) {
  const pattern = useMemo(() => {
    const t = Math.max(1, Math.min(lineThickness, lineHeight));
    const h = Math.max(2, lineHeight);
    // dark line for t px, then transparent until h px
    return `repeating-linear-gradient(180deg, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) ${t}px, rgba(0,0,0,0) ${t}px, rgba(0,0,0,0) ${h}px)`;
  }, [lineHeight, lineThickness]);

  // add a class to disable animation for reduced motion
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = document.documentElement;
    if (reduced) el.classList.add("scanline-reduced-motion");
    return () => el.classList.remove("scanline-reduced-motion");
  }, []);

  const style: React.CSSProperties = {
    opacity,
    backgroundImage: pattern,
    // Use CSS var to feed keyframes a dynamic pixel distance per cycle
    // Drift is extremely subtle; users sensitive to motion won't notice (and it's disabled via media query)
    ["--scanline-drift" as any]: `${Math.max(0, driftPx)}px`,
    ["--scanline-duration" as any]: `${Math.max(1, driftDurationSec)}s`,
  };

  return <div className={`scanline-layer ${className}`} aria-hidden style={style} />;
}

