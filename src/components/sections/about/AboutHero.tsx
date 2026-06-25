"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative w-full bg-white py-20 md:py-28 px-6 md:px-12 lg:px-20 overflow-hidden" >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10" >
        
        {/* Left Column: Image with frame & shadow */}
        <motion.div
          className="lg:col-span-5 flex justify-center w-full"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-zinc-200/80 shadow-2xl shadow-zinc-300/40 bg-white p-2">
            <img
              src="https://ik.imagekit.io/edfoalImage/assets/image/abouthero.png"
              alt="Professional in suit"
              className="w-full h-full object-cover rounded-[1.75rem]"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Right Column: Copywriting & headings */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-4 block">
            About us
          </span>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-950 tracking-tight leading-[1.15] mb-8">
            Who We Are at EdFoal AI
          </h1>

          <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed font-normal">
            <p>
              At EdFoal AI, we are passionate about leveraging the transformative power of artificial intelligence to help businesses succeed. Founded with the vision of making AI accessible and impactful, we specialize in designing tailored AI solutions that reduce costs, save time, and enhance overall efficiency. Our mission is simple: to empower businesses with intelligent tools that solve their unique challenges and create new opportunities for growth.
            </p>
            <p>
              We understand that no two businesses are the same, which is why we take a personalized approach to every project. Our team of AI experts works closely with clients to understand their specific needs, design innovative AI systems, and implement seamless solutions that integrate perfectly into existing operations.
              Whether you're looking to automate processes, gain actionable insights from data, or develop a completely custom AI solution, EdFoal AI is your trusted partner in driving results. We help companies of all sizes unlock their full potential and stay competitive in today’s rapidly evolving marketplace.
            </p>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
