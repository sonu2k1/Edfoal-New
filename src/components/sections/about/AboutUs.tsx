'use client'

import React from "react";
import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/Splite";
import { Card } from "@/components/ui/Card";
import { Spotlight } from "@/components/ui/Spotlight";

export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="w-full h-full relative overflow-hidden bg-white"
      style={{ padding: "10px 10px 0px 10px" }}
    >
      <div
        className="w-full mx-auto"
        style={{ maxWidth: "1460px" }}
      >
        {/* Section header */}
        <div className="text-center mb-12">
          {/* Pill badge */}
          {/* <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600" />
            </span>
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase leading-none">
              About Us
            </span>
          </div> */}


        </div>

        {/* 3D Spline Card */}
        <Card 
          className="w-full h-auto bg-black/[0.96] relative overflow-hidden border-white/10 border-b-0 rounded-b-none"
          style={{
            maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)"
          }}
        >
          {/* Static ultra-smooth gradient overlay to blend card with background */}
          <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-20" />
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex flex-col lg:flex-row min-h-[400px] md:min-h-[500px] lg:min-h-[550px] w-full relative items-center">
            {/* Left content */}
            <div className="w-full lg:w-[45%] p-6 md:p-8 relative z-10 flex flex-col justify-center lg:ml-12" style={{ margin: "0 0 0 5rem" }}>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight mb-4 mt-6 lg:mt-8" style={{ margin: "2rem 0 1rem 0" }}>
                About Us
                <br />
                <span className="text-xl md:text-3xl text-neutral-300 font-semibold mt-2 block">
                  Get to Know EdFoal
                </span>
              </h3>

              <div className="space-y-4 text-neutral-400 max-w-xl text-base md:text-lg leading-relaxed">
                <p>We’re transforming businesses with custom AI solutions that drive efficiency, innovation, and growth. Let’s unlock your potential with AI built just for you.</p>
              </div>
            </div>

            {/* Right content — 3D Spline Scene */}
            <div className="w-full lg:w-[55%] h-[400px] md:h-[520px] lg:h-[800px]">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
