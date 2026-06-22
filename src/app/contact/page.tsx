"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  ArrowRight,
  Phone,
  Shield,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import useLenis from "@/hooks/useLenis";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import MinimalHero from "@/components/ui/hero-minimalism";

// If you have a Google Sheets deployment URL, paste it here to enable active submission:
const GOOGLE_SHEETS_URL = "";

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default function ContactPage() {
  // Initialize Lenis scroll smoothing
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
        // Create form data to submit to the Google Sheet URL
        const formElement = e.currentTarget;
        const body = new FormData(formElement);

        const response = await fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          body: body,
        });

        if (response.ok) {
          setSubmitSuccess(true);
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            company: "",
            geoFocus: "",
            potentialUsecase: "",
            protectData: false,
          });
        } else {
          throw new Error("Unable to submit to sheet. Please check script configuration.");
        }
      } else {
        // Simulation/Mock submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          geoFocus: "",
          potentialUsecase: "",
          protectData: false,
        });
      }
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden" >
      {/* Background Grids, Noise and Radial Spots */}
      <BackgroundEffects />

      {/* Floating Navbar */}
      <Navbar />

      {/* MinimalHero Background with stars and grid */}
      <MinimalHero
        kicker="Contact Us"
        title={
          <span className="text-[#f5e1b8]">Tailored AI Solutions</span>
        }
        subtitle="Explore how we're transforming businesses with cutting-edge AI solutions tailored just for you!"
        showFooter={false}
      />

      {/* Hero / Main Section Grid */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Content Column */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-purple-400 uppercase mb-4"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              Contact Us
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white"
            >
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-indigo-500">Touch</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-lg font-normal"
            >
              Tailored technologies designed to drive your business forward and address your unique challenges!
            </motion.p>

            {/* Information Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="space-y-6 max-w-md"
            >
              {/* Email Card */}
              <div className="glass-panel rounded-2xl p-5 border border-white/5 hover:border-purple-500/20 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-0.5">
                    Work Email
                  </h3>
                  <a
                    href="mailto:info@edfoal.com"
                    className="text-sm font-semibold text-zinc-200 hover:text-purple-400 transition-colors duration-200"
                  >
                    info@edfoal.com
                  </a>
                </div>
              </div>

              {/* Hours Card */}
              <div className="glass-panel rounded-2xl p-5 border border-white/5 hover:border-purple-500/20 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-0.5">
                    Operating Hours
                  </h3>
                  <p className="text-sm font-semibold text-zinc-200">
                    Mon - Fri, 9:00 - 20:00
                  </p>
                </div>
              </div>

              {/* Location Card */}
              <div className="glass-panel rounded-2xl p-5 border border-white/5 hover:border-purple-500/20 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-0.5">
                    Location
                  </h3>
                  <p className="text-sm font-semibold text-zinc-200">
                    Global Remote Support
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7" style={{height:"60vh", width:"90vh"}}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="glass-panel rounded-3xl p-8 md:p-10 border border-white/5 relative overflow-hidden backdrop-blur-xl shadow-2xl"
            >
              {/* Spotlight effects inside the form card */}
              <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.div
                    key="form-container"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <form
                      id="contactForm"
                      name="submit-to-google-sheet"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      style={{margin:"20px"}}
                    >
                      {/* Name Field */}
                      <LabelInputContainer>
                        <Label htmlFor="fullName">
                          Full Name <span className="text-purple-400">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                           style={{margin:"10px 10px 10px 0"}}
                        />
                      </LabelInputContainer>

                      {/* Email & Phone Group */}
                      <div className="flex flex-col md:flex-row md:space-x-2 space-y-4 md:space-y-0">
                        <LabelInputContainer>
                          <Label htmlFor="email">
                            Work Email <span className="text-purple-400">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your work email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            style={{margin:"10px 10px 10px 0"}}
                          />
                        </LabelInputContainer>

                        <LabelInputContainer>
                          <Label htmlFor="phone">
                            Phone <span className="text-purple-400">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                             style={{margin:"10px"}}
                          />
                        </LabelInputContainer>
                      </div>

                      {/* Optional Separator Text */}
                      <div className="pt-2 border-t border-white/5">
                        <p className="text-xs font-semibold text-purple-400 tracking-wide">
                          For a more tailored demo, please tell us about your company (optional)
                        </p>
                      </div>

                      {/* Company & GeoFocus Group */}
                      <div className="flex flex-col md:flex-row md:space-x-2 space-y-4 md:space-y-0">
                        <LabelInputContainer>
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Enter your company name"
                            value={formData.company}
                            onChange={handleInputChange}
                             style={{margin:"10px 10px 10px 0"}}
                          />
                        </LabelInputContainer>

                        <LabelInputContainer>
                          <Label htmlFor="geoFocus">Geo Focus</Label>
                          <Input
                            id="geoFocus"
                            name="geoFocus"
                            type="text"
                            placeholder="Enter your company's location"
                            value={formData.geoFocus}
                            onChange={handleInputChange}
                             style={{margin:"10px"}}
                          />
                        </LabelInputContainer>
                      </div>

                      {/* Usecase Field */}
                      <LabelInputContainer>
                        <Label htmlFor="potentialUsecase">Potential Usecase</Label>
                        <Textarea
                          id="potentialUsecase"
                          name="potentialUsecase"
                          placeholder="Describe your use case..."
                          rows={4}
                          value={formData.potentialUsecase}
                          onChange={handleInputChange}
                           style={{margin:"10px 10px 10px 0"}}
                        />
                      </LabelInputContainer>

                      {/* Protect Data Checkbox */}
                      <div className="flex items-center gap-3">
                        <label className="relative flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            id="protectData"
                            name="protectData"
                            checked={formData.protectData}
                            onChange={handleCheckboxChange}
                            className="sr-only peer"
                             style={{margin:"10px"}}
                          />
                          <div className="w-5 h-5 border border-white/20 peer-checked:border-purple-500 peer-checked:bg-purple-600/30 rounded flex items-center justify-center transition-all duration-300">
                            <Shield className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                          </div>
                          <span className="ml-3 text-sm text-zinc-300 hover:text-white select-none transition-colors duration-200">
                            I want to protect my data
                          </span>
                        </label>
                      </div>

                      {/* Submission Error Message */}
                      {submitError && (
                        <div className="text-sm font-semibold text-rose-400 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                          {submitError}
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group/btn relative block h-12 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-bold uppercase tracking-wider text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer disabled:cursor-not-allowed transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span>Contact Us</span>
                            <Send className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </div>
                        )}
                        <BottomGradient />
                      </button>
                    </form>

                    {/* Optional Form Field Note */}
                    {/* <p className="text-[11px] text-zinc-500 mt-4 text-center">
                      Fields marked with <span className="text-purple-400">*</span> are required to complete demo
                    </p> */}
                  </motion.div>
                ) : (
                  /* Beautiful Premium Success Screen */
                  <motion.div
                    key="success-container"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center py-16 text-center"
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
                      className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                    >
                      <CheckCircle className="w-10 h-10" />
                    </motion.div>

                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">
                      Thank You!
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base max-w-md mb-8 leading-relaxed">
                      Your inquiry has been successfully received. Our AI specialists will review your requirements and get back to you shortly.
                    </p>

                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                    >
                      <span>Send another message</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
