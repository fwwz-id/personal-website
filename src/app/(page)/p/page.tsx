"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import BlackAndWhiteImage from "@/public/pexels-tom-fisk.webp";
import ScrollSmooth from "../../(misc)/components/ScrollSmooth";
import { useScramble } from "use-scramble";
import useAnimation from "./useAnimation";

const ExternalLinkIcon = () => (
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
);

const Page = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { ref: introRef, replay: introScramble } = useScramble({
    text: "coding whiz 😎",
    speed: 0.5,
    tick: 4,
    step: 3,
    seed: 10,
    scramble: 20,
    overdrive: false,
    overflow: false,
    ignore: [" "],
  });

  useAnimation({
    container: containerRef.current!,
  });

  useEffect(() => {
    introScramble();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollSmooth
      options={{
        lerp: 0.045,
      }}
    >
      <div
        ref={containerRef}
        className="container-st font-mono !overflow-y-hidden"
      >
        <div className="px-4 container mx-auto py-12 mt-32">
          <p className="intro font-bold text-4xl sm:text-7xl mt-12 opacity-0">
            I&apos;m a [<span ref={introRef}></span>] from Indonesia.
          </p>
          <p className="next-intro text-xl sm:text-5xl mt-12 opacity-0">
            I do Front-end, Back-end, Week-end, and other stuff.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <Image
            className="bw-img w-8/12 h-[500px] md:h-full md:max-h-[800px] object-cover mx-auto my-12 opacity-0 grayscale"
            src={BlackAndWhiteImage}
            alt="Photo by Tom Fisk: https://www.pexels.com/photo/aerial-view-of-cityscape-2116721/"
            priority
          />
          <div className="container mx-auto px-4">
            <p className="location max-w-fit text-xs sm:text-lg relative opacity-0 text-white">
              Jakarta, Indonesia.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 mt-12">
          <p className="split split-1 relative overflow-hidden text-xl sm:text-5xl mt-12">
            I&apos;m a college student constantly feeding my brain with new
            knowledge. Right now, I&apos;m diving deep into the world of Machine
            Learning and C programming, but I&apos;m always up for learning new
            &quot;other stuff.&quot;
          </p>
          <p className="split split-2 relative overflow-hidden text-xl sm:text-5xl mt-12">
            Still rocking the college life, but when I&apos;m not hitting the
            books, I&apos;m building awesome stuff online.
          </p>

          <div className="relative overflow-hidden w-fit">
            <span className="highlight highlight-0 h-2 bg-sky-400 inline-block absolute bottom-1 left-0" />
            <p className="split split-3 font-bold text-xl sm:text-5xl mt-12 w-fit">
              ✨ Pick Your Poison, I&apos;ll Code the Cure. ✨
            </p>
          </div>

          <p className="split split-4 relative overflow-hidden text-xl sm:text-5xl mt-12">
            I don&apos;t care much in tools, as long as it suitable and can
            achieve the goal, It does not really matter.
          </p>

          <div className="relative overflow-hidden w-fit">
            <span className="highlight highlight-1 h-2 bg-teal-400 inline-block absolute bottom-1 left-0" />
            <p className="split split-5 font-bold text-xl sm:text-5xl mt-12 w-fit">
              ✨ My Online Ramblings. ✨
            </p>
          </div>

          <div
            className="card shadow-xl space-y-4 max-w-xs my-12 p-4 sm:max-w-md opacity-0 cursor-pointer backdrop-blur-md"
            onClick={() =>
              window.open(
                "https://medium.com/@fwwz.id/build-react-and-websocket-abcfd17b84ce",
                "_blank"
              )
            }
          >
            <div className="flex gap-x-1">
              <p className="font-bold text-xl sm:text-3xl max-w-72 sm:max-w-max truncate">
                Build React and Websocket
              </p>
              <ExternalLinkIcon />
            </div>

            <div>
              <p className="line-clamp-3">
                In this article, I&apos;m going to create React app that
                connects to Coinbase API using WebSocket. This final project is
                available on my repo, don&apos;t forget to give it a star and
                fork it if you like, or you can see the lives demo here.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden w-fit">
            <span className="highlight highlight-2 h-2 bg-purple-400 inline-block absolute bottom-1 left-0" />
            <p className="split split-6 font-bold text-xl sm:text-5xl mt-12 w-fit">
              ✨ My Projects. ✨
            </p>
          </div>

          <p className="split split-7 relative overflow-hidden text-xl sm:text-5xl mt-12">
            Looks like my trophy cabinet is a little bare! No past projects to
            show off just yet, <strong>BUT...</strong> why not build something
            epic together?
          </p>

          <p className="split split-8 relative overflow-hidden text-xl sm:text-5xl mt-12 pb-24">
            If you need a skilled developer who&apos;s also a blast to work
            with, hit me up! Let&apos;s chat about your project and see how I
            can help make it awesome.
          </p>
        </div>

        <div className="footer py-12 px-4">
          <ul className="container mx-auto font-bold space-y-2">
            <li
              className="flex gap-x-2 cursor-pointer"
              onClick={() =>
                window.open("https://www.github.com/fwwz-id", "_blank")
              }
            >
              Github <ExternalLinkIcon />
            </li>
            <li
              className="flex gap-x-2 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/fawwaz-abdurrahim-07153b247/",
                  "_blank"
                )
              }
            >
              LinkedIn <ExternalLinkIcon />
            </li>
          </ul>
        </div>
      </div>
    </ScrollSmooth>
  );
};

export default Page;
