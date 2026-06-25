"use client";

import * as React from "react";
import Link from "next/link";

const PAGES = [
  { label: "Home",         href: "/" },
  { label: "About Us",     href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Contact Us",   href: "/contact" },
];

const SERVICES = [
  { label: "Automation",           href: "/services" },
  { label: "Tailored AI Solutions", href: "/services" },
  { label: "AI Consultancy",        href: "/services" },
];

const linkClass =
  "text-sm text-zinc-400 hover:text-white transition-colors duration-200 leading-relaxed";

function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0B132B" }}
    >
      {/* ── Faded watermark ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full flex items-end justify-center pointer-events-none select-none z-0"
      >
        <span
          className="font-bold tracking-tight leading-none"
          style={{
            fontSize: "clamp(80px, 16vw, 220px)",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
          }}
        >
          EDFOAL
        </span>
      </div>

      {/* ── Main content ── */}
      <div
        className="relative z-10 mx-auto"
        style={{ maxWidth: "1200px", padding: "72px 40px 0" }}
      >
        {/* 4-column grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: "48px" }}
        >

          {/* ── Col 1: Brand ── */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" className="inline-block mb-6">
              <img
                src="https://ik.imagekit.io/edfoalImage/assets/image/footerlogo.png"
                alt="EdFoal Logo"
                style={{ height: "28px", width: "auto", objectFit: "contain" }}
              />
            </Link>

            <p
              className="text-zinc-400 text-sm leading-relaxed"
              style={{ maxWidth: "260px", marginBottom: "0" }}
            >
              At EdFoal AI, we create tailored AI solutions to reduce costs,
              save time, and enhance business efficiency for growth.
            </p>
          </div>

          {/* ── Col 2: Pages ── */}
          <div>
            <h3
              className="font-semibold text-white"
              style={{ fontSize: "15px", marginBottom: "20px" }}
            >
              Pages
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {PAGES.map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className={linkClass}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Services ── */}
          <div>
            <h3
              className="font-semibold text-white"
              style={{ fontSize: "15px", marginBottom: "20px" }}
            >
              Services
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className={linkClass}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Socials + Hours (two mini-columns) ── */}
          <div
            className="grid grid-cols-2"
            style={{ gap: "32px" }}
          >
            {/* Socials */}
            <div>
              <h3
                className="font-semibold text-white"
                style={{ fontSize: "15px", marginBottom: "20px" }}
              >
                Socials
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <li>
                  <Link
                    href="https://linkedin.com/company/edfoal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h3
                className="font-semibold text-white"
                style={{ fontSize: "15px", marginBottom: "20px" }}
              >
                Hours
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <li className="text-sm text-zinc-400">Mon - Fri</li>
                <li
                  className="text-sm text-zinc-200"
                  style={{ fontWeight: 700 }}
                >
                  9:00 - 20:00
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* ── Gold divider ── */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
            margin: "56px 0 0",
          }}
        />

        {/* ── Copyright ── */}
        <div
          style={{
            padding: "20px 0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            className="text-xs text-zinc-500"
            style={{ maxWidth: "none" }}
          >
            © 2026 EdFoal. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export { Footer };
