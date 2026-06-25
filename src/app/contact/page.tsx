"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { FaFacebook, FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import useLenis from "@/hooks/useLenis";

const GOOGLE_SHEETS_URL = "";

/* ── shared input style — inline overrides globals.css dark theme ── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "40px",
  backgroundColor: "#ffffff",
  border: "1px solid #D1D5DB",
  borderRadius: "6px",
  padding: "0 12px",
  fontSize: "14px",
  color: "#111827",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#374151",
  fontWeight: 400,
  whiteSpace: "nowrap",
};

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "140px 1fr",
  alignItems: "center",
  marginBottom: "16px",
  gap: "12px",
};

export default function ContactPage() {
  useLenis();

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
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
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
        fullName: "", workEmail: "", phone: "",
        company: "", geoFocus: "", potentialUsecase: "", protectData: false,
      });
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero Banner ── */}
      <div className="relative">
        <MinimalistHero
          mainText="Explore how we're transforming businesses with cutting-edge AI solutions tailored just for you! Reach out to our AI strategy and engineering team to get started."
          readMoreLink="#contact-form"
          imageSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
          imageAlt="Contact Edfoal AI Solutions"
          overlayText={{ part1: "get in", part2: "touch." }}
          socialLinks={[
            { icon: FaFacebook, href: "#" },
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedin, href: "#" },
            { icon: FaYoutube, href: "#" },
          ]}
          locationText="Edfoal AI Solutions"
          hideHeader={true}
          hideFooter={true}
          className="mx-1.5 mt-1.5 w-auto rounded-xl bg-[#001427] text-white sm:mx-2.5 sm:mt-2.5"
        />
        {/* Fade from dark hero into white content below */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
          style={{ height: "120px", background: "linear-gradient(to top, #ffffff, transparent)" }}
        />
      </div>

      {/* ── Contact Form ── */}
      <section
        id="contact-form"
        style={{ backgroundColor: "#ffffff", padding: "64px 24px 80px" }}
      >
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>

          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 2.5rem)",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "14px",
              lineHeight: 1.2,
            }}>
              Get in <span style={{ color: "#2563EB" }}>Touch</span>
            </h1>
            <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.7, maxWidth: "none" }}>
              Tailored technologies designed to drive your business forward and address your unique challenges.
            </p>
          </div>

          {/* Form / Success */}
          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >

                {/* Full Name */}
                <div style={rowStyle}>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    name="fullName" type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "#D1D5DB"; }}
                  />
                </div>

                {/* Work Email */}
                <div style={rowStyle}>
                  <label style={labelStyle}>Work Email</label>
                  <input
                    name="workEmail" type="email"
                    placeholder="Enter your work email"
                    value={formData.workEmail}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "#D1D5DB"; }}
                  />
                </div>

                {/* Phone */}
                <div style={{ ...rowStyle, marginBottom: "24px" }}>
                  <label style={labelStyle}>Phone</label>
                  <input
                    name="phone" type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "#D1D5DB"; }}
                  />
                </div>

                {/* Helper text */}
                <p style={{
                  fontSize: "12px", color: "#9CA3AF", textAlign: "center",
                  fontStyle: "italic", marginBottom: "16px", maxWidth: "none",
                }}>
                  For a more tailored demo, please tell us about your company (optional)
                </p>

                {/* Company */}
                <div style={rowStyle}>
                  <label style={labelStyle}>Company</label>
                  <input
                    name="company" type="text"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "#D1D5DB"; }}
                  />
                </div>

                {/* Geo Focus */}
                <div style={rowStyle}>
                  <label style={labelStyle}>Geo Focus</label>
                  <input
                    name="geoFocus" type="text"
                    placeholder="Enter your company's location"
                    value={formData.geoFocus}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "#D1D5DB"; }}
                  />
                </div>

                {/* Potential Usecase */}
                <div style={{ ...rowStyle, alignItems: "flex-start", marginBottom: "24px" }}>
                  <label style={{ ...labelStyle, paddingTop: "8px" }}>Potential Usecase</label>
                  <textarea
                    name="potentialUsecase"
                    placeholder="Describe"
                    value={formData.potentialUsecase}
                    onChange={handleChange}
                    rows={4}
                    style={{
                      ...inputStyle,
                      height: "auto",
                      padding: "8px 12px",
                      resize: "none",
                      lineHeight: 1.6,
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "#D1D5DB"; }}
                  />
                </div>

                {/* Checkbox */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                  <input
                    type="checkbox"
                    id="protectData"
                    name="protectData"
                    checked={formData.protectData}
                    onChange={handleChange}
                    style={{ width: "15px", height: "15px", cursor: "pointer", accentColor: "#2563EB" }}
                  />
                  <label htmlFor="protectData" style={{ fontSize: "14px", color: "#374151", cursor: "pointer" }}>
                    I want to protect my data
                  </label>
                </div>

                {submitError && (
                  <p style={{
                    fontSize: "13px", color: "#DC2626",
                    backgroundColor: "#FEF2F2", border: "1px solid #FECACA",
                    borderRadius: "6px", padding: "10px 14px",
                    marginBottom: "16px", maxWidth: "none",
                  }}>
                    {submitError}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    height: "44px",
                    backgroundColor: "#1e3a8a",
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "6px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "background-color 0.2s",
                    letterSpacing: "0.01em",
                    opacity: isSubmitting ? 0.75 : 1,
                  }}
                  onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
                  onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = "#1e3a8a"; }}
                >
                  {isSubmitting ? "Submitting…" : "Contact Us"}
                </button>

                <p style={{
                  fontSize: "11px", color: "#9CA3AF", textAlign: "center",
                  marginTop: "12px", maxWidth: "none",
                }}>
                  Field marked with * are required to complete demo
                </p>

              </motion.form>

            ) : (

              <motion.div
                key="success"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", textAlign: "center",
                  padding: "48px 0",
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
                <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>
                  Thank You!
                </h2>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.7, marginBottom: "32px", maxWidth: "340px" }}>
                  Your message has been received. Our team will review your request and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    fontSize: "13px", fontWeight: 600, color: "#2563EB",
                    background: "none", border: "none", cursor: "pointer",
                  }}
                >
                  <span>Send another message</span>
                  <ArrowRight size={15} />
                </button>
              </motion.div>

            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
