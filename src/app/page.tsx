"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoTicker from "@/components/LogoTicker";
import OurServices from "@/components/services/OurServices";
import WhyChooseUs from "@/components/why-choose-us/WhyChooseUs";
import Footer from "@/components/footer/Footer";
import ElevateSection from "@/components/elevate/ElevateSection";
import IndustriesHoverExpand from "@/components/industries/IndustriesHoverExpand";
import HowWeWork from "@/components/how-we-work/HowWeWork";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import useLenis from "@/hooks/useLenis";

export default function Home() {
  // Initialize Lenis scroll smoothing on layout mount
  useLenis();

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-purple-200">
      {/* Premium fixed background gradients, noise and grids */}
      <BackgroundEffects />

      {/* Floating glass navbar */}
      <Navbar />

      {/* Main scroll-storytelling hero section */}
      <HeroSection />

      {/* Infinite scrolling logo ticker */}
      <LogoTicker />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Our Services Section */}
      <OurServices />

      {/* Industries Hover Expand Section */}
      <IndustriesHoverExpand />

      {/* How We Work Section */}
      <HowWeWork />

      {/* Elevate Section */}
      <ElevateSection />

      {/* Redesigned Premium Footer */}
      <Footer />
    </main>
  );
}
