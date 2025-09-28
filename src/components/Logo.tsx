import type { SVGProps } from "react";

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={70}
    height={70}
    viewBox="0 0 150 150"
    className="fill-foreground stroke-foreground"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M50 52.1L60.2 52.1L90.9 83.2L92 83.2L92 53.1L98.9 53.1L98.9 91.5L88.7 91.5L58 60.3L56.8 60.3L56.8 92.3L50 92.3L50 52.1Z"
    />
    <path d="M76 125L76 33" strokeWidth={7} />
  </svg>
);
export default Logo;
