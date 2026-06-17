"use client";

import React from "react";
import { OriginButton } from "@/components/ui/origin-button";

const avatars = [
  "https://assets.aceternity.com/avatars/1.webp",
  "https://assets.aceternity.com/avatars/2.webp",
  "https://assets.aceternity.com/avatars/3.webp",
  "https://assets.aceternity.com/avatars/4.webp",
];

export default function ElevateSection() {
  return (
    <section style={{paddingBottom:"2rem"}} className="relative w-full flex justify-center px-4 sm:px-6 lg:px-8 py-10 bg-white">
      <div
        className="relative w-full max-w-[1400px] h-[400px] rounded-3xl overflow-hidden"
        style={{
          backgroundImage: "url('/elevate-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Subtle dark overlay on the left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent z-[1]" />

        {/* Content — positioned via absolute to match red-box layout */}
        <div className="absolute z-10 inset-0">
          {/* Trust Badge — top-left */}
          <div
            className="absolute flex items-center gap-3"
            style={{ top: "32px", left: "48px" }}
          >
            <span className="text-white/90 text-sm font-medium tracking-wide">
              Trusted over 5,000+
            </span>
            <div className="flex -space-x-2.5">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`User ${i + 1}`}
                  className="w-8 h-8 rounded-full border-2 border-white/80 object-cover"
                />
              ))}
            </div>
          </div>

          {/* Heading — below trust badge, left-aligned */}
          <h2
            className="absolute text-4xl sm:text-[2.75rem] lg:text-[2.85rem] font-extrabold text-white leading-[1.15] tracking-tight"
            style={{ top: "85px", left: "48px", maxWidth: "560px" }}
          >
            We combine human insight
           
            with artificial intelligence
          </h2>

          {/* Description — below heading, left-aligned */}
          <p
            className="absolute text-[14px] sm:text-[15px] leading-relaxed"
            style={{
              
              bottom: "80px",
              left: "48px",
              maxWidth: "480px",
              color: "#fff",
            }}
          >
            Our consulting team bridges strategic thinking and advanced AI
            technologies to help companies streamline processes, improve
            decision-making, and create intelligent digital experiences.
          </p>

          {/* CTA Button — positioned where arrow points (right-center) */}
          <div
            className="absolute"
            style={{ bottom: "50%", right: "120px", transform: "translateY(50%)" }}
          >
            <OriginButton
              className="rounded-full px-6 w-[210px] h-[43px] text-sm font-semibold tracking-wide border-[0.5px] group"
              style={{
                "--ic-card": "#ffffff",
                "--ic-card-foreground": "#1a1a1a",
                "--ic-border": "#ffffff",
                "--ic-foreground": "#1a1a1a",
                "--ic-background": "#ffffff",
              } as React.CSSProperties}
              onClick={() => {
                const contactElem = document.getElementById("contact");
                if (contactElem) {
                  contactElem.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get Started
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
