"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle } from "react-icons/fi";

// TypeScript Interfaces for the Case Study Data Structure
interface ProblemSection {
  title: string;
  text: string;
  boxTitle?: string;
  boxBullets?: string[];
  image?: string;
}

interface SolutionSection {
  title: string;
  text: string;
  boxTitle?: string;
  boxBullets?: string[];
}

interface TableRow {
  metric: string;
  before?: string;
  after?: string;
  outcome?: string;
}

interface ResultsSection {
  title: string;
  text?: string;
  cols: number;
  table?: TableRow[];
}

interface ExtraSection {
  title?: string;
  type: "quote" | "text";
  text: string;
  author?: string;
}

interface CTASection {
  text: string;
  buttonText: string;
  href: string;
}

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  badges: string[];
  stats: { value: string; label: string }[];
  sections: {
    problem: ProblemSection;
    solution: SolutionSection;
    results?: ResultsSection;
    extra?: ExtraSection;
    cta?: CTASection;
  };
}

export const caseStudiesData: Record<string, CaseStudy> = {
  "1": {
    id: "01",
    title: "AI IVR Automation for Mortgage Verification",
    subtitle: "A leading mortgage servicer was spending 20–30 minutes per verification call. We cut that to under 5 minutes — with no human involvement.",
    heroImage: "https://ik.imagekit.io/edfoalwork/Edfoal-Images/image_y04y5U6-4.png",
    badges: ["Case Study 01", "Mortgage & Loan Processing", "India"],
    stats: [
      { value: "80%", label: "Faster per verification" },
      { value: "60%", label: "Cost reduction" },
      { value: "3×", label: "Processing capacity" }
    ],
    sections: {
      problem: {
        title: "The Problem",
        text: "Verifying mortgage accounts required human operators to call bank helplines, navigate complex IVR menus, wait for responses, and manually record data. At high volume, this was slow, expensive, and impossible to scale without hiring.",
        boxTitle: "WHAT WAS BREAKING",
        boxBullets: [
          "20–30 minutes per verification call, every call, every day",
          "100% human dependency — operators tied up on hold",
          "3–5% data entry error rate causing re-verifications",
          "Scaling meant hiring more operators — costs compounded"
        ],
        image: "/cs-problem-01.png"
      },
      solution: {
        title: "What We Built",
        text: "An AI-powered IVR automation engine that handles the entire verification workflow autonomously — from dialing the bank helpline to extracting data and updating the mortgage system.",
        boxTitle: "THE SYSTEM",
        boxBullets: [
          "Automated call dialing with intelligent retry logic",
          "Hybrid DTMF + speech recognition to navigate any bank IVR",
          "NLP-powered data extraction — balance, status, due dates, account details",
          "Real-time validation and direct entry into the mortgage processing system",
          "Full audit logging — recordings, transcriptions, extracted data — for compliance",
          "Smart exception flagging when human review is genuinely needed"
        ]
      },
      results: {
        title: "Results",
        text: "",
        cols: 3,
        table: [
          { metric: "Average verification time", before: "20–30 minutes", after: "Under 5 minutes" },
          { metric: "Human involvement", before: "100% manual", after: "Less than 10%" },
          { metric: "Data capture error rate", before: "3–5%", after: "Below 1%" },
          { metric: "Cost per verification", before: "Baseline", after: "60% reduction" },
          { metric: "Processing capacity", before: "Limited by team size", after: "3× without new hires" }
        ]
      },
      extra: {
        title: "Client Feedback",
        type: "quote",
        text: "\"EdFoal's AI-IVR system transformed how we handle mortgage verifications. Our teams now focus on high-value tasks while the AI handles repetitive work with speed and accuracy.\"",
        author: "Operations Lead, Leading Mortgage Services Provider (name withheld)"
      },
      cta: {
        text: "Running manual verification workflows? We can automate this in 4–8 weeks.",
        buttonText: "Book a free audit →",
        href: "/contact"
      }
    }
  },
  "2": {
    id: "02",
    title: "AI Web Scraping for Foreclosure Lead Discovery",
    subtitle: "A US mortgage services company spent 4–6 hours every day manually checking government websites for foreclosure listings. We brought that down to 5 minutes.",
    heroImage: "https://ik.imagekit.io/edfoalwork/Edfoal-Images/image_oiI6Lz1Ty.png",
    badges: ["Case Study 02", "Mortgage & Foreclosure", "United States"],
    stats: [
      { value: "98%", label: "Less manual work" },
      { value: "99%", label: "Data accuracy" },
      { value: "5 min", label: "Daily processing time" }
    ],
    sections: {
      problem: {
        title: "The Problem",
        text: "Foreclosure notices are published daily across dozens of US government websites in unstructured formats. The client's team was spending half their day manually reading, filtering, and copying this data into spreadsheets — a process that was slow, error-prone, and impossible to scale.",
        boxTitle: "WHAT WAS BREAKING",
        boxBullets: [
          "4–6 hours of manual data collection every single day",
          "3–5 team members tied up on repetitive data entry",
          "~85% data accuracy — opportunities missed due to errors",
          "Slower than competitors who were getting to listings first"
        ],
        image: "/cs-problem-02.png"
      },
      solution: {
        title: "What We Built",
        text: "A custom AI-powered scraping platform that monitors all relevant government websites in real time, identifies valid foreclosure notices, and delivers clean structured data — automatically, every day.",
        boxTitle: "THE SYSTEM",
        boxBullets: [
          "Continuous automated monitoring of multiple government websites",
          "AI filtering to identify only valid foreclosure and auction notices",
          "NLP-powered extraction — auction date, lender, property address, notice details",
          "Clean CSV and JSON output, ready for CRM or analytics integration",
          "Compliant scraping — rate limits, session management, CAPTCHA handling",
          "Runs on standard Mac or Windows — no infrastructure investment needed"
        ]
      },
      results: {
        title: "Results",
        text: "",
        cols: 3,
        table: [
          { metric: "Daily processing time", before: "4–6 hours", after: "~5 minutes" },
          { metric: "Team members required", before: "3–5 people", after: "1 person" },
          { metric: "Data accuracy", before: "~85%", after: "99%" },
          { metric: "Missed leads", before: "Occasional", after: "Zero" },
          { metric: "Infrastructure cost", before: "Significant", after: "None" }
        ]
      },
      extra: {
        title: "Built in 4 Weeks",
        type: "text",
        text: "From kick-off to deployment in four weeks. Two optimisation cycles using real foreclosure notice samples improved keyword recognition, filtering accuracy, and field-level extraction. The client was processing live data in their first week of operation."
      },
      cta: {
        text: "Spending hours on manual data collection? We can automate it in under 4 weeks.",
        buttonText: "Book a free audit →",
        href: "/contact"
      }
    }
  },
  "3": {
    id: "03",
    title: "Enterprise AI Strategy for a UK Insurance Firm",
    subtitle: "A senior executive at a major UK insurer needed to cut through the AI noise and build a credible roadmap. We delivered a board-ready strategy in two months.",
    heroImage: "https://ik.imagekit.io/edfoalwork/Edfoal-Images/image.png",
    badges: ["Case Study 03", "Insurance", "United Kingdom"],
    stats: [
      { value: "2 mo", label: "Strategy engagement" },
      { value: "3", label: "Horizon framework" },
      { value: "Board", label: "Ready presentation" }
    ],
    sections: {
      problem: {
        title: "The Situation",
        text: "The executive was facing pressure from the board to define an AI strategy — but was overwhelmed by conflicting advice from vendors, consultants, and internal stakeholders. They needed a practical, credible roadmap grounded in their actual operations, not vendor hype.",
        boxTitle: "WHAT THEY WERE DEALING WITH",
        boxBullets: [
          "No clear AI adoption strategy despite board-level pressure",
          "Conflicting information from multiple AI vendors and consultants",
          "Difficulty identifying use cases with genuine, measurable ROI",
          "Uncertainty about AI's impact on existing teams and processes"
        ],
        image: "/cs-problem-03.png"
      },
      solution: {
        title: "Our Approach",
        text: "We ran a two-month AI discovery and strategy engagement. This involved mapping business units and operational processes, analysing efficiency gaps, identifying AI opportunities across departments, and evaluating each for feasibility, cost, and business impact. Every opportunity was placed into one of three strategic horizons to make prioritisation clear and defensible at board level.",
        boxTitle: "THREE-HORIZON FRAMEWORK",
        boxBullets: [
          "Immediate wins — process automation, data analysis, productivity improvements. Fast ROI, minimal disruption.",
          "Transformational initiatives — higher ROI, but requiring process redesign and change management.",
          "Future innovation — cutting-edge capabilities to build long-term competitive advantage."
        ]
      },
      results: {
        title: "The Outcome",
        text: "The executive received a comprehensive AI adoption roadmap — short-term initiatives, mid-term transformation programmes, and a long-term innovation strategy — all supported by implementation timelines and ROI projections. The strategy was presented to senior management and approved. Following the strategy engagement, the company retained EdFoal to implement several of the immediate AI initiatives identified in the roadmap.",
        cols: 0,
        table: []
      },
      cta: {
        text: "Need a credible AI strategy for your organisation? We deliver board-ready roadmaps in 6–8 weeks.",
        buttonText: "Start the conversation →",
        href: "/contact"
      }
    }
  },
  "4": {
    id: "04",
    title: "AI Product Strategy for Gen AI Startups",
    subtitle: "Multiple early-stage founders came to us with promising Gen AI concepts but no clear path to product-market fit. We helped them validate, refine, and roadmap their ideas into fundable, buildable products.",
    heroImage: "https://ik.imagekit.io/edfoalwork/Edfoal-Images/image_tzgfHoUqT.png",
    badges: ["Case Study 04", "Technology Startups", "Global"],
    stats: [
      { value: "100%", label: "Concepts validated" },
      { value: "↓", label: "Product risk reduced" },
      { value: "GTM", label: "Ready roadmaps" }
    ],
    sections: {
      problem: {
        title: "The Challenge Startups Face",
        text: "Building a Gen AI product is deceptively easy to start and deceptively hard to get right. Most early-stage founders are strong on the idea but uncertain about technical feasibility, real market demand, and where to draw the line on scope. Without clarity on these, they over-build in the wrong direction.",
        boxTitle: "COMMON PITFALLS",
        boxBullets: [
          "Building technically impressive products with no clear buyer",
          "Uncertainty about what current AI models can actually do reliably",
          "No structured roadmap — features added based on gut feel",
          "Lack of differentiation in an increasingly crowded AI product market"
        ],
        image: "/cs-problem-04.png"
      },
      solution: {
        title: "Our Process",
        text: "We work closely with founders through a structured advisory process that covers technical feasibility, market validation, product refinement, and go-to-market planning — delivered over focused sessions rather than endless consultancy cycles.",
        boxTitle: "WHAT WE DELIVER",
        boxBullets: [
          "Technical feasibility analysis — what current AI can and cannot do reliably for your use case",
          "Market and competitive analysis — is this a real problem worth solving commercially?",
          "Product refinement — core functionality, target users, differentiated value proposition",
          "Full product roadmap — milestones, resource requirements, feature prioritisation, GTM timeline"
        ]
      },
      results: {
        title: "The Outcome",
        text: "Founders leave with a validated product concept, a clear understanding of where AI adds genuine value in their use case, and a structured development roadmap they can present to investors or use to guide an engineering team. Risk drops significantly before a single line of code is written.",
        cols: 0,
        table: []
      },
      cta: {
        text: "Building a Gen AI product and need a sounding board? We help founders move faster with less risk.",
        buttonText: "Book a session →",
        href: "/contact"
      }
    }
  },
  "5": {
    id: "05",
    title: "Automating Data Entry for a 200-Person Operations Team",
    subtitle: "A large Indian enterprise employed over 200 people on manual data entry. We identified which work AI could realistically automate — and saved them $1 million annually.",
    heroImage: "https://ik.imagekit.io/edfoalwork/Edfoal-Images/image_716Qg8M-Y.png",
    badges: ["Case Study 05", "Enterprise Operations", "India"],
    stats: [
      { value: "$1M", label: "Annual cost savings" },
      { value: "50%", label: "Of tasks automated" },
      { value: "200+", label: "Staff redeployed" }
    ],
    sections: {
      problem: {
        title: "The Situation",
        text: "The company wanted to know how much of their manual data entry operation could be replaced by AI. They had over 200 employees dedicated to data entry and validation — a significant cost centre that was growing as the business scaled. Leadership needed an honest answer, not a sales pitch.",
        boxTitle: "",
        boxBullets: []
      },
      solution: {
        title: "What We Found",
        text: "After a detailed workflow analysis, we identified that half the manual tasks were excellent candidates for immediate automation with strong ROI. The other half was technically automatable but economically unviable with current technology — automating it would have cost more than it saved. This honest assessment prevented the company from making a costly mistake. Many AI vendors would have said \"automate everything\" — we said \"automate these 50%, and here's exactly why.\"",
        boxTitle: "PHASED APPROACH",
        boxBullets: [
          "Phase 1: Automate the 50% with the best ROI — repetitive data entry and validation tasks where AI was fast, accurate, and cost-effective immediately",
          "Phase 2: Monitor AI technology advancement for the remaining 50% — delay investment until cost and capability curves made it viable"
        ]
      },
      results: {
        title: "Results",
        text: "",
        cols: 2,
        table: [
          { metric: "Annual cost savings", outcome: "$1 million" },
          { metric: "Manual workload reduced", outcome: "50% of total tasks automated" },
          { metric: "Staff impact", outcome: "Redeployed to higher-value work" },
          { metric: "Unnecessary AI spend avoided", outcome: "Significant — by not automating the unviable 50%" }
        ]
      },
      extra: {
        title: "Our Philosophy",
        type: "text",
        text: "We focus on practical AI adoption over hype. Every engagement starts with an honest assessment of where AI genuinely creates value — and where it doesn't. This approach consistently delivers better ROI than \"automate everything\" strategies."
      },
      cta: {
        text: "Large manual ops team? Want to know what's actually worth automating? We'll tell you honestly — and build what makes sense.",
        buttonText: "Book a free audit →",
        href: "/contact"
      }
    }
  },
  "6": {
    id: "06",
    title: "AI-Powered Lead Generation Bot on Telegram",
    subtitle: "Built a human-sounding AI bot that 5× outreach volume with a 25% lead qualification rate.",
    heroImage: "https://ik.imagekit.io/edfoalwork/Edfoal-Images/image_zJ6-VBV2A.png",
    badges: ["Case Study 06", "Crypto & Sales", "Global"],
    stats: [
      { value: "5×", label: "Outreach volume" },
      { value: "25%", label: "Lead qualification" },
      { value: "< 2s", label: "Response delay" }
    ],
    sections: {
      problem: {
        title: "The Problem",
        text: "Manual outreach is slow, expensive, and difficult to scale across global time zones. Automated email sequences have low response rates. The client needed a way to conduct interactive, natural-sounding conversations on messaging apps at scale, without sounding like a generic spam bot.",
        boxTitle: "WHAT WAS BREAKING",
        boxBullets: [
          "Low response rates and slow cycle times from manual email sequences",
          "High cost of hiring sales personnel for 24/7 global lead response",
          "Inability to qualify cold leads before handing them to sales teams",
          "Risk of sounding robotic or spammy with standard automation rules"
        ]
      },
      solution: {
        title: "What We Built",
        text: "We built an advanced conversational Telegram bot. Powered by fine-tuned models, it maintains context, dynamically references user profiles and community histories, answers questions naturally, and qualifies prospects through subtle, guided sales discovery scripts.",
        boxTitle: "THE SYSTEM",
        boxBullets: [
          "Context-aware Conversational AI tuned for business discovery",
          "Dynamic database lookup to personalize outreach based on user profiles",
          "Subtle lead qualification flow to filter high-potential prospects",
          "Instant CRM syncing with detailed transcriptions and lead scores",
          "24/7 automatic response handling across multiple global time zones"
        ]
      },
      results: {
        title: "Results",
        text: "",
        cols: 3,
        table: [
          { metric: "Daily outreach volume", before: "Limited by agent hours", after: "5× Increase" },
          { metric: "Response delay", before: "Hours to days", after: "Less than 2 seconds" },
          { metric: "Lead qualification rate", before: "Low / Unmeasured", after: "25%" },
          { metric: "Staff time required", before: "100% manual handling", after: "Escalations only" }
        ]
      },
      extra: {
        title: "Client Feedback",
        type: "quote",
        text: "\"The lead generation bot has allowed us to qualify and screen leads 24/7 without adding any headcount. Our sales team now only talks to high-intent prospective buyers.\"",
        author: "Founder, Global Web3 Protocol"
      },
      cta: {
        text: "Looking to scale outreach with conversational AI? We build bespoke bots in 4–6 weeks.",
        buttonText: "Book a free audit →",
        href: "/contact"
      }
    }
  }
};

