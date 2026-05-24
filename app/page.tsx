"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ProjectModal from "@/components/ProjectModal";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import type { Project } from "@/components/Projects";

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <main className="min-h-screen relative" style={{ background: "var(--bg)" }}>
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute top-1/3 -left-60 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Marquee />
        <Projects onSelect={setSelected} />
        <About />
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </main>
  );
}
