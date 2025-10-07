import type { LenisRef } from "lenis/react";

import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export default function useLenis() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return <ReactLenis root options={{ autoRaf: false, smoothWheel: true, syncTouch: true, lerp: 0.05 }} ref={lenisRef} />;
}
