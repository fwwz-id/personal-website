import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";

import about from "~/content/about";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { skills, timeline } = about;

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
                I&apos;m a creative developer who bridges the gap between design and
                technology. With expertise in full-stack development and AI
                integration, I craft digital experiences that are both beautiful
                and functional.
              </p>

              <p>
                My journey spans from creative agencies to enterprise tech,
                always focusing on pushing boundaries and delivering exceptional
                user experiences. Currently, I&apos;m building innovative SaaS
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
                    <div className="flex-shrink-0 w-20 h-20 bg-foreground text-background flex flex-col items-center justify-center brutalist-card font-grotesk font-bold text-xs">
                      <span>{item.startYear}</span>
                      <span className="text-[8px] opacity-60">-</span>
                      <span className="text-[10px]">{item.endYear}</span>
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-grotesk font-bold text-lg uppercase tracking-tight">
                          {item.role}
                        </h4>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 bg-accent/20 text-accent rounded font-mono uppercase tracking-wide">
                            {item.workType}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-3">
                        <p className="text-accent font-medium">
                          {item.company}
                        </p>
                        <span className="hidden sm:block text-muted-foreground">
                          •
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {item.location}
                        </p>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="space-y-2">
                        {item.achievements.map(
                          (achievement, achievementIndex) => (
                            <div
                              key={achievementIndex}
                              className="flex items-start gap-2 text-sm text-foreground/80"
                            >
                              <span className="w-1 h-1 bg-accent rounded-full mt-2.5 flex-shrink-0"></span>
                              <span>{achievement}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {index < timeline.length - 1 && (
                    <div className="absolute left-10 top-14 w-0.5 h-full bg-gradient-to-b from-foreground/10 to-transparent"></div>
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
