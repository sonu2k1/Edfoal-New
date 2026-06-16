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

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
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
}

function calculateGap(width: number) {
  if (width < 640) return 90;
  if (width < 1024) return 180;
  return 240;
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
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

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
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
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    
    // Responsive scale
    const baseScale = containerWidth < 640 ? 0.8 : 1;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(${baseScale}) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(${baseScale * 0.8}) rotateY(12deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(${baseScale * 0.8}) rotateY(-12deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(0px) scale(0.5)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* 3D Cards Container */}
      <div 
        className="relative w-full flex items-center justify-center h-[380px] [perspective:1000px] overflow-visible" 
        ref={imageContainerRef}
      >
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={testimonial.src}
              className="absolute w-[380px] h-[380px] rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] bg-zinc-900 border border-white/10 select-none origin-center"
              style={getImageStyle(index)}
            >
              {/* Background Image */}
              <img
                src={testimonial.src}
                alt={testimonial.name}
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              />
              
              {/* Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20 z-10" />

              {/* Card Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-7 text-left">
                {/* Title */}
                <h3
                  className="font-bold mb-1.5 leading-tight tracking-wide"
                  style={{ color: colorName, fontSize: fontSizeName }}
                >
                  {testimonial.name}
                </h3>
                
                {/* Designation / Subtitle */}
                <p
                  className="mb-3 font-semibold uppercase tracking-widest"
                  style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
                >
                  {testimonial.designation}
                </p>

                {/* Quote / Description inside the card */}
                <p
                  className="leading-relaxed line-clamp-3 mb-5"
                  style={{ color: colorTestimony, fontSize: fontSizeQuote }}
                >
                  {testimonial.quote}
                </p>

                {/* Learn More link */}
                <div className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold text-sm transition-colors cursor-pointer w-fit">
                  <span>Learn More</span>
                  <FaArrowRight className="w-3.5 h-3.5 mt-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
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
    </div>
  );
};

export default CircularTestimonials;
