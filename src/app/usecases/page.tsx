"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import useLenis from "@/hooks/useLenis";
import { RobotHero } from "@/components/ui/RobotHero";
import { cn } from "@/lib/utils";

export default function UsecasesPage() {
  // Initialize Lenis scroll smoothing
  useLenis();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      const children = scrollContainerRef.current.children;
      if (children.length > 0) {
        let nearestIndex = 0;
        let minDiff = Infinity;
        const containerLeft = scrollContainerRef.current.getBoundingClientRect().left;

        for (let i = 0; i < children.length; i++) {
          const childRect = children[i].getBoundingClientRect();
          const diff = Math.abs(childRect.left - containerLeft);
          if (diff < minDiff) {
            minDiff = diff;
            nearestIndex = i;
          }
        }
        setActiveIndex(nearestIndex);
      }
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const items = container.children;
      if (items && items[index]) {
        const targetElement = items[index] as HTMLElement;
        container.scrollTo({
          left: targetElement.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      setTimeout(handleScroll, 100);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const caseStudies = [
    {
      id: 1,
      title: "AI IVR Automation for Mortgage Verification",
      industry: "Mortgage · India",
      description: "Cut verification calls from 20–30 minutes to under 5 minutes with zero human involvement.",
      stat: "80% faster · 60% cost reduction",
      image: "/cs-ivr-automation.png",
      href: "/usecases/detail?id=1",
    },
    {
      id: 2,
      title: "AI Web Scraping for Foreclosure Lead Discovery",
      industry: "Foreclosure · US",
      description: "Replaced 6 hours of daily manual data collection with a 5-minute automated pipeline.",
      stat: "6 hours → 5 minutes daily",
      image: "/cs-web-scraping.png",
      href: "/usecases/detail?id=2",
    },
    {
      id: 3,
      title: "Enterprise AI Strategy for a UK Insurance Firm",
      industry: "Insurance · UK",
      description: "Delivered a board-ready AI adoption roadmap with a three-horizon framework in two months.",
      stat: "Full AI roadmap · Board-ready",
      image: "/cs-ai-strategy.png",
      href: "/usecases/detail?id=3",
    },
    {
      id: 4,
      title: "AI Product Strategy for Gen AI Startups",
      industry: "Tech Startups · Global",
      description: "Helped founders validate concepts, reduce product risk, and create investor-ready roadmaps.",
      stat: "Concept → validated roadmap",
      image: "/cs-product-strategy.png",
      href: "/usecases/detail?id=4",
    },
    {
      id: 5,
      title: "Automating Data Entry for a 200-Person Team",
      industry: "Enterprise Ops · India",
      description: "Identified the right 50% of tasks to automate — saving $1M annually while avoiding wasteful AI spend.",
      stat: "$1M annual cost savings",
      image: "/cs-data-automation.png",
      href: "/usecases/detail?id=5",
    },
    {
      id: 6,
      title: "AI-Powered Lead Generation Bot on Telegram",
      industry: "Crypto / Sales · Global",
      description: "Built a human-sounding AI bot that 5× outreach volume with a 25% lead qualification rate.",
      stat: "5× outreach · 25% qualification rate",
      image: "/cs-lead-gen-bot.png",
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest text-[#3b82f6] uppercase mb-4"
            >
              What We've Built
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-extrabold text-zinc-950 tracking-tight mb-4"
            >
              Our Case Studies
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-500 text-lg leading-relaxed"
            >
              Each project below represents a real engagement with measurable outcomes. Click to explore the full story.
            </motion.p>
          </div>

          {/* Top-Right Arrows Control */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 bg-white transition-all cursor-pointer",
                canScrollLeft ? "hover:bg-zinc-50 hover:border-zinc-300" : "opacity-40 cursor-not-allowed"
              )}
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 bg-white transition-all cursor-pointer",
                canScrollRight ? "hover:bg-zinc-50 hover:border-zinc-300" : "opacity-40 cursor-not-allowed"
              )}
            >
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container Wrapper with Side Overlay Buttons */}
        <div className="relative group/carousel">
          {/* Left Floating Overlay Arrow */}
          <button
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 shadow-lg cursor-pointer"
            )}
            disabled={!canScrollLeft}
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>

          {/* Right Floating Overlay Arrow */}
          <button
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 shadow-lg cursor-pointer"
            )}
            disabled={!canScrollRight}
          >
            <FiArrowRight className="w-5 h-5" />
          </button>

          {/* Draggable/Scrollable Cards Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-8"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-55px" }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="w-[290px] sm:w-[340px] md:w-[370px] aspect-[3/4] rounded-[2rem] overflow-hidden relative shrink-0 snap-start shadow-md hover:shadow-2xl border border-zinc-200/50 transition-all duration-500 group cursor-pointer"
                onClick={() => window.location.href = study.href}
              >
                {/* Background Image */}
                <img
                  src={study.image}
                  alt={study.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 transition-opacity duration-300 group-hover:via-black/55" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
                  <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-2 block">
                    {study.industry}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide leading-snug group-hover:text-blue-300 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
                    {study.description}
                  </p>
                  
                  {/* Action Link */}
                  <div className="flex items-center justify-between mt-1 pt-4 border-t border-white/10">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-white uppercase group-hover:text-blue-300 transition-colors">
                      Read case study <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                    
                    <span className="text-[10px] font-semibold text-zinc-300 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {study.stat.split(" · ")[0]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex justify-center items-center gap-2.5 mt-8">
          {caseStudies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                activeIndex === idx ? "w-6 bg-blue-600" : "w-2 bg-zinc-300 hover:bg-zinc-400"
              )}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
