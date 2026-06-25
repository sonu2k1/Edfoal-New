"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Prism = dynamic(() => import("@/components/ui/Prism"), { ssr: false });

export default function ServiceHero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      style={{ padding: "10px 10px 0px 10px" }}
    >
      <div
        className="w-full mx-auto relative"
        style={{ maxWidth: "1460px" }}
      >
        <div className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[675px] overflow-hidden rounded-t-xl bg-black/[0.96]">
          
          {/* Prism WebGL Background */}
          <div className="absolute inset-0 z-0 opacity-80">
            <Prism
              animationType="rotate"
              timeScale={0.5}
              height={3.5}
              baseWidth={5.5}
              scale={3.6}
              hueShift={0}
              colorFrequency={1}
              noise={0.5}
              glow={1}
              suspendWhenOffscreen={true}
            />
          </div>

          {/* Centered Text Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center w-full min-h-[500px] md:min-h-[600px] lg:min-h-[675px] px-6 md:px-12">
            
            {/* Kicker pill */}
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-block text-[11px] font-semibold tracking-[0.2em] text-neutral-300 uppercase px-5 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-8"
            >
              Our Services
            </motion.span>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500 leading-[1.1] tracking-tight max-w-3xl"
            >
              Custom AI Solutions
              <br />
              For Your Needs
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="mt-6 text-neutral-400 max-w-xl text-base md:text-lg leading-relaxed"
            >
              Tailored technologies designed to drive your business forward and address your unique challenges!
            </motion.p>
          </div>

          {/* Bottom gradient fade to white */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
}
