import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "SAAS DASHBOARD",
      description:
        "Full-stack SaaS platform with AI-powered analytics and real-time data visualization.",
      tech: ["React", "Node.js", "PostgreSQL", "AI/ML"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      github: "#",
      live: "#",
    },
    {
      title: "AI CHAT INTERFACE",
      description:
        "Modern chat application with custom AI models and real-time messaging capabilities.",
      tech: ["TypeScript", "Python", "WebSocket", "OpenAI"],
      image:
        "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop&crop=center",
      github: "#",
      live: "#",
    },
    {
      title: "E-COMMERCE PLATFORM",
      description:
        "Headless e-commerce solution with advanced search and payment integration.",
      tech: ["Next.js", "Stripe", "GraphQL", "Prisma"],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
      github: "#",
      live: "#",
    },
    {
      title: "MOBILE FINTECH APP",
      description:
        "Cross-platform financial application with biometric authentication and real-time transactions.",
      tech: ["Kotlin", "React Native", "Firebase", "Blockchain"],
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center",
      github: "#",
      live: "#",
    },
    {
      title: "DATA VISUALIZATION TOOL",
      description:
        "Interactive dashboard for complex data analysis with custom charting solutions.",
      tech: ["D3.js", "Python", "FastAPI", "Docker"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      github: "#",
      live: "#",
    },
    {
      title: "BLOCKCHAIN EXPLORER",
      description:
        "Real-time blockchain data explorer with advanced search and analytics features.",
      tech: ["Web3", "Ethereum", "React", "Node.js"],
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&crop=center",
      github: "#",
      live: "#",
    },
  ];

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
                <img
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
                      <button className="p-3 bg-background text-foreground rounded hover:bg-accent transition-colors">
                        <Github size={20} />
                      </button>
                      <button className="p-3 bg-background text-foreground rounded hover:bg-accent transition-colors">
                        <ExternalLink size={20} />
                      </button>
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
                    <button className="p-2 hover:text-accent transition-colors">
                      <Github size={20} />
                    </button>
                    <button className="p-2 hover:text-accent transition-colors">
                      <ExternalLink size={20} />
                    </button>
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
