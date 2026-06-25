"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleBrain from "./ParticleBrain";
import { OriginButton } from "@/components/ui/OriginButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Mutable animation state passed to R3F canvas via ref
  // brainX = fraction of 3D viewport width (+0.15 → -0.15)
  const animState = useRef({
    brainX: 0.15,
    brainY: 0.0,
    brainZ: 0.0,
    brainScale: 0.92,
    rotYOffset: 0.0,
    cameraZ: 3.6,
    cameraX: 0.0,
    cameraY: 0.0,
    lookAtX: 0.0,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const createTimeline = (
        from: Partial<typeof animState.current>,
        to: Partial<typeof animState.current>
      ) => {
        Object.assign(animState.current, from);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: canvasContainerRef.current,
            pinSpacing: false,
            scrub: 0.5,
          },
        });

        tl.to(animState.current, {
          ...to,
          duration: 1,
          ease: "power1.inOut",
        }, 0);

        tl.to(".hero-content", {
          opacity: 0,
          y: -40,
          duration: 0.6,
          ease: "power1.inOut",
        }, 0);

        tl.fromTo(
          ".second-content",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power1.inOut" },
          0.4
        );

        return () => tl.kill();
      };

      mm.add("(min-width: 1024px)", () =>
        createTimeline(
          { brainX: 0.15, brainY: 0, brainScale: 0.92 },
          { brainX: -0.15, brainY: 0, brainScale: 0.92 }
        )
      );

      mm.add("(min-width: 768px) and (max-width: 1023px)", () =>
        createTimeline(
          { brainX: 0.08, brainY: 0.02, brainScale: 0.82 },
          { brainX: -0.08, brainY: 0.02, brainScale: 0.82 }
        )
      );

      mm.add("(max-width: 767px)", () =>
        createTimeline(
          { brainX: 0, brainY: -0.18, brainScale: 0.62 },
          { brainX: 0, brainY: 0.12, brainScale: 0.68 }
        )
      );

      return () => mm.revert();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-white p-1.5 sm:p-2.5">
      <div
        id="hero-section"
        ref={containerRef}
        className="relative mx-auto h-[180svh] w-full max-w-[100vw] overflow-hidden rounded-xl bg-[#001427] sm:h-[190svh] lg:h-[180vh]"
      >
        {/* Pinned canvas layer */}
        <div
          ref={canvasContainerRef}
          className="absolute left-0 top-0 z-0 h-svh w-full overflow-hidden pointer-events-none"
        >
          <div className="absolute inset-0 h-full w-full">
            <ParticleBrain animState={animState} />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,20,39,0)_0%,rgba(0,20,39,0.2)_45%,rgba(0,20,39,0.85)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#001427] via-[#001427]/60 to-transparent" />
        </div>

        {/* Scrolling text content */}
        <div className="relative z-10 mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-[max(32px,4vw)]">
          {/* Section 1: Text Left, Brain Right */}
          <section className="pointer-events-none flex min-h-svh w-full select-text flex-col items-center justify-center py-20 text-center sm:py-24 lg:items-start lg:text-left">
            <div className="hero-content pointer-events-auto flex w-full flex-col items-center justify-start rounded-3xl bg-[#001427]/35 p-4 backdrop-blur-[1px] sm:p-6 lg:w-[42%] lg:max-w-lg lg:items-start lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
              <h1 className="mb-5 text-[clamp(3.25rem,15vw,5.5rem)] font-black leading-[0.94] tracking-[-0.06em] text-white sm:text-[clamp(4.5rem,11vw,6rem)] lg:mb-6.5 lg:text-[clamp(4.75rem,7.2vw,5.875rem)]">
                Automate.
                <br />
                Scale.
                <br />
                Dominate.
              </h1>

              <div className="mb-4 max-w-104 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#4aa3ff] sm:text-[10.5px] lg:mb-5 lg:text-[#1D6ACF]">
                Transform Your Business with Intelligent AI Solutions
              </div>

              <p className="mb-7 max-w-lg text-sm leading-[1.7] text-white/75 sm:text-[15px] lg:mb-8.5 lg:max-w-none lg:text-white/68">
                Unlock new levels of efficiency, innovation, and customer satisfaction through EdFoal AI&apos;s cutting-edge, custom-tailored AI services. Let us help you evolve with the power of AI.
              </p>

              <div className="inline-flex h-11 w-full max-w-52 items-center justify-center rounded-full sm:h-10 sm:w-50">
                <OriginButton
                  className="h-full w-full rounded-full border px-0 text-xs font-semibold sm:text-sm"
                  style={{
                    "--ic-card": "#001427",
                    "--ic-card-foreground": "#ffffff",
                    "--ic-border": "#ffffff",
                    "--ic-foreground": "#ffffff",
                    "--ic-background": "#001427",
                  } as React.CSSProperties}
                  onClick={() => {
                    const contactElem = document.getElementById("contact");
                    if (contactElem) {
                      contactElem.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Start Your AI Journey
                </OriginButton>
              </div>
            </div>
          </section>

          {/* Section 2: Brain Left, New Content Right */}
          <section className="pointer-events-none -mt-24 flex min-h-[75svh] w-full select-text items-center justify-center pb-20 text-center sm:-mt-28 sm:min-h-[70svh] lg:-mt-30 lg:justify-end lg:text-left">
            <div className="second-content pointer-events-auto flex w-full max-w-120 flex-col justify-center rounded-3xl bg-[#001427]/45 p-4 backdrop-blur-[1px] sm:p-6 lg:max-w-110 lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
              <h2 className="mb-5 text-[clamp(2.25rem,10vw,3.25rem)] font-black leading-[1.02] tracking-[-0.06em] text-white sm:text-[clamp(2.75rem,6vw,3.25rem)] lg:mb-5.5">
                Make decisions
                <br />
                with confidence
              </h2>

              <p className="mx-auto max-w-88 text-sm leading-[1.7] text-white/75 sm:text-[15px] lg:mx-0 lg:text-white/68">
                Efoal&apos;s bleeding-edge AI search tool automates extracting
                knowledge from across your organisation so that you can take the
                guesswork out of your work.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
