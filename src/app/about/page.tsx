"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import AboutUs from "@/components/about/AboutUs";
import useLenis from "@/hooks/useLenis";

export default function AboutPage() {
  useLenis();

  return (
    <main className="relative min-h-screen bg-white text-white selection:bg-purple-500/30 selection:text-purple-200">
      {/* Premium fixed background gradients, noise and grids */}
      <BackgroundEffects />

      {/* Floating glass navbar */}
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="pt-28" />

      {/* About Us — 3D Spline Section */}
      <AboutUs />

      {/* Footer */}
      <Footer />
    </main>
  );
}
