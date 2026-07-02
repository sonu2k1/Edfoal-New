"use client";

import React from "react";
import { motion } from "framer-motion";
import { OriginButton } from "@/components/ui/OriginButton";

const avatars = [
  "https://assets.aceternity.com/avatars/1.webp",
  "https://assets.aceternity.com/avatars/2.webp",
  "https://assets.aceternity.com/avatars/3.webp",
  "https://assets.aceternity.com/avatars/4.webp",
];

export default function ElevateSection() {
  return (
    <section className="relative flex w-full justify-center bg-white px-4 py-10 pb-8 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-full overflow-hidden rounded-3xl bg-linear-to-b from-pink-500 via-violet-500 to-blue-500">
        {/* Floating animated ambient light glows that keep the base gradient colors completely static */}
        <motion.div
          className="absolute -left-50 -top-50 h-150 w-150 rounded-full pointer-events-none blur-[90px] bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_70%)]"
          animate={{
            x: [0, 250, 120, 0],
            y: [0, 120, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-37.5 -right-37.5 h-125 w-125 rounded-full pointer-events-none blur-[100px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_70%)]"
          animate={{
            x: [0, -180, -40, 0],
            y: [0, -70, 70, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/10 to-transparent z-1" />

        {/* Content — normal flow, height follows content, stacks on mobile / row on desktop */}
        <div className="relative z-10 flex flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-12 lg:py-14">
          {/* Left: badge + heading + description */}
          <div className="flex max-w-xl flex-col gap-4">
            {/* Trust Badge */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`User ${i + 1}`}
                    className="h-8 w-8 rounded-full border-2 border-white/80 object-cover"
                  />
                ))}
              </div>
              <span className="text-sm font-medium tracking-wide text-white/90">
                Trusted over 5,000+
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.85rem]">
              How Can We Elevate Your Success?
            </h2>

            {/* Description */}
            <p className="text-[14px] leading-relaxed text-white sm:text-[15px]">
              Let us unlock new opportunities and drive your business forward
              with our expert solutions!
            </p>
          </div>

          {/* Right: CTA — sits beside content on desktop, below it on mobile */}
          <div className="flex shrink-0 lg:self-center">
            <OriginButton
              className="group h-[43px] w-full rounded-full border-[0.5px] px-6 text-sm font-semibold tracking-wide"
              style={
                {
                  "--ic-card": "#ffffff",
                  "--ic-card-foreground": "#1a1a1a",
                  "--ic-border": "#ffffff",
                  "--ic-foreground": "#1a1a1a",
                  "--ic-background": "#ffffff",
                } as React.CSSProperties
              }
              onClick={() => {
                const contactElem = document.getElementById("contact");
                if (contactElem) {
                  contactElem.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Explore Our Solutions
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </OriginButton>
          </div>
        </div>
      </div>
    </section>
  );
}