"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { OriginButton } from "@/components/ui/OriginButton";

const EdfoalLogo = ({ isLight }: { isLight: boolean }) => (
  <div className="flex items-center select-none group cursor-pointer">
    <img
      src="https://ik.imagekit.io/edfoalImage/assets/image/footerlogo.png"
      alt="Edfoal"
      width={150}
      height={22}
      className={`h-4 w-auto object-contain transform transition-transform duration-300 group-hover:scale-105 min-[420px]:h-5 sm:h-[22px] ${isLight ? "invert" : ""
        }`}
    />
  </div>
);

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let overLight = false;
      const navbarBottom = 80;

      if (pathname === "/") {
        const heroEl = document.getElementById("hero-section");
        if (heroEl) {
          const rect = heroEl.getBoundingClientRect();
          if (rect.bottom > navbarBottom) {
            overLight = false;
          } else {
            overLight = true;
          }
        } else {
          overLight = window.scrollY > 600;
        }
      } else {
        const lightSections = document.querySelectorAll('[data-theme="light"]');
        lightSections.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navbarBottom && rect.bottom >= 0) {
            overLight = true;
          }
        });
      }

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
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Usecases", href: "/usecases" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed left-1/2 top-2 z-50 flex w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 items-center overflow-hidden rounded-full border shadow-lg transition-all duration-300 min-[420px]:w-[90%] sm:top-3 lg:top-4 ${isLight
          ? scrolled
            ? "h-12 bg-white/80 backdrop-blur-md border-black/10 shadow-black/5 sm:h-14 lg:h-16"
            : "h-14 bg-white/40 backdrop-blur-sm border-black/5 shadow-black/5 sm:h-16 lg:h-20 max-h-[14svh]"
          : scrolled
            ? "h-12 bg-black/70 backdrop-blur-md border-white/10 shadow-black/25 sm:h-14 lg:h-16"
            : "h-14 bg-black/30 backdrop-blur-sm border-white/5 shadow-black/10 sm:h-16 lg:h-20 max-h-[14svh]"
          }`}
      >
        <div className="flex w-full items-center justify-between px-5">

          {/* 1. Left Column: Brand Logo */}
          <div className="flex flex-initial items-center justify-start">
            <Link href="/" className="flex items-center" aria-label="Go to Edfoal homepage">
              <EdfoalLogo isLight={isLight} />
            </Link>
          </div>
          {/* 2. Middle Column: Centered links (Large screens only) */}
          <div className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`py-2 text-base tracking-wide transition-colors duration-200 ${isActive
                    ? isLight ? "text-black font-bold" : "text-white font-bold"
                    : isLight ? "text-gray-600 hover:text-black font-semibold" : "text-gray-400 hover:text-white font-semibold"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* 3. Right Column: CTA Button (Desktop) / Hamburger (Mobile) */}
          <div
            className="flex flex-initial items-center justify-end gap-2 sm:gap-3 lg:gap-4">

            <div className="hidden h-10 w-[148px] items-center justify-center rounded-full lg:inline-flex">
              <OriginButton
                className="h-full w-full rounded-full border-[0.5px] px-0 text-sm font-semibold tracking-wide lg:text-sm"
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
                onClick={() => {
                  router.push("/contact");
                }}
              >
                Contact Us
              </OriginButton>
            </div>

            {/* Mobile Menu Toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className={`flex h-9 w-9 items-center justify-center rounded-lg border p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:h-10 sm:w-10 lg:hidden ${isLight
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
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex h-dvh flex-col justify-between overflow-y-auto bg-black/95 px-4 pb-6 pt-24 backdrop-blur-lg min-[420px]:px-6 sm:pb-10 sm:pt-28 lg:hidden"
          >
            <div className="flex flex-col gap-3 sm:gap-5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`border-b border-white/5 py-3 text-sm tracking-wide transition-colors sm:py-3.5 ${isActive ? "text-white font-bold" : "text-gray-300 hover:text-white font-semibold"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <OriginButton
                className="h-11 w-full rounded-full border-none text-[11px] font-black uppercase tracking-[0.18em] sm:h-12"
                style={{
                  "--ic-card": "#d4ff3f",
                  "--ic-card-foreground": "#0f172a",
                  "--ic-foreground": "#0f172a",
                  "--ic-background": "#d4ff3f",
                } as React.CSSProperties}
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/contact");
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
