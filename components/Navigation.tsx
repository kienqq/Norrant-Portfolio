"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import ContactDropdown, { socials } from "./ContactDropdown";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [time, setTime] = useState("");
  const { scrollY, scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  // Track scrolled state
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sections = ["work", "about"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Live clock (Vietnam time)
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Ho_Chi_Minh",
        })
      );
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const links = [
    { label: "Work", href: "#work", id: "work" },
    { label: "About", href: "#about", id: "about" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <div
        className="transition-all duration-500 rounded-2xl relative"
        style={{
          background: scrolled ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.50)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.70)",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-5 h-12 relative">
          {/* Left */}
          <div className="flex items-center gap-4">
            {/* NORRANT — letter hover */}
            <a href="#" className="text-sm font-bold tracking-widest uppercase text-[#0d0d14] flex">
              {"NORRANT".split("").map((char, i) => (
                <motion.span
                  key={i}
                  whileHover={{ y: -4, color: "#6366f1" }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block cursor-pointer"
                >
                  {char}
                </motion.span>
              ))}
            </a>

            {/* Live clock */}
            <div
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] text-[#606078]"
              style={{
                background: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono tracking-wider tabular-nums">{time} ICT</span>
            </div>

            {/* Nav links with active indicator */}
            <nav className="hidden md:flex items-center gap-1 ml-2">
              {links.map((l) => {
                const isActive = activeSection === l.id;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    className={`relative text-xs font-bold transition-colors uppercase tracking-wider px-2 py-1 ${
                      isActive ? "text-[#0d0d14]" : "text-[#606078] hover:text-[#0d0d14]"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-2 right-2 -bottom-0.5 h-[2px] bg-[#0d0d14] rounded-full"
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1">
            <div className="hidden md:block mr-1">
              <ContactDropdown
                align="right"
                trigger={
                  <button className="text-xs font-bold text-[#9090a8] hover:text-[#0d0d14] uppercase tracking-wider transition-colors duration-200 px-2 py-1.5 rounded-lg hover:bg-[rgba(0,0,0,0.04)] cursor-default">
                    Contact
                  </button>
                }
              />
            </div>

            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("https") ? "_blank" : undefined}
                rel={s.href.startsWith("https") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-[#9090a8] hover:text-[#0d0d14] hover:bg-[rgba(0,0,0,0.05)] transition-all duration-200 cursor-pointer"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute left-3 right-3 bottom-1.5 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.05)" }}>
          <motion.div
            className="h-full origin-left rounded-full"
            style={{
              scaleX: progressScale,
              background: "linear-gradient(to right, #6366f1, #10b981)",
            }}
          />
        </div>
      </div>
    </motion.header>
  );
}
