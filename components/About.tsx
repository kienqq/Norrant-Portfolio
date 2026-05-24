"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import RevealText from "./RevealText";

type Milestone = {
  year: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  isNow?: boolean;
};

const milestones: Milestone[] = [
  {
    year: "2023",
    title: "Enrolled at HCMUT",
    description:
      "Started Industrial Systems Engineering, majoring in Logistics & Supply Chain Management. First touch with Excel and the analytical mindset.",
    tags: ["Excel", "Foundations"],
    accent: "#9090a8",
  },
  {
    year: "2024",
    title: "Statistics & Data foundations",
    description:
      "Built core skills in statistics, Python, and process thinking. Learned to ask the right questions before reaching for a model.",
    tags: ["Python", "Statistics", "Power BI"],
    accent: "#60a5fa",
  },
  {
    year: "2025",
    title: "Lean Six Sigma — first real project",
    description:
      "Led a DMAIC project at a garment manufacturer. Narrowed 8 suspected causes to 2 verified root causes with Minitab. Reduced rework by 33%.",
    tags: ["Minitab", "DMAIC", "Regression"],
    accent: "#10b981",
  },
  {
    year: "2026",
    title: "Data pipelines for supply chain decisions",
    description:
      "Scraping competitor signals, building dashboards, and translating raw numbers into operational decisions. Working across content analytics and manufacturing forecasting.",
    tags: ["Python", "Power BI", "Apify API", "Dashboards"],
    accent: "#6366f1",
    isNow: true,
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32" ref={ref}>
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] text-[#9090a8] uppercase tracking-[0.2em] mb-3"
        >
          About
        </motion.p>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tighter text-[#0d0d14] leading-none mb-6">
          <RevealText text="The Journey" stagger={0.05} duration={0.75} />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm md:text-base text-[#606078] leading-relaxed max-w-xl"
        >
          From spreadsheets to statistical analysis to end-to-end data pipelines —
          here is how I got here, and where I am headed.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl relative">
        {/* Vertical line */}
        <div
          className="absolute left-[60px] md:left-[80px] top-2 bottom-2 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(0,0,0,0.12) 10%, rgba(0,0,0,0.12) 90%, transparent)",
          }}
        />

        <div className="space-y-10 md:space-y-14">
          {milestones.map((m, i) => (
            <TimelineItem key={m.year} milestone={m} index={i} />
          ))}
        </div>
      </div>

      {/* Footer badges */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-[#606078]"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c0c0d0]" />
          Ho Chi Minh City, Vietnam
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Open to internship — 2025/2026
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c0c0d0]" />
          ISE @ HCMUT — Logistics & Supply Chain
        </div>
      </motion.div>
    </section>
  );
}

function TimelineItem({ milestone, index }: { milestone: Milestone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="relative flex gap-6 md:gap-10 items-start"
    >
      {/* Year — left column */}
      <div className="flex-shrink-0 w-[44px] md:w-[64px] pt-2 text-right">
        <p className="text-xs md:text-sm font-mono font-semibold text-[#0d0d14]">
          {milestone.year}
        </p>
      </div>

      {/* Dot on line */}
      <div className="relative flex-shrink-0 pt-3">
        <motion.span
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="block w-3 h-3 rounded-full relative z-10"
          style={{
            background: milestone.accent,
            boxShadow: `0 0 0 4px rgba(255,255,255,0.9), 0 0 0 5px ${milestone.accent}30`,
          }}
        />
        {milestone.isNow && (
          <span
            className="absolute top-3 left-0 w-3 h-3 rounded-full animate-ping"
            style={{ background: milestone.accent, opacity: 0.5 }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 p-5 md:p-6 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.85)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <h3 className="text-base md:text-lg font-bold text-[#0d0d14]">
            {milestone.title}
          </h3>
          {milestone.isNow && (
            <span
              className="text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold"
              style={{
                background: milestone.accent + "18",
                color: milestone.accent,
              }}
            >
              Now
            </span>
          )}
        </div>
        <p className="text-sm text-[#606078] leading-relaxed mb-4">
          {milestone.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {milestone.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wide"
              style={{
                background: milestone.accent + "12",
                color: milestone.accent,
                border: `1px solid ${milestone.accent}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
