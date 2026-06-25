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
    <section id="whychooseus" data-theme="light" className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-360 px-4 py-12 sm:px-6 sm:py-14 md:px-12 lg:px-18 lg:py-8">
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-200 bg-gray-50">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E2076D]" />
            </span>
            <span className="text-sm font-semibold tracking-widest text-gray-600 leading-none">
              Why Choose Us
            </span>
          </div>
          <p className="mt-4 max-w-5xl text-center text-[clamp(2rem,8vw,3rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-gray-950 sm:mt-3 md:leading-[0.95] lg:text-[36px]">
            <span className="block">Unlock the Power of AI for</span>
            <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-3">
              <span className="inline-flex h-[0.82em] w-[0.82em] items-center justify-center rounded-full bg-[#E2076D] align-middle text-white shadow-[0_8px_20px_rgba(95,216,255,0.35)]">
                <ArrowUpRight aria-hidden="true" className="h-[0.42em] w-[0.42em] stroke-3" />
              </span>
              <span>Unmatched</span>
              <span className="inline-flex h-[0.82em] w-[0.82em] items-center justify-center rounded-full bg-[#1D6ACF] align-middle text-white">
                <Zap aria-hidden="true" className="h-[0.38em] w-[0.38em] fill-current stroke-3" />
              </span>
              <span>Business Growth</span>
            </span>
          </p>
          <p className="mx-auto mb-8 mt-4 max-w-4xl text-sm font-medium leading-relaxed text-gray-500 sm:mb-10 md:text-[16px] lg:mb-6">
            EdFoal AI combines expertise, innovation, and tailored solutions to drive your business forward. We create custom AI systems designed to meet your unique needs, ensuring seamless integration and scalable growth as your business evolves.
          </p>
        </div>

        {/* Cards Grid with Symmetrical Centering */}
        <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">

          {/* Card 1: Blue Background with Collaborator Portrait */}
          <div className="relative flex min-h-65 w-full flex-col justify-between overflow-hidden rounded-3xl p-4 shadow-sm sm:min-h-75 sm:p-5 md:min-h-80 lg:min-h-55">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center select-none"
              style={{
                backgroundImage: "url('/collaborator.png')",
                zIndex: 0
              }}
            />
            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-transparent pointer-events-none" style={{ zIndex: 1 }} />

            {/* Top Row */}
            <div className="flex items-center justify-between w-full relative z-10">
              <ChartIcon />
            </div>

            {/* Bottom Overlay Card */}
            <div className="relative z-10 mt-auto w-full rounded-2xl bg-white p-4 shadow-lg">
              <h4 className="mb-1 text-xl font-extrabold text-gray-900 select-none sm:text-2xl">Tailored AI Solution</h4>
              <p className="text-sm leading-snug text-gray-500">
                Every business is unique, and so are your needs. Our custom AI solutions are crafted specifically to drive results that align perfectly with your goals.
              </p>
            </div>
          </div>

          {/* Card 2: Light Gray Testimonial */}
          <div className="flex min-h-65 w-full flex-col justify-between rounded-3xl bg-[#f3f4f6] p-4 shadow-sm sm:min-h-75 sm:p-5 md:min-h-80 lg:min-h-55">
            {/* Top Section */}
            <div className="flex flex-col">
              <h4 className="text-[clamp(2rem,8vw,2.5rem)] font-extrabold leading-none text-gray-900 select-none">
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
          <div className="flex min-h-78 w-full flex-col gap-4 md:col-span-2 lg:col-span-1">
            {/* Top Lime Green Card */}
            <div className="flex min-h-55 flex-1 flex-col justify-between rounded-3xl bg-[#E2076D] p-4 shadow-sm sm:p-5 md:min-h-50">
              <div className="flex flex-col">
                <h4 className="text-[clamp(2rem,8vw,2.5rem)] font-extrabold leading-none text-white select-none">
                  Scalable Solution
                </h4>
              </div>
              <p className="mt-auto text-sm leading-snug text-white">
                From startups to enterprises, our AI solutions scale with your business, ensuring that growth is never limited by your technology.
              </p>
            </div>

            {/* Bottom Black Card */}
            <div className="flex min-h-24 items-center justify-between rounded-3xl bg-[#001427] p-4 shadow-sm sm:px-5">
              <span className="text-sm font-bold tracking-wider text-gray-400 sm:text-base">
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
