"use client";

import { type MutableRefObject, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import SplitType from "split-type";

import CircularText from "./(misc)/components/CircularText/CircularText";
import { useScramble } from "use-scramble";

export default function Home() {
  let gltl = useRef<gsap.core.Timeline | null>(null);

  const { ref: nameRef, replay: onNameScramble } = useScramble({
    text: "Fawwaz Abdurrahim.",
    speed: 1,
    step: 2,
    tick: 2,
    scramble: 30,
    overdrive: false,
    playOnMount: false,
  });

  const { ref: codingRef, replay: onCodingScramble } = useScramble({
    text: "coding,",
    speed: 1,
    step: 2,
    tick: 1,
    scramble: 10,
    overdrive: true,
    playOnMount: false,
  });

  const { ref: knowledgeRef, replay: onKnowledgeScramble } = useScramble({
    text: "knowledge",
    speed: 1,
    step: 2,
    tick: 1,
    scramble: 10,
    overdrive: true,
    playOnMount: false,
  });

  const { ref: randomRef, replay: onRandomScramble } = useScramble({
    text: "random stuff.",
    speed: 1,
    step: 2,
    tick: 1,
    scramble: 10,
    overdrive: true,
    playOnMount: false,
  });

  useEffect(() => {
    const greet = new SplitType(".greet");

    gltl.current = gsap
      .timeline()
      .add(
        gsap
          .timeline({
            id: "seq-1",
          })
          .to([".muter-muter", ".greet"], {
            opacity: 1,
            stagger: 0.2,
            duration: 0.25,
          })
      )
      .add(
        gsap.timeline({ id: "seq-2" }).to(greet.chars, {
          y: 0,
          stagger: 0.15,
          duration: 2,
          ease: "elastic.out(1,0.5)",
        })
      )
      .add(
        gsap
          .timeline({
            id: "seq-3",
            onStart: () => {
              onNameScramble();
            },
          })
          .to(".words", {
            y: 0,
            stagger: 0.1,
          })
          .to(".lines", {
            width: "100%",
            stagger: 0.15,
          })
          .to(".link", { opacity: 1, stagger: 0.2 }),
        ">-2.5"
      );

    return () => {
      gltl.current && gltl.current.revert();
      gltl.current = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container relative mx-auto min-h-screen font-serif font-bold flex justify-center flex-col px-6 md:pl-24">
      <CircularText
        text="• FAWWAZ • ABDURRAHIM"
        className="muter-muter opacity-0 top-36 sm:top-12 h-32 w-32 sm:h-52 sm:w-52 font-serif"
      />

      <CircularText
        text="• BERDIRI SEJAK • TIDAK DAPAT KURSI"
        className="muter-muter opacity-0 bottom-4 right-12 h-32 w-32 sm:h-52 sm:w-52 !text-sm sm:!text-2xl font-serif"
      />

      <h1 className="relative overflow-hidden text-6xl/relaxed sm:text-8xl/relaxed">
        <div className="greet">Hi Folks,</div>
      </h1>
      <div className="font-sans font-normal text-sm/relaxed sm:text-2xl/relaxed">
        <p className="space-x-2 relative overflow-hidden">
          <span className="words inline-block translate-y-9">I&apos;m</span>
          <span className="font-mono group relative z-10">
            <span
              ref={nameRef}
              className="words inline-block translate-y-9"
              onMouseOver={onNameScramble}
            >
              Fawwaz Abdurrahim.
            </span>
            <span className="lines absolute h-1 sm:h-2 -z-10 bottom-1 left-0 bg-red-400 group-hover:h-full duration-500" />
          </span>
        </p>
        <p className="relative overflow-hidden">
          <span className="words inline-block translate-y-16">
            Welcome to my little corner of the internet.
          </span>
        </p>
        <p className="relative overflow-hidden">
          <span className="words inline-block translate-y-16">
            This website is a space where I showcase my passion for
          </span>
        </p>
        <p className="relative overflow-hidden space-x-2 md:!space-x-2">
          <span className="relative group overflow-hidden z-10">
            <span
              ref={codingRef}
              onMouseOver={onCodingScramble}
              className="font-mono words inline-block translate-y-16"
            >
              coding,
            </span>
            <span className="lines absolute h-1 sm:h-2 -z-10 bottom-1 left-0 bg-sky-400 group-hover:h-full duration-500" />
          </span>
          <span className="words inline-block translate-y-16">share my</span>
          <span className="relative group overflow-hidden z-10">
            <span
              ref={knowledgeRef}
              onMouseOver={onKnowledgeScramble}
              className="font-mono words inline-block translate-y-16"
            >
              knowledge
            </span>
            <span className="lines absolute h-1 sm:h-2 -z-10 bottom-1 left-0 bg-fuchsia-400 group-hover:h-full duration-500" />
          </span>

          <span className="words inline-block translate-y-16">, and</span>
          <span className="relative group z-10 !ml-0">
            <span
              ref={randomRef}
              onMouseOver={onRandomScramble}
              className="font-mono words inline-block translate-y-16"
            >
              random stuff.
            </span>
            <span className="lines absolute h-1 sm:h-2 -z-10 bottom-1 left-0 bg-teal-400 group-hover:h-full duration-500" />
          </span>
        </p>
      </div>

      <div className="absolute bottom-10 font-extrabold text-2xl">
        <Links gltl={gltl} />
      </div>
    </div>
  );
}

const Links = ({
  gltl,
}: {
  gltl: MutableRefObject<gsap.core.Timeline | null>;
}) => {
  const { ref, replay } = useScramble({
    text: "Explore",
    scramble: 15,
    playOnMount: false,
  });

  const router = useRouter();

  return (
    <ul className="relative font-normal flex gap-x-6 text-sm sm:text-xl">
      <li
        className="link opacity-0 duration-300 cursor-pointer"
        onClick={() => {
          replay();

          gltl
            .current!.timeScale(1.25)
            .reverse()
            .then(() => router.push("/p"));
        }}
      >
        <p ref={ref} className="font-mono" />
      </li>
    </ul>
  );
};
