'use client'

import React from "react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="w-full relative overflow-hidden bg-white"
      style={{ padding: "10px 10px" }}
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
        <Card className="w-full h-[500px] md:h-[600px] bg-black/[0.96] relative overflow-hidden border-white/10">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex flex-col md:flex-row h-full">
            {/* Left content */}
            <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 w-fit mb-6">
                {/* <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> */}
                {/* <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">
                  Interactive 3D
                </span> */}
              </div>

              <h3 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight" style={{ marginLeft: "50px" }}>
                About Us

                <br />
                Get to Know EdFoal
              </h3>

              <p className=" text-neutral-400 max-w-lg text-base md:text-lg leading-relaxed" style={{ margin: "20px 50px" }}>
                We’re transforming businesses with custom AI solutions that drive efficiency, innovation, and growth. Let’s unlock your potential with AI built just for you.
              </p>

              {/* Stats row */}
              {/* <div className="flex gap-8 mt-8">
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold text-white">50+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Projects</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold text-white">98%</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Satisfaction</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold text-white">24/7</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Support</span>
                </div>
              </div> */}
            </div>

            {/* Right content — 3D Spline Scene */}
            <div className="flex-1 relative min-h-[250px]">
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
