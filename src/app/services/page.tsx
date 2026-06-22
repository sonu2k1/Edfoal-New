"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import useLenis from "@/hooks/useLenis";
import { useRouter } from "next/navigation";
import { OriginButton } from "@/components/ui/origin-button";
import MinimalHero from "@/components/ui/hero-minimalism";
import { ServicesShowcase } from "@/components/ui/services-showcase";

export default function ServicesPage() {
  const router = useRouter();
  // Initialize Lenis scroll smoothing
  useLenis();

  return (
    <main className="relative min-h-screen bg-white text-zinc-900 selection:bg-purple-500/20 selection:text-purple-900 overflow-hidden">
      <Navbar />

      {/* Hero Section (Dark Theme) */}
      <MinimalHero
        kicker="Our Services"
        title={
          <>
            Custom AI Solutions <br />
            For Your Needs
          </>
        }
        subtitle="Tailored technologies designed to drive your business forward and address your unique challenges!"
        isLight={false}
       
       />

      {/* Intro Section (Light Theme) */}
      <section data-theme="light" className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 bg-white" style={{margin:"5rem 5rem 0 5rem"}}>
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
                  "--ic-card-foreground": "#000000",
                  "--ic-border": "#000000",
                  "--ic-foreground": "#000000",
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
      <section data-theme="light" className="relative bg-white w-full" style={{margin:"10rem"}}>
        <ServicesShowcase isLight={true} />
      </section>

      <Footer />
    </main>
  );
}
