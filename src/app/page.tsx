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
          .to(".gsap-opac", { opacity: 1, stagger: 0.2 }),
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

      <div className="flex items-center gap-x-5 absolute bottom-10 font-extrabold text-2xl">
        <Links gltl={gltl} />

        <div
          className="gsap-opac opacity-0 flex items-center justify-center gap-x-4 border rounded-full px-3 py-2 cursor-pointer border-opacity-20 border-stone-800 dark:border-white"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/fawwaz-abdurrahim-07153b247/",
              "_blank"
            )
          }
        >
          <div className="relative h-2">
            <div className="absolute w-0.5 p-1 bg-green-500 animate-ping rounded-full" />
            <div className="absolute w-0.5 p-1 bg-green-500 rounded-full" />
          </div>
          <p className="font-mono text-xs flex gap-x-2">
            open to work
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                d="M9 15v3c0 .943 0 1.414-.293 1.707C8.414 20 7.943 20 7 20H6c-.943 0-1.414 0-1.707-.293C4 19.414 4 18.943 4 18v-1c0-.943 0-1.414.293-1.707C4.586 15 5.057 15 6 15zm6-11h5v5m0-5L9 15"
              ></path>
            </svg>
          </p>
        </div>
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
        className="gsap-opac opacity-0 duration-300 cursor-pointer"
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
