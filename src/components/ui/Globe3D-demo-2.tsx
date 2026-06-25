"use client";
import dynamic from "next/dynamic";
import { Globe, Smile, MousePointer2, ChevronRight, MapPin, Send } from "lucide-react";
import { OriginButton } from "@/components/ui/OriginButton";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { CircularTestimonials } from "@/components/sections/home/CircularTestimonials";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

const globeConfig = {
  pointSize: 4,
  globeColor: "#ffffff",
  showAtmosphere: true,
  atmosphereColor: "#cbd5e1",
  atmosphereAltitude: 0.1,
  emissive: "#ffffff",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(15, 23, 42, 0.8)",
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
  cameraZ: 240,
};

const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: colors[0],
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: colors[1],
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: colors[2],
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: colors[0],
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: colors[2],
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: colors[0],
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[2],
  },
];

const serviceTestimonials = [
  {
    quote: "Capture and analyze customer feedback to uncover valuable insights, improve products, and boost customer satisfaction.",
    name: "Customer Feedback Intelligence",
    designation: "AI Solution",
    src: "https://images.unsplash.com/photo-1552581230-c015914626ed?q=80&w=1368&auto=format&fit=crop",
    icon: "send",
    features: [
      { icon: "smile", text: "Sentiment Analysis" },
      { icon: "globe", text: "Multi-Channel Collection" },
      { icon: "send", text: "Automated Surveys" },
      { icon: "mappin", text: "Insight Dashboards" },
    ],
  },
  {
    quote: "Get AI tailored to your business needs, enhancing efficiency and solving unique challenges with personalized solutions.",
    name: "Custom AI Systems",
    designation: "AI Solution",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1368&auto=format&fit=crop",
    icon: "globe",
    features: [
      { icon: "smile", text: "Tailored Models" },
      { icon: "globe", text: "Scalable Architecture" },
      { icon: "send", text: "API Integration" },
      { icon: "mappin", text: "Real-time Processing" },
    ],
  },
  {
    quote: "Organize and update your knowledge base with AI, ensuring accurate and efficient customer support every time.",
    name: "Knowledge Base Optimization",
    designation: "AI Solution",
    src: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=1368&auto=format&fit=crop",
    icon: "mappin",
    features: [
      { icon: "smile", text: "Smart Categorization" },
      { icon: "globe", text: "Auto-updating Content" },
      { icon: "send", text: "Search Optimization" },
      { icon: "mappin", text: "Analytics & Reporting" },
    ],
  },
  {
    quote: "Automate routine tasks, boost productivity, and reduce errors with intelligent AI solutions that streamline your operations.",
    name: "AI-Driven Automation",
    designation: "AI Solution",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1368&auto=format&fit=crop",
    icon: "smile",
    features: [
      { icon: "smile", text: "Workflow Automation" },
      { icon: "globe", text: "Process Optimization" },
      { icon: "send", text: "Error Reduction" },
      { icon: "mappin", text: "Productivity Boost" },
    ],
  },
];

export default function Globe3DDemoSecond() {
  return (
    <div className="relative my-4 flex min-h-[960px] w-full max-w-[1400px] flex-col items-start justify-start overflow-hidden rounded-3xl bg-white p-4 shadow-sm shadow-black/5 sm:my-6 sm:min-h-[980px] sm:p-6 md:min-h-[940px] md:p-8 lg:my-8 lg:h-[800px] lg:min-h-0 lg:p-12 xl:p-16">
      {/* Top Row: Left card + Right circular testimonials */}
      <div className="relative z-10 flex w-full flex-col items-center justify-between gap-6 lg:flex-row lg:items-start lg:gap-8">
        {/* Left: Realtime Tracking Card */}
        <CardSpotlight
          color="#f4f4f5"
          showGradient={false}
          className="relative z-10 flex min-h-[320px] w-full max-w-88 shrink-0 flex-col items-center justify-center gap-y-5 overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/95 p-5 text-center text-gray-900 shadow-2xl backdrop-blur-sm dark:border-neutral-200/80 dark:bg-white/95 dark:text-gray-900 sm:h-[360px] sm:max-w-92 sm:p-6 lg:h-95 lg:max-w-95"
        >
          {/* Header Section */}
          <div className="relative z-20 flex flex-col items-center">
            {/* Globe icon badge */}
            <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-3">
              <Globe className="w-5 h-5 text-gray-800" />
            </div>

            {/* Title */}
            <h3 className="mb-1 text-[clamp(1.5rem,7vw,1.75rem)] font-extrabold leading-tight tracking-tight text-gray-900">
              Realtime tracking
            </h3>

            {/* Subtitle */}
            <p className="max-w-[280px] text-sm font-normal leading-relaxed text-zinc-600 sm:text-base">
              Watch visitors arrive and interact with your site as it happens.
            </p>
          </div>

          {/* Feature bullets */}
          <div className="relative z-20 mx-auto flex w-fit flex-col items-start space-y-2.5 text-left">
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <Smile className="w-[18px] h-[18px] text-blue-500 shrink-0" />
              <span>AI-Driven Automation</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <Globe className="w-[18px] h-[18px] text-blue-500 shrink-0" />
              <span>Custom AI Systems</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <Send className="w-[18px] h-[18px] text-blue-500 shrink-0" />
              <span>Customer Feedback Intelligence</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <MapPin className="w-[18px] h-[18px] text-blue-500 shrink-0" />
              <span>Knowledge Base Optimization</span>
            </div>
          </div>

        </CardSpotlight>

        {/* Right: Circular Testimonials Cards */}
        <div className="relative z-10 flex min-h-[330px] w-full flex-1 items-start justify-center overflow-visible rounded-2xl sm:min-h-[360px] md:min-h-[380px] lg:justify-end lg:pr-12">
          <CircularTestimonials
            testimonials={serviceTestimonials}
            autoplay={true}
            showArrows={false}
            showBackgroundCards={false}
            colors={{
              name: "#f7f7ff",
              designation: "#3b82f6",
              testimony: "#d4d4d8",
              arrowBackground: "#18181b",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "#3b82f6",
            }}
            fontSizes={{
              name: "20px",
              designation: "11px",
              quote: "13px",
            }}
            className="mx-auto max-w-full transition-transform duration-500 lg:ml-auto lg:max-w-[550px] lg:translate-x-[30px] xl:translate-x-[82px]"
          />
        </div>
      </div>

      {/* Globe Canvas positioned absolutely like the original */}
      <div className="absolute bottom-[-90px] left-0 z-10 h-[340px] w-full sm:bottom-[-120px] sm:h-[420px] md:bottom-[-180px] md:h-[600px] lg:bottom-[-220px] lg:h-168">
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>
    </div>
  );
}


