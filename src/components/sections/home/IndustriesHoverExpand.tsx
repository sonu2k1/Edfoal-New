"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  const [viewportWidth, setViewportWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn("relative w-full", className)}
    >
      <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row md:gap-2">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative w-full cursor-pointer overflow-hidden rounded-3xl md:w-auto"
            animate={{
              width: isMobile
                ? "100%"
                : activeImage === index
                  ? isTablet
                    ? "28rem"
                    : "40rem"
                  : isTablet
                    ? "4.25rem"
                    : "5rem",
              height: isMobile
                ? activeImage === index
                  ? "22rem"
                  : "5.5rem"
                : isTablet
                  ? "23rem"
                  : "26rem",
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setActiveImage(index)}
            onHoverStart={() => {
              if (!isMobile) setActiveImage(index);
            }}
          >
            {/* Gradient overlay */}
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 bg-linear-to-t from-black/85 via-black/45 to-black/25"
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
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center sm:p-6"
                >
                  <div className="flex max-w-sm flex-col items-center rounded-3xl border border-white/15 bg-black/35 px-4 py-4 text-center shadow-2xl backdrop-blur-md sm:px-6 sm:py-5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
                      Industry
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-white drop-shadow sm:text-3xl md:text-2xl">
                      {image.label}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm font-medium leading-relaxed text-white/85 drop-shadow sm:text-base md:text-sm">
                      {image.alt}
                    </p>
                    <Link
                      href="/usecases"
                      className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-bold text-gray-950 shadow-lg transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/70"
                    >
                      View Usecases
                    </Link>
                  </div>
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
                    className="text-sm font-bold uppercase tracking-widest text-white/90 md:text-xs"
                    style={{
                      writingMode: isMobile ? "horizontal-tb" : "vertical-rl",
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
      className="relative w-full overflow-hidden bg-white"
    >
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 md:px-8 lg:px-5">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 w-full text-center sm:mb-10 lg:mb-12"
        >
          {/* Pill badge */}
          <div className="mt-3 inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E2076D]" />
            </span>
            <span className="text-sm font-semibold leading-none tracking-widest text-gray-600">
              Industries Cover
            </span>
          </div>

          <h2 className="mt-4 text-[clamp(2.25rem,9vw,3rem)] font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
            Industries We Serve
          </h2>

          <p className="mx-auto mb-4 mt-3 max-w-4xl px-1 text-sm leading-relaxed text-gray-500 sm:text-base">
            Discover the wide range of industries we serve, delivering innovative solutions tailored to meet their unique challenges and goals.
          </p>
        </motion.div>

        {/* Hover-expand interactive panel */}
        <HoverExpandPanel images={industries} />
      </div>
    </section>
  );
}
