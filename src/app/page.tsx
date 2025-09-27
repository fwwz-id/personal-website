"use client";

import Hero from "~/components/Hero";
import Projects from "~/components/Projects";
import About from "~/components/About";
import Reviews from "~/components/Reviews";
import Contact from "~/components/Contact";
import useLenis from "~/hooks/use-lenis";
import SiteShell from "./site-shell";

export default function HomePage() {
  // Smooth scrolling (Lenis)
  const lenis = useLenis();

  return (
    <SiteShell>
      {lenis}
      <Hero />
      <Projects />
      <About />
      <Reviews />
      <Contact />
    </SiteShell>
  );
}
