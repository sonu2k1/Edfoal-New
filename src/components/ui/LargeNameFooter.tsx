"use client";
import * as React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { OriginButton } from "@/components/ui/OriginButton";

function Footer() {
  return (
    <footer className="h-[500px] flex items-center px-4 md:px-6 bg-[#0f172a] border-t border-zinc-900 relative overflow-hidden">
      <div className="container mx-auto z-10" style={{ marginTop: "-120px" }}>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="mb-8 md:mb-0 max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://ik.imagekit.io/edfoalImage/assets/image/footerlogo.png"
                alt="Edfoal Logo"
                className="h-[28px] w-auto object-contain"
              />
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed " style={{ margin: "20px 0 " }}>
              At EdFoal AI, we create tailored AI solutions to reduce costs, save time, and enhance business efficiency for growth.
            </p>

            <div className="mt-4">
              <Link href="mailto:info@edfoal.com">
                <div className="rounded-full w-[160px] h-[40px] flex items-center justify-center" style={{ margin: "20px 0 " }}>
                  <OriginButton
                    className="w-full h-full rounded-full px-0 text-sm font-semibold tracking-wide border-[0.5px]"
                    style={{
                      "--ic-card": "#0f172a",
                      "--ic-card-foreground": "#ffffff",
                      "--ic-border": "#ffffff",
                      "--ic-foreground": "#ffffff",
                      "--ic-background": "#0f172a",
                    } as React.CSSProperties}
                  >
                    Send us a mail
                  </OriginButton>
                </div>
              </Link>
            </div>

            <p className="text-xs text-zinc-500 mt-5">
              © {new Date().getFullYear()} Edfoal. All rights reserved.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Pages</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Automation
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Tailored AI Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    AI Consultancy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Socials</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Hours</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>Mon - Fri</li>
                <li className="font-semibold text-zinc-200">9:00 - 20:00</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Big Watermark at the absolute bottom */}
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center z-0 pointer-events-none">
        <h1 className="text-center text-5xl md:text-8xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-800 to-zinc-950 select-none tracking-tight leading-none">
          {/* <img
      src="https://ik.imagekit.io/edfoalImage/assets/image/footerlogo.png"
      alt="Edfoal"
      width={1000}
      height={220}
  
    /> */}
          Edfoal
        </h1>
      </div>
    </footer>
  );
}

export { Footer };
