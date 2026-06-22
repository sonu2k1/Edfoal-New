"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import useLenis from "@/hooks/useLenis";
import MinimalHero from "@/components/ui/hero-minimalism";

export default function ServicesPage() {
  // Initialize Lenis scroll smoothing
  useLenis();

  const services = [
    {
      title: "Automation",
      image: "https://edfoal.com/assets/image/service1.jpg",
      description:
        "Unlock smarter workflows with intelligent automation that adapts to your business. We don't just replace manual tasks, we reimagine them to be faster, scalable, and insight-driven.",
      href: "/services/automation",
    },
    {
      title: "Tailored AI Solutions",
      image: "https://ik.imagekit.io/edfoalImage/assets/image/service2.jpg",
      description:
        "No off-the-shelf shortcuts, we build AI that's purpose-built for your goals. From concept to deployment, every solution is custom-trained to think the way your business works.",
      href: "/services/tailored-ai-solutions",
    },
    {
      title: "AI Consultancy",
      image: "https://ik.imagekit.io/edfoalImage/assets/image/service3.jpg",
      description:
        "Bridge the gap between possibility and performance. Our consultancy turns AI from a buzzword into a strategic asset, guiding you from ideation to implementation with clarity and impact.",
      href: "/services/ai-consultancy",
    },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden">
      {/* Background gradients, grid and noise */}
      <BackgroundEffects />
      <Navbar />

      {/* Hero Section */}
      <MinimalHero 
        kicker="Our Services"
        title={
          <>
            Custom AI Solutions <br />
            For Your Needs
          </>
        }
        subtitle="Tailored technologies designed to drive your business forward and address your unique challenges!"
      />

      {/* Exceptional Service Offerings Intro Section */}
      <section id="offerings" className="w-full max-w-7xl mx-auto relative py-16 md:py-24 px-6 md:px-12 scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Block */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Our Offerings
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Our Exceptional <br /> Service Offerings
            </h2>
          </div>

          {/* Right Block */}
          <div className="md:col-span-7 flex flex-col gap-8">
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl font-normal">
              Explore our comprehensive range of services designed to enhance your business operations, drive
              innovation, and deliver customized solutions tailored to your needs.
            </p>
            <div>
              <HoverBorderGradient
                as="a"
                href="/#contact"
                containerClassName="rounded-full w-[180px] h-[46px]"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center justify-center text-sm font-semibold w-full h-full"
              >
                Connect with us
              </HoverBorderGradient>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="w-full max-w-7xl mx-auto relative pb-28 md:pb-40 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Wrap */}
                <div className="h-60 w-full overflow-hidden relative border-b border-white/5">
                  <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-300 group-hover:bg-black/25" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-normal mb-8">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action Area */}
              <div className="px-8 pb-8 md:px-10 md:pb-10 pt-0">
                <hr className="border-white/5 mb-6" />
                <a
                  href={service.href}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white/95 group-hover:text-purple-400 transition-colors duration-200 uppercase"
                >
                  Get Started <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
