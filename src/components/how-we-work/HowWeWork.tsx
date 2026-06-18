"use client";

import React from "react";

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

/* ───── Inner process mockup UI ───── */

function ProcessMockup() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "#ffffff",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Mockup top bar */}
      <div
        className="flex items-center gap-3 px-5 border-b"
        style={{
          height: "42px",
          background: "#fafafa",
          borderColor: "#f0f0f0",
        }}
      >
        <div className="flex gap-1.5">
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
        </div>
        {/* Nav tabs */}
        <div className="flex gap-1 ml-3">
          {["Overview", "Messages", "Task Board", "Calendar", "Activity"].map(
            (tab, i) => (
              <span
                key={tab}
                className="px-3 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  background: i === 0 ? "#7c3aed" : "transparent",
                  color: i === 0 ? "#fff" : "#9ca3af",
                  fontSize: 9,
                }}
              >
                {tab}
              </span>
            )
          )}
        </div>
        <div className="ml-auto flex gap-1.5">
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#fbbf24" }} />
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#818cf8" }} />
        </div>
      </div>

      {/* Mockup body */}
      <div className="p-5" style={{ background: "#ffffff" }}>
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
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
          <div className="flex gap-2">
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
        <div className="grid grid-cols-3 gap-3">
          {/* Card 1: Performance gauge */}
          <div
            className="rounded-xl p-4 flex flex-col gap-2"
            style={{ border: "1px solid #f0f0f0" }}
          >
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 10, fontWeight: 700, color: "#374151" }}>
                Project Performance
              </span>
              <span style={{ fontSize: 9, color: "#7c3aed", fontWeight: 600 }}>
                View All
              </span>
            </div>
            <p style={{ fontSize: 8, color: "#9ca3af", margin: 0 }}>
              Monthly Analysis Report
            </p>
            {/* Gauge */}
            <div className="flex flex-col items-center justify-center py-3">
              <div style={{ position: "relative", width: 80, height: 48, overflow: "hidden" }}>
                <svg width="80" height="48" viewBox="0 0 80 48">
                  <path
                    d="M8 44 A32 32 0 0 1 72 44"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 44 A32 32 0 0 1 72 44"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="100 101"
                    style={{ strokeDashoffset: 0 }}
                  />
                  <path
                    d="M8 44 A32 32 0 0 1 58 18"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#111827" }}>
                    86%
                  </span>
                </div>
              </div>
              <p style={{ fontSize: 8, color: "#9ca3af", margin: "4px 0 0", textAlign: "center" }}>
                Projects Completed
              </p>
            </div>
            <div className="flex gap-2 justify-center">
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
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#374151" }}>
                Build Website Landing Page
              </span>
              <p style={{ fontSize: 8, color: "#9ca3af", margin: "2px 0 0" }}>
                5 Tasks to complete
              </p>
            </div>
            <div
              className="rounded-lg p-3 flex flex-col gap-1.5"
              style={{ background: "#f9fafb", flex: 1 }}
            >
              <p style={{ fontSize: 9, fontWeight: 700, color: "#374151", margin: 0 }}>
                Refresh the web design
              </p>
              <p style={{ fontSize: 8, color: "#9ca3af", margin: 0 }}>
                After the latest product updates and pricing changes
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="flex-1 rounded-full overflow-hidden"
                  style={{ height: 4, background: "#e5e7eb" }}
                >
                  <div style={{ width: "56%", height: "100%", background: "#7c3aed", borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#374151" }}>56%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {["#7c3aed", "#fbbf24", "#10b981"].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: c,
                      border: "2px solid #fff",
                      marginLeft: i > 0 ? -6 : 0,
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                <span
                  className="rounded-full px-2 py-0.5"
                  style={{ fontSize: 8, background: "#fef3c7", color: "#d97706", fontWeight: 700 }}
                >
                  UI/UX
                </span>
                <span
                  className="rounded-full px-2 py-0.5"
                  style={{ fontSize: 8, background: "#dcfce7", color: "#16a34a", fontWeight: 700 }}
                >
                  New
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Team + chat */}
          <div
            className="rounded-xl p-4 flex flex-col gap-2"
            style={{ border: "1px solid #f0f0f0" }}
          >
            <div className="flex flex-col gap-1">
              <span style={{ fontSize: 10, fontWeight: 700, color: "#374151" }}>
                Team
              </span>
              <div className="flex gap-1 flex-wrap">
                {[
                  { name: "Luke", color: "#7c3aed" },
                  { name: "Dana", color: "#fbbf24" },
                  { name: "Richard", color: "#10b981" },
                  { name: "Susan", color: "#ef4444" },
                ].map((m) => (
                  <div key={m.name} className="flex flex-col items-center gap-0.5">
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: m.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                        fontWeight: 800,
                        color: "#fff",
                      }}
                    >
                      {m.name[0]}
                    </div>
                    <span style={{ fontSize: 7, color: "#9ca3af" }}>{m.name}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-0.5">
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 9,
                      fontWeight: 800,
                      color: "#374151",
                    }}
                  >
                    4+
                  </div>
                  <span style={{ fontSize: 7, color: "#9ca3af" }}>Others</span>
                </div>
              </div>
            </div>

            {/* Chat bubbles */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div
                className="rounded-xl rounded-tl-sm px-2.5 py-1.5"
                style={{ background: "#fef3c7", alignSelf: "flex-start", maxWidth: "85%" }}
              >
                <p style={{ fontSize: 8, color: "#92400e", fontWeight: 600, margin: 0 }}>
                  Hey! How is it going? 🙌
                </p>
              </div>
              <div
                className="rounded-xl rounded-tl-sm px-2.5 py-1.5"
                style={{ background: "#fef3c7", alignSelf: "flex-start", maxWidth: "85%" }}
              >
                <p style={{ fontSize: 8, color: "#92400e", fontWeight: 600, margin: 0 }}>
                  I have a new task in design today. Let me know when done ✅
                </p>
              </div>
              <div
                className="rounded-xl rounded-tr-sm px-2.5 py-1.5"
                style={{ background: "#fbbf24", alignSelf: "flex-end", maxWidth: "80%" }}
              >
                <p style={{ fontSize: 8, color: "#fff", fontWeight: 700, margin: 0 }}>
                  Sure thing Diana 👍
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── HowWeWork Section ───── */

export default function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="relative w-full bg-white overflow-hidden"
      style={{ padding: "90px 0 100px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* ── Section header (above the box) ── */}
        <div className="text-center" style={{ marginBottom: "52px" }}>
          {/* Pill badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-200 bg-gray-50"
            style={{ marginBottom: "20px" }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500" />
            </span>
            <span className="text-xs font-semibold tracking-widest text-gray-600 uppercase leading-none">
              Our Process
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            How We{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #d97706 0%, #fbbf24 50%, #f59e0b 100%)",
              }}
            >
              Work
            </span>
          </h2>
          <p
            className="text-gray-500 text-base md:text-lg leading-relaxed"
            style={{ maxWidth: "520px", margin: "14px auto 0" }}
          >
            A transparent, battle-tested process that turns your vision into
            exceptional digital products — faster, smarter, better.
          </p>
        </div>

        {/* ── Large yellow accent container ── */}
        <div
          className="relative rounded-3xl overflow-hidden w-full"
          style={{
            background: "linear-gradient(140deg, #fde68a 0%, #fbbf24 40%, #f59e0b 100%)",
            padding: "36px 36px 0 36px",
          }}
        >
          {/* Decorative wave/leaf blobs — same as reference image */}
          <div
            className="absolute pointer-events-none select-none"
            style={{
              width: 340,
              height: 340,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              top: -120,
              right: -80,
            }}
          />
          <div
            className="absolute pointer-events-none select-none"
            style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.10)",
              bottom: 60,
              left: -60,
            }}
          />
          {/* Leaf shape top-left */}
          <svg
            className="absolute pointer-events-none select-none"
            style={{ top: 10, left: -30, opacity: 0.18 }}
            width="220"
            height="220"
            viewBox="0 0 220 220"
            fill="none"
          >
            <path
              d="M110 10 C160 10, 210 60, 210 110 C210 160, 160 210, 110 210 C60 210, 10 160, 10 110 C10 60, 60 10, 110 10 Z"
              fill="#fff"
            />
          </svg>
          {/* Leaf shape bottom-right */}
          <svg
            className="absolute pointer-events-none select-none"
            style={{ bottom: 40, right: -40, opacity: 0.14 }}
            width="260"
            height="200"
            viewBox="0 0 260 200"
            fill="none"
          >
            <ellipse cx="130" cy="100" rx="130" ry="100" fill="#fff" />
          </svg>

          {/* ── 4 Step cards ── */}
          <div
            className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{ marginBottom: "32px" }}
          >
            {steps.map((step) => (
              <div
                key={step.id}
                className="rounded-2xl flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "#ffffff",
                  padding: "20px 18px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: step.iconBg,
                    color: step.iconColor,
                  }}
                >
                  {step.icon}
                </div>

                {/* Title */}
                <div>
                  <h3
                    className="font-bold text-gray-900"
                    style={{ fontSize: "13px", lineHeight: 1.35, margin: 0 }}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* ── Process mockup floating up ── */}
          <div
            className="relative z-10"
            style={{
              maxWidth: "920px",
              margin: "0 auto",
            }}
          >
            <ProcessMockup />
          </div>
        </div>

      </div>
    </section>
  );
}
