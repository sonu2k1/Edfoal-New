"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useLenis from "@/hooks/useLenis";
import { useRouter } from "next/navigation";
import { OriginButton } from "@/components/ui/OriginButton";
import ServiceHero from "@/components/sections/services/ServiceHero";
import { ServicesShowcase } from "@/components/sections/services/ServiceList";

export default function ServicesPage() {
  const router = useRouter();
  // Initialize Lenis scroll smoothing
  useLenis();

  return (
    <main className="relative min-h-screen bg-white text-zinc-900 selection:bg-purple-500/20 selection:text-purple-900 overflow-hidden">
      <Navbar />

      {/* Hero Section (Dark Theme) */}
      <ServiceHero />

      {/* Intro Section (Light Theme) */}
      <section data-theme="light" className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 bg-white mt-12 md:mt-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
          {/* Left Block */}
          <div className="max-w-md">
            <span className="text-xs font-bold tracking-widest text-[#3b82f6] uppercase block mb-3">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1128] tracking-tight leading-tight">
              Our Exceptional <br className="hidden md:inline" /> Service Offerings
            </h2>
          </div>

          {/* Middle Block */}
          <div className="max-w-xl md:flex-1">
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
              Explore our comprehensive range of services designed to enhance your business operations, drive innovation, and deliver customized solutions tailored to your needs.
            </p>
          </div>

          {/* Right Block */}
          <div className="shrink-0">
            <div className="rounded-full w-[180px] h-[46px] flex items-center justify-center">
              <OriginButton
                className="w-full h-full rounded-full px-0 text-sm font-semibold tracking-wide border-[0.5px] cursor-pointer"
                style={{
                  "--ic-card": "#ffffff",
                  "--ic-card-foreground": "#0f172a",
                  "--ic-border": "#0f172a",
                  "--ic-foreground": "#0f172a",
                  "--ic-background": "#ffffff",
                } as React.CSSProperties}
                onClick={() => {
                  router.push("/contact");
                }}
              >
                Connect with us
              </OriginButton>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase Section (Light Theme) */}
      <section data-theme="light" className="relative bg-white w-full py-16 md:py-24">
        <ServicesShowcase isLight={true} />
      </section>

      <Footer />
    </main>
  );
}
