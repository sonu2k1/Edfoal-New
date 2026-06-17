"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { OriginButton } from "@/components/ui/origin-button";
import { Globe } from "@/components/ui/cosmic-404";

// 🎞️ Animation Variants
const fadeUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const globeVariants: any = {
  hidden: { scale: 0.85, opacity: 0, y: 10 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
  floating: {
    y: [-4, 4],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export interface NotFoundProps {
  title?: string;
  description?: string;
  backText?: string;
  onBack?: () => void;
}

export default function NotFound({
  title = "Ups! Lost in space",
  description = "We couldn’t find the page you’re looking for. It might have been moved or deleted.",
  backText = "Go Back",
  onBack,
}: NotFoundProps) {
  const router = useRouter();
  const handleBack = onBack || (() => router.push("/"));

  return (
    <div className="flex flex-col justify-center items-center px-4 h-screen bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeUp}
        >
          <div className="flex items-center justify-center gap-6 mb-10">
            <motion.span
              className="text-7xl md:text-8xl font-bold text-gray-900 select-none"
              variants={fadeUp}
            >
              4
            </motion.span>

            <motion.div
              className="relative w-24 h-24 md:w-32 md:h-32"
              variants={globeVariants}
              animate={["visible", "floating"]}
            >
              <Globe />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08)_0%,transparent_70%)]" />
            </motion.div>

            <motion.span
              className="text-7xl md:text-8xl font-bold text-gray-900 select-none"
              variants={fadeUp}
            >
              4
            </motion.span>
          </div>

          <motion.h1
            className="mb-4 text-3xl md:text-5xl font-semibold tracking-tight text-gray-900"
            variants={fadeUp}
          >
            {title}
          </motion.h1>

          <motion.p
            className="mx-auto mb-0 max-w-md text-base md:text-lg text-gray-500"
            variants={fadeUp}
          >
            {description}
          </motion.p>

          <div className="h-4" /> {/* Guarantees 56px spacing without margin collapsing */}

          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="rounded-full w-[160px] h-[40px] flex items-center justify-center hover:scale-105 transition-all duration-500 cursor-pointer">
              <OriginButton
                onClick={handleBack}
                className="w-full h-full rounded-full px-0 text-sm font-semibold tracking-wide border-[0.5px]"
                style={{
                  "--ic-card": "#ffffff",
                  "--ic-card-foreground": "#000000",
                  "--ic-border": "#000000",
                  "--ic-foreground": "#000000",
                  "--ic-background": "#ffffff",
                } as React.CSSProperties}
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                {backText}
              </OriginButton>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
