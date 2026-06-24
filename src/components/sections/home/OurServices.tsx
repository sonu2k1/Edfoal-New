"use client";

import React from "react";
import Globe3DDemoSecond from "@/components/ui/Globe3D-demo-2";

export default function OurServices() {
  return (
    <section
      id="services"
      data-theme="light"
      className="w-full relative overflow-hidden bg-white py-16 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center"
    >
      <div className="text-center flex flex-col items-center w-full">
        <h2 className="text-sm  font-bold text-gray-500 tracking-tight leading-tight">
          Our Services
        </h2>
        <p className="mt-3 max-w-5xl text-center text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-gray-950">
          <span className="block">Tailored AI Solutions to Drive <br />Your Business Forward</span>
        </p>
        <p className="mx-auto mt-4 mb-6 max-w-4xl text-sm md:text-[16px] text-gray-500 leading-relaxed font-medium">
          From automation to custom AI systems, our solutions are designed to optimize operations, elevate customer interactions, and enhance overall business performance.
        </p>
        <div className="w-full flex justify-center">
          <Globe3DDemoSecond />
        </div>
      </div>
      {/* <div
        className="w-full text-center flex flex-col items-center justify-center"
        style={{
          maxWidth: "1450px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <h2 className="text-sm  font-bold text-gray-500 tracking-tight leading-tight">
          Our Serives
        </h2>

        <div className="w-full flex justify-center">
          <Globe3DDemoSecond />
        </div>
      </div> */}
    </section>
  );
}

