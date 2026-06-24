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
      className="w-full h-full relative overflow-hidden bg-white"
      style={{ padding: "10px 10px 0px 10px" }}
    >
      <div
        className="w-full mx-auto"
        style={{ maxWidth: "1460px" }}
      >
        {/* 3D Spline Card */}
        <Card 
          className="w-full h-auto bg-black/[0.96] relative overflow-hidden border-white/10 border-b-0 rounded-b-none"
          style={{
            maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"
          }}
        >
          {/* Static ultra-smooth gradient overlay to blend card with background */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-20" />
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex flex-col lg:flex-row min-h-[300px] md:min-h-[400px] lg:min-h-[450px] w-full relative items-center">
            {/* Left content */}
            <div className="w-full lg:w-[45%] p-6 md:p-8 relative z-10 flex flex-col justify-center lg:ml-12" style={{ margin: "0 0 5rem 5rem" }}>
              {kicker && (
                <div className="text-xs font-semibold tracking-widest text-purple-400 uppercase mb-4">
                  {kicker}
                </div>
              )}
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight mb-4 mt-6 lg:mt-8" style={{ margin: "2rem 0 1rem 0" }}>
                {title}
              </h3>

              <div className="space-y-4 text-neutral-400 max-w-xl text-base md:text-lg leading-relaxed">
                {typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
              </div>
            </div>

            {/* Right content — 3D Spline Scene */}
            <div className="w-full lg:w-[55%] h-[300px] md:h-[400px] lg:h-[550px] relative flex items-center justify-center overflow-visible">
              <div className="absolute w-[150%] h-[130%] transform scale-[0.8] md:scale-[0.65] lg:scale-[0.7] origin-center flex items-center justify-center">
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
