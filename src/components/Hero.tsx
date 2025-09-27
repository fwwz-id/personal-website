import { Button } from "~/components/ui/button";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          descriptionRef.current,
          buttonsRef.current,
          ctaRef.current,
        ],
        {
          opacity: 0,
          y: 80,
          rotateX: 45,
        }
      );

      // Create master timeline
      const masterTl = gsap.timeline();

      // Animate title with enhanced effects
      if (titleRef.current) {
        const title = new SplitType(".brutalist-heading .word.block", {
          types: "words,chars",
          wordClass: "word",
          charClass: "char inline-block",
        });

        const chars = title.chars;

        gsap.set(chars, {
          opacity: 0,
          y: 100,
          rotateX: 90,
          transformOrigin: "center bottom",
        });

        masterTl
          .to(titleRef.current, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power4.out",
          })
          .to(
            chars,
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              stagger: {
                each: 0.03,
                from: "start",
              },
              ease: "back.out(2)",
            },
            "-=0.7"
          );
      }

      // Enhanced animations for other elements
      masterTl
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.6"
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.4"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.6"
        );

      // Add floating animation to background elements
      const bgElements = heroRef.current?.querySelectorAll(".bg-element");
      if (bgElements) {
        gsap.to(bgElements, {
          y: "random(-20, 100)",
          x: "random(-10, 10)",
          duration: "random(3, 6)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.5,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      ref={heroRef}
    >
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Typography */}
          <h1
            ref={titleRef}
            className="brutalist-heading text-6xl md:text-8xl lg:text-9xl mb-8"
          >
            <span className="word block">CREATIVE</span>
            <span className="word block electric-text">DEVELOPER</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl font-grotesk uppercase tracking-wide mb-4"
          >
            AI Engineer × Full-Stack Developer
          </p>

          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Crafting digital experiences with TypeScript, Python, and
            cutting-edge AI solutions. Available for Saas, web, and AI projects.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              asChild
              variant="default"
              size="lg"
              className="brutalist-card bg-foreground text-background hover:bg-foreground/90 font-grotesk uppercase tracking-wide px-8 py-4 text-lg"
            >
              <Link href="mailto:fwwz.dev.id@gmail.com">
                <Mail className="mr-2" />
                Hire Me
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="brutalist-card border-2 border-foreground bg-background hover:bg-foreground hover:text-background font-grotesk uppercase tracking-wide px-8 py-4 text-lg"
            >
              <Link
                href="https://wa.me/+6289529050802"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2" />
                WhatsApp
              </Link>
            </Button>
          </div>

          {/* See Work CTA */}
          <button
            ref={ctaRef}
            onClick={scrollToProjects}
            className="group flex items-center justify-center mx-auto font-grotesk uppercase tracking-wide text-sm hover:text-accent transition-colors"
          >
            See My Work
            <ArrowRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={16}
            />
          </button>
        </div>
      </div>

      {/* Enhanced Background Elements */}
      <div className="bg-element absolute top-1/2 left-1/4 w-4 h-4 bg-accent rounded-full opacity-60"></div>
      <div className="bg-element absolute top-1/3 right-1/3 w-6 h-6 bg-accent/40 rounded-full"></div>
      <div className="bg-element absolute bottom-1/4 right-1/4 w-2 h-2 bg-accent rounded-full"></div>
      <div className="bg-element absolute top-1/4 left-1/2 w-3 h-3 bg-accent/30 rounded-full"></div>
      <div className="bg-element absolute bottom-1/3 left-1/6 w-5 h-5 bg-accent/20 rounded-full"></div>
    </section>
  );
};

export default Hero;
