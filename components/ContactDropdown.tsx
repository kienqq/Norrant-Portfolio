"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const socials = [
  {
    label: "Email",
    short: "nguyenlechikien2108",
    href: "mailto:nguyenlechikien2108@gmail.com",
    copyValue: "nguyenlechikien2108@gmail.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    short: "norrantnguyen1",
    href: "https://linkedin.com/in/norrantnguyen1/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    short: "kienqq",
    href: "https://github.com/kienqq",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

type Placement = "bottom-left" | "bottom-right" | "right";

export default function ContactDropdown({
  trigger,
  align = "right",
  placement,
}: {
  trigger: ReactNode;
  align?: "left" | "right";
  placement?: Placement;
}) {
  const resolvedPlacement: Placement = placement ?? (align === "left" ? "bottom-left" : "bottom-right");

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socials[0].copyValue!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={wrapRef}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={
              resolvedPlacement === "right"
                ? { opacity: 0, x: -6, scale: 0.97 }
                : { opacity: 0, y: -6, scale: 0.97 }
            }
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={
              resolvedPlacement === "right"
                ? { opacity: 0, x: -6, scale: 0.97 }
                : { opacity: 0, y: -6, scale: 0.97 }
            }
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute min-w-[210px] rounded-xl overflow-hidden z-50 ${
              resolvedPlacement === "right"
                ? "left-full top-0 ml-2"
                : resolvedPlacement === "bottom-right"
                ? "right-0 top-full mt-2"
                : "left-0 top-full mt-2"
            }`}
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            {/* Email — copy */}
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: 0 }}
              onClick={handleCopyEmail}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[rgba(0,0,0,0.04)] transition-colors duration-150 cursor-pointer"
            >
              <span className="text-[#9090a8] flex-shrink-0">{socials[0].icon}</span>
              <div className="text-left">
                <p className="text-[10px] text-[#9090a8] uppercase tracking-wider leading-none mb-0.5">Email</p>
                <p className="text-xs font-medium" style={{ color: copied ? "#10b981" : "#0d0d14" }}>
                  {copied ? "Copied!" : socials[0].short}
                </p>
              </div>
            </motion.button>

            {/* LinkedIn + GitHub */}
            {socials.slice(1).map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, delay: (i + 1) * 0.05 }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(0,0,0,0.04)] transition-colors duration-150 cursor-pointer"
              >
                <span className="text-[#9090a8] flex-shrink-0">{s.icon}</span>
                <div>
                  <p className="text-[10px] text-[#9090a8] uppercase tracking-wider leading-none mb-0.5">{s.label}</p>
                  <p className="text-xs text-[#0d0d14] font-medium">{s.short}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
