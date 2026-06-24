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
    <footer className="relative bg-[#030914] border-t border-zinc-900 overflow-hidden select-none h-[445px]">
      {/* Watermark — centered within the 445px footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{margin:"4.6rem 0 0 0"}}
      >
        <span className="text-[16vw] font-black tracking-tight leading-none whitespace-nowrap text-white/[0.035]">
          EdFoal
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-12 pb-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left — Logo, Description, Socials */}
          <div className="lg:col-span-4 flex flex-col" style={{margin:"3rem 0 0 6rem"}}>
            <Link href="/" className="mb-5">
              <img
                src="https://ik.imagekit.io/edfoalImage/assets/image/footerlogo.png"
                alt="Edfoal Logo"
                className="h-7 w-auto object-contain"
                style={{marginBottom:"1rem"}}
              />
            </Link>
            <p className="text-zinc-400 text-[13.5px] leading-relaxed max-w-[280px]" style={{marginBottom:"1rem"}}>
              At EdFoal AI, we create tailored AI solutions to reduce costs, save
              time, and enhance business efficiency for growth.
            </p>
            <motion.div 
              onMouseMove={(e) => mouseX.set(e.pageX)}
              onMouseLeave={() => mouseX.set(Infinity)}
              className="flex gap-6 mt-7 text-white font-bold text-[15px] items-center"
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
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10" style={{margin:"3rem 0 0 25rem"}}>

            {/* Our Pages */}
            <div>
              <h3 className="text-[#e2d59f] font-semibold text-[14px] mb-5 tracking-wide" style={{marginBottom:"1rem"}}>
                Our Pages
              </h3>
              <ul className="space-y-3.5">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Our Services", href: "/services" },
                  { label: "usecases", href: "/usecases" },
                  { label: "Contact Us", href: "/contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-zinc-400 hover:text-white text-[13.5px] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-[#e2d59f] font-semibold text-[14px] mb-5 tracking-wide" style={{marginBottom:"1rem"}}>
                Services
              </h3>
              <ul className="space-y-3.5">
                {["Services 1", "Services 2", "Services 3", "Services 4"].map((item) => (
                  <li key={item}>
                    <Link href="/services" className="text-zinc-400 hover:text-white text-[13.5px] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-[#e2d59f] font-semibold text-[14px] mb-5 tracking-wide" style={{marginBottom:"1rem"}}>
                Contact Us
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3" style={{margin:"0 0 1rem -1rem"}}>
                  <Mail className="w-4 h-4 text-[#e2d59f] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-[13px] leading-tight">Send Mail</p>
                    <Link href="mailto:Info@satext.com"
                      className="text-zinc-400 hover:text-white text-[14.5px] transition-colors mt-0.5 block">
                      Info@satext.com
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3" style={{margin:"0 0 1rem -1rem"}}>
                  <Phone className="w-4 h-4 text-[#e2d59f] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-[13px] leading-tight">Call Us</p>
                    <p className="text-zinc-400 text-[12.5px] mt-0.5">+91	&nbsp;1234567890</p>
                  </div>
                </div>
                <div className="flex items-start gap-3" style={{margin:"0 0 1rem -1rem"}}>
                  <Clock className="w-4 h-4 text-[#e2d59f] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-[13px] leading-tight">Opening Hours</p>
                    <p className="text-zinc-400 text-[12.5px] mt-0.5">Mon - Fri, <br />9:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-zinc-800/50 pt-5 flex items-center justify-center">
          <p className="text-zinc-500 text-xs">
            Your Company - 2024 All right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };