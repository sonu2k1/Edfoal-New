"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

/* ───── Industry data ───── */
const industries = [
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=3540&auto=format&fit=crop",
    alt: "Healthcare & Life Sciences",
    label: "Healthcare",
  },
  {
    src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=3540&auto=format&fit=crop",
    alt: "Finance & Banking",
    label: "Finance",
  },
  {
    src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=3540&auto=format&fit=crop",
    alt: "Real Estate & Property",
    label: "Real Estate",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=3540&auto=format&fit=crop",
    alt: "Technology & SaaS",
    label: "Technology",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3540&auto=format&fit=crop",
    alt: "Education & E-Learning",
    label: "Education",
  },
];

/* ───── HoverExpand panel ───── */
const HoverExpandPanel = ({
  images,
  className,
}: {
  images: { src: string; alt: string; label: string }[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number>(1);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn("relative w-full", className)}
    >
      <div className="flex w-full items-center justify-center gap-1.5">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-3xl"
            animate={{
              width: activeImage === index ? "28rem" : "5rem",
              height: "26rem",
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setActiveImage(index)}
            onHoverStart={() => setActiveImage(index)}
          >
            {/* Gradient overlay */}
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                />
              )}
            </AnimatePresence>

            {/* Label overlay */}
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-purple-300">
                    Industry
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-white">
                    {image.label}
                  </h3>
                  <p className="mt-1 max-w-xs text-sm text-white/70">
                    {image.alt}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed vertical label */}
            <AnimatePresence>
              {activeImage !== index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex items-center justify-center"
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest text-white/80"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                    }}
                  >
                    {image.label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dark overlay for collapsed panels */}
            {activeImage !== index && (
              <div className="absolute inset-0 z-10 bg-black/30" />
            )}

            {/* Image */}
            <img
              src={image.src}
              className="h-full w-full object-cover"
              alt={image.alt}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ───── IndustriesHoverExpand Section ───── */
export default function IndustriesHoverExpand() {
  return (
    <section
      id="industries-explore"
      className="relative w-full overflow-hidden bg-white py-20"
      
      
    >
      <div
        className="w-full mx-auto px-5"
        style={{ maxWidth: "1400px", marginTop:"5rem"}}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center mb-12"
        >
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 mb-8">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600" />
            </span>
            <span className="text-xs font-semibold tracking-widest text-gray-600 uppercase leading-none">
              Explore
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
           Industries We Serve
          </h2>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 leading-relaxed mt-4 mb-8" style={{margin:"2rem 0 2rem 24rem"}}>
            Discover the wide range of industries we serve, delivering innovative solutions tailored to meet their unique challenges and goals.
          </p>
        </motion.div>

        {/* Hover-expand interactive panel */}
        <HoverExpandPanel images={industries} />
      </div>
    </section>
  );
}
