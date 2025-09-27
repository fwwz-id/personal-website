import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    const body = document.body;

    // Restart any in-flight animation and remove lingering transforms
    gsap.killTweensOf(body);
    gsap.set(body, { clearProps: "transform" });

    // Add a subtle animation when toggling and reset transforms afterwards
    gsap.fromTo(
      body,
      { scale: 1 },
      {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(body, { clearProps: "transform" });
        },
      }
    );
  };

  if (!mounted) {
    return (
      <button className="brutalist-card p-3 bg-background border border-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300">
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer brutalist-card p-3 bg-background border border-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
