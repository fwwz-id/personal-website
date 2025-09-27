import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const skills = [
    "TypeScript",
    "Python",
    "Go",
    "React",
    "Next.js",
    "Node.js",
    "AI/ML",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "GCP",
    "Web3",
    "GraphQL",
    "REST APIs",
  ];

  const timeline = [
    {
      year: "2025",
      role: "SaaS Entrepreneur",
      company: "Independent Projects",
      description:
        "Building next-generation SaaS applications with AI integration",
    },
    {
      year: "2023",
      role: "Senior Full-Stack Developer",
      company: "RWID Technology",
      description:
        "Led development of enterprise applications and AI-powered solutions",
    },
    {
      year: "2019",
      role: "Creative Developer",
      company: "Artopologi",
      description:
        "Crafted digital experiences and interactive web applications",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let ctx: gsap.Context | undefined;
    let isMounted = true;
    let splitTitle: SplitType | undefined;
    const skillHoverCleanups: Array<() => void> = [];

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

          gsap.set(splitTitle.chars, { opacity: 0, y: 80, rotateY: 90 });

          gsap.to(splitTitle.chars, {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Animate skills with stagger
        const skillTags = skillsRef.current?.querySelectorAll("span");
        if (skillTags) {
          gsap.fromTo(
            skillTags,
            { opacity: 0, scale: 0.8, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: skillsRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Add hover animations to skill tags
          skillTags.forEach((tag) => {
            const handleEnter = () => {
              gsap.to(tag, { scale: 1.1, duration: 0.3, ease: "power2.out" });
            };
            const handleLeave = () => {
              gsap.to(tag, { scale: 1, duration: 0.3, ease: "power2.out" });
            };

            tag.addEventListener("mouseenter", handleEnter);
            tag.addEventListener("mouseleave", handleLeave);

            skillHoverCleanups.push(() => {
              tag.removeEventListener("mouseenter", handleEnter);
              tag.removeEventListener("mouseleave", handleLeave);
            });
          });
        }

        // Animate timeline items
        const timelineItems =
          timelineRef.current?.querySelectorAll(".timeline-item");
        if (timelineItems) {
          gsap.fromTo(
            timelineItems,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }, sectionRef);
    };

    run();

    return () => {
      isMounted = false;
      skillHoverCleanups.forEach((dispose) => dispose());
      splitTitle?.revert();
      ctx?.revert();
    };
  }, []);

  return (
    <section id="about" className="py-20 lg:py-32 bg-muted/30" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - About */}
          <div>
            <h2
              ref={titleRef}
              className="brutalist-heading text-4xl md:text-6xl mb-8"
            >
              CREATIVE
              <br />
              <span className="electric-text">PROBLEM SOLVER</span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed fade-in-up stagger-1">
              <p>
                I'm a creative developer who bridges the gap between design and
                technology. With expertise in full-stack development and AI
                integration, I craft digital experiences that are both beautiful
                and functional.
              </p>

              <p>
                My journey spans from creative agencies to enterprise tech,
                always focusing on pushing boundaries and delivering exceptional
                user experiences. Currently, I'm building innovative SaaS
                solutions that leverage cutting-edge AI technologies.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-12">
              <h3 className="font-grotesk font-bold text-xl uppercase tracking-tight mb-6">
                Tech Stack
              </h3>
              <div ref={skillsRef} className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="font-mono text-sm uppercase tracking-wide px-4 py-2 bg-background border border-foreground/20 hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div>
            <h3 className="font-grotesk font-bold text-xl uppercase tracking-tight mb-8">
              Professional Journey
            </h3>

            <div ref={timelineRef} className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item relative">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-foreground text-background flex items-center justify-center brutalist-card font-grotesk font-bold text-sm">
                      {item.year}
                    </div>

                    <div className="flex-grow">
                      <h4 className="font-grotesk font-bold text-lg uppercase tracking-tight mb-1">
                        {item.role}
                      </h4>
                      <p className="text-accent font-medium mb-2">
                        {item.company}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {index < timeline.length - 1 && (
                    <div className="ml-8 mt-4 h-8 w-0.5 bg-foreground/20"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
