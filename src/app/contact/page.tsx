"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, Phone, MessageCircle, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useLenis from "@/hooks/useLenis";
import MinimalHero from "@/components/ui/HeroMinimalism";

const GOOGLE_SHEETS_URL = "";

const SERVICES = [
  { id: "automation",  label: "Automation" },
  { id: "tailored_ai", label: "Tailored AI" },
  { id: "analytics",   label: "Analytics" },
  { id: "consulting",  label: "Consulting" },
  { id: "integration", label: "Integration" },
  { id: "other",       label: "Other" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook", href: "#",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  },
  {
    label: "X", href: "#",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" width={18} height={18}><path d="M4 4l16 16M20 4 4 20" /></svg>,
  },
  {
    label: "LinkedIn", href: "#",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
  },
  {
    label: "YouTube", href: "#",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>,
  },
];

/* Shared input style — inline styles override global dark CSS */
const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "48px",
  backgroundColor: "#ffffff",
  border: "1px solid #D1D5DB",
  borderRadius: "8px",
  padding: "0 16px",
  fontSize: "14px",
  color: "#111827",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "14px",
  fontWeight: 500,
  color: "#374151",
  marginBottom: "6px",
};

export default function ContactPage() {
  useLenis();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    services: [] as string[],
  });

  const [isSubmitting,  setIsSubmitting]  = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError,   setSubmitError]   = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      if (GOOGLE_SHEETS_URL) {
        const body = new FormData(e.currentTarget);
        body.append("services", formData.services.join(", "));
        const res = await fetch(GOOGLE_SHEETS_URL, { method: "POST", body });
        if (!res.ok) throw new Error("Submission failed. Please try again.");
      } else {
        await new Promise((r) => setTimeout(r, 1500));
      }
      setSubmitSuccess(true);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "", services: [] });
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#000000" }}>
      <Navbar />

      <MinimalHero
        kicker="Contact Us"
        title={<span className="text-[#f5e1b8]">Tailored AI Solutions</span>}
        subtitle="Explore how we're transforming businesses with cutting-edge AI solutions tailored just for you!"
        showFooter={false}
      />

      {/* ── Contact Section ── */}
      <section
        className="relative z-10 w-full mx-auto"
        style={{
          maxWidth: "1200px",
          padding: "80px 40px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#ffffff",
            border: "1px solid #E5E7EB",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
          className="flex-col lg:flex-row"
        >

          {/* ══════════════════════════
              LEFT SIDEBAR
          ══════════════════════════ */}
          <div
            className="flex-shrink-0 w-full lg:w-[30%] flex flex-col justify-between"
            style={{
              backgroundColor: "#F8F9FA",
              borderRight: "1px solid #E5E7EB",
              padding: "48px 40px",
            }}
          >
            <div>
              {/* Heading */}
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", marginBottom: "12px", lineHeight: 1.3 }}>
                Get in touch
              </h2>
              <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.7, marginBottom: "40px", maxWidth: "none" }}>
                We&apos;d love to hear from you. Our friendly team is always here to chat.
              </p>

              {/* Contact items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

                {/* Chat to us */}
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    backgroundColor: "#ffffff", border: "1px solid #E5E7EB",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "2px",
                  }}>
                    <MessageCircle size={17} color="#6B7280" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "4px", maxWidth: "none" }}>Chat to us</p>
                    <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "6px", lineHeight: 1.5, maxWidth: "none" }}>Our friendly team is here to help.</p>
                    <a href="mailto:info@edfoal.com" style={{ fontSize: "13px", fontWeight: 600, color: "#111827", textDecoration: "none" }}>
                      info@edfoal.com
                    </a>
                  </div>
                </div>

                {/* Office */}
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    backgroundColor: "#ffffff", border: "1px solid #E5E7EB",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "2px",
                  }}>
                    <MapPin size={17} color="#6B7280" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "4px", maxWidth: "none" }}>Office</p>
                    <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "6px", lineHeight: 1.5, maxWidth: "none" }}>Come say hello at our office HQ.</p>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", maxWidth: "none" }}>Global Remote Support</p>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    backgroundColor: "#ffffff", border: "1px solid #E5E7EB",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "2px",
                  }}>
                    <Phone size={17} color="#6B7280" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "4px", maxWidth: "none" }}>Phone</p>
                    <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "6px", lineHeight: 1.5, maxWidth: "none" }}>Mon–Fri from 9am to 8pm.</p>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", maxWidth: "none" }}>9:00 – 20:00</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Social icons — bottom */}
            <div style={{ display: "flex", gap: "20px", marginTop: "48px", paddingTop: "32px", borderTop: "1px solid #E5E7EB" }}>
              {SOCIAL_LINKS.map(({ svg, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#9CA3AF", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#374151")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* ══════════════════════════
              RIGHT FORM AREA
          ══════════════════════════ */}
          <div className="flex-1" style={{ backgroundColor: "#ffffff" }}>
            <AnimatePresence mode="wait">

              {/* Form */}
              {!submitSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  style={{ padding: "48px 56px" }}
                >
                  {/* Heading */}
                  <h2 style={{ fontSize: "36px", fontWeight: 700, color: "#111827", marginBottom: "8px", lineHeight: 1.2 }}>
                    Level up your brand
                  </h2>
                  <p style={{ fontSize: "14px", color: "#6B7280", marginBottom: "40px", lineHeight: 1.6, maxWidth: "none" }}>
                    You can reach us anytime via{" "}
                    <a href="mailto:info@edfoal.com" style={{ fontWeight: 600, color: "#111827", textDecoration: "none" }}>
                      info@edfoal.com
                    </a>
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                    {/* First name + Last name */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={labelStyle}>
                          First name <span style={{ color: "#7C3AED" }}>*</span>
                        </label>
                        <input
                          id="firstName" name="firstName" type="text"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          style={inputStyle}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#7C3AED"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>
                          Last name <span style={{ color: "#7C3AED" }}>*</span>
                        </label>
                        <input
                          id="lastName" name="lastName" type="text"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          style={inputStyle}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#7C3AED"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label style={labelStyle}>
                        Email <span style={{ color: "#7C3AED" }}>*</span>
                      </label>
                      <input
                        id="email" name="email" type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#7C3AED"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label style={labelStyle}>Phone number</label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <div style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          height: "48px", padding: "0 12px",
                          backgroundColor: "#ffffff", border: "1px solid #D1D5DB",
                          borderRadius: "8px", fontSize: "14px", color: "#374151",
                          whiteSpace: "nowrap", userSelect: "none", flexShrink: 0,
                        }}>
                          🇺🇸 US ▾
                        </div>
                        <input
                          id="phone" name="phone" type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{ ...inputStyle, flex: 1 }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#7C3AED"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={labelStyle}>
                        Message <span style={{ color: "#7C3AED" }}>*</span>
                      </label>
                      <textarea
                        id="message" name="message"
                        placeholder="Leave us a message..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        style={{
                          width: "100%",
                          minHeight: "120px",
                          backgroundColor: "#ffffff",
                          border: "1px solid #D1D5DB",
                          borderRadius: "8px",
                          padding: "12px 16px",
                          fontSize: "14px",
                          color: "#111827",
                          outline: "none",
                          resize: "none",
                          boxSizing: "border-box",
                          fontFamily: "inherit",
                          lineHeight: 1.6,
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#7C3AED"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>

                    {/* Services */}
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "16px", maxWidth: "none" }}>
                        Services
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 32px" }}>
                        {SERVICES.map((s) => (
                          <label
                            key={s.id}
                            onClick={() => toggleService(s.id)}
                            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
                          >
                            <div style={{
                              width: "16px", height: "16px", borderRadius: "4px",
                              border: `1.5px solid ${formData.services.includes(s.id) ? "#7C3AED" : "#D1D5DB"}`,
                              backgroundColor: formData.services.includes(s.id) ? "#7C3AED" : "#ffffff",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0, transition: "all 0.15s",
                            }}>
                              {formData.services.includes(s.id) && (
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span style={{ fontSize: "14px", color: "#6B7280", userSelect: "none" }}>{s.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {submitError && (
                      <p style={{ fontSize: "14px", color: "#DC2626", padding: "12px 16px", borderRadius: "8px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", maxWidth: "none" }}>
                        {submitError}
                      </p>
                    )}

                    {/* Submit button — centered, fixed width */}
                    <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          width: "220px",
                          height: "48px",
                          background: isSubmitting ? "#a78bfa" : "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",
                          color: "#ffffff",
                          fontWeight: 600,
                          fontSize: "14px",
                          borderRadius: "10px",
                          border: "none",
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.transform = "scale(1.03)";
                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,0.45)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "0 4px 14px rgba(124,58,237,0.35)";
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <div style={{
                              width: "16px", height: "16px",
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderTopColor: "#ffffff",
                              borderRadius: "50%",
                              animation: "spin 0.7s linear infinite",
                            }} />
                            Submitting...
                          </>
                        ) : (
                          "Get started"
                        )}
                      </button>
                    </div>

                  </form>
                </motion.div>

              ) : (
                /* Success state */
                <motion.div
                  key="success"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45 }}
                  style={{
                    padding: "48px 56px",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    minHeight: "520px", textAlign: "center",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
                    style={{
                      width: "80px", height: "80px", borderRadius: "50%",
                      backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "32px",
                    }}
                  >
                    <CheckCircle size={40} color="#22C55E" />
                  </motion.div>
                  <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", marginBottom: "12px" }}>
                    Thank You!
                  </h2>
                  <p style={{ fontSize: "15px", color: "#6B7280", maxWidth: "360px", lineHeight: 1.7, marginBottom: "40px" }}>
                    Your inquiry has been received. Our team will review your requirements and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      fontSize: "13px", fontWeight: 600, color: "#7C3AED",
                      background: "none", border: "none", cursor: "pointer",
                    }}
                  >
                    <span>Send another message</span>
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
