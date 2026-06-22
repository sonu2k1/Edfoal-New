"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Package, Calendar, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TimeLine_01Entry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface TimeLine_01Props {
  title?: string;
  description?: string;
  entries?: TimeLine_01Entry[];
  className?: string;
}

export const defaultEntries: TimeLine_01Entry[] = [
  {
    icon: Zap,
    title: "Automation",
    subtitle: "Streamlined Workflows",
    description:
      "Unlock smarter workflows with intelligent automation that adapts to your business. We don't just replace manual tasks, we reimagine them to be faster, scalable, and insight-driven.",
    items: [
      "Intelligent workflow orchestration and routing",
      "Custom business process bots and agents",
      "Advanced data extraction and synchronization pipelines",
      "API integrations connecting legacy systems to AI engines",
      "Proactive error monitoring and automated recovery routines"
    ],
    image:
      "https://edfoal.com/assets/image/service1.jpg",
    button: {
      url: "/services/automation",
      text: "Explore Automation",
    },
  },
  {
    icon: Sparkles,
    title: "Tailored AI Solutions",
    subtitle: "Custom-built Architecture",
    description:
      "No off-the-shelf shortcuts — we build AI that is purpose-built for your business goals. From concept to deployment, every solution is custom-trained to think and execute exactly the way your organization works.",
    items: [
      "Custom Large Language Model (LLM) training and fine-tuning",
      "Secure Retrieval-Augmented Generation (RAG) pipelines for private data",
      "Computer vision systems for automated image and video processing",
      "Predictive machine learning models tailored to industry data",
      "API-first architecture for seamless enterprise deployment"
    ],
    image:
      "https://ik.imagekit.io/edfoalImage/assets/image/service2.jpg",
    button: {
      url: "/services/tailored-ai-solutions",
      text: "Explore AI Solutions",
    },
  },
  {
    icon: Package,
    title: "AI Consultancy",
    subtitle: "Strategic Implementation",
    description:
      "Bridge the gap between possibility and performance. Our consultancy turns AI from a buzzword into a strategic business asset, guiding you from ideation to implementation with absolute clarity and measurable impact.",
    items: [
      "AI roadmap planning and technical feasibility assessment",
      "Enterprise tech stack evaluation and custom recommendations",
      "Data governance, compliance strategies, and privacy planning",
      "Team upskilling workshops and structured change management",
      "Continuous performance optimization and ROI tracking"
    ],
    image:
      "https://ik.imagekit.io/edfoalImage/assets/image/service3.jpg",
    button: {
      url: "/services/ai-consultancy",
      text: "Explore Consultancy",
    },
  },
];

/**
 * Behavior: Only the card that is currently centered in the viewport is "open".
 * As you scroll, the active card expands to reveal its full content. Others stay collapsed.
 */
export default function TimeLine_01({
  title = "Our Services",
  description = "Tailored technologies designed to drive your business forward and address your unique challenges!",
  entries = defaultEntries,
  className,
}: TimeLine_01Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Create stable setters for refs inside map
  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    itemRefs.current[i] = el;
  };
  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    // We observe small sentinels placed near the title of each card. Whichever
    // sentinel is closest to the vertical center/upper-third of the viewport becomes active.
    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;

      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });

      if (bestIndex !== activeIndex) {
        setActiveIndex(bestIndex);
      }
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  // Optional: ensure the first card is active on mount
  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <section className={cn("relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24", className)}>
      <div>
        <div className="mx-auto max-w-3xl text-center md:text-left">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl text-white">
            {title}
          </h1>
          <p className="mb-6 text-sm text-zinc-400 md:text-base leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-16 md:mt-24 md:space-y-24">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="relative flex flex-col gap-6 md:flex-row md:gap-16"
                ref={(el) => setItemRef(el, index)}
                aria-current={isActive ? "true" : "false"}
              >
                {/* Sticky meta column */}
                <div className="top-28 flex h-min w-full md:w-64 shrink-0 items-center gap-4 md:sticky z-10">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2.5 rounded-xl border transition-all duration-300",
                      isActive
                        ? "bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                        : "bg-zinc-900/50 text-zinc-500 border-zinc-800"
                    )}>
                      <entry.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-sm font-semibold transition-colors duration-300",
                        isActive ? "text-purple-300" : "text-zinc-400"
                      )}>
                        {entry.title}
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">
                        {entry.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Invisible sentinel near the card title to measure proximity to viewport center */}
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0 pointer-events-none"
                />

                {/* Content column */}
                <article
                  className={cn(
                    "flex flex-col rounded-2xl border p-5 md:p-6 transition-all duration-500 ease-in-out w-full backdrop-blur-xl",
                    isActive
                      ? "border-purple-500/30 bg-zinc-900/40 shadow-[0_0_50px_rgba(168,85,247,0.05)]"
                      : "border-white/5 bg-zinc-950/20"
                  )}
                >
                  {entry.image && (
                    <div className="mb-5 overflow-hidden rounded-xl border border-white/5 bg-zinc-950/30 aspect-[16/9] w-full">
                      <img
                        src={entry.image}
                        alt={`${entry.title} visual`}
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-700 ease-out",
                          isActive ? "scale-105" : "scale-100 opacity-80"
                        )}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="space-y-4">
                    {/* Header with improved typography */}
                    <div className="space-y-2">
                      <h2
                        className={cn(
                          "text-base md:text-lg font-bold leading-tight tracking-tight transition-colors duration-200",
                          isActive ? "text-white" : "text-zinc-400"
                        )}
                      >
                        {entry.title}
                      </h2>

                      {/* Improved description with better spacing */}
                      <p
                        className={cn(
                          "text-xs md:text-sm leading-relaxed transition-all duration-300",
                          isActive
                            ? "text-zinc-300 line-clamp-none"
                            : "text-zinc-500 line-clamp-2"
                        )}
                      >
                        {entry.description}
                      </p>
                    </div>

                    {/* Enhanced expandable content */}
                    <div
                      aria-hidden={!isActive}
                      className={cn(
                        "grid transition-all duration-500 ease-out",
                        isActive
                          ? "grid-rows-[1fr] opacity-100 mt-2"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 pt-2">
                          {entry.items && entry.items.length > 0 && (
                            <div className="rounded-xl border border-white/5 bg-zinc-950/60 p-4">
                              <ul className="space-y-2">
                                {entry.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-400"
                                  >
                                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500/60 flex-shrink-0" />
                                    <span className="leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {entry.button && (
                            <div className="flex justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                className="group hover:bg-purple-500/20 hover:text-purple-300 border-white/10 hover:border-purple-500/30 font-medium transition-all duration-200 text-xs rounded-full bg-black/40 text-zinc-300"
                                asChild
                              >
                                <a href={entry.button.url}>
                                  {entry.button.text}
                                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
