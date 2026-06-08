"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Project, Section } from "./Projects";

function SectionBlock({ section, accent }: { section: Section; accent: string }) {
  return (
    <div className="mb-8">
      {/* Section title — matches all other section labels in the modal */}
      <p className="text-[10px] text-[#9090a8] uppercase tracking-[0.2em] mb-4">
        {section.title}
      </p>

      {/* Bullet list — matches Key Results style */}
      {section.bullets && (
        <ul className="space-y-3">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: accent }}
              />
              <p className="text-sm text-[#48485e] leading-relaxed">{b}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Dataset list */}
      {section.datasets && (
        <div className="space-y-5">
          {section.datasets.map((ds, i) => (
            <div key={i}>
              {/* dataset name — text-sm to match body text level */}
              <p className="text-sm font-semibold text-[#0d0d14] mb-2">{ds.name}</p>
              <ul className="space-y-1.5 pl-2">
                {ds.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span
                      className="mt-2 w-1 h-1 rounded-full flex-shrink-0 opacity-60"
                      style={{ background: accent }}
                    />
                    {/* text-[11px] matches gallery captions, no font-mono — plain text */}
                    <p className="text-[11px] text-[#606078] leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {section.table && (
        <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: accent + "18" }}>
                {section.table.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em]"
                    style={{ color: accent, borderBottom: `1px solid ${accent}30` }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr
                  key={ri}
                  style={{ background: ri % 2 === 0 ? "rgba(0,0,0,0.015)" : "transparent" }}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-2.5 text-[11px] leading-relaxed align-top"
                      style={{
                        borderBottom: ri < section.table!.rows.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                        fontWeight: ci === 0 ? 600 : 400,
                        color: ci === 0 ? "#0d0d14" : "#606078",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Code block — font-mono is intentional here */}
      {section.code && (
        <div
          className="rounded-xl p-4 overflow-x-auto"
          style={{
            background: "rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <pre className="text-[11px] text-[#48485e] leading-relaxed font-mono whitespace-pre">
            {section.code}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(8px)" }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full md:w-[560px] overflow-y-auto"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              borderLeft: "1px solid rgba(255,255,255,0.9)",
              borderRadius: "24px 0 0 24px",
              boxShadow: "-8px 0 48px rgba(0,0,0,0.10)",
            }}
          >
            {/* Accent stripe */}
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-3xl"
              style={{ background: `linear-gradient(180deg, ${project.accent}, ${project.accent}44)` }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full text-[#9090a8] hover:text-[#0d0d14] transition-colors duration-200"
              style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.08)" }}
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="p-8 md:p-10 pt-16">
              {/* Header */}
              <div className="mb-8">
                <p className="text-[10px] font-mono text-[#9090a8] mb-3">{project.id}</p>

                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span
                    className="text-[10px] px-2.5 py-0.5 rounded-full font-medium uppercase tracking-wider"
                    style={{ background: project.accent + "18", color: project.accent }}
                  >
                    {project.category}
                  </span>
                  <span className="text-[10px] text-[#9090a8]">{project.year}</span>
                  {project.details.status === "in-progress" && (
                    <span
                      className="text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wide text-[#606078]"
                      style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      In Progress
                    </span>
                  )}
                </div>

                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#0d0d14] leading-none mb-4">
                  {project.title}
                </h2>
                <p className="text-sm text-[#606078] leading-relaxed">
                  {project.details.overview}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-[rgba(0,0,0,0.07)] mb-8" />

              {/* Approach */}
              <div className="mb-8">
                <p className="text-[10px] text-[#9090a8] uppercase tracking-[0.2em] mb-4">
                  Approach
                </p>
                <ol className="space-y-3">
                  {project.details.approach.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="text-[10px] font-mono flex-shrink-0 mt-0.5 font-semibold"
                        style={{ color: project.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm text-[#48485e] leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Divider */}
              <div className="h-px bg-[rgba(0,0,0,0.07)] mb-8" />

              {/* Key Results */}
              <div className="mb-8">
                <p className="text-[10px] text-[#9090a8] uppercase tracking-[0.2em] mb-4">
                  Key Results
                </p>
                <ul className="space-y-4">
                  {project.details.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: project.accent }}
                      />
                      <p className="text-sm text-[#48485e] leading-relaxed">{b}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="h-px bg-[rgba(0,0,0,0.07)] mb-8" />

              {/* Outcome highlight */}
              <div
                className="p-4 rounded-2xl mb-8"
                style={{
                  background: project.accent + "12",
                  border: `1px solid ${project.accent}30`,
                }}
              >
                <p className="text-[10px] text-[#9090a8] uppercase tracking-[0.2em] mb-1.5">
                  Outcome
                </p>
                <p className="text-sm font-semibold" style={{ color: project.accent }}>
                  {project.details.outcome}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <p className="text-[10px] text-[#9090a8] uppercase tracking-[0.2em] mb-3">
                  Tools & Methods
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.details.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] px-3 py-1 rounded-full text-[#606078] uppercase tracking-wide"
                      style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {project.details.gallery && project.details.gallery.length > 0 && (
                <>
                  <div className="h-px bg-[rgba(0,0,0,0.07)] my-8" />
                  <div>
                    <p className="text-[10px] text-[#9090a8] uppercase tracking-[0.2em] mb-4">
                      Output
                    </p>
                    <div className="space-y-6">
                      {project.details.gallery.map((item, i) => (
                        <div key={i}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.src}
                            alt={`${project.title} output ${i + 1}`}
                            className="w-full rounded-xl object-cover mb-2.5"
                            style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                          />
                          <p className="text-[11px] text-[#9090a8] leading-relaxed px-1">
                            {item.caption}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Documentation Sections */}
              {project.details.sections && project.details.sections.length > 0 && (
                <>
                  <div className="h-px bg-[rgba(0,0,0,0.07)] my-8" />
                  {project.details.sections.map((section, i) => (
                    <div key={i}>
                      <SectionBlock section={section} accent={project.accent} />
                      {i < project.details.sections!.length - 1 && (
                        <div className="h-px bg-[rgba(0,0,0,0.05)] mb-8" />
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
