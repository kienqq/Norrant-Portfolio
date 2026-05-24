"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const links = [
  {
    label: "Email",
    value: "nguyenlechikien2108@gmail.com",
    href: "mailto:nguyenlechikien2108@gmail.com",
    hint: "Write directly",
    accent: "#6366f1",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/norrantnguyen1",
    href: "https://linkedin.com/in/norrantnguyen1/",
    hint: "Connect",
    accent: "#0a66c2",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="px-6 md:px-10 py-24 md:py-32" ref={ref}>
      {/* Divider */}
      <div className="h-px bg-[rgba(0,0,0,0.07)] mb-16" />

      {/* Header */}
      <div className="mb-12">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] text-[#9090a8] uppercase tracking-[0.2em] mb-3"
        >
          Contact
        </motion.p>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tighter text-[#0d0d14] leading-none"
          >
            Let&apos;s talk
          </motion.h2>
        </div>
      </div>

      {/* Link cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
            className="group flex flex-col justify-between p-8 rounded-2xl cursor-pointer transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.85)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              minHeight: "160px",
            }}
            whileHover={{
              y: -4,
              boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
            }}
          >
            {/* Top bar on hover */}
            <div
              className="h-0.5 w-0 group-hover:w-full transition-all duration-400 rounded-full mb-0 -mt-8 -mx-8 px-8"
              style={{ background: link.accent }}
            />

            <div className="flex items-start justify-between mt-2">
              <p className="text-[10px] text-[#9090a8] uppercase tracking-[0.2em]">
                {link.label}
              </p>
              <svg
                className="w-3.5 h-3.5 text-[#c0c0d0] group-hover:text-[#0d0d14] transition-colors duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M1 11L11 1M11 1H4M11 1V8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[#606078] group-hover:text-[#0d0d14] transition-colors duration-200 break-all">
                {link.value}
              </p>
              <p className="text-[10px] text-[#9090a8] mt-1.5 uppercase tracking-wider">
                {link.hint}
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 flex items-center justify-between text-[10px] text-[#c0c0d0] uppercase tracking-widest"
      >
        <span>Norrant — 2025</span>
        <span>HCMUT · Ho Chi Minh City</span>
      </motion.div>
    </section>
  );
}
