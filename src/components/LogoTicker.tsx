"use client";

import React from "react";

export default function LogoTicker() {
  const logos = [
    <img key="bhavishya" src="https://ik.imagekit.io/edfoalImage/assets/image/bhavishyaNGO.png" alt="Bhavishya NGO" className="partner-logo" />,
    <img key="gvngo" src="https://ik.imagekit.io/edfoalImage/assets/image/gvngo.png" alt="GV NGO" className="partner-logo" />,
    <img key="workfin" src="https://ik.imagekit.io/edfoalImage/assets/image/workfin.png" alt="Workfin" className="partner-logo" />,
    <img key="rocksteady" src="https://ik.imagekit.io/edfoalImage/assets/image/rocksteadydigital.png" alt="Rocksteady Digital" className="partner-logo" />,
    <img key="lochhomes" src="https://ik.imagekit.io/edfoalImage/assets/image/lochhomes1.png" alt="lochhomes" className="partner-logo" />,
  ];

  // Repeat the core logo set multiple times to ensure seamless infinite looping track
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  return (
    <div 
      data-theme="light"
      className="w-full bg-white overflow-hidden relative flex flex-col justify-center gap-4 py-4" 
      style={{ height: "150px" }}
    >
      <style>{`
        @keyframes tickerAnimation {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: tickerAnimation 45s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        .partner-logo {
          height: 50px;
          width: auto;
          object-fit: contain;
          filter: grayscale(100%);
          opacity: 0.6;
          transition: all 0.3s ease;
        }
        .partner-logo:hover {
          filter: grayscale(0%);
          opacity: 1;
        }
      `}</style>

      {/* Heading at the top */}
      <div className="w-full text-center relative z-20">
        <h3 className="text-gray-500 font-bold text-[14px] md:text-[16px] tracking-tight leading-tight">
          We work with the best companies
        </h3>
      </div>

      {/* Scrolling Logos Container */}
      <div className="w-full overflow-hidden relative py-2 z-20">
        {/* Fade gradients on inner scroll edges */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-full overflow-hidden">
          <div className="ticker-track gap-16 md:gap-24">
            {repeatedLogos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center shrink-0">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
