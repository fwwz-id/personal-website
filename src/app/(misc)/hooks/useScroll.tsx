"use client";

import { useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScroll = () => {
  const lenis = useLenis(ScrollTrigger.update);

  return lenis;
};

export default useScroll;
