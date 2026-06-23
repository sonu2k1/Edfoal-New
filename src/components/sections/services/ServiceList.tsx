"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Sparkles,
  Layers,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OriginButton } from "@/components/ui/OriginButton";

interface ServiceItem {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  bullets: string[];
}

const services: ServiceItem[] = [
  {
    name: "Automation",
    title: "Streamlined Workflows",
    description:
      "Unlock smarter workflows with intelligent automation that adapts to your business. We don't just replace manual tasks, we reimagine them to be faster, scalable, and insight-driven.",
    imageUrl: "https://edfoal.com/assets/image/service1.jpg",
    href: "/services/automation",
    icon: Zap,
    bullets: [
      "Intelligent workflow orchestration and routing",
      "Custom business process bots and agents",
      "Advanced data extraction and synchronization pipelines",
      "API integrations connecting legacy systems to AI engines",
      "Proactive error monitoring and automated recovery routines"
    ],
  },
  {
    name: "Tailored AI Solutions",
    title: "Custom-built Architecture",
    description:
      "No off-the-shelf shortcuts — we build AI that is purpose-built for your business goals. From concept to deployment, every solution is custom-trained to think and execute exactly the way your organization works.",
    imageUrl: "https://ik.imagekit.io/edfoalImage/assets/image/service2.jpg",
    href: "/services/tailored-ai-solutions",
    icon: Sparkles,
    bullets: [
      "Custom Large Language Model (LLM) training and fine-tuning",
      "Secure Retrieval-Augmented Generation (RAG) pipelines for private data",
      "Computer vision systems for automated image and video processing",
      "Predictive machine learning models tailored to industry data",
      "API-first architecture for seamless enterprise deployment"
    ],
  },
  {
    name: "AI Consultancy",
    title: "Strategic Implementation",
    description:
      "Bridge the gap between possibility and performance. Our consultancy turns AI from a buzzword into a strategic business asset, guiding you from ideation to implementation with absolute clarity and measurable impact.",
    imageUrl: "https://ik.imagekit.io/edfoalImage/assets/image/service3.jpg",
    href: "/services/ai-consultancy",
    icon: Layers,
    bullets: [
      "AI roadmap planning and technical feasibility assessment",
      "Enterprise tech stack evaluation and custom recommendations",
      "Data governance, compliance strategies, and privacy planning",
      "Team upskilling workshops and structured change management",
      "Continuous performance optimization and ROI tracking"
    ],
  },
];

export interface ServicesShowcaseProps {
  isLight?: boolean;
}

export function ServicesShowcase({ isLight = false }: ServicesShowcaseProps) {
  const router = useRouter();

  return (
    <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-24 md:space-y-36 relative z-10">
      {services.map((service, index) => {
        const IconComponent = service.icon;
        const isEven = index % 2 === 0;

        return (
          <div
            key={service.name}
            className={cn(
              "flex flex-col items-center justify-center gap-8 md:gap-0",
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
          >
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={cn(
                "w-full md:w-[460px] h-[280px] md:h-[460px] rounded-3xl overflow-hidden shrink-0 shadow-2xl relative group",
                isLight ? "bg-zinc-100 border border-zinc-200" : "bg-zinc-950 border border-white/10"
              )}
            >
              <div className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300 group-hover:bg-black/5" />
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                draggable={false}
              />
            </motion.div>

            {/* Content Card Section */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className={cn(
                "rounded-3xl p-8 md:p-10 z-10 max-w-xl w-full relative overflow-hidden transition-all duration-300",
                isLight
                  ? "bg-white/95 border border-zinc-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl"
                  : "bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]",
                isEven ? "md:ml-[-80px]" : "md:mr-[-80px]"
              )}
              style={{ padding: "2rem", margin: "-2rem" }}
            >
              {/* Highlight Aura */}
              <div className={cn(
                "absolute top-0 right-0 w-[150px] h-[150px] rounded-full blur-[60px] pointer-events-none",
                isLight ? "bg-purple-500/3" : "bg-purple-500/5"
              )} />

              {/* Title Header */}
              <div className="mb-6 flex items-start gap-4">
                <div className={cn(
                  "p-2.5 rounded-xl border transition-colors",
                  isLight
                    ? "bg-purple-50 border-purple-100 text-purple-600"
                    : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                )}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h2 className={cn(
                    "text-2xl font-bold mb-1 tracking-tight transition-colors",
                    isLight ? "text-zinc-900" : "text-white"
                  )}>
                    {service.name}
                  </h2>
                  <p className={cn(
                    "text-xs font-semibold uppercase tracking-wider transition-colors",
                    isLight ? "text-purple-600" : "text-purple-400"
                  )}>
                    {service.title}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className={cn(
                "text-sm leading-relaxed mb-6 font-normal transition-colors",
                isLight ? "text-zinc-600" : "text-zinc-300"
              )}>
                {service.description}
              </p>

              {/* Feature Bullets */}
              <div className={cn(
                "rounded-xl border p-4 mb-6 transition-colors",
                isLight ? "bg-zinc-50 border-zinc-100" : "bg-zinc-950/40 border border-white/5"
              )}>
                <ul className="space-y-2">
                  {service.bullets.map((bullet, bulletIdx) => (
                    <li
                      key={bulletIdx}
                      className={cn(
                        "flex items-start gap-2.5 text-xs transition-colors",
                        isLight ? "text-zinc-600" : "text-zinc-400"
                      )}
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-purple-500/70 shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="flex">
                <OriginButton
                  className="w-[160px] h-[40px] rounded-full px-0 text-sm font-semibold tracking-wide border-[0.5px] cursor-pointer"
                  style={
                    isLight
                      ? ({
                        "--ic-card": "#ffffff",
                        "--ic-card-foreground": "#0f172a",
                        "--ic-border": "#0f172a",
                        "--ic-foreground": "#0f172a",
                        "--ic-background": "#ffffff",
                      } as React.CSSProperties)
                      : ({
                        "--ic-card": "#0f172a",
                        "--ic-card-foreground": "#ffffff",
                        "--ic-border": "#ffffff",
                        "--ic-foreground": "#ffffff",
                        "--ic-background": "#0f172a",
                      } as React.CSSProperties)
                  }
                  onClick={() => router.push(service.href)}
                >
                  Get Started <ArrowRight className="w-4 h-4 ml-1" />
                </OriginButton>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
