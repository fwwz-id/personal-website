"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "~/providers/LanguageProvider";

const LanguageToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 brutalist-card border border-foreground bg-background p-1">
        <div className="h-8 w-8" />
        <div className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1 brutalist-card border border-foreground bg-background p-1"
      role="group"
      aria-label="Select blog language"
    >
      <button
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-150 ${
          language === "en"
            ? "bg-foreground text-background"
            : "text-foreground hover:bg-foreground/10"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("id")}
        aria-pressed={language === "id"}
        className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-150 ${
          language === "id"
            ? "bg-foreground text-background"
            : "text-foreground hover:bg-foreground/10"
        }`}
      >
        ID
      </button>
    </div>
  );
};

export default LanguageToggle;
