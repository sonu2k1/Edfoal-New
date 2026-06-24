"use client";

import React from "react";
import { ArrowUpRight, Zap } from "lucide-react";

const ChartIcon = () => (
  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="10" width="4" height="10" rx="1.5" fill="#0f172a" />
      <rect x="10" y="5" width="4" height="15" rx="1.5" fill="#0f172a" />
      <rect x="17" y="12" width="4" height="8" rx="1.5" fill="#0f172a" />
    </svg>
  </div>
);

const AvatarGroup = () => (
  <div className="flex -space-x-2 overflow-hidden">
    <img
      className="inline-block h-8 w-8 rounded-full ring-2 ring-[#f3f4f6] object-cover"
      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
      alt="avatar1"
    />
    <img
      className="inline-block h-8 w-8 rounded-full ring-2 ring-[#f3f4f6] object-cover"
      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
      alt="avatar2"
    />
    <img
      className="inline-block h-8 w-8 rounded-full ring-2 ring-[#f3f4f6] object-cover"
      src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80"
      alt="avatar3"
    />
    <img
      className="inline-block h-8 w-8 rounded-full ring-2 ring-[#f3f4f6] object-cover"
      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
      alt="avatar4"
    />
  </div>
);

export default function WhyChooseUs() {
  return (
    <section id="whychooseus" data-theme="light" className="w-full bg-white relative overflow-hidden">
      <div className="w-full px-18 py-8 pb-20pt-0">
        {/* Title */}
        <div className="text-center flex flex-col items-center">
          <h2 className="text-sm  font-bold text-gray-500 tracking-tight leading-tight">
            Why Choose Us ?
          </h2>
          <p className="mt-3 max-w-5xl text-center text-[clamp(1.8rem,4vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-gray-950">
            <span className="block">Unlock the Power of AI</span>
            <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>for</span>
              <span className="inline-flex h-[0.82em] w-[0.82em] items-center justify-center rounded-full bg-[#E2076D] align-middle text-white shadow-[0_8px_20px_rgba(95,216,255,0.35)]">
                <ArrowUpRight aria-hidden="true" className="h-[0.42em] w-[0.42em] stroke-3" />
              </span>
              <span>Unmatched</span>
            </span>
            <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-gray-400">
              <span className="inline-flex h-[0.82em] w-[0.82em] items-center justify-center rounded-full bg-[#1D6ACF] align-middle text-white ">
                <Zap aria-hidden="true" className="h-[0.38em] w-[0.38em] fill-current stroke-3" />
              </span>
              <span>Business Growth</span>
            </span>
          </p>
          <p className="mx-auto mt-4 mb-6 max-w-5xl text-sm md:text-[16px] text-gray-500 leading-relaxed font-medium">
            EdFoal AI combines expertise, innovation, and tailored solutions to drive your business forward. We create custom AI systems designed to meet your unique needs, ensuring seamless integration and scalable growth as your business evolves.
          </p>
        </div>

        {/* Cards Grid with Symmetrical Centering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

          {/* Card 1: Blue Background with Collaborator Portrait */}
          <div
            className="relative rounded-3xl overflow-hidden flex flex-col justify-between w-full shadow-sm"
            style={{ padding: "20px", minHeight: "220px" }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center select-none"
              style={{
                backgroundImage: "url('/collaborator.png')",
                zIndex: 0
              }}
            />
            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent pointer-events-none" style={{ zIndex: 1 }} />

            {/* Top Row */}
            <div className="flex items-center justify-between w-full relative z-10">
              <ChartIcon />
            </div>

            {/* Bottom Overlay Card */}
            <div
              className="bg-white rounded-2xl shadow-lg relative z-10 mt-auto w-full"
              style={{ padding: "12px 16px" }}
            >
              <h4 className="text-2xl font-extrabold text-gray-900 mb-0.5 select-none">Tailored AI Solution</h4>
              <p className="text-sm text-gray-500 leading-snug">
                Every business is unique, and so are your needs. Our custom AI solutions are crafted specifically to drive results that align perfectly with your goals.
              </p>
            </div>
          </div>

          {/* Card 2: Light Gray Testimonial */}
          <div
            className="bg-[#f3f4f6] rounded-3xl flex flex-col justify-between w-full shadow-sm"
            style={{ padding: "20px", minHeight: "220px" }}
          >
            {/* Top Section */}
            <div className="flex flex-col">
              <h4 className="text-4xl font-extrabold text-gray-900 leading-none select-none">
                Proven Expertise
              </h4>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-3 mt-auto">
              <AvatarGroup />
              <p className="text-sm text-gray-800 leading-snug select-text">
                With years of industry experience, our team of AI experts has a proven track record in delivering impactful, reliable solutions that accelerate business growth.
              </p>
            </div>
          </div>

          {/* Card 3: Stacked Lime Green & Black Cards */}
          <div className="flex flex-col gap-4 min-h-[312px] w-full md:col-span-2 lg:col-span-1">
            {/* Top Lime Green Card */}
            <div
              className="bg-[#E2076D] rounded-3xl flex-1 flex flex-col justify-between shadow-sm"
              style={{ padding: "20px", minHeight: "200px" }}
            >
              <div className="flex flex-col">
                <h4 className="text-4xl font-extrabold text-white leading-none select-none">
                  Scalable Solution
                </h4>
              </div>
              <p className="text-sm text-white leading-snug mt-auto">
                From startups to enterprises, our AI solutions scale with your business, ensuring that growth is never limited by your technology.
              </p>
            </div>

            {/* Bottom Black Card */}
            <div
              className="bg-[#0e1111] rounded-3xl flex items-center justify-between shadow-sm"
              style={{ padding: "16px 20px", minHeight: "96px" }}
            >
              <span className="font-bold text-gray-400 tracking-wider">
                Solution Provided
              </span>
              <span className="text-2xl font-extrabold text-white select-none">
                20+
              </span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
