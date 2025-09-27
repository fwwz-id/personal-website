"use client";

import { useEffect, useRef } from "react";

type GrainOverlayProps = {
  /** Canvas opacity (0–1). Default 0.05 */
  opacity?: number;
  /** Frames per second. Default 24 */
  fps?: number;
  /** Grain resolution cap. Lower = coarser, higher = finer. Default 360 */
  maxResolution?: number;
  /** Additional className for styling (e.g., blend mode) */
  className?: string;
};

/**
 * Animated grain overlay that simulates old-TV static.
 * Performance notes:
 * - Renders into a small offscreen canvas and scales up onto a full-screen canvas.
 * - Uses a fixed FPS interval rather than rAF to cap CPU usage.
 * - Respects prefers-reduced-motion and disables animation if set.
 */
export default function GrainOverlay({
  opacity = 0.05,
  fps = 24,
  maxResolution = 360,
  className = "",
}: GrainOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return; // do not animate for reduced motion

    // Prepare offscreen canvas for noise generation
    const off = (offscreenRef.current ||= document.createElement("canvas"));
    const offCtx = off.getContext("2d");
    if (!offCtx) return;

    // Resize canvases
    const resize = () => {
      const { innerWidth: vw, innerHeight: vh, devicePixelRatio: dpr } = window;
      // Finer grain if larger baseline; cap to keep CPU manageable
      const base = Math.min(
        maxResolution,
        Math.round(Math.max(vw, vh) / 3) // scale with viewport, but capped by maxResolution
      );
      const aspect = vw / Math.max(vh, 1);
      off.width = Math.max(64, Math.round(base * aspect));
      off.height = Math.max(64, base);

      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;

      // Improve scaling quality a bit
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "low"; // softer grain without heavy smoothing cost
    };

    resize();
    window.addEventListener("resize", resize);

    // Pre-allocate ImageData for offscreen drawing
    const drawNoise = () => {
      const w = off.width;
      const h = off.height;
      const imageData = offCtx.createImageData(w, h);
      const data = imageData.data;

      // Random grayscale noise
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      offCtx.putImageData(imageData, 0, 0);

      // Slight random offset to simulate TV jitter/scan
      const jitterX = (Math.random() - 0.5) * 2; // -1 to 1 px at offscreen scale
      const jitterY = (Math.random() - 0.5) * 2;

      // Clear and draw scaled to full canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(jitterX, jitterY);
      ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

    const intervalMs = Math.max(16, Math.round(1000 / fps));
    // Use setInterval to cap FPS; store as number for cleanup
    intervalRef.current = window.setInterval(drawNoise, intervalMs);

    return () => {
      window.removeEventListener("resize", resize);
      if (intervalRef.current != null) window.clearInterval(intervalRef.current);
    };
  }, [fps, maxResolution]);

  return (
    <canvas
      ref={canvasRef}
      className={`grain-layer ${className}`}
      aria-hidden
      style={{ opacity }}
    />
  );
}

