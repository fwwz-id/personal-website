"use client";

import { useTheme } from "../context/ThemeContext";

import HalfMoonIcon from "../components/icon/HalfMoon";
import SunIcon from "../components/icon/Sun";

const ThemeLayout = ({ children }: { children: React.ReactNode }) => {
  const { setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      <div className="relative container mx-auto z-30">
        <button
          className="absolute top-10 sm:top-28 right-10 sm:right-28 text-4xl text-yellow-400"
          onClick={toggleTheme}
        >
          {isDark ? <HalfMoonIcon /> : <SunIcon />}
        </button>
      </div>
      <div className="relative overflow-hidden dark:text-white duration-1000">
        <div className="min-h-screen w-screen fixed duration-1000 -translate-x-full bg-stone-800 dark:translate-x-0" />
        <div className="min-h-screen w-screen fixed bg-noise-pattern opacity-5" />
        <main className="relative">{children}</main>
      </div>
    </>
  );
};

export default ThemeLayout;
