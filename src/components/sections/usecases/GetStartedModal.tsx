"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface ServiceDetail {
  id: string;
  name: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  imageUrl: string;
}

const servicesData: ServiceDetail[] = [
  {
    id: "tailored-ai",
    name: "Tailored AI Solutions",
    title: "Custom AI, Built Around You — Not the Other Way Around",
    paragraphs: [
      "Generic AI tools can't solve unique problems. That's why we design, train, and deploy fully custom AI solutions tailored to your specific business challenges and objectives. Whether you need predictive analytics, computer vision, natural language processing, or a completely new AI product, we start with your goals — not pre-made models.",
      "Our process includes deep collaboration to understand your operations, data landscape, and KPIs. From there, we architect AI that fits seamlessly into your workflow, with clean integration and intuitive usability. Think of it as your own in-house AI team, minus the overhead."
    ],
    bullets: [
      "Custom AI Solutions",
      "Predictive Analytics",
      "Natural Language Processing",
      "Seamless Integration",
      "Goal-Oriented Design",
      "Collaborative Development"
    ],
    imageUrl: "https://ik.imagekit.io/edfoalImage/assets/image/service2.jpg"
  },
  {
    id: "automation",
    name: "Automation",
    title: "Reimagine What's Possible with Intelligent Automation",
    paragraphs: [
      "Our automation services go far beyond basic task elimination. We design systems that think, respond, and improve — not just automate. Whether it's streamlining internal workflows, enhancing customer experiences, or integrating legacy systems, we build automation that adapts to real-world complexity.",
      "By combining AI with process automation, we help businesses reduce operational friction, improve accuracy, and unlock hours of hidden productivity. From robotic process automation (RPA) to intelligent document processing and real-time decision-making tools — we deliver scalable automation that evolves with your needs."
    ],
    bullets: [
      "Intelligent Automation",
      "Seamless Integration",
      "Scalable Solutions",
      "Adaptive Workflows",
      "Real-Time Decision Making",
      "Enhanced Accuracy & Productivity"
    ],
    imageUrl: "https://edfoal.com/assets/image/service1.jpg"
  },
  {
    id: "consultancy",
    name: "AI Consultancy",
    title: "Strategy-First AI Guidance That Delivers Real Impact",
    paragraphs: [
      "Jumping into AI without a strategy leads to wasted time and missed opportunities. Our consultancy ensures that doesn't happen. We work with you to explore how AI can truly elevate your business — not just as a tech trend, but as a core enabler of growth, efficiency, and innovation.",
      "Whether you're just starting out or scaling existing AI initiatives, we offer expert guidance at every stage — from opportunity discovery and technical roadmapping to vendor evaluation and ethical AI alignment. We don't just advise — we empower your team with the tools, mindset, and roadmap to confidently leverage AI long-term."
    ],
    bullets: [
      "Strategic AI Consulting",
      "Opportunity Discovery",
      "Technical Roadmapping",
      "Ethical AI Alignment",
      "Scalable AI Adoption",
      "Empowered Teams"
    ],
    imageUrl: "https://ik.imagekit.io/edfoalImage/assets/image/service3.jpg"
  }
];

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
}

export function GetStartedModal({ isOpen, onClose, serviceId }: GetStartedModalProps) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeService = servicesData.find((s) => s.id === serviceId) || servicesData[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-3 sm:p-5">
          {/* Dark Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container Card */}
          <motion.div
            initial={{ scale: 0, rotate: "180deg" }}
            animate={{
              scale: 1,
              rotate: "0deg",
              transition: {
                type: "spring",
                bounce: 0.25,
              },
            }}
            exit={{ scale: 0, rotate: "180deg" }}
            className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] z-10 text-zinc-900"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-655 transition-colors z-20 cursor-pointer p-2 rounded-full hover:bg-zinc-100 md:right-6 md:top-6"
              aria-label="Close modal"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Content Body area */}
            <div className="p-6 pt-12 sm:p-10 sm:pt-14 md:p-12 md:pt-16 overflow-y-auto flex-1 bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={serviceId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Left Column Content */}
                  <div className="lg:col-span-7 flex flex-col text-left">
                    <span className="text-[11px] font-black uppercase tracking-[0.15em] text-blue-500 mb-3 block">
                      {activeService.name}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-3.5xl font-black text-zinc-950 tracking-tight leading-[1.12] mb-5 md:mb-6">
                      {activeService.title}
                    </h2>
                    {activeService.paragraphs.map((para, idx) => (
                      <p key={idx} className="text-zinc-550 text-sm md:text-base leading-relaxed mb-4 md:mb-5 font-normal last:mb-8 md:last:mb-10">
                        {para}
                      </p>
                    ))}

                    {/* Features bullet checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 border-t border-zinc-100 pt-6 md:pt-8">
                      {activeService.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="text-zinc-950 font-black shrink-0 text-sm">✔</span>
                          <span className="text-zinc-900 font-bold text-sm tracking-tight">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column Illustration Card */}
                  <div className="lg:col-span-5 w-full flex justify-center">
                    <div className="w-full max-w-md aspect-4/3 sm:aspect-video lg:aspect-3/4 rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-200/50 shadow-xl relative group">
                      <img
                        src={activeService.imageUrl}
                        alt={activeService.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        draggable={false}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
