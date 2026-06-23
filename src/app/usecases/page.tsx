"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import useLenis from "@/hooks/useLenis";
import { RobotHero } from "@/components/ui/RobotHero";

export default function UsecasesPage() {
  // Initialize Lenis scroll smoothing
  useLenis();

  const caseStudies = [
    {
      id: 1,
      title: "AI IVR Automation for Mortgage Verification",
      industry: "Mortgage · India",
      description: "Cut verification calls from 20–30 minutes to under 5 minutes with zero human involvement.",
      stat: "80% faster · 60% cost reduction",
      image: "https://ik.imagekit.io/edfoalImage/assets/image/casestudies/cs-ivr-automation.png",
      href: "/usecases/detail?id=1",
    },
    {
      id: 2,
      title: "AI Web Scraping for Foreclosure Lead Discovery",
      industry: "Foreclosure · US",
      description: "Replaced 6 hours of daily manual data collection with a 5-minute automated pipeline.",
      stat: "6 hours → 5 minutes daily",
      image: "https://ik.imagekit.io/edfoalImage/assets/image/casestudies/cs-web-scraping.png",
      href: "/usecases/detail?id=2",
    },
    {
      id: 3,
      title: "Enterprise AI Strategy for a UK Insurance Firm",
      industry: "Insurance · UK",
      description: "Delivered a board-ready AI adoption roadmap with a three-horizon framework in two months.",
      stat: "Full AI roadmap · Board-ready",
      image: "https://ik.imagekit.io/edfoalImage/assets/image/casestudies/cs-ai-strategy.png",
      href: "/usecases/detail?id=3",
    },
    {
      id: 4,
      title: "AI Product Strategy for Gen AI Startups",
      industry: "Tech Startups · Global",
      description: "Helped founders validate concepts, reduce product risk, and create investor-ready roadmaps.",
      stat: "Concept → validated roadmap",
      image: "https://ik.imagekit.io/edfoalImage/assets/image/casestudies/cs-product-strategy.png",
      href: "/usecases/detail?id=4",
    },
    {
      id: 5,
      title: "Automating Data Entry for a 200-Person Team",
      industry: "Enterprise Ops · India",
      description: "Identified the right 50% of tasks to automate — saving $1M annually while avoiding wasteful AI spend.",
      stat: "$1M annual cost savings",
      image: "https://ik.imagekit.io/edfoalImage/assets/image/casestudies/cs-data-automation.png",
      href: "/usecases/detail?id=5",
    },
    {
      id: 6,
      title: "AI-Powered Lead Generation Bot on Telegram",
      industry: "Crypto / Sales · Global",
      description: "Built a human-sounding AI bot that 5× outreach volume with a 25% lead qualification rate.",
      stat: "5× outreach · 25% qualification rate",
      image: "https://ik.imagekit.io/edfoalImage/assets/image/casestudies/cs-lead-gen-bot.png",
      href: "/usecases/detail?id=6",
    },
  ];

  return (
    <main className="relative min-h-screen bg-white text-zinc-900 selection:bg-purple-500/10 selection:text-purple-900 overflow-hidden">
      {/* Light Background Gradients & Grid */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-white -z-50 pointer-events-none select-none">
        {/* Light Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            backgroundSize: "50px 50px",
            backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)"
          }}
        />

        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Soft violet/blue gradient blurs adapted for white theme */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.04),transparent_50%)]" />
        
        <div className="absolute top-[15%] left-[10%] w-[350px] h-[350px] rounded-full bg-purple-400/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-indigo-400/5 blur-[140px]" />
      </div>
      <Navbar />

      {/* Hero Section */}
      <RobotHero
        kicker="Case Studies"
        title={
          <>
            Real Results, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Real Impact
            </span>
          </>
        }
        subtitle="Explore how we're transforming businesses with cutting-edge AI solutions — backed by measurable outcomes."
      />

      {/* Case Studies Card Grid Section */}
      <section data-theme="light" className="w-full max-w-7xl mx-auto relative py-16 md:py-24 px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24" style={{margin:"2rem 0 0 20rem "}}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-4"
          >
            What We've Built
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-zinc-950 tracking-tight mb-6"
            style={{margin:"10px"}}
          >
            Our Case Studies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-600 text-lg leading-relaxed max-w-xl mx-auto"
            style={{margin:"0 0 2rem 0"}}
          >
            Each project below represents a real engagement with measurable outcomes. Click to explore the full story.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-55px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden border border-zinc-200/80 hover:border-blue-500/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => window.location.href = study.href}
            >
              <div>
                {/* Image Wrapper */}
                <div className="h-56 w-full overflow-hidden relative border-b border-zinc-100 bg-zinc-50">
                  <div className="absolute inset-0 bg-black/5 z-10 transition-opacity duration-300 group-hover:bg-black/0" />
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Body */}
                <div className="p-8">
                  <span className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase block mb-3">
                    {study.industry}
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-wide group-hover:text-blue-600 transition-colors leading-snug">
                    {study.title}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-6 font-normal">
                    {study.description}
                  </p>

                  {/* Stat Badge */}
                  <div className="inline-flex bg-blue-50/80 text-blue-600 border border-blue-100 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                    {study.stat}
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="px-8 pb-8 pt-0">
                <hr className="border-zinc-100 mb-5" />
                <a
                  href={study.href}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-800 group-hover:text-blue-600 transition-colors duration-200 uppercase"
                >
                  Read case study <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
