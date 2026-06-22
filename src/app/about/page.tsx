"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import AboutUs from "@/components/about/AboutUs";
import useLenis from "@/hooks/useLenis";
import MinimalHero from "@/components/ui/hero-minimalism";

export default function AboutPage() {
  useLenis();

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden">
      {/* Premium fixed background gradients, noise and grids */}
      <BackgroundEffects />

      {/* Floating glass navbar */}
      <Navbar />

      {/* Hero Section */}
      <MinimalHero
        kicker="About Us"
        title={
          <span className="text-[#f5e1b8]">Get to Know EdFoal</span>
        }
        subtitle="We're transforming businesses with custom AI solutions that drive efficiency, innovation, and growth. Let's unlock your potential with AI built just for you."
        showFooter={false}
      />

      {/* About Us — 3D Spline Section */}
      <AboutUs />

      {/* Footer */}
      <Footer />
    </main>
  );
}
