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
          "url(https://res.cloudinary.com/diquhbfvi/image/upload/v1709180419/personal-website/noise.webp)",
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
