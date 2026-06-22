"use client";

import React from "react";

const ChartIcon = () => (
  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="10" width="4" height="10" rx="1.5" fill="#000000" />
      <rect x="10" y="5" width="4" height="15" rx="1.5" fill="#000000" />
      <rect x="17" y="12" width="4" height="8" rx="1.5" fill="#000000" />
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
    <section 
      id="about" 
      data-theme="light"
      className="w-full bg-white relative overflow-hidden"
      style={{ padding: "0px 100px 50px 100px" }}
    >
      <div 
        className="w-full pb-20 md:pb-28 pt-0"
        style={{
          maxWidth: "1450px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
      
        {/* Title */}
        <div className="text-center " style={{marginBottom:"30px"}}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Why Choose Us ?
          </h2>
          <p className=" text-gray-500 " style={{margin:"2rem 0 0 20rem", color:"black"}}>Unlock the Power of AI for Unmatched Business Growth</p>
          <p className="text-sm md:text-[16px] text-gray-500 max-w-3xl mx-auto mt-4 leading-relaxed font-medium" style={{margin:"1rem 0 0 20rem"}}>
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
            <span className="text-white font-extrabold text-[18px] tracking-tight uppercase select-none">IPSUM</span>
            <ChartIcon />
          </div>

          {/* Bottom Overlay Card */}
          <div 
            className="bg-white rounded-2xl shadow-lg relative z-10 mt-auto w-full"
            style={{ padding: "12px 16px" }}
          >
            <h4 className="text-2xl font-extrabold text-gray-900 mb-0.5 select-none">120+</h4>
            <p className="text-[10px] text-gray-500 font-semibold leading-snug">
              Collaborating with leading AI and cloud technology providers.
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
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
              Commitment to measurable
            </span>
            <h4 className="text-4xl font-extrabold text-gray-900 leading-none select-none">
              100%
            </h4>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-3 mt-auto">
            <AvatarGroup />
            <p className="text-xs font-bold text-gray-800 leading-snug select-text">
              &ldquo;Their automation strategy completely reshaped how we work. It&apos;s efficient, intelligent, and seamless.&rdquo;
            </p>
          </div>
        </div>

        {/* Card 3: Stacked Lime Green & Black Cards */}
        <div className="flex flex-col gap-4 min-h-[312px] w-full md:col-span-2 lg:col-span-1">
          {/* Top Lime Green Card */}
          <div 
            className="bg-[#bbf246] rounded-3xl flex-1 flex flex-col justify-between shadow-sm"
            style={{ padding: "20px", minHeight: "200px" }}
          >
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-700 font-bold uppercase tracking-wider mb-1">
                Data Points
              </span>
              <h4 className="text-4xl font-extrabold text-gray-900 leading-none select-none">
                520k+
              </h4>
            </div>
            <p className="text-xs font-semibold text-gray-800 leading-snug mt-auto">
              Analyzed monthly to power smarter business strategies.
            </p>
          </div>

          {/* Bottom Black Card */}
          <div 
            className="bg-[#0e1111] rounded-3xl flex items-center justify-between shadow-sm"
            style={{ padding: "16px 20px", minHeight: "96px" }}
          >
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Continents
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
