"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useLenis from "@/hooks/useLenis";
import Link from "next/link";
import { OriginButton } from "@/components/ui/OriginButton";

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

// Detailed static case study data dictionary typed correctly
const caseStudiesData: Record<string, CaseStudy> = {
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

function CaseStudyDetailContent() {
  // Initialize Lenis scroll
  useLenis();

  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "1";

  // Retrieve the correct study or fallback to ID 1
  const study = caseStudiesData[id as keyof typeof caseStudiesData] || caseStudiesData["1"];

  return (
    <main className="relative min-h-screen bg-white text-zinc-900 selection:bg-purple-500/10 selection:text-purple-900 overflow-hidden">
      {/* Light Background Gradients */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-white -z-50 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.03),transparent_50%)]" />
        <div className="absolute top-[15%] left-[10%] w-[350px] h-[350px] rounded-full bg-purple-400/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-indigo-400/5 blur-[140px]" />
      </div>

      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pt-32 md:pb-16 lg:px-8">
        <div className="usecase-banner-grid-overlay" />
        
        {/* Back button container */}
        <div className="relative z-20 mx-auto mb-6 flex w-full max-w-7xl justify-start">
          <motion.a
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            href="/usecases"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <FiArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to all case studies
          </motion.a>
        </div>

        {/* Big Mockup Banner Image */}
        <div className="relative z-10 mx-auto mb-8 mt-2 w-full max-w-7xl">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-zinc-200/60 bg-zinc-50 shadow-xl sm:aspect-video md:aspect-21/9 md:rounded-4xl">
            <img 
              src={study.heroImage} 
              alt={study.title} 
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          {/* Badge Row */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-6">
            {study.badges.map((badge, idx) => {
              let badgeStyle = "bg-zinc-100 text-zinc-600";
              if (idx === 0) badgeStyle = "bg-zinc-100/80 text-zinc-500 font-bold border border-zinc-200/30";
              if (idx === 1) badgeStyle = "bg-blue-50 text-blue-600 font-bold border border-blue-100/50";
              if (idx === 2) badgeStyle = "bg-emerald-50 text-emerald-600 font-bold border border-emerald-100/50";
              return (
                <span 
                  key={idx} 
                  className={`rounded-full px-3 py-1.5 text-[9px] uppercase tracking-wider sm:px-4 sm:text-[10px] ${badgeStyle}`}
                >
                  {badge}
                </span>
              );
            })}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl text-[clamp(2.25rem,9vw,5rem)] font-black leading-[0.98] tracking-tight text-zinc-950"
            id="hero-title"
          >
            {study.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-4xl text-sm leading-relaxed text-zinc-600 sm:text-base md:text-lg"
            id="hero-subtitle"
          >
            {study.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Dynamic Content Area */}
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 md:px-8 lg:px-12 lg:pb-24" id="cs-detail-content">
        
        {/* Three Columns Key Metric Highlight block */}
        <div className="mb-12 grid grid-cols-1 divide-y divide-zinc-800 rounded-3xl bg-[#0a1224] p-5 text-center shadow-lg sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mb-16 md:rounded-4xl md:p-12">
          {study.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center px-4 py-4 first:pt-0 last:pb-0 sm:py-2 sm:first:pl-0 sm:last:pr-0">
              <span className="mb-2 text-3xl font-black tracking-tight text-white md:text-5xl">
                {stat.value}
              </span>
              <span className="text-xs font-medium tracking-wide text-zinc-400 md:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main Content Sections Stack */}
        <div className="flex flex-col gap-12 md:gap-16">

          {/* Section 1: The Problem / The Situation */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 bg-blue-600 rounded-full shrink-0" />
              <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">
                {study.sections.problem.title}
              </h2>
            </div>
            
            <p className="max-w-5xl text-sm font-normal leading-relaxed text-zinc-600 sm:text-base md:text-lg">
              {study.sections.problem.text}
            </p>

            {/* Split layout for problem boxes and illustration images */}
            {study.sections.problem.boxBullets && study.sections.problem.boxBullets.length > 0 && (
              <div className="mt-4 grid grid-cols-1 items-stretch gap-6 md:grid-cols-12 md:gap-8">
                
                {/* Red warning box */}
                <div className="flex flex-col justify-start rounded-3xl border border-red-100 bg-red-50/40 p-5 md:col-span-6 md:p-8">
                  <span className="text-xs font-black tracking-widest text-red-600 uppercase block mb-6">
                    {study.sections.problem.boxTitle}
                  </span>
                  <ul className="flex flex-col gap-3.5 md:gap-4">
                    {study.sections.problem.boxBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-zinc-700 md:gap-3.5 md:text-base">
                        <span className="text-red-500 text-lg font-bold shrink-0 mt-0">×</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Problem Illustration Image */}
                {study.sections.problem.image && (
                  <div className="relative min-h-[220px] overflow-hidden rounded-3xl border border-zinc-200/50 shadow-sm md:col-span-6 md:min-h-[300px]">
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

          {/* Section 2: What We Built / Our Approach / What We Found */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 bg-blue-600 rounded-full shrink-0" />
              <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">
                {study.sections.solution.title}
              </h2>
            </div>
            
            <p className="max-w-5xl text-sm font-normal leading-relaxed text-zinc-600 sm:text-base md:text-lg">
              {study.sections.solution.text}
            </p>

            {/* Green system details checkmarks box */}
            {study.sections.solution.boxBullets && study.sections.solution.boxBullets.length > 0 && (
              <div className="mt-2 max-w-5xl rounded-3xl border border-emerald-100/70 bg-emerald-50/40 p-5 md:p-8">
                <span className="text-xs font-black tracking-widest text-emerald-700 uppercase block mb-6">
                  {study.sections.solution.boxTitle}
                </span>
                <ul className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4">
                  {study.sections.solution.boxBullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-zinc-700 md:gap-3.5 md:text-base">
                      <span className="text-emerald-600 text-base font-bold shrink-0 mt-0.5">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Section 3: Results / The Outcome */}
          {study.sections.results && (study.sections.results.table && study.sections.results.table.length > 0 || study.sections.results.text) && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full shrink-0" />
                <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">
                  {study.sections.results.title}
                </h2>
              </div>
              
              {study.sections.results.text && (
                <p className="max-w-5xl text-sm font-normal leading-relaxed text-zinc-600 sm:text-base md:text-lg">
                  {study.sections.results.text}
                </p>
              )}

              {/* Responsive Results Data Table */}
              {study.sections.results?.table && study.sections.results.table.length > 0 && (
                <div className="mt-2 max-w-5xl overflow-x-auto rounded-3xl border border-zinc-200/60 shadow-sm">
                  <table className="w-full min-w-[560px] border-collapse text-left">
                    <thead>
                      <tr className="bg-[#0a1224] text-white">
                        {study.sections.results?.cols === 3 ? (
                          <>
                            <th className="py-4 px-6 font-bold text-xs md:text-sm uppercase tracking-wider">Metric</th>
                            <th className="py-4 px-6 font-bold text-xs md:text-sm uppercase tracking-wider">Before</th>
                            <th className="py-4 px-6 font-bold text-xs md:text-sm uppercase tracking-wider">After</th>
                          </>
                        ) : (
                          <>
                            <th className="py-4 px-6 font-bold text-xs md:text-sm uppercase tracking-wider">Metric</th>
                            <th className="py-4 px-6 font-bold text-xs md:text-sm uppercase tracking-wider">Outcome</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200/60 bg-white">
                      {study.sections.results?.table?.map((row, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                          {study.sections.results?.cols === 3 ? (
                            <>
                              <td className="py-4.5 px-6 text-zinc-800 text-sm md:text-base font-semibold">{row.metric}</td>
                              <td className="py-4.5 px-6 text-zinc-500 text-sm md:text-base font-medium">{row.before}</td>
                              <td className="py-4.5 px-6 text-emerald-600 text-sm md:text-base font-black">{row.after}</td>
                            </>
                          ) : (
                            <>
                              <td className="py-4.5 px-6 text-zinc-800 text-sm md:text-base font-semibold">{row.metric}</td>
                              <td className="py-4.5 px-6 text-emerald-600 text-sm md:text-base font-black">{row.outcome}</td>
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

          {/* Section 4: Extra Section (Quote, Text or Philosophy block) */}
          {study.sections.extra && (
            <div className="flex flex-col gap-6">
              {study.sections.extra.type === "quote" ? (
                <div className="my-2 max-w-5xl rounded-r-3xl border-l-4 border-blue-600 bg-blue-50/40 p-5 shadow-sm sm:p-6 md:p-10">
                  <p className="mb-4 text-base font-bold italic leading-relaxed text-blue-900 md:text-xl">
                    {study.sections.extra.text}
                  </p>
                  <span className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-wider block">
                    — {study.sections.extra.author}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-6 max-w-5xl">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-blue-600 rounded-full shrink-0" />
                    <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">
                      {study.sections.extra.title}
                    </h2>
                  </div>
                  <p className="text-sm font-normal leading-relaxed text-zinc-600 sm:text-base md:text-lg">
                    {study.sections.extra.text}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Section 5: Bottom CTA Block */}
          {study.sections.cta && (
            <div className="mt-4 flex max-w-5xl flex-col items-center justify-between gap-5 rounded-3xl bg-[#0a1224] p-5 shadow-xl sm:p-8 md:flex-row md:gap-8 md:rounded-4xl md:p-12">
              <div className="flex flex-col gap-2 max-w-xl text-left">
                <h3 className="text-base font-bold leading-normal text-white md:text-xl">
                  {study.sections.cta.text}
                </h3>
              </div>
              <Link href={study.sections.cta.href} className="w-full md:w-auto shrink-0">
                <OriginButton
                  className="h-12 w-full rounded-full border-[0.5px] px-8 text-sm font-semibold tracking-wide"
                  style={{
                    "--ic-card": "#2563eb",
                    "--ic-card-foreground": "#ffffff",
                    "--ic-border": "#2563eb",
                    "--ic-foreground": "#1d4ed8",
                    "--ic-background": "#ffffff",
                  } as React.CSSProperties}
                >
                  {study.sections.cta.buttonText}
                </OriginButton>
              </Link>
            </div>
          )}

        </div>

      </main>

      <Footer />
    </main>
  );
}

export default function UsecaseDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-blue-600 text-xs font-semibold tracking-widest uppercase">
            Loading Case Study...
          </span>
        </div>
      </div>
    }>
      <CaseStudyDetailContent />
    </Suspense>
  );
}
