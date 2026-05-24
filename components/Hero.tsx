"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import ContactDropdown from "./ContactDropdown";
import MagneticButton from "./MagneticButton";
import RevealText from "./RevealText";

const roles = ["Supply Chain", "Data Analyst"];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Scroll-driven indicator + direction detection
  const fillRaw = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const fillHeight = useSpring(fillRaw, { stiffness: 180, damping: 28 });
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");
  const lastProgress = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const delta = latest - lastProgress.current;
    if (Math.abs(delta) > 0.002) {
      setScrollDir(delta > 0 ? "down" : "up");
      lastProgress.current = latest;
    }
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-20 overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8"
          style={{
            background: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(0,0,0,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-[#48485e] uppercase tracking-[0.2em]">
            Portfolio
          </span>
        </motion.div>

        {/* Big name */}
        <h1 className="text-[clamp(4rem,12vw,9rem)] font-black leading-none tracking-tighter text-[#0d0d14] uppercase mb-3">
          <RevealText text="NORRANT" delay={0.15} stagger={0.06} duration={0.9} alwaysAnimate />
        </h1>

        {/* Roles */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-10">
          {roles.map((role, i) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.08 }}
              className="text-[clamp(1.2rem,3vw,2rem)] font-light text-[#606078]"
            >
              {role}{i < roles.length - 1 && <span className="text-[#c0c0d0] ml-3">·</span>}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-base text-[#606078] leading-relaxed max-w-md"
        >
          ISE student at HCMUT — I build data pipelines, run process improvement
          projects, and turn messy numbers into decisions.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex items-center gap-3"
        >
          <MagneticButton strength={0.35}>
            <a
              href="#work"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#6366f1] text-white hover:bg-[#4f46e5] transition-colors duration-200 inline-block"
            >
              View work
            </a>
          </MagneticButton>
          <MagneticButton strength={0.35}>
            <ContactDropdown
              placement="right"
              trigger={
                <button
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-[#0d0d14] transition-all duration-200 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.72)",
                    border: "1px solid rgba(0,0,0,0.10)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  Get in touch
                </button>
              }
            />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Stats row — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-10 left-6 md:left-10 flex items-center gap-8"
      >
        {[
          { label: "Projects", value: "3" },
          { label: "University", value: "HCMUT" },
          { label: "Focus", value: "Supply Chain Analyst" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-xl font-bold text-[#0d0d14]">{value}</p>
            <p className="text-[10px] text-[#9090a8] uppercase tracking-wider mt-0.5">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 right-10 flex items-center gap-3"
      >
        <span className="text-[10px] text-[#9090a8] uppercase tracking-widest">Scroll</span>

        {/* Track with scroll-driven fill */}
        <div className="w-px h-10 bg-[rgba(0,0,0,0.10)] relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#0d0d14] rounded-full"
            style={{ height: fillHeight }}
          />
        </div>

        {/* Direction arrow */}
        <motion.div
          animate={{ rotate: scrollDir === "down" ? 0 : 180 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#9090a8] origin-center"
        >
          <motion.div
            key={scrollDir}
            initial={{ scale: 0.7, opacity: 0.5 }}
            animate={{
              scale: [1, 1.18, 1],
              opacity: [1, 1, 1],
              y: [0, 2.5, 0],
            }}
            transition={{
              scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 2v8M3 7l3 3 3-3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
