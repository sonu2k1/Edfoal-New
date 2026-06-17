"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { OriginButton } from "@/components/ui/origin-button";

const EdfoalLogo = ({ isLight }: { isLight: boolean }) => (
  <div className="flex items-center select-none group cursor-pointer">
    <img
      src="https://ik.imagekit.io/edfoalImage/assets/image/footerlogo.png"
      alt="Edfoal"
      width={150}
      height={22}
      className={`h-[22px] w-auto object-contain transform group-hover:scale-105 transition-transform duration-300 ${isLight ? "invert" : ""
        }`}
      style={{ marginLeft: "20px" }}
    />
  </div>
);

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const lightSections = document.querySelectorAll('[data-theme="light"]');
      let overLight = false;
      const navbarBottom = 80;

      lightSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= navbarBottom && rect.bottom >= 0) {
          overLight = true;
        }
      });

      setIsLight(overLight);

      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/#about" },
    { label: "Usecases", href: "/usecases" },
    { label: "Contact Us", href: "/#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 transition-all duration-300 flex items-center rounded-full border shadow-lg ${isLight
          ? scrolled
            ? "h-16 bg-white/80 backdrop-blur-md border-black/10 shadow-black/5"
            : "h-20 bg-white/40 backdrop-blur-sm border-black/5 shadow-black/5"
          : scrolled
            ? "h-16 bg-black/70 backdrop-blur-md border-white/10 shadow-black/25"
            : "h-20 bg-black/30 backdrop-blur-sm border-white/5 shadow-black/10"
          }`}
      >
        <div className="w-full px-12 flex items-center justify-between">

          {/* 1. Left Column: Brand Logo */}
          <div className="flex-initial flex justify-start items-center">
            <a href="#" className="flex items-center">
              <EdfoalLogo isLight={isLight} />
            </a>
          </div>

          {/* 2. Middle Column: Centered links (Desktop only) */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-[13px] transition-colors duration-200 tracking-wide py-2 ${isActive
                    ? isLight ? "text-black font-bold" : "text-white font-bold"
                    : isLight ? "text-gray-600 hover:text-black font-semibold" : "text-gray-400 hover:text-white font-semibold"
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* 3. Right Column: CTA Button (Desktop) / Hamburger (Mobile) */}
          <div
            style={{ marginRight: "20px" }}
            className="flex-initial flex justify-end items-center gap-4">

            <div className="hidden md:inline-flex rounded-full w-[160px] h-[40px] items-center justify-center">
              <OriginButton
                className="w-full h-full rounded-full px-0 text-sm font-semibold tracking-wide border-[0.5px]"
                style={
                  isLight
                    ? ({
                      "--ic-card": "#ffffff",
                      "--ic-card-foreground": "#000000",
                      "--ic-border": "#000000",
                      "--ic-foreground": "#000000",
                      "--ic-background": "#ffffff",
                    } as React.CSSProperties)
                    : ({
                      "--ic-card": "#000000",
                      "--ic-card-foreground": "#ffffff",
                      "--ic-border": "#ffffff",
                      "--ic-foreground": "#ffffff",
                      "--ic-background": "#000000",
                    } as React.CSSProperties)
                }
                onClick={() => {
                  const contactElem = document.getElementById("contact");
                  if (contactElem) {
                    contactElem.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Contact Us
              </OriginButton>
            </div>

            {/* Mobile Menu Toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden focus:outline-none p-2 rounded-lg border transition-colors flex items-center justify-center ${isLight
                ? "text-black border-black/10 bg-black/5 hover:bg-black/10"
                : "text-white border-white/10 bg-white/5 hover:bg-white/10"
                }`}
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg pt-28 px-6 md:hidden flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm tracking-wide transition-colors py-3.5 border-b border-white/5 ${isActive ? "text-white font-bold" : "text-gray-300 hover:text-white font-semibold"
                      }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-col gap-4">
              <OriginButton
                className="w-full h-12 rounded-full border-none text-[11px] font-black uppercase tracking-[0.18em]"
                style={{
                  "--ic-card": "#d4ff3f",
                  "--ic-card-foreground": "#000000",
                  "--ic-foreground": "#000000",
                  "--ic-background": "#d4ff3f",
                } as React.CSSProperties}
                onClick={() => {
                  setMobileMenuOpen(false);
                  const contactElem = document.getElementById("contact");
                  if (contactElem) {
                    contactElem.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Contact Us
              </OriginButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
