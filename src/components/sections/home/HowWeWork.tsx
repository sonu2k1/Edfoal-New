"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

/* ───── Step cards data ───── */

const steps = [
  {
    id: "01",
    title: "Discovery & Strategy",
    description:
      "We dive deep into your goals, audience, and market to craft a winning digital blueprint.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    iconBg: "#ede9fe",
    iconColor: "#7c3aed",
  },
  {
    id: "02",
    title: "Design & Prototype",
    description:
      "Our designers build stunning, pixel-perfect interfaces and interactive prototypes fast.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <path d="M17.5 14v6M14.5 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
  },
  {
    id: "03",
    title: "Agile Development",
    description:
      "Engineers build scalable, high-performance solutions using modern tech stacks and sprints.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M14 6h7M14 10h5M14 18h7M14 14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    iconBg: "#fef3c7",
    iconColor: "#d97706",
  },
  {
    id: "04",
    title: "Launch & Scale",
    description:
      "We deploy, monitor, and continuously optimize your product so it grows with your ambitions.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    iconBg: "#fee2e2",
    iconColor: "#dc2626",
  },
];

/* ───── Inner process mockup UI (dashboard) ───── */

function ProcessMockup() {
  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-2xl"
      style={{ background: "#ffffff", height: "auto", marginBottom: "2rem" }}
    >
      {/* Mockup top bar */}
      <div
        className="flex min-h-10 flex-wrap items-center gap-2 border-b px-3 py-2 sm:flex-nowrap sm:gap-3 sm:px-5"
        style={{
          background: "#fefefeff",
          borderColor: "#f0f0f0",
          margin: "clamp(0.5rem, 2vw, 1rem)"
        }}
      >
        <div className="flex gap-1.5">
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
        </div>
        <div className="flex max-w-full gap-1 overflow-x-auto sm:ml-3">
          {["Overview", "Messages", "Task Board", "Calendar", "Activity"].map(
            (tab, i) => (
              <span
                key={tab}
                className="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold sm:px-3"
                style={{
                  background: i === 0 ? "#7c3aed" : "transparent",
                  color: i === 0 ? "#fff" : "#9ca3af",
                  fontSize: 9,
                  margin: "5px",
                }}
              >
                {tab}
              </span>
            )
          )}
        </div>
        <div className="ml-auto hidden gap-1.5 sm:flex">
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#fbbf24" }} />
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#818cf8" }} />
        </div>
      </div>

      {/* Mockup body */}
      <div className="flex flex-1 flex-col justify-start gap-4 p-3 sm:p-5" style={{ background: "#ffffffff", margin: "clamp(0.75rem, 3vw, 1.5rem)" }}>
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row" >
          <div>
            <p style={{ fontSize: 9, color: "#9ca3af", margin: "0 0 2px" }}>
              Thursday, September 26, 2024
            </p>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#111827",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              Welcome back to
              <br />
              Edfoal, Let&apos;s Build
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: "+", label: "New Task", bg: "#111827", color: "#fff" },
              { icon: "👤", label: "Invite", bg: "#f3f4f6", color: "#374151" },
              { icon: "⚙", label: "Settings", bg: "#f3f4f6", color: "#374151" },
            ].map((btn) => (
              <div
                key={btn.label}
                className="flex items-center gap-1 rounded-full px-3"
                style={{
                  height: 28,
                  background: btn.bg,
                  color: btn.color,
                  fontSize: 9,
                  fontWeight: 700,
                  cursor: "default",
                }}
              >
                <span>{btn.icon}</span>
                <span>{btn.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Three column cards */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Card 1: Performance gauge */}
          <div
            className="rounded-xl p-4 flex flex-col gap-2"
            style={{ border: "1px solid #f0f0f0" }}
          >
            <div className="flex items-center justify-between" style={{ margin: "10px" }} >
              <span style={{ fontSize: 10, fontWeight: 700, color: "#374151" }}>
                Project Performance
              </span>
              <span style={{ fontSize: 9, color: "#7c3aed", fontWeight: 600 }}>
                View All
              </span>
            </div>
            <p style={{ fontSize: 8, color: "#9ca3af", margin: "10px" }}>
              Monthly Analysis Report
            </p>
            <div className="flex flex-col items-center justify-center py-3">
              <div style={{ position: "relative", width: 80, height: 48, overflow: "hidden" }}>
                <svg width="80" height="48" viewBox="0 0 80 48">
                  <path d="M8 44 A32 32 0 0 1 72 44" fill="none" stroke="#f0f0f0" strokeWidth="8" strokeLinecap="round" />
                  <path d="M8 44 A32 32 0 0 1 72 44" fill="none" stroke="#7c3aed" strokeWidth="8" strokeLinecap="round" strokeDasharray="100 101" style={{ strokeDashoffset: 0 }} />
                  <path d="M8 44 A32 32 0 0 1 58 18" fill="none" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, textAlign: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#111827" }}>86%</span>
                </div>
              </div>
              <p style={{ fontSize: 8, color: "#9ca3af", margin: "4px 0 0", textAlign: "center" }}>Projects Completed</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { dot: "#7c3aed", label: "Completed" },
                { dot: "#fbbf24", label: "In Progress" },
                { dot: "#e5e7eb", label: "Still Waiting" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: l.dot }} />
                  <span style={{ fontSize: 7, color: "#9ca3af" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Active task */}
          <div
            className="rounded-xl p-4 flex flex-col gap-2"
            style={{ border: "1px solid #f0f0f0" }}
          >
            <div style={{ margin: "0 10px" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#374151" }}>Build Website Landing Page</span>
              <p style={{ fontSize: 8, color: "#9ca3af", margin: "2px 0 0" }}>5 Tasks to complete</p>
            </div>
            <div className="rounded-lg p-3 flex flex-col gap-1.5" style={{ background: "#f9fafb", flex: 1, margin: "10px" }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "#374151", margin: 0 }}>Refresh the web design</p>
              <p style={{ fontSize: 8, color: "#9ca3af", margin: 0 }}>After the latest product updates and pricing changes</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 rounded-full overflow-hidden" style={{ height: 4, background: "#e5e7eb" }}>
                  <div style={{ width: "56%", height: "100%", background: "#7c3aed", borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#374151" }}>56%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {["#7c3aed", "#fbbf24", "#10b981"].map((c, i) => (
                  <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: c, border: "2px solid #fff", marginLeft: i > 0 ? -6 : 0 }} />
                ))}
              </div>
              <div className="flex gap-1">
                <span className="rounded-full px-2 py-0.5" style={{ fontSize: 8, background: "#fef3c7", color: "#d97706", fontWeight: 700, marginLeft: "5px" }}>UI/UX</span>
                <span className="rounded-full px-2 py-0.5" style={{ fontSize: 8, background: "#dcfce7", color: "#16a34a", fontWeight: 700, marginRight: "10px" }}>New</span>
              </div>
            </div>
          </div>

          {/* Card 3: Team + chat */}
          <div
            className="rounded-xl p-4 flex flex-col gap-2"
            style={{ border: "1px solid #f0f0f0" }}
          >
            <div className="flex flex-col gap-1" style={{ margin: "10px" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#374151" }}>Team</span>
              <div className="flex gap-1 flex-wrap">
                {[
                  { name: "Luke", color: "#7c3aed" },
                  { name: "Dana", color: "#fbbf24" },
                  { name: "Richard", color: "#10b981" },
                  { name: "Susan", color: "#ef4444" },
                ].map((m) => (
                  <div key={m.name} className="flex flex-col items-center gap-0.5">
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#fff" }}>
                      {m.name[0]}
                    </div>
                    <span style={{ fontSize: 7, color: "#9ca3af" }}>{m.name}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-0.5">
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#374151" }}>4+</div>
                  <span style={{ fontSize: 7, color: "#9ca3af" }}>Others</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="rounded-xl rounded-tl-sm px-2.5 py-1.5" style={{ background: "#fef3c7", alignSelf: "flex-start", maxWidth: "85%", margin: "10px" }}>
                <p style={{ fontSize: 8, color: "#92400e", fontWeight: 600, margin: 0 }}>Hey! How is it going? 🙌</p>
              </div>
              <div className="rounded-xl rounded-tl-sm px-2.5 py-1.5" style={{ background: "#fef3c7", alignSelf: "flex-start", maxWidth: "85%", margin: "10px" }}>
                <p style={{ fontSize: 8, color: "#92400e", fontWeight: 600, margin: 0 }}>I have a new task in design today. Let me know when done ✅</p>
              </div>
              <div className="rounded-xl rounded-tr-sm px-2.5 py-1.5" style={{ background: "#fbbf24", alignSelf: "flex-end", maxWidth: "80%", margin: "10px" }}>
                <p style={{ fontSize: 8, color: "#fff", fontWeight: 700, margin: 0 }}>Sure thing Diana 👍</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Analytics & Status */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Card 4: Development Activity */}
          <div
            className="rounded-xl p-4 flex flex-col justify-between md:col-span-2 gap-2"
            style={{ border: "1px solid #f0f0f0" }}
          >
            <div className="flex items-center justify-between" style={{ margin: "10px" }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#374151" }}>
                  Development Activity
                </span>
                <p style={{ fontSize: 8, color: "#9ca3af", margin: "2px 0 0" }}>
                  Commit & deployment frequency
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <span style={{ fontSize: 7, color: "#10b981", fontWeight: 700 }}>LIVE</span>
              </div>
            </div>

            {/* Sparkline Area Chart */}
            <div className="relative w-full h-16 mt-1">
              <svg className="w-full h-full" viewBox="0 0 300 50" preserveAspectRatio="none" style={{ overflow: "hidden" }}>
                <defs>
                  <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Horizontal Gridlines */}
                <line x1="0" y1="10" x2="300" y2="10" stroke="#f3f4f6" strokeWidth="0.75" strokeDasharray="2 2" />
                <line x1="0" y1="25" x2="300" y2="25" stroke="#f3f4f6" strokeWidth="0.75" strokeDasharray="2 2" />
                <line x1="0" y1="40" x2="300" y2="40" stroke="#f3f4f6" strokeWidth="0.75" strokeDasharray="2 2" />

                {/* Gradient Fill */}
                <path
                  d="M 10 40 C 25 40, 40 35, 56 35 C 72 35, 87 20, 103 20 C 119 20, 134 30, 150 30 C 166 30, 181 10, 196 10 C 211 10, 227 42, 243 42 C 259 42, 274 25, 290 25 L 290 48 L 10 48 Z"
                  fill="url(#glow)"
                />

                {/* Stroke */}
                <path
                  d="M 10 40 C 25 40, 40 35, 56 35 C 72 35, 87 20, 103 20 C 119 20, 134 30, 150 30 C 166 30, 181 10, 196 10 C 211 10, 227 42, 243 42 C 259 42, 274 25, 290 25"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Hotspots */}
                <circle cx="103" cy="20" r="2" fill="#7c3aed" stroke="#fff" strokeWidth="0.5" />
                <circle cx="196" cy="10" r="2" fill="#7c3aed" stroke="#fff" strokeWidth="0.5" />
                <circle cx="290" cy="25" r="2" fill="#7c3aed" stroke="#fff" strokeWidth="0.5" />
              </svg>
            </div>

            {/* X-axis ticks */}
            <div className="flex justify-between px-2.5" style={{ fontSize: 7, color: "#9ca3af", fontWeight: 500, margin: "10px" }}>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Footer Status Log */}
            <div className="flex flex-col justify-between gap-2 border-t pt-2 sm:flex-row sm:items-center" style={{ borderColor: "#f3f4f6" }}>
              <div className="flex items-center gap-1.5" style={{ margin: "10px" }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800, color: "#fff" }}>
                  R
                </div>
                <span style={{ fontSize: 8, color: "#4b5563" }}>
                  <span style={{ fontWeight: 600, color: "#111827" }}>Richard</span> pushed 4 commits to <code className="bg-gray-100 px-1 py-0.5 rounded text-purple-600 font-mono" style={{ fontSize: 7 }}>main</code>
                </span>
              </div>
              <span style={{ fontSize: 7, color: "#9ca3af", margin: "10px" }}>3 mins ago</span>
            </div>
          </div>

          {/* Card 5: Integrations */}
          <div
            className="rounded-xl p-4 flex flex-col justify-between gap-2"
            style={{ border: "1px solid #f0f0f0" }}
          >
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#374151", margin: "10px" }}>
                Active Integrations
              </span>
              <p style={{ fontSize: 8, color: "#9ca3af", marginLeft: "10px" }}>
                Platform connections & status
              </p>
            </div>

            <div className="flex flex-col gap-1.5" style={{ margin: "10px" }}>
              {[
                {
                  name: "GitHub",
                  status: "Active",
                  desc: "Trigger: push",
                  color: "#111827",
                  icon: (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  ),
                },
                {
                  name: "Figma",
                  status: "Synced",
                  desc: "4 files linked",
                  color: "#f24e1e",
                  icon: (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
                      <path d="M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5a3.5 3.5 0 1 1-7 0z" />
                    </svg>
                  ),
                },
                {
                  name: "Slack",
                  status: "Active",
                  desc: "Alerts enabled",
                  color: "#4a154b",
                  icon: (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <line x1="9" y1="6" x2="9" y2="18" />
                      <line x1="15" y1="6" x2="15" y2="18" />
                      <line x1="6" y1="9" x2="18" y2="9" />
                      <line x1="6" y1="15" x2="18" y2="15" />
                    </svg>
                  ),
                },
                {
                  name: "Vercel",
                  status: "Healthy",
                  desc: "Prod deployed",
                  color: "#000",
                  icon: (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 22h20L12 2z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-lg p-1.5"
                  style={{ background: "#f9fafb" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center text-white shrink-0"
                      style={{ background: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span style={{ fontSize: 8, fontWeight: 700, color: "#374151", lineHeight: 1.1 }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: 7, color: "#9ca3af" }}>{item.desc}</span>
                    </div>
                  </div>
                  <span
                    className="rounded-full px-1.5 py-0.5"
                    style={{
                      fontSize: 7,
                      background: "#dcfce7",
                      color: "#16a34a",
                      fontWeight: 700,
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── HowWeWork Section ───── */

export default function HowWeWork() {
  const mockupRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mockupRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <section
      id="how-we-work"
      className="relative w-full overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8 lg:pb-25 lg:pt-22.5"
    >
      <div className="mx-auto w-full max-w-360">

        {/* ── Static section header ── */}
        <div className="text-center">
          <div className="mt-3 inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D6ACF]" />
            </span>
            <span className="text-sm font-semibold leading-none tracking-widest text-gray-600">
              How We Work
            </span>
          </div>

          <h2 className="mt-4 text-[clamp(2.25rem,9vw,3rem)] font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
            How We{" "}
            <span
              className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#1D6ACF_0%,#E2076D_50%,#1D6ACF_100%)]"
            >
              Work
            </span>
          </h2>
          <p className="mx-auto mb-8 mt-3 max-w-4xl text-sm leading-relaxed text-gray-500 sm:text-base lg:mb-4">
            A transparent, battle-tested process that turns your vision into
            exceptional digital products — faster, smarter, better.
          </p>
        </div>

        {/* ── Static yellow container with step cards ── */}
        <div className="relative mx-auto w-full overflow-visible rounded-3xl bg-[linear-gradient(140deg,#fde68a_0%,#fbbf24_40%,#f59e0b_100%)] px-4 pt-4 sm:px-6 sm:pt-6 lg:min-h-116.25 lg:px-9 lg:pt-9">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-20 -top-30 hidden h-85 w-85 select-none rounded-full bg-white/12 md:block" />
          <div className="pointer-events-none absolute -left-15 bottom-15 hidden h-55 w-55 select-none rounded-full bg-white/10 md:block" />
          <svg className="pointer-events-none absolute hidden select-none md:block" style={{ top: 10, left: -30, opacity: 0.18 }} width="220" height="220" viewBox="0 0 220 220" fill="none">
            <path d="M110 10 C160 10, 210 60, 210 110 C210 160, 160 210, 110 210 C60 210, 10 160, 10 110 C10 60, 60 10, 110 10 Z" fill="#fff" />
          </svg>
          <svg className="pointer-events-none absolute hidden select-none md:block" style={{ bottom: 40, right: -40, opacity: 0.14 }} width="260" height="200" viewBox="0 0 260 200" fill="none">
            <ellipse cx="130" cy="100" rx="130" ry="100" fill="#fff" />
          </svg>

          {/* ── 4 Step cards (static) ── */}
          <div
            className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
          >
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col gap-3 rounded-2xl bg-white px-4 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-4.5 sm:py-5"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: step.iconBg, color: step.iconColor }}
                >
                  {step.icon}
                </div>
                <div>
                  <h3 className="m-0 text-[13px] font-bold leading-[1.35] text-gray-900">
                    {step.title}
                  </h3>
                </div>
                <p className="m-0 text-[11px] leading-[1.6] text-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* ── Scroll-animated dashboard mockup ── */}
          <div
            ref={mockupRef}
            className="relative z-10 mx-auto mt-5 w-full max-w-230 overflow-hidden perspective-[1000px] sm:mt-6 lg:overflow-visible"
          >
            <motion.div
              style={{
                rotateX: rotate,
                scale,
              }}
              className="overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.14),0_8px_24px_rgba(0,0,0,0.08)] lg:shadow-[0_32px_80px_rgba(0,0,0,0.16),0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <ProcessMockup />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

