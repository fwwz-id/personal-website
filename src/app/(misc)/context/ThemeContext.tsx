"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AvailableThemes = "dark" | "light";

const ThemeContext = createContext(
  {} as {
    theme: AvailableThemes;
    isDark: boolean;
    setTheme: (theme: AvailableThemes) => void;
  }
);

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<AvailableThemes>("light");

  const isDark = useMemo(() => theme == "dark", [theme]);

  const setThemeExtended = (theme: AvailableThemes) => {
    setTheme(theme);

    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setThemeExtended("dark");
    } else {
      setThemeExtended("light");
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeExtended,
        isDark,
      }}
    >
      <div className={isDark ? "dark" : "light"}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
