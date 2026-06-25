'use client'

import React from "react";
import { SplineScene } from "@/components/ui/Splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/Spotlight";

interface RobotHeroProps {
  kicker?: string;
  title: React.ReactNode;
  subtitle: string | React.ReactNode;
  id?: string;
}

export function RobotHero({ kicker, title, subtitle, id }: RobotHeroProps) {
  return (
    <section
      id={id}
      className="relative h-full w-full overflow-hidden bg-white p-1.5 sm:p-2.5"
    >
      <div className="mx-auto w-full max-w-[100vw]">
        {/* 3D Spline Card */}
        <Card
          className="relative h-auto w-full overflow-hidden rounded-xl border-white/10 border-b-0 bg-[#001427] mask-[linear-gradient(to_bottom,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
        >
          {/* Static ultra-smooth gradient overlay to blend card with background */}
          <div className="absolute items-center bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white via-white/50 to-transparent pointer-events-none z-20" />
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20 "
            fill="white"
            />

            <div className="relative mx-auto flex min-h-160 w-full max-w-360 flex-col items-center sm:min-h-170 lg:min-h-140 lg:flex-row">
              {/* Left content */}
            <div className="relative z-10 flex w-full flex-col justify-center px-5 pb-8 pt-20 text-center sm:px-8 sm:pb-10 sm:pt-24 md:px-10 lg:w-[45%] lg:px-0 lg:py-18 lg:pr-8 lg:text-left">
                {kicker && (
                  <div className="text-xs font-semibold tracking-widest text-purple-400 uppercase mb-4">
                  {kicker}
                  </div>
                )}
                <h3 className="mb-4 mt-8 bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-5xl md:text-6xl lg:mt-0 lg:text-6xl">
                {title}
                </h3>

              <div className="mx-auto max-w-xl space-y-4 text-base leading-relaxed text-neutral-400 md:text-lg lg:mx-0">
                {typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
                </div>
            </div>

            {/* Right content — 3D Spline Scene */}
            <div className="relative flex h-80 w-full items-center justify-center overflow-visible sm:h-90 md:h-105 lg:h-137.5 lg:w-[55%]">
              <div className="absolute flex h-[130%] w-[150%] origin-center scale-[0.78] items-center justify-center sm:scale-[0.72] md:scale-[0.65] lg:scale-[0.7]">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
            </div>
        </Card>
      </div>
    </section>
  );
}
