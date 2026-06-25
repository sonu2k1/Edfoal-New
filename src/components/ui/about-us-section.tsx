"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import {
  BrainCircuit,
  Cpu,
  BarChart3,
  SearchCode,
  Layers,
  Sparkles,
  Award,
  Users,
  Calendar,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring, type Variants } from "framer-motion";

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const services = [
    {
      icon: <BrainCircuit className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#1D6ACF]" />,
      title: "AI Strategy",
      description:
        "Transform your business with tailored AI strategy and consulting. We align custom AI models with your operational goals to drive real value.",
      position: "left",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#1D6ACF]" />,
      title: "Process Automation",
      description:
        "Optimize your daily workflows using advanced AI automation to save thousands of hours of manual labor and reduce operational costs.",
      position: "left",
    },
    {
      icon: <SearchCode className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#1D6ACF]" />,
      title: "Custom AI Models",
      description:
        "Build bespoke machine learning systems and large language models fully customized to your proprietary datasets and security standards.",
      position: "left",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#1D6ACF]" />,
      title: "Seamless Integration",
      description:
        "We integrate state-of-the-art AI systems directly into your existing infrastructure, CRM, and tools with minimal disruption.",
      position: "right",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#1D6ACF]" />,
      title: "Data Intelligence",
      description:
        "Uncover hidden opportunities with advanced predictive analytics, turning raw database structures into actionable insights.",
      position: "right",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#1D6ACF]" />,
      title: "Flawless Execution",
      description:
        "From early concepts to cloud-scaled deployments, our technical experts handle implementation with professional precision.",
      position: "right",
    },
  ];

  const stats = [
    { icon: <Award className="w-6 h-6" />, value: 150, label: "AI Solutions Delivered", suffix: "+" },
    { icon: <Users className="w-6 h-6" />, value: 1200, label: "Happy Client Teams", suffix: "+" },
    { icon: <Calendar className="w-6 h-6" />, value: 5, label: "Years Combined R&D", suffix: "+" },
    { icon: <TrendingUp className="w-6 h-6" />, value: 98, label: "Efficiency Boost Rate", suffix: "%" },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      data-theme="light"
      className="relative w-full overflow-hidden bg-white px-4 py-14 text-zinc-900 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-10 lg:py-24"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute left-4 top-20 h-40 w-40 rounded-full bg-[#1D6ACF]/5 blur-3xl sm:left-10 sm:h-64 sm:w-64"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-4 h-48 w-48 rounded-full bg-[#A9BBC8]/5 blur-3xl sm:right-10 sm:h-80 sm:w-80"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#1D6ACF]/30"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#A9BBC8]/30"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="mb-5 flex flex-col items-center sm:mb-6" variants={itemVariants}>
          <motion.span
            className="text-[#1D6ACF] font-semibold tracking-[0.2em] mb-2 flex items-center gap-2 text-xs uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            ABOUT US
          </motion.span>
          <h2 className="mb-4 text-center text-[36px] font-extrabold leading-[1.05] tracking-tight text-zinc-950 md:leading-[1.1]">
            Who We Are at EdFoal AI
          </h2>
          <motion.div
            className="w-24 h-1 bg-[#1D6ACF]"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.div className="mx-auto mb-10 max-w-4xl space-y-5 text-center text-sm font-normal leading-relaxed text-zinc-800 sm:mb-12 sm:text-base md:mb-16 md:text-lg" variants={itemVariants}>
          <p className="mx-auto text-center max-w-none">
            At EdFoal AI, we are passionate about leveraging the transformative power of artificial intelligence to help businesses succeed. Founded with the vision of making AI accessible and impactful, we specialize in designing tailored AI solutions that reduce costs, save time, and enhance overall efficiency. Our mission is simple: to empower businesses with intelligent tools that solve their unique challenges and create new opportunities for growth.
          </p>
          <p className="mx-auto text-center max-w-none">
            We understand that no two businesses are the same, which is why we take a personalized approach to every project. Our team of AI experts works closely with clients to understand their specific needs, design innovative AI systems, and implement seamless solutions that integrate perfectly into existing operations. Whether you&apos;re looking to automate processes, gain actionable insights from data, or develop a completely custom AI solution, EdFoal AI is your trusted partner in driving results. We help companies of all sizes unlock their full potential and stay competitive in today’s rapidly evolving marketplace.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(220px,320px)_minmax(0,1fr)] lg:gap-8">
          {/* Left Column */}
          <div className="order-2 space-y-8 sm:space-y-10 lg:order-1 lg:space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="order-1 mb-2 flex items-center justify-center lg:order-2 lg:mb-0">
            <motion.div className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-xs" variants={itemVariants}>
              <motion.div
                className="h-[340px] w-full overflow-hidden rounded-md shadow-xl sm:h-[430px] lg:h-[580px]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img
                  src="https://ik.imagekit.io/edfoalImage/assets/image/abouthero.png"
                  alt="Professional in suit"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-[#202e44]/50 to-transparent p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <motion.button
                    className="bg-white text-[#202e44] px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Our Solutions <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute inset-0 border-4 border-[#A9BBC8] rounded-md -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>

              {/* Floating accent elements */}
              <motion.div
                className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-[#1D6ACF]/10 sm:-right-8 sm:h-16 sm:w-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-6 -left-5 h-14 w-14 rounded-full bg-[#A9BBC8]/15 sm:-left-10 sm:h-20 sm:w-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              ></motion.div>

              {/* Additional decorative elements */}
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#1D6ACF]"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A9BBC8]"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="order-3 space-y-8 sm:space-y-10 lg:space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-14 grid grid-cols-1 gap-5 sm:mt-18 sm:grid-cols-2 sm:gap-6 lg:mt-24 lg:grid-cols-4 lg:gap-8"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>


      </motion.div>
    </section>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  variants: Variants;
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
  return (
    <motion.div
      className="group mx-auto flex max-w-sm flex-col items-center text-center lg:max-w-none"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex flex-col items-center gap-2 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-[#1D6ACF] bg-[#1D6ACF]/10 p-3 rounded-lg transition-colors duration-300 group-hover:bg-[#1D6ACF]/20 relative"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-lg font-medium text-zinc-900 transition-colors duration-300 group-hover:text-[#1D6ACF] sm:text-xl">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="mx-auto max-w-sm px-1 text-center text-sm leading-relaxed text-zinc-600 sm:px-4 lg:max-w-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 flex items-center justify-center text-[#1D6ACF] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </motion.div>
    </motion.div>
  );
}

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const hasAnimatedRef = useRef(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimatedRef.current) {
      springValue.set(value);
      hasAnimatedRef.current = true;
    } else if (!isInView && hasAnimatedRef.current) {
      springValue.set(0);
      hasAnimatedRef.current = false;
    }
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="group flex flex-col items-center rounded-xl border border-zinc-100/80 bg-zinc-50/50 p-5 text-center transition-all duration-300 hover:bg-white hover:shadow-md sm:p-6"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-[#202e44]/5 flex items-center justify-center mb-4 text-[#1D6ACF] group-hover:bg-[#1D6ACF]/10 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-zinc-900 flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-zinc-600 text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-[#1D6ACF] mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}
