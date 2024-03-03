"use client";

import { useEffect, useRef } from "react";
import { useScramble } from "use-scramble";
import gsap from "gsap";

const Page = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const gctx = useRef<gsap.Context | null>(null);
  const gltl = useRef<gsap.core.Timeline | null>(null);

  const { ref: introRef, replay: introReplay } = useScramble({
    text: `I'm a [developer] based in Indonesia`,
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 10,
    chance: 0.8,
    overdrive: false,
    playOnMount: false,
  });

  const { ref: copyRef, replay: copyReplay } = useScramble({
    text: `I do Front-end, Back-end, No-end, Week-end, and other stuff.
        <br />
        <br />
        This website is currently under construction because
        the developer is <b>lazy</b> and doesn't feel like working on it right now.
    `,
    speed: 0.8,
    tick: 2,
    overdrive: false,
    overflow: false,
    scramble: 20,
    playOnMount: false,
    ignore: [" ", "<", ">", "/"],
  });

  const { ref: noteRef, replay: noteReply } = useScramble({
    text: `<b>P.S.</b> If you&apos;re a designer who is looking
    for work for free, please contact us. <br /> We&apos;re always
    looking for talented people to join our team.
    `,
    speed: 1,
    tick: 4,
    overdrive: false,
    overflow: false,
    scramble: 50,
    playOnMount: false,
    ignore: [" ", "<", ">", "/"],
  });

  useEffect(() => {
    gctx.current = gsap.context(() => {
      gltl.current = gsap
        .timeline({ delay: 0.8 })
        .to(".box", {
          width: "100%",
        })
        .to(".box", {
          height: "auto",
        })
        .call(introReplay, [], ">-0.25")
        .call(copyReplay)
        .call(noteReply)
        .to(contentRef.current, {
          opacity: 1,
        });
    }, containerRef.current!);

    return () => {
      gctx.current?.revert();
      gctx.current = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="font-mono container mx-auto">
      <div className="px-4 py-8">
        <div className="max-w-7xl mt-32">
          <div className="box w-0 h-0 bg-white bg-opacity-5 shadow-md p-6 rounded-md backdrop-blur-sm">
            <div ref={contentRef} className="opacity-0">
              <h1
                ref={introRef}
                className="font-bold text-4xl sm:text-7xl py-12 sm:mb-6"
              ></h1>
              <p ref={copyRef} className="text-2xl" />

              <br />

              <p ref={noteRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
