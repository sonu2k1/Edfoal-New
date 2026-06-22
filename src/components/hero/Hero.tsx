"use client";

import React from "react";
import { motion } from "framer-motion";
import CanvasBrain from "./CanvasBrain";
import { OriginButton } from "@/components/ui/origin-button";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-[#080808] flex items-center">
      {/* Background canvas brain and float triangles */}
      <CanvasBrain />

      {/* Hero content overlays the canvases. 
          Use pointer-events-none on the grid and pointer-events-auto on the elements to allow canvas interaction if needed while keeping button clicks working. */}
      <div className="relative z-10 w-full lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-[43%] flex flex-col justify-center px-6 md:px-12 lg:px-0 lg:pl-[7%] py-24 lg:py-0 pointer-events-none">
        <div className="pointer-events-auto flex flex-col justify-center">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontSize: "clamp(58px, 7.2vw, 94px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 0.96,
              letterSpacing: "-3px",
              marginBottom: "26px",
            }}
          >
           Transform
            <br />
           Your Business
            <br />
            wisdom
          </motion.h1>

          {/* Dala Subheading Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "10.5px",
              fontWeight: 800,
              color: "#d4860a",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
           with Intelligent AI Solutions
          </motion.div>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "15px",
              color: "rgba(255, 255, 255, 0.68)",
              lineHeight: 1.70,
              maxWidth: "305px",
              marginBottom: "34px",
            }}
          >
           Unlock new levels of efficiency, innovation, and customer satisfaction through EdFoal AI’s cutting-edge, custom-tailored AI services. Let us help you evolve with the power of AI.
          </motion.p>

          {/* CTA Action button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="inline-flex rounded-full w-[160px] h-[40px] items-center justify-center">
              <OriginButton
                className="w-full h-full rounded-full px-0 text-sm font-semibold tracking-wide border-[0.5px]"
                style={{
                  "--ic-card": "#000000",
                  "--ic-card-foreground": "#ffffff",
                  "--ic-border": "#ffffff",
                  "--ic-foreground": "#ffffff",
                  "--ic-background": "#000000",
                } as React.CSSProperties}
                onClick={() => {
                  const contactElem = document.getElementById("contact");
                  if (contactElem) {
                    contactElem.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
               Start Your AI Journey
              </OriginButton>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

