"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Smile, Send, MapPin } from "lucide-react";
import { OriginButton } from "@/components/ui/OriginButton";
import { CardSpotlight } from "@/components/ui/CardSpotlight";

interface FeatureItem {
  icon: string;
  text: string;
}

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  icon?: string;
  features?: FeatureItem[];
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
  className?: string;
  showArrows?: boolean;
  style?: React.CSSProperties;
  showBackgroundCards?: boolean;
}

function calculateGap(width: number) {
  if (width < 640) return 80;
  if (width < 1024) return 120;
  return 150; // A more compact desktop gap
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  className = "",
  showArrows = true,
  style = {},
  showBackgroundCards = true,
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#fff";
  const colorDesignation = colors.designation ?? "#a1a1aa";
  const colorTestimony = colors.testimony ?? "#e4e4e7";
  const colorArrowBg = colors.arrowBackground ?? "#1f2937";
  const colorArrowFg = colors.arrowForeground ?? "#fff";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#3b82f6";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.875rem";
  const fontSizeQuote = fontSizes.quote ?? "0.95rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);

  // Responsive gap calculation based on window width
  useEffect(() => {
    function handleResize() {
      setContainerWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.4;
    const offset = (index - activeIndex + testimonialsLength) % testimonialsLength;

    // Responsive scale
    const baseScale = containerWidth < 640 ? 0.8 : 1;

    if (offset === 0) {
      // Center (Active)
      return {
        zIndex: 10,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(${baseScale}) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    if (offset === 1) {
      // Immediate Right (Hidden)
      return {
        zIndex: 1,
        opacity: 0,
        pointerEvents: "none",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(${baseScale * 0.8}) rotateY(-12deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    if (offset === testimonialsLength - 1) {
      // Immediate Left
      return {
        zIndex: 5,
        opacity: showBackgroundCards ? 0.65 : 0,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(${baseScale * 0.8}) rotateY(12deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    if (offset === 2 && testimonialsLength === 4) {
      // Back center for exactly 4 cards
      return {
        zIndex: 2,
        opacity: showBackgroundCards ? 0.35 : 0,
        pointerEvents: "none",
        transform: `translateX(0px) translateY(-${maxStickUp * 1.6}px) scale(${baseScale * 0.68}) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    if (offset === 2) {
      // Back Right (for >4 cards) - Hidden
      return {
        zIndex: 1,
        opacity: 0,
        pointerEvents: "none",
        transform: `translateX(${gap * 0.5}px) translateY(-${maxStickUp * 1.4}px) scale(${baseScale * 0.7}) rotateY(-6deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    if (offset === testimonialsLength - 2) {
      // Back Left (for >4 cards)
      return {
        zIndex: 2,
        opacity: showBackgroundCards ? 0.3 : 0,
        pointerEvents: "none",
        transform: `translateX(-${gap * 0.5}px) translateY(-${maxStickUp * 1.4}px) scale(${baseScale * 0.7}) rotateY(6deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }

    // Hide any other cards if list is even larger
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(0px) translateY(0px) scale(0.5)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  return (
    <div
      className={`w-full flex flex-col items-center justify-center ${className}`}
      style={style}
    >
      {/* 3D Cards Container */}
      <div
        className="relative flex h-[320px] w-full items-center justify-center overflow-visible perspective-[1000px] sm:h-[360px] md:h-[380px]"
        ref={imageContainerRef}
      >
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={testimonial.src}
              className="absolute h-[320px] w-[min(82vw,320px)] origin-center select-none sm:h-[340px] sm:w-[340px] md:h-[380px] md:w-[380px]"
              style={getImageStyle(index)}
            >
              <CardSpotlight
                color="#f4f4f5"
                showGradient={false}
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl bg-white/95 border border-neutral-200/80 dark:border-neutral-200/80 dark:bg-white/95 backdrop-blur-sm"
              >
                {/* Card Content - matching Realtime tracking style */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-y-3 p-4 text-center sm:gap-y-4 sm:p-6">
                  {/* Icon Badge */}
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                    {testimonial.icon === "globe" && <Globe className="w-5 h-5 text-gray-800" />}
                    {testimonial.icon === "smile" && <Smile className="w-5 h-5 text-gray-800" />}
                    {testimonial.icon === "send" && <Send className="w-5 h-5 text-gray-800" />}
                    {testimonial.icon === "mappin" && <MapPin className="w-5 h-5 text-gray-800" />}
                    {!testimonial.icon && <Globe className="w-5 h-5 text-gray-800" />}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-2xl">
                    {testimonial.name}
                  </h3>

                  {/* Description */}
                  <p className="max-w-[280px] text-xs font-normal leading-relaxed text-zinc-500 sm:text-sm">
                    {testimonial.quote}
                  </p>

                  {/* Feature Bullets */}
                  {testimonial.features && testimonial.features.length > 0 && (
                    <div className="mx-auto flex w-fit flex-col items-start space-y-1.5 text-left sm:space-y-2">
                      {testimonial.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-gray-700 sm:gap-3 sm:text-sm">
                          {feature.icon === "smile" && <Smile className="w-[18px] h-[18px] text-blue-500 shrink-0" />}
                          {feature.icon === "globe" && <Globe className="w-[18px] h-[18px] text-blue-500 shrink-0" />}
                          {feature.icon === "send" && <Send className="w-[18px] h-[18px] text-blue-500 shrink-0" />}
                          {feature.icon === "mappin" && <MapPin className="w-[18px] h-[18px] text-blue-500 shrink-0" />}
                          <span>{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Learn More Button */}
                  <div className="w-full flex justify-center">
                    <div className="inline-flex h-10 w-36 items-center justify-center rounded-full sm:w-[160px]">
                      <OriginButton
                        className="h-full w-full rounded-full border-0 px-0 text-xs font-bold tracking-wide sm:text-sm"
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
                </div>
              </CardSpotlight>
            </div>
          );
        })}
      </div>

      {showArrows && (
        /* Navigation Buttons */
        <div className="flex gap-6 mt-12 z-30">
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 border border-white/15 text-white"
            onClick={handlePrev}
            style={{
              backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
            }}
            onMouseEnter={() => setHoverPrev(true)}
            onMouseLeave={() => setHoverPrev(false)}
            aria-label="Previous testimonial"
          >
            <FaArrowLeft size={18} color={colorArrowFg} />
          </button>
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 border border-white/15 text-white"
            onClick={handleNext}
            style={{
              backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
            }}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            aria-label="Next testimonial"
          >
            <FaArrowRight size={18} color={colorArrowFg} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CircularTestimonials;
