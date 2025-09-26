import { Button } from "~/components/ui/button";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Marquee from "react-fast-marquee";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const handleEmailClick = () => {
    window.open("mailto:fwwz.dev.id@gmail.com", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+6289529050802", "_blank");
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const title = new SplitType(titleRef.current, {
        types: "words,chars",
      });
      const chars = title.chars;
      // Animate title
      gsap.fromTo(
        chars,
        { opacity: 0, scale: 0.8, rotateX: 45 },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "-10% 80%",
            end: "50% 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate buttons
      const buttons = buttonsRef.current?.querySelectorAll("button");
      if (buttons) {
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
              trigger: buttonsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Add hover animations
        buttons.forEach((button) => {
          button.addEventListener("mouseenter", () => {
            gsap.to(button, { scale: 1.05, duration: 0.3, ease: "power2.out" });
          });
          button.addEventListener("mouseleave", () => {
            gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="py-20 lg:py-32" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            ref={titleRef}
            className="brutalist-heading text-5xl md:text-7xl lg:text-8xl mb-8"
          >
            <span>LET'S WORK</span>
            <br />
            <span className="electric-text">TOGETHER</span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 fade-in-up stagger-1">
            Ready to bring your vision to life? Let's discuss your next project
            and create something exceptional together.
          </p>

          {/* Contact Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              onClick={handleEmailClick}
              variant="default"
              size="lg"
              className="brutalist-card bg-foreground text-background hover:bg-foreground/90 font-grotesk uppercase tracking-wide px-8 py-4 text-lg group"
            >
              <Mail className="mr-2 group-hover:scale-110 transition-transform" />
              Email Me
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={16}
              />
            </Button>

            <Button
              onClick={handleWhatsAppClick}
              variant="outline"
              size="lg"
              className="brutalist-card border-2 border-foreground bg-background hover:bg-foreground hover:text-background font-grotesk uppercase tracking-wide px-8 py-4 text-lg group"
            >
              <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" />
              WhatsApp
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={16}
              />
            </Button>
          </div>

          {/* Availability Marquee */}
          <div className="bg-foreground text-background py-4 -mx-6">
            <Marquee
              speed={50}
              gradient={false}
              pauseOnHover={false}
              className="font-grotesk font-bold text-lg uppercase tracking-widest"
            >
              <span className="mx-8">AVAILABLE FOR PROJECTS •</span>
              <span className="mx-8">OPEN TO COLLABORATE •</span>
              <span className="mx-8">READY TO BUILD •</span>
              <span className="mx-8">LET'S CREATE TOGETHER •</span>
              <span className="mx-8">CRAFTING DIGITAL EXPERIENCES •</span>
              <span className="mx-8">TURNING IDEAS INTO REALITY •</span>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
