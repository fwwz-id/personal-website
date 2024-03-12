"use client";

import ReactLenis from "@studio-freight/react-lenis";
import { type LenisOptions } from "@studio-freight/lenis";
import useScroll from "../hooks/useScroll";

type Props = {
  root?: boolean;
  options?: LenisOptions;
  autoRaf?: boolean;
  rafPriority?: number;
  className?: string;
  children?: React.ReactNode;
  props?: any;
};

const ScrollSmooth = (props: Props) => {
  const { children, ..._props } = props;

  useScroll();

  return (
    <ReactLenis root {..._props}>
      {children}
    </ReactLenis>
  );
};

export default ScrollSmooth;
