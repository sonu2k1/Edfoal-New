"use client";

import React from "react";

export default function LogoTicker() {
  const onErr = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Hide the image completely if it fails to load (broken URL or missing local file)
    e.currentTarget.style.display = "none";
  };

  const logos = [
    <img key="bhavishya"   src="https://ik.imagekit.io/edfoalImage/assets/image/bhavishyaNGO.png"      alt="Bhavishya NGO"                   className="partner-logo" onError={onErr} />,
    <img key="gvngo"       src="https://ik.imagekit.io/edfoalImage/assets/image/gvngo.png"              alt="GV NGO"                           className="partner-logo" onError={onErr} />,
    <img key="workfin"     src="https://ik.imagekit.io/edfoalImage/assets/image/workfin.png"            alt="Workfin"                          className="partner-logo" onError={onErr} />,
    <img key="rocksteady"  src="https://ik.imagekit.io/edfoalImage/assets/image/rocksteadydigital.png"  alt="Rocksteady Digital"               className="partner-logo" onError={onErr} />,
    <img key="lochhomes"   src="https://ik.imagekit.io/edfoalImage/assets/image/lochhomes1.png"         alt="Loch Homes"                       className="partner-logo" onError={onErr} />,
    // ⚠ Place the actual file at public/logos/view-autism-services.webp to make this logo appear
    <img key="view-autism" src="/logos/view-autism-services.webp"                                                                         alt="Beyond the View Autism Services"  className="partner-logo" onError={onErr} />,
    <img key="beyond-view" src="https://ik.imagekit.io/sonu2k1/TEst/Logos/logo.webp?updatedAt=1780330681267"                             alt="Beyond the View"                  className="partner-logo" onError={onErr} />,
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

      {/* Scrolling Logos Container */}
      <div className="w-full overflow-hidden relative py-2 z-20">
        {/* Fade gradients on inner scroll edges */}
        <div className="absolute top-0 bottom-0 left-0 w-10 md:w-16 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-10 md:w-16 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

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
