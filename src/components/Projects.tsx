import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";

import projects from "~/content/projects";
import Link from "next/link";
import Image from "next/image";

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let ctx: gsap.Context | undefined;
    let isMounted = true;
    let splitTitle: SplitType | undefined;
    const hoverCleanups: Array<() => void> = [];

    const run = async () => {
      if (!sectionRef.current) {
        return;
      }

      if (!isMounted || !sectionRef.current) {
        return;
      }

      ctx = gsap.context(() => {
        // Split text and animate characters
        if (titleRef.current) {
          splitTitle = new SplitType(titleRef.current, {
            types: "words,chars",
            tagName: "span",
          });

          gsap.set(splitTitle.chars, { opacity: 0, y: 100, rotateX: 90 });

          gsap.to(splitTitle.chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Animate project cards
        const cards = gridRef.current?.querySelectorAll(".project-card");
        if (cards) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 80, scale: 0.8 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 90%",
                end: "bottom 50%",
                toggleActions: "play none none reset",
              },
            }
          );

          // Add hover animations for cards
          cards.forEach((card) => {
            const img = card.querySelector("img");
            const overlay = card.querySelector(".project-overlay");

            const handleEnter = () => {
              gsap.to(img, { scale: 1.1, duration: 0.6, ease: "power3.out" });
              gsap.to(overlay, { opacity: 1, duration: 0.3 });
              gsap.to(card, { y: -10, duration: 0.4, ease: "power3.out" });
            };

            const handleLeave = () => {
              gsap.to(img, { scale: 1, duration: 0.6, ease: "power3.out" });
              gsap.to(overlay, { opacity: 0, duration: 0.3 });
              gsap.to(card, { y: 0, duration: 0.4, ease: "power3.out" });
            };

            card.addEventListener("mouseenter", handleEnter);
            card.addEventListener("mouseleave", handleLeave);

            hoverCleanups.push(() => {
              card.removeEventListener("mouseenter", handleEnter);
              card.removeEventListener("mouseleave", handleLeave);
            });
          });
        }
      }, sectionRef);
    };

    run();

    return () => {
      isMounted = false;
      hoverCleanups.forEach((dispose) => dispose());
      splitTitle?.revert();
      ctx?.revert();
    };
  }, []);

  return (
    <section id="projects" className="py-20 lg:py-32" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2
            ref={titleRef}
            className="brutalist-heading text-4xl md:text-6xl mb-6"
          >
            SELECTED
            <br />
            <span className="electric-text">PROJECTS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl fade-in-up stagger-1">
            A collection of projects showcasing my expertise in full-stack
            development, AI integration, and modern web technologies.
          </p>
        </div>

        <div className="brutalist-grid" ref={gridRef}>
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card brutalist-card group cursor-pointer overflow-hidden relative"
            >
              <div className="aspect-video overflow-hidden bg-muted relative">
                <Image
                  width={650}
                  height={650}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="project-overlay absolute inset-0 bg-foreground/80 opacity-0 flex items-center justify-center">
                  <div className="text-background text-center">
                    <p className="font-grotesk font-bold text-lg mb-4">
                      VIEW PROJECT
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Link
                        href={project.github}
                        target="_blank"
                        className="p-3 bg-background text-foreground rounded hover:bg-accent transition-colors"
                      >
                        <Github size={20} />
                      </Link>
                      <Link
                        href={project.live}
                        target="_blank"
                        className="p-3 bg-background text-foreground rounded hover:bg-accent transition-colors"
                      >
                        <ExternalLink size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-grotesk font-bold text-xl uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={project.github}
                      target="_blank"
                      className="p-2 hover:text-accent transition-colors"
                    >
                      <Github size={20} />
                    </Link>
                    <Link
                      href={project.live}
                      target="_blank"
                      className="p-2 hover:text-accent transition-colors"
                    >
                      <ExternalLink size={20} />
                    </Link>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="font-mono text-xs uppercase tracking-wide px-3 py-1 border border-foreground/20 bg-muted/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
