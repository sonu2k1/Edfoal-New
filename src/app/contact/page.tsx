"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useLenis from "@/hooks/useLenis";
import MinimalHero from "@/components/ui/HeroMinimalism";

const GOOGLE_SHEETS_URL = "";

/* ── Shared inline styles (override globals.css dark theme) ── */
const inputStyle: React.CSSProperties = {
  flex: 1,
  height: "40px",
  backgroundColor: "#ffffff",
  border: "1px solid #D1D5DB",
  borderRadius: "6px",
  padding: "0 12px",
  fontSize: "14px",
  color: "#111827",
  outline: "none",
  boxSizing: "border-box",
  width: "100%",
};

const labelStyle: React.CSSProperties = {
  width: "130px",
  flexShrink: 0,
  fontSize: "14px",
  color: "#374151",
  fontWeight: 500,
  paddingTop: "10px",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
};

export default function ContactPage() {
  useLenis();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    geoFocus: "",
    potentialUsecase: "",
    protectData: false,
  });

  const [isSubmitting,  setIsSubmitting]  = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError,   setSubmitError]   = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, protectData: e.target.checked }));
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#2563EB";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
  };

  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#D1D5DB";
    e.currentTarget.style.boxShadow = "none";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      if (GOOGLE_SHEETS_URL) {
        const body = new FormData(e.currentTarget);
        const res = await fetch(GOOGLE_SHEETS_URL, { method: "POST", body });
        if (!res.ok) throw new Error("Submission failed. Please try again.");
      } else {
        await new Promise((r) => setTimeout(r, 1500));
      }
      setSubmitSuccess(true);
      setFormData({
        fullName: "", email: "", phone: "",
        company: "", geoFocus: "", potentialUsecase: "",
        protectData: false,
      });
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: "#ffffff" }}>

      <Navbar />

      {/* ── Page Banner / Hero ── */}
      <MinimalHero
        kicker="Contact Us"
        title={<span className="text-[#f5e1b8]">Tailored AI Solutions</span>}
        subtitle="Explore how we're transforming businesses with cutting-edge AI solutions tailored just for you!"
        showFooter={false}
      />

      {/* ── Contact Form Section ── */}
      <section
        style={{
          backgroundColor: "#ffffff",
          padding: "72px 24px 96px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AnimatePresence mode="wait">

          {/* ── Success State ── */}
          {submitSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                textAlign: "center", maxWidth: "480px",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                <CheckCircle size={36} color="#22C55E" />
              </motion.div>
              <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", marginBottom: "12px" }}>
                Thank You!
              </h2>
              <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.7, marginBottom: "32px", maxWidth: "none" }}>
                Your inquiry has been received. Our AI specialists will review your requirements and get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "14px", fontWeight: 600, color: "#2563EB",
                  background: "none", border: "none", cursor: "pointer",
                }}
              >
                <span>Send another message</span>
                <ArrowRight size={15} />
              </button>
            </motion.div>

          ) : (

            /* ── Form State ── */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: "100%", maxWidth: "560px" }}
            >
              {/* Heading */}
              <div style={{ textAlign: "center", marginBottom: "36px" }}>
                <h1 style={{
                  fontSize: "36px", fontWeight: 700, lineHeight: 1.2,
                  marginBottom: "12px", color: "#111827",
                }}>
                  Get in{" "}
                  <span style={{ color: "#2563EB" }}>Touch</span>
                </h1>
                <p style={{
                  fontSize: "14px", color: "#6B7280", lineHeight: 1.7,
                  maxWidth: "440px", margin: "0 auto",
                }}>
                  Tailored technologies designed to drive your business forward and address your unique challenges.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >

                {/* Full Name */}
                <div style={rowStyle}>
                  <span style={labelStyle}>Full Name</span>
                  <input
                    name="fullName" type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={focusStyle} onBlur={blurStyle}
                  />
                </div>

                {/* Work Email */}
                <div style={rowStyle}>
                  <span style={labelStyle}>Work Email</span>
                  <input
                    name="email" type="email"
                    placeholder="Enter your work email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={focusStyle} onBlur={blurStyle}
                  />
                </div>

                {/* Phone */}
                <div style={rowStyle}>
                  <span style={labelStyle}>Phone</span>
                  <input
                    name="phone" type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={focusStyle} onBlur={blurStyle}
                  />
                </div>

                {/* Helper text */}
                <p style={{
                  fontSize: "12px", color: "#9CA3AF", textAlign: "center",
                  fontStyle: "italic", margin: "-4px 0", maxWidth: "none",
                }}>
                  For a more tailored demo, please tell us about your company (optional)
                </p>

                {/* Company */}
                <div style={rowStyle}>
                  <span style={labelStyle}>Company</span>
                  <input
                    name="company" type="text"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={focusStyle} onBlur={blurStyle}
                  />
                </div>

                {/* Geo Focus */}
                <div style={rowStyle}>
                  <span style={labelStyle}>Geo Focus</span>
                  <input
                    name="geoFocus" type="text"
                    placeholder="Enter your company's location"
                    value={formData.geoFocus}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={focusStyle} onBlur={blurStyle}
                  />
                </div>

                {/* Potential Usecase */}
                <div style={rowStyle}>
                  <span style={{ ...labelStyle, paddingTop: "10px" }}>Potential Usecase</span>
                  <textarea
                    name="potentialUsecase"
                    placeholder="Describe"
                    value={formData.potentialUsecase}
                    onChange={handleChange}
                    rows={4}
                    style={{
                      ...inputStyle,
                      height: "auto",
                      padding: "10px 12px",
                      resize: "vertical",
                      minHeight: "100px",
                      fontFamily: "inherit",
                      lineHeight: 1.5,
                    }}
                    onFocus={focusStyle} onBlur={blurStyle}
                  />
                </div>

                {/* Protect Data Checkbox */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "142px" }}>
                  <input
                    type="checkbox"
                    id="protectData"
                    name="protectData"
                    checked={formData.protectData}
                    onChange={handleCheckbox}
                    style={{ width: "15px", height: "15px", accentColor: "#2563EB", cursor: "pointer", flexShrink: 0 }}
                  />
                  <label
                    htmlFor="protectData"
                    style={{ fontSize: "14px", color: "#374151", cursor: "pointer", userSelect: "none" }}
                  >
                    I want to protect my data
                  </label>
                </div>

                {/* Error */}
                {submitError && (
                  <p style={{
                    fontSize: "13px", color: "#DC2626",
                    padding: "10px 14px", borderRadius: "6px",
                    backgroundColor: "#FEF2F2", border: "1px solid #FECACA",
                    maxWidth: "none",
                  }}>
                    {submitError}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    height: "44px",
                    backgroundColor: isSubmitting ? "#1e40af" : "#1e3a8a",
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: "14px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "background-color 0.2s",
                    marginTop: "4px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) e.currentTarget.style.backgroundColor = "#1d4ed8";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) e.currentTarget.style.backgroundColor = "#1e3a8a";
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: "15px", height: "15px",
                        border: "2px solid rgba(255,255,255,0.35)",
                        borderTopColor: "#ffffff",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }} />
                      Submitting...
                    </>
                  ) : (
                    "Contact Us"
                  )}
                </button>

                {/* Footer note */}
                <p style={{
                  fontSize: "11px", color: "#9CA3AF",
                  textAlign: "center", marginTop: "-8px", maxWidth: "none",
                }}>
                  Field marked with * are required to complete demo
                </p>

              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}
