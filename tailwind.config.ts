import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "noise-pattern":
          "url(https://res.cloudinary.com/diquhbfvi/image/upload/fl_lossy,q_10/v1709180419/personal-website/noise.gif)",
        jakarta: "url(/pexels-tom-fisk.webp)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-bodoni-moda)"],
        mono: ["var(--font-space-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
