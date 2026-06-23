"use client";
import { Globe3D, GlobeMarker } from "@/components/ui/Globe3D";
import { Globe, Smile, MousePointer2, ChevronRight, MapPin, Send } from "lucide-react";
import { OriginButton } from "@/components/ui/OriginButton";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { CircularTestimonials } from "@/components/sections/home/CircularTestimonials";

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow",
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul",
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
    <div className="relative my-8 h-[800px] w-full max-w-[1400px] overflow-hidden rounded-3xl bg-white p-8 md:p-16 shadow-sm shadow-black/5 flex flex-col justify-start items-start">
      {/* Top Row: Left card + Right circular testimonials */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-start justify-between gap-8">
        {/* Left: Realtime Tracking Card */}
        <CardSpotlight
          color="#f4f4f5"
          showGradient={false}
          className="relative z-10 text-gray-900 dark:text-gray-900 rounded-3xl border border-neutral-200/80 dark:border-neutral-200/80 bg-white/95 dark:bg-white/95 backdrop-blur-sm shadow-2xl overflow-hidden w-full max-w-[380px] h-[380px] flex flex-col justify-center gap-y-5 items-center p-6 text-center shrink-0"
        >
          {/* Header Section */}
          <div className="relative z-20 flex flex-col items-center">
            {/* Globe icon badge */}
            <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-3">
              <Globe className="w-5 h-5 text-gray-800" />
            </div>

            {/* Title */}
            <h3 className="mb-1 text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Realtime tracking
            </h3>

            {/* Subtitle */}
            <p className="text-zinc-600 text-md leading-relaxed font-normal max-w-[280px]">
              Watch visitors arrive and interact with your site as it happens.
            </p>
          </div>

          {/* Feature bullets */}
          <div className="relative z-20 space-y-2.5 w-fit text-left flex flex-col items-start mx-auto">
            <div className="flex items-center gap-3 text-gray-700 text-sm font-semibold">
              <Smile className="w-[18px] h-[18px] text-blue-500 shrink-0" />
              <span>AI-Driven Automation</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 text-sm font-semibold">
              <Globe className="w-[18px] h-[18px] text-blue-500 shrink-0" />
              <span>Custom AI Systems</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 text-sm font-semibold">
              <Send className="w-[18px] h-[18px] text-blue-500 shrink-0" />
              <span>Customer Feedback Intelligence</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 text-sm font-semibold">
              <MapPin className="w-[18px] h-[18px] text-blue-500 shrink-0" />
              <span>Knowledge Base Optimization</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="relative z-20 w-full flex justify-center">
            <div className="inline-flex rounded-full w-[160px] h-[40px] items-center justify-center">
              <OriginButton
                className="w-full h-full rounded-full px-0 text-sm font-bold tracking-wide border-0"
                style={{
                  "--ic-card": "#0f172a",
                  "--ic-card-foreground": "#ffffff",
                  "--ic-border": "transparent",
                  "--ic-foreground": "#ffffff",
                  "--ic-background": "#0f172a",
                } as React.CSSProperties}
                onClick={() => {
                  const contactElem = document.getElementById("contact");
                  if (contactElem) {
                    contactElem.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Learn more
              </OriginButton>
            </div>
          </div>
        </CardSpotlight>

        {/* Right: Circular Testimonials Cards */}
        <div className="relative z-10 flex-1 flex items-start justify-end overflow-visible rounded-2xl min-h-[380px] lg:pr-12">
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
            className="lg:max-w-[550px] lg:ml-auto lg:translate-x-[30px] xl:translate-x-[82px] transition-transform duration-500"
          />
        </div>
      </div>

      {/* Globe Canvas positioned absolutely like the original */}
      <Globe3D
        className="absolute -bottom-[550px] -left-0 h-[1200px]"
        markers={sampleMarkers}
        config={{
          atmosphereColor: "#4da6ff",
          atmosphereIntensity: 20,
          bumpScale: 5,
          autoRotateSpeed: 0.3,
        }}
        onMarkerClick={(marker) => {
          console.log("Clicked marker:", marker.label);
        }}
        onMarkerHover={(marker) => {
          if (marker) {
            console.log("Hovering:", marker.label);
          }
        }}
      />
    </div>
  );
}


