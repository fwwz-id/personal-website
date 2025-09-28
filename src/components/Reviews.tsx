import { Quote, Star } from "lucide-react";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import testimonials from "~/content/testimonials";

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          rotateX: 45,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate review cards
      const cards = reviewsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          {
            opacity: 0,
            y: 80,
            rotateX: 45,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: reviewsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Counter animation for Projects
      if (projectsRef.current) {
        const target = 50; // final Projects count
        const counter = { value: 0 };

        ScrollTrigger.create({
          trigger: projectsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              value: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                if (projectsRef.current) {
                  projectsRef.current.textContent = `${Math.floor(counter.value)}+`;
                }
              },
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
      className="py-24 bg-muted/30 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, hsl(var(--accent) / 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, hsl(var(--accent) / 0.03) 0%, transparent 50%),
              var(--noise)
            `,
            backgroundSize: "400px 400px, 300px 300px, 200px 200px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="brutalist-heading text-4xl md:text-6xl lg:text-7xl mb-6"
          >
            CLIENT <span className="electric-text">REVIEWS</span>
          </h2>
          <div className="h-1 w-24 bg-foreground mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take my word for it. Here&apos;s what my clients say about
            working together.
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          ref={reviewsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="brutalist-card p-8 bg-background relative group hover:scale-105 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Quote size={16} className="text-background" />
              </div>

              {/* Stars */}
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 font-grotesk leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Author Info */}
              <div className="border-t-2 border-foreground pt-4">
                <div className="font-bold text-foreground font-grotesk uppercase tracking-wide">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role
                    ? `${testimonial.role} at ${testimonial.company} (${testimonial.posted} client)`
                    : `${testimonial.company} (${testimonial.posted} client)`}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div
                ref={projectsRef}
                className="text-3xl md:text-4xl font-bold text-accent font-mono"
              >
                50+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent font-mono">
                5.0
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Avg Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent font-mono">
                100%
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Satisfied
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
