"use client";

import { useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";

type UseAnimationProps = {
  container: HTMLElement;
};

const useAnimation = ({ container }: UseAnimationProps) => {
  useEffect(() => {
    let context: gsap.Context | null = null;

    let splits = gsap.utils.toArray(".split") as HTMLElement[];
    let highglight = gsap.utils.toArray(".highlight") as HTMLElement[];

    splits.forEach((_, i) => {
      new SplitType(`.split-${i + 1}`, {
        split: "lines,words",
        lineClass: "relative overflow-hidden pb-1",
        wordClass: "word translate-y-[150%]",
      });
    });

    context = gsap.context(() => {
      gsap
        .timeline()
        .to(".intro", {
          opacity: 1,
          delay: 0.5,
          duration: 0.5,
        })
        .to(".next-intro", {
          opacity: 1,
        });

      gsap.to(".bw-img", {
        scrollTrigger: {
          trigger: ".bw-img",
          start: "top center-=200px",
          end: "bottom",
          toggleActions: "play pause resume reset",
          scrub: true,
        },
        opacity: 1,
        scale: 1.5,
        filter: "grayscale(50%)",
        "-webkit-filter": "grayscale(50%)",
        ease: "power2.inOut",
      });

      gsap.to(".location", {
        scrollTrigger: {
          trigger: ".bw-img",
          start: "center+=300 center",
          end: "bottom",
          scrub: true,
        },
        opacity: 1,
      });

      splits.forEach((_, i) => {
        i += 1;

        const isNotEight = i % 8 != 0;
        const isNotSeventh = i % 7 != 0;

        const vars: gsap.TweenVars = {
          duration: 3,
          stagger: 0.1,
          translateY: 0,
          ease: "power2.inOut",
        };

        if (isNotEight && isNotSeventh)
          gsap.to(`.split-${i} .word`, {
            scrollTrigger: {
              trigger: `.split-${i}`,
              start: "top center",
              end: "bottom+=100 center",
              scrub: true,
            },
            ...vars,
          });

        if (isNotEight && !isNotSeventh)
          gsap.to(`.split-${i} .word`, {
            scrollTrigger: {
              trigger: `.split-${i - 1}`,
              start: "top center",
              end: "bottom+=100 center",
              scrub: true,
            },
            ...vars,
          });

        if (!isNotEight && isNotSeventh)
          gsap.to(`.split-${i} .word`, {
            scrollTrigger: {
              trigger: `.split-${i - 1}`,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
            ...vars,
          });
      });

      highglight.forEach((_, i) => {
        gsap.to(`.highlight-${i}`, {
          scrollTrigger: {
            trigger: `.highlight-${i}`,
            start: "bottom center",
            end: "bottom center-=100",
            scrub: true,
          },
          width: "100%",
          duration: 2,
        });
      });

      gsap.to(".card", {
        scrollTrigger: {
          trigger: ".highlight-1",
          start: "top center",
          end: "bottom+=100 center",
          scrub: true,
        },
        autoAlpha: 1,
      });

      gsap.to(".footer", {
        scrollTrigger: {
          trigger: ".footer",
          start: "center center+=200",
          end: "bottom center",
          scrub: true,
        },
        yPercent: -100,
      });
    }, container);

    return () => {
      if (context) context.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAnimation;
