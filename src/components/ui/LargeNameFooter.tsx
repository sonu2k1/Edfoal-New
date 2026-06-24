"use client";
import * as React from "react";
import { useRef } from "react";
import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

interface FooterSocialLinkProps {
  item: { label: string; href: string };
  mouseX: MotionValue<number>;
}

function FooterSocialLink({ item, mouseX }: FooterSocialLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleSync = useTransform(distance, [-100, 0, 100], [1, 1.6, 1]);
  const scale = useSpring(scaleSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ scale }}
      className="inline-block hover:text-[#e2d59f] transition-colors origin-center cursor-pointer"
    >
      {item.label}
    </motion.a>
  );
}

function Footer() {
  const mouseX = useMotionValue(Infinity);

  return (
    <footer className="relative bg-[#030914] border-t border-zinc-900 overflow-hidden select-none">
      {/* Watermark — purely decorative, scales with the section instead of a fixed-height parent */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      >
        <span className="text-[16vw] font-black tracking-tight leading-none whitespace-nowrap text-white/[0.035]">
          EdFoal
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-16 pb-6 md:px-12 lg:px-20">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">

          {/* Left — Logo, Description, Socials */}
          <div className="flex flex-col lg:col-span-4">
            <Link href="/" className="mb-4 inline-block">
              <img
                src="https://ik.imagekit.io/edfoalImage/assets/image/footerlogo.png"
                alt="Edfoal Logo"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <p className="mb-4 max-w-[280px] text-[13.5px] leading-relaxed text-zinc-400">
              At EdFoal AI, we create tailored AI solutions to reduce costs, save
              time, and enhance business efficiency for growth.
            </p>
            <motion.div
              onMouseMove={(e) => mouseX.set(e.pageX)}
              onMouseLeave={() => mouseX.set(Infinity)}
              className="mt-3 flex items-center gap-6 text-[15px] font-bold text-white"
            >
              {[
                { label: "Fb.", href: "https://facebook.com" },
                { label: "Tw.", href: "https://twitter.com" },
                { label: "Li.", href: "https://linkedin.com" },
                { label: "In.", href: "https://instagram.com" },
              ].map((item) => (
                <FooterSocialLink key={item.label} item={item} mouseX={mouseX} />
              ))}
            </motion.div>
          </div>

          {/* Right — 3 Columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-8">

            {/* Our Pages */}
            <div>
              <h3 className="mb-4 text-[14px] font-semibold tracking-wide text-[#e2d59f]">
                Our Pages
              </h3>
              <ul className="space-y-3.5">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Our Services", href: "/services" },
                  { label: "Usecases", href: "/usecases" },
                  { label: "Contact Us", href: "/contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-[13.5px] text-zinc-400 transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-4 text-[14px] font-semibold tracking-wide text-[#e2d59f]">
                Services
              </h3>
              <ul className="space-y-3.5">
                {["Services 1", "Services 2", "Services 3", "Services 4"].map((item) => (
                  <li key={item}>
                    <Link href="/services" className="text-[13.5px] text-zinc-400 transition-colors hover:text-white">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="mb-4 text-[14px] font-semibold tracking-wide text-[#e2d59f]">
                Contact Us
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#e2d59f]" />
                  <div>
                    <p className="text-[13px] font-semibold leading-tight text-white">Send Mail</p>
                    {/* TODO: confirm the real EdFoal contact email — current domain looks like a leftover placeholder */}
                    <Link
                      href="mailto:info@edfoal.com"
                      className="mt-0.5 block text-[14.5px] text-zinc-400 transition-colors hover:text-white"
                    >
                      info@edfoal.com
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#e2d59f]" />
                  <div>
                    <p className="text-[13px] font-semibold leading-tight text-white">Call Us</p>
                    <p className="mt-0.5 text-[12.5px] text-zinc-400">+91 1234567890</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#e2d59f]" />
                  <div>
                    <p className="text-[13px] font-semibold leading-tight text-white">Opening Hours</p>
                    <p className="mt-0.5 text-[12.5px] text-zinc-400">Mon - Fri, <br />9:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-12 flex items-center justify-center border-t border-zinc-800/50 pt-5">
          <p className="text-xs text-zinc-500">
            Your Company - 2024 All right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };