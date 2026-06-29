"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  MapPin,
  Phone,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { FaFacebook, FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { OriginButton } from "@/components/ui/OriginButton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import useLenis from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

// If you have a Google Sheets deployment URL, paste it here to enable active submission:
const GOOGLE_SHEETS_URL = "";

export default function ContactPage() {
  // Initialize Lenis scroll smoothing
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (GOOGLE_SHEETS_URL) {
        const formElement = e.currentTarget;
        const body = new FormData(formElement);
        body.set("protectData", formData.protectData ? "Yes" : "No");

        const response = await fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          body: body,
        });

        if (response.ok) {
          setSubmitSuccess(true);
          setFormData({
            fullName: "",
            workEmail: "",
            phone: "",
            company: "",
            geoFocus: "",
            potentialUsecase: "",
            protectData: false,
          });
        } else {
          throw new Error("Unable to submit. Please check script configuration.");
        }
      } else {
        // Simulation/Mock submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitSuccess(true);
        setFormData({
          fullName: "",
          workEmail: "",
          phone: "",
          company: "",
          geoFocus: "",
          potentialUsecase: "",
          protectData: false,
        });
      }
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-white text-zinc-900 selection:bg-purple-500/10 selection:text-purple-900 overflow-hidden">
        {/* Light Background Gradients & Grid */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-white -z-50 pointer-events-none select-none">
          {/* Light Grid Overlay */}
          <div className="absolute inset-0 opacity-70 bg-size-[50px_50px] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]" />

          {/* Noise overlay */}
          <div className="noise-overlay" />

          {/* Soft violet/blue gradient blurs adapted for white theme */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.04),transparent_50%)]" />
          
          <div className="absolute top-[15%] left-[10%] w-[350px] h-[350px] rounded-full bg-purple-400/5 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-indigo-400/5 blur-[140px]" />
        </div>

        {/* Floating Navbar */}
        <Navbar />

        {/* MinimalistHero Section */}
        <div className="relative">
          <MinimalistHero
            mainText="Explore how we're transforming businesses with cutting-edge AI solutions tailored just for you! Reach out to our AI strategy and engineering team to get started."
            readMoreLink="#contact-form-section"
            imageSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
            imageAlt="Contact Edfoal AI Solutions"
            overlayText={{
              part1: "get in",
              part2: "touch.",
            }}
            socialLinks={[
              { icon: FaFacebook, href: "#" },
              { icon: FaXTwitter, href: "#" },
              { icon: FaLinkedin, href: "#" },
              { icon: FaYoutube, href: "#" },
            ]}
            locationText="Edfoal AI Solutions"
            hideHeader={true}
            hideFooter={true}
            className="mx-1.5 mt-1.5 w-auto rounded-xl bg-[#001427] text-white [--background:207_100%_8%] [--foreground:0_0%_100%] sm:mx-2.5 sm:mt-2.5"
          />
          {/* Bottom fade overlay to transition the black card background into the white content area below */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-28 bg-linear-to-t from-white to-transparent pointer-events-none sm:h-40" />
        </div>

        {/* Main Content & Footer inside light theme wrapper */}
        <div data-theme="light">
          {/* Main Content Section */}
          <section id="contact-form-section" className="relative z-10 mx-auto w-full max-w-360 px-4 pb-16 pt-12 sm:px-6 sm:pb-18 sm:pt-14 md:px-8 md:pb-20 md:pt-16 lg:px-[max(32px,4vw)]">
          <div className="w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] lg:rounded-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Info Sidebar */}
              <div className="flex flex-col justify-between border-b border-zinc-200 bg-zinc-50/50 p-5 sm:p-8 md:p-10 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-12">
                <div>
                  {/* Heading */}
                  <h1 className="mb-3 text-[clamp(2rem,8vw,2.75rem)] font-bold leading-tight tracking-tight text-zinc-950 md:text-4xl">
                    Get in touch
                  </h1>
                  <p className="mb-8 max-w-sm text-sm leading-relaxed text-zinc-500 md:mb-10 md:text-base">
                    We&apos;d love to hear from you. Our friendly team is always here to chat.
                  </p>

                  {/* Info Blocks */}
                  <div className="space-y-6 md:space-y-8">
                    {/* Chat */}
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-sm">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-zinc-900 text-base mb-1">
                          Chat to us
                        </h3>
                        <p className="text-zinc-500 text-xs md:text-sm mb-2">
                          Our friendly team is here to help.
                        </p>
                        <a
                          href="mailto:info@edfoal.com"
                          className="text-sm font-semibold text-zinc-800 hover:text-purple-600 transition-colors"
                        >
                          info@edfoal.com
                        </a>
                      </div>
                    </div>

                    {/* Office */}
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-sm">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-zinc-900 text-base mb-1">
                          Office
                        </h3>
                        <p className="text-zinc-500 text-xs md:text-sm mb-2">
                          Come say hello at our office HQ.
                        </p>
                        <p className="text-sm font-semibold text-zinc-800 leading-relaxed">
                          100 Smith Street<br />Collingwood VIC 3066 AU
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-sm">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-zinc-900 text-base mb-1">
                          Phone
                        </h3>
                        <p className="text-zinc-500 text-xs md:text-sm mb-2">
                          Mon-Fri from 8am to 5pm.
                        </p>
                        <a
                          href="tel:+15550000000"
                          className="text-sm font-semibold text-zinc-800 hover:text-purple-600 transition-colors"
                        >
                          +1 (555) 000-0000
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form Container */}
              <div className="flex flex-col justify-center bg-white p-5 sm:p-8 md:p-10 lg:col-span-7 lg:p-12">
                <AnimatePresence mode="wait">
                  {!submitSuccess ? (
                    <motion.div
                      key="form-container"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Header */}
                      <div className="mb-7 md:mb-8">
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
                          Level up your brand
                        </h2>
                        <p className="text-zinc-500 text-sm md:text-base">
                          You can reach us anytime via{" "}
                          <a
                            href="mailto:info@edfoal.com"
                            className="text-zinc-900 font-medium hover:text-purple-600 transition-colors"
                          >
                            info@edfoal.com
                          </a>
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-x-6 gap-y-5">
                        {/* Full Name */}
                        <label htmlFor="fullName" className="text-zinc-700 text-sm font-semibold md:py-2.5">
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none sm:py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                        />

                        {/* Work Email */}
                        <label htmlFor="workEmail" className="text-zinc-700 text-sm font-semibold md:py-2.5">
                          Work Email
                        </label>
                        <input
                          id="workEmail"
                          name="workEmail"
                          type="email"
                          placeholder="Enter your work email"
                          value={formData.workEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none sm:py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                        />

                        {/* Phone */}
                        <label htmlFor="phone" className="text-zinc-700 text-sm font-semibold md:py-2.5">
                          Phone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none sm:py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                        />

                        {/* Optional Section Header */}
                        <div className="col-span-1 md:col-span-2 text-center text-zinc-400 text-[13px] italic py-2">
                          For a more tailored demo, please tell us about your company (optional)
                        </div>

                        {/* Company */}
                        <label htmlFor="company" className="text-zinc-700 text-sm font-semibold md:py-2.5">
                          Company
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Enter your company name"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none sm:py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                        />

                        {/* Geo Focus */}
                        <label htmlFor="geoFocus" className="text-zinc-700 text-sm font-semibold md:py-2.5">
                          Geo Focus
                        </label>
                        <input
                          id="geoFocus"
                          name="geoFocus"
                          type="text"
                          placeholder="Enter your company's location"
                          value={formData.geoFocus}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none sm:py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                        />

                        {/* Potential Usecase */}
                        <label htmlFor="potentialUsecase" className="text-zinc-700 text-sm font-semibold md:pt-2">
                          Potential Usecase
                        </label>
                        <textarea
                          id="potentialUsecase"
                          name="potentialUsecase"
                          rows={4}
                          placeholder="Describe"
                          value={formData.potentialUsecase}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none resize-none min-h-[100px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                        />

                        {/* Checkbox */}
                        <div className="col-span-1 md:col-span-2 flex items-center gap-3 py-2">
                          <input
                            id="protectData"
                            name="protectData"
                            type="checkbox"
                            checked={formData.protectData}
                            onChange={handleCheckboxChange}
                            className="h-4.5 w-4.5 rounded border-zinc-300 text-[#0A1C3A] focus:ring-[#0A1C3A] cursor-pointer"
                          />
                          <label htmlFor="protectData" className="text-zinc-600 text-sm font-medium cursor-pointer select-none">
                            I want to protect my data
                          </label>
                        </div>

                        {/* Submit Error */}
                        {submitError && (
                          <div className="col-span-1 md:col-span-2 text-sm font-semibold text-rose-600 p-4 rounded-lg bg-rose-50 border border-rose-100">
                            {submitError}
                          </div>
                        )}

                        {/* Submit Button */}
                        <div className="col-span-1 md:col-span-2 pt-2">
                          <OriginButton
                            type="submit"
                            disabled={isSubmitting}
                            className="h-12 w-full rounded-full border text-sm font-semibold tracking-wide [--ic-card:#0A1C3A] [--ic-card-foreground:#ffffff] [--ic-border:#0A1C3A] [--ic-foreground:#ffffff] [--ic-background:#0A1C3A]"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                                <span>Submitting...</span>
                              </div>
                            ) : (
                              <span>Contact Us</span>
                            )}
                          </OriginButton>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    /* Success Screen */
                    <motion.div
                      key="success-container"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.2,
                        }}
                        className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.05)]"
                      >
                        <CheckCircle className="w-8 h-8" />
                      </motion.div>

                      <h2 className="text-2xl md:text-3xl font-bold text-zinc-950 mb-3 tracking-tight">
                        Message Sent!
                      </h2>
                      <p className="text-zinc-500 text-sm md:text-base max-w-sm mb-8 leading-relaxed">
                        Thanks for reaching out! Our team will review your message and connect with you shortly.
                      </p>

                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-500 uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                      >
                        <span>Send another message</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

          {/* Footer */}
          <Footer />
        </div>
      </main>
  );
}
