"use client";

import { motion } from "framer-motion";

const tools = [
  "Python",
  "Minitab",
  "Power BI",
  "Excel",
  "DMAIC",
  "Lean Six Sigma",
  "Apify API",
  "Regression",
  "Pandas",
  "Dashboards",
  "SQL",
  "Supply Chain",
];

export default function Marquee({ duration = 35 }: { duration?: number }) {
  return (
    <div
      className="relative overflow-hidden py-12 md:py-16 border-y"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
    >
      <motion.div
        className="flex gap-14 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[...tools, ...tools].map((item, i) => (
          <div key={i} className="flex items-center gap-14 flex-shrink-0">
            <span
              className="text-[clamp(2rem,5vw,4rem)] font-black uppercase tracking-tighter"
              style={{ color: "rgba(13,13,20,0.07)" }}
            >
              {item}
            </span>
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: "rgba(13,13,20,0.12)" }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
