"use client";

import React from "react";
import { LayoutGrid } from "@/components/ui/LayoutGrid";

/* ───── Overlay content for each industry card (shown on click) ───── */

const RealEstateContent = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Real Estate
    </p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Revolutionizing property management with smart listing platforms,
      virtual tour experiences, and AI-powered valuation tools that
      streamline buying, selling, and renting.
    </p>
  </div>
);

const HealthcareContent = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Healthcare
    </p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Empowering hospitals, clinics, and pharma companies with AI-driven
      diagnostics, patient engagement platforms, and compliant digital
      ecosystems that transform care delivery.
    </p>
  </div>
);

const FinanceContent = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Finance
    </p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Building secure, scalable fintech solutions — from real-time fraud
      detection to intelligent trading platforms — that accelerate digital
      transformation in banking and insurance.
    </p>
  </div>
);

const TechnologyContent = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Technology
    </p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Delivering cutting-edge software solutions, cloud infrastructure,
      and AI/ML integrations that empower tech companies to scale faster
      and innovate boldly.
    </p>
  </div>
);

const EducationContent = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Education
    </p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Crafting immersive learning experiences with adaptive AI tutoring,
      gamified platforms, and data-driven student analytics for institutions
      worldwide.
    </p>
  </div>
);

/* ───── Industry cards data ───── */

const industryCards = [
  {
    id: 1,
    title: "Real Estate",
    content: <RealEstateContent />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    title: "Healthcare",
    content: <HealthcareContent />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    title: "Finance",
    content: <FinanceContent />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 4,
    title: "Technology",
    content: <TechnologyContent />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 5,
    title: "Education",
    content: <EducationContent />,
    className: "md:col-span-3",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

/* ───── IndustriesCover Section ───── */

export default function IndustriesCover() {
  return (
    <section
      id="industries"
      className="relative w-full overflow-hidden bg-white py-16"
    >
      <div
        className="w-full mx-auto"
        style={{ maxWidth: "1400px", margin: "50px auto" }}
      >
        {/* ── Section header ── */}
        <div className="w-full text-center mb-4">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 mb-8">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600" />
            </span>
            <span className="text-xs font-semibold tracking-widest text-gray-600 uppercase leading-none">
              Industries Cover
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
           Industries We Serve{" "}
            {/* <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
             We Serve
            </span> */}
          </h2>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 leading-relaxed" style={{margin:"1rem 0 2rem 22rem "}} >
            From healthcare to fintech, we deliver tailor-made digital products
            and AI-powered platforms that solve real-world challenges across
            diverse sectors.
          </p>
        </div>

        {/* ── Interactive grid ── */}
        <div className="h-175 md:h-200 w-full">
          <LayoutGrid cards={industryCards} />
        </div>
      </div>
    </section>
  );
}
