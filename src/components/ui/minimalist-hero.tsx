import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type IconComponent = React.ComponentType<{ className?: string }>;

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText?: string;
  navLinks?: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks?: { icon: IconComponent; href: string }[];
  locationText?: string;
  className?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: IconComponent }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText = "mnmlst.",
  navLinks = [],
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks = [],
  locationText = "",
  className,
  hideHeader = false,
  hideFooter = false,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex min-h-[620px] w-full flex-col items-center justify-between overflow-hidden bg-background px-4 py-16 font-sans sm:px-6 md:min-h-[680px] md:p-10 lg:min-h-[760px] lg:p-12',
        className
      )}
    >
      {/* Header */}
      {!hideHeader && (
        <header className="z-30 flex w-full max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold tracking-wider"
          >
            {logoText}
          </motion.div>
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-1.5 md:hidden"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-foreground"></span>
            <span className="block h-0.5 w-6 bg-foreground"></span>
            <span className="block h-0.5 w-5 bg-foreground"></span>
          </motion.button>
        </header>
      )}

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl grow grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-6">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 text-center md:order-1 md:text-left"
        >
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-foreground/80 sm:text-[15px] md:mx-0 md:max-w-xs">{mainText}</p>
          <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font">
            Read More
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 flex h-[320px] items-center justify-center sm:h-[360px] md:order-2 md:h-full">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute z-0 h-64 w-64 rounded-full bg-yellow-400/90 sm:h-76 sm:w-76 md:h-96 md:w-96 lg:h-[500px] lg:w-[500px]"
            ></motion.div>
            <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 h-auto w-44 scale-[1.4] object-cover sm:w-52 md:w-64 md:scale-150 lg:w-72"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                }}
            />
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start md:text-left"
        >
          <h1 className="text-[clamp(3.75rem,18vw,7rem)] font-extrabold leading-[0.95] text-foreground md:text-[clamp(5rem,9vw,8rem)]">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      {!hideFooter && (
        <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center space-x-4"
          >
            {socialLinks.map((link, index) => (
              <SocialIcon key={index} href={link.href} icon={link.icon} />
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="text-sm font-medium text-foreground/80"
          >
            {locationText}
          </motion.div>
        </footer>
      )}
    </div>
  );
};
