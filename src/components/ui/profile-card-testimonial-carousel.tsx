"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Zap,
  Sparkles,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceItem {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const services: ServiceItem[] = [
  {
    name: "Automation",
    title: "Streamlined Workflows",
    description:
      "Unlock smarter workflows with intelligent automation that adapts to your business. We don't just replace manual tasks, we reimagine them to be faster, scalable, and insight-driven.",
    imageUrl:
      "https://edfoal.com/assets/image/service1.jpg",
    href: "/services/automation",
    icon: Zap,
  },
  {
    name: "Tailored AI Solutions",
    title: "Custom-built Architecture",
    description:
      "No off-the-shelf shortcuts — we build AI that is purpose-built for your business goals. From concept to deployment, every solution is custom-trained to think and execute exactly the way your organization works.",
    imageUrl:
      "https://ik.imagekit.io/edfoalImage/assets/image/service2.jpg",
    href: "/services/tailored-ai-solutions",
    icon: Sparkles,
  },
  {
    name: "AI Consultancy",
    title: "Strategic Implementation",
    description:
      "Bridge the gap between possibility and performance. Our consultancy turns AI from a buzzword into a strategic business asset, guiding you from ideation to implementation with absolute clarity and measurable impact.",
    imageUrl:
      "https://ik.imagekit.io/edfoalImage/assets/image/service3.jpg",
    href: "/services/ai-consultancy",
    icon: Layers,
  },
];

export interface TestimonialCarouselProps {
  className?: string;
}

export function TestimonialCarousel({ className }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % services.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + services.length) % services.length
    );

  const currentService = services[currentIndex];
  const IconComponent = currentService.icon;

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4 py-12 relative z-10", className)}>
      {/* Desktop layout */}
      <div className='hidden md:flex relative items-center justify-center py-8'>
        {/* Avatar / Image */}
        <div className='w-[460px] h-[460px] rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 flex-shrink-0 relative shadow-2xl group'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentService.imageUrl}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className='w-full h-full'
            >
              <img
                src={currentService.imageUrl}
                alt={currentService.name}
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card Content */}
        <div className='bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-10 ml-[-80px] z-10 max-w-xl flex-1 relative overflow-hidden'>
          {/* Spotlight aura */}
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />
          
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentService.name}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className='mb-6 flex items-start gap-4'>
                <div className='p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400'>
                  <IconComponent className='w-6 h-6' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white mb-1 tracking-tight'>
                    {currentService.name}
                  </h2>
                  <p className='text-xs font-semibold uppercase tracking-wider text-purple-400'>
                    {currentService.title}
                  </p>
                </div>
              </div>

              <p className='text-zinc-300 text-base leading-relaxed mb-8 font-normal'>
                {currentService.description}
              </p>

              <div className='flex space-x-4'>
                <Link
                  href={currentService.href}
                  className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all hover:scale-105 cursor-pointer shadow-lg shadow-black/10'
                >
                  Get Started <ArrowRight className='w-4 h-4' />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className='md:hidden max-w-sm mx-auto text-center bg-transparent py-4'>
        {/* Avatar / Image */}
        <div className='w-full aspect-square bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden mb-6 relative shadow-lg'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentService.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className='w-full h-full'
            >
              <img
                src={currentService.imageUrl}
                alt={currentService.name}
                className='w-full h-full object-cover'
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card content */}
        <div className='px-4 text-left bg-zinc-900/60 border border-white/5 backdrop-blur-md rounded-3xl p-6 relative overflow-hidden'>
          <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-purple-500/5 rounded-full blur-[40px] pointer-events-none" />
          
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentService.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className='flex items-center gap-3.5 mb-4'>
                <div className='p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0'>
                  <IconComponent className='w-5 h-5' />
                </div>
                <div>
                  <h2 className='text-lg font-bold text-white tracking-tight'>
                    {currentService.name}
                  </h2>
                  <p className='text-[10px] font-bold uppercase tracking-wider text-purple-400'>
                    {currentService.title}
                  </p>
                </div>
              </div>
              
              <p className='text-zinc-400 text-sm leading-relaxed mb-6 font-normal'>
                {currentService.description}
              </p>
              
              <div className='flex'>
                <Link
                  href={currentService.href}
                  className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-wider hover:bg-purple-500 hover:text-white transition-colors cursor-pointer'
                >
                  Get Started <ArrowRight className='w-3.5 h-3.5' />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className='flex justify-center items-center gap-6 mt-8'>
        {/* Previous */}
        <button
          onClick={handlePrevious}
          aria-label='Previous service'
          className='w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-800 shadow-md flex items-center justify-center hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer'
        >
          <ChevronLeft className='w-6 h-6' />
        </button>

        {/* Dots */}
        <div className='flex gap-2'>
          {services.map((_, serviceIndex) => (
            <button
              key={serviceIndex}
              onClick={() => setCurrentIndex(serviceIndex)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors cursor-pointer",
                serviceIndex === currentIndex
                  ? "bg-purple-500"
                  : "bg-zinc-700"
              )}
              aria-label={`Go to service ${serviceIndex + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          aria-label='Next service'
          className='w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-800 shadow-md flex items-center justify-center hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer'
        >
          <ChevronRight className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
}