interface CaseStudyModalProps {
  caseStudyId: string | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudyId,
  onClose,
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (caseStudyId) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [caseStudyId]);

  const study = caseStudyId ? (caseStudiesData[caseStudyId] || caseStudiesData["1"]) : null;

  return (
    <AnimatePresence>
      {caseStudyId && study && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
          
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal dialog box */}
          <motion.div
            initial={{ scale: 0, rotate: "180deg" }}
            animate={{
              scale: 1,
              rotate: "0deg",
              transition: {
                type: "spring",
                bounce: 0.25,
              },
            }}
            exit={{ scale: 0, rotate: "180deg" }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white text-zinc-900 rounded-[2.5rem] shadow-2xl w-full max-w-5xl h-[90vh] md:h-[85vh] overflow-y-auto z-10 flex flex-col pointer-events-auto"
            data-lenis-prevent
          >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close case study modal"
            className="absolute top-6 right-6 md:top-8 md:right-8 z-30 p-3 bg-zinc-100 hover:bg-zinc-200/80 rounded-full text-zinc-600 hover:text-zinc-950 transition-colors shadow-sm cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Scrolling Modal Content */}
          <div className="flex-1 overflow-y-auto px-6 py-8 md:p-12" data-lenis-prevent>
            
            {/* Mockup Banner Image */}
            <div className="relative rounded-[2rem] overflow-hidden border border-zinc-200/50 shadow-md bg-zinc-50 aspect-[16/9] md:aspect-[21/9] mb-10 mt-6">
              <img 
                src={study.heroImage} 
                alt={study.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-2 mb-6 justify-start">
              {study.badges.map((badge, idx) => {
                let badgeStyle = "bg-zinc-100 text-zinc-600";
                if (idx === 0) badgeStyle = "bg-zinc-100/80 text-zinc-500 font-bold border border-zinc-200/30";
                if (idx === 1) badgeStyle = "bg-blue-50 text-blue-600 font-bold border border-blue-100/50";
                if (idx === 2) badgeStyle = "bg-emerald-50 text-emerald-600 font-bold border border-emerald-100/50";
                return (
                  <span 
                    key={idx} 
                    className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider ${badgeStyle}`}
                  >
                    {badge}
                  </span>
                );
              })}
            </div>

            {/* Main Title & Subtitle */}
            <h1 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight mb-4 pr-12">
              {study.title}
            </h1>
            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-10 max-w-4xl">
              {study.subtitle}
            </p>

            {/* 3-Column Metrics Block */}
            <div className="grid grid-cols-3 bg-[#0a1224] rounded-[2rem] p-6 md:p-10 mb-12 text-center shadow-lg divide-x divide-zinc-800">
              {study.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center px-2 md:px-4 first:pl-0 last:pr-0">
                  <span className="text-2xl md:text-4xl font-black text-white mb-1.5 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-zinc-400 font-medium tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Structured Content Sections */}
            <div className="flex flex-col gap-12 max-w-4xl">

              {/* Section 1: The Problem */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0" />
                  <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                    {study.sections.problem.title}
                  </h2>
                </div>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                  {study.sections.problem.text}
                </p>

                {study.sections.problem.boxBullets && study.sections.problem.boxBullets.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mt-2">
                    {/* Red warning box */}
                    <div className="md:col-span-7 bg-red-50/40 border border-red-100 rounded-3xl p-6 flex flex-col justify-start">
                      <span className="text-[10px] font-black tracking-widest text-red-600 uppercase block mb-4">
                        {study.sections.problem.boxTitle}
                      </span>
                      <ul className="flex flex-col gap-3">
                        {study.sections.problem.boxBullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-700 leading-relaxed font-medium">
                            <span className="text-red-500 text-base font-bold shrink-0 mt-0">×</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Problem Image */}
                    {study.sections.problem.image && (
                      <div className="md:col-span-5 relative rounded-3xl overflow-hidden border border-zinc-200/50 shadow-sm min-h-[200px]">
                        <img 
                          src={study.sections.problem.image} 
                          alt="Problem Context" 
                          className="w-full h-full object-cover object-center absolute inset-0"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Section 2: What We Built / Our Approach */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0" />
                  <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                    {study.sections.solution.title}
                  </h2>
                </div>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                  {study.sections.solution.text}
                </p>

                {study.sections.solution.boxBullets && study.sections.solution.boxBullets.length > 0 && (
                  <div className="bg-emerald-50/40 border border-emerald-100/70 rounded-3xl p-6 mt-2">
                    <span className="text-[10px] font-black tracking-widest text-emerald-700 uppercase block mb-4">
                      {study.sections.solution.boxTitle}
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {study.sections.solution.boxBullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-700 leading-relaxed font-medium">
                          <span className="text-emerald-600 text-sm font-bold shrink-0 mt-0.5">✓</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Section 3: Results / The Outcome */}
              {study.sections.results && (study.sections.results.table || study.sections.results.text) && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0" />
                    <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                      {study.sections.results.title}
                    </h2>
                  </div>
                  {study.sections.results.text && (
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                      {study.sections.results.text}
                    </p>
                  )}

                  {study.sections.results?.table && study.sections.results.table.length > 0 && (
                    <div className="mt-2 border border-zinc-200/60 rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#0a1224] text-white">
                            {study.sections.results?.cols === 3 ? (
                              <>
                                <th className="py-3 px-4 md:px-5 font-bold text-[10px] md:text-xs uppercase tracking-wider">Metric</th>
                                <th className="py-3 px-4 md:px-5 font-bold text-[10px] md:text-xs uppercase tracking-wider">Before</th>
                                <th className="py-3 px-4 md:px-5 font-bold text-[10px] md:text-xs uppercase tracking-wider">After</th>
                              </>
                            ) : (
                              <>
                                <th className="py-3 px-4 md:px-5 font-bold text-[10px] md:text-xs uppercase tracking-wider">Metric</th>
                                <th className="py-3 px-4 md:px-5 font-bold text-[10px] md:text-xs uppercase tracking-wider">Outcome</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200/60 bg-white">
                          {study.sections.results?.table?.map((row, idx) => (
                            <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                              {study.sections.results?.cols === 3 ? (
                                <>
                                  <td className="py-3.5 px-4 md:px-5 text-zinc-850 text-xs md:text-sm font-semibold">{row.metric}</td>
                                  <td className="py-3.5 px-4 md:px-5 text-zinc-500 text-xs md:text-sm font-medium">{row.before}</td>
                                  <td className="py-3.5 px-4 md:px-5 text-emerald-600 text-xs md:text-sm font-black">{row.after}</td>
                                </>
                              ) : (
                                <>
                                  <td className="py-3.5 px-4 md:px-5 text-zinc-850 text-xs md:text-sm font-semibold">{row.metric}</td>
                                  <td className="py-3.5 px-4 md:px-5 text-emerald-600 text-xs md:text-sm font-black">{row.outcome}</td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Section 4: Client Feedback / Philosophy */}
              {study.sections.extra && (
                <div className="flex flex-col gap-4">
                  {study.sections.extra.type === "quote" ? (
                    <div className="bg-blue-50/40 border-l-4 border-blue-600 rounded-r-3xl p-6 md:p-8 shadow-sm">
                      <p className="text-blue-900 text-base md:text-lg font-bold italic leading-relaxed mb-3">
                        {study.sections.extra.text}
                      </p>
                      <span className="text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-wider block">
                        — {study.sections.extra.author}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0" />
                        <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                          {study.sections.extra.title}
                        </h2>
                      </div>
                      <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                        {study.sections.extra.text}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Section 5: Bottom CTA Block */}
              {study.sections.cta && (
                <div className="bg-[#0a1224] rounded-[2rem] p-6 md:p-10 mt-2 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col gap-1.5 text-left">
                    <h3 className="text-white text-base md:text-lg font-bold leading-normal">
                      {study.sections.cta.text}
                    </h3>
                  </div>
                  <a 
                    href={study.sections.cta.href}
                    onClick={onClose}
                    className="bg-blue-600 text-white font-extrabold text-xs py-3.5 px-6 rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-300 shrink-0 text-center w-full md:w-auto"
                  >
                    {study.sections.cta.buttonText}
                  </a>
                </div>
              )}

            </div>

          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
