"use client";

import { useEffect } from "react";
import gsap from "gsap";

const Maintenance = () => {
  useEffect(() => {
    let tl: gsap.core.Timeline | null = gsap.timeline().to(["p", "li"], {
      opacity: 1,
      stagger: 0.05,
    });

    return () => {
      tl && tl.revert();
      tl = null;
    };
  }, []);

  return (
    <div
      className="font-mono tracking-wide min-h-screen grid place-items-center"
    >
      <div className="space-y-12 pt-32 sm:pt-0 px-4">
        <p className="font-bold text-center text-2xl opacity-0">
          Website Chillin&apos; Out, Maxin&apos;, Relaxin&apos; All Cool
        </p>
        <div className="text-sm sm:text-lg space-y-4">
          <p className="opacity-0">
            {/* Yo! Looks like our website is taking a <strong>siesta</strong>. */}
            <br />
            This website is currently under construction because <br /> the
            developer is <strong> lazy</strong> and doesn&apos;t feel like
            working on it right now.
          </p>
          {/* <p className="opacity-0">
            While we&apos;re getting things <strong>ship-shape</strong> behind
            the scenes, you could:
          </p>
          <ul className="list-disc pl-6">
            <li className="opacity-0">
              <span className="font-bold">
                Brush up on your meme knowledge.{" "}
              </span>
              <span>(It&apos;s practically a life skill these days.)</span>
            </li>
            <li className="opacity-0">
              <span className="font-bold">Take a walk outside. </span>
              <span>Nature is pretty cool, right?</span>
            </li>
            <li className="opacity-0">
              <span className="font-bold">Check back later! </span>
              <span>
                We&apos;ll be back before you can say &quot;internet
                break.&quot;
              </span>
            </li>
          </ul> */}
          <p className="opacity-0">
            <strong>P.S.</strong> If you&apos;re a developer who is looking for
            work for free, please contact us. <br /> We&apos;re always looking
            for talented people to join our team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
