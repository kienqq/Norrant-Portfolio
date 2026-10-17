"use client";

import { useState, useMemo, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  Languages,
  Briefcase,
  BarChart3,
  Code,
  Lightbulb,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import {
  interviewQuestions,
  ROLES,
  LEVELS,
  TYPES,
  TOPICS,
  type InterviewQuestion,
} from "@/lib/content/interview-questions";

type Lang = "en" | "vi";

const levelColors = {
  Fresher: { bg: "rgba(16,185,129,0.12)", fg: "#065f46" },
  Junior: { bg: "rgba(245,158,11,0.12)", fg: "#92400e" },
  Senior: { bg: "rgba(239,68,68,0.12)", fg: "#991b1b" },
};

const typeColors = {
  theory: { bg: "rgba(99,102,241,0.12)", fg: "#3730a3" },
  application: { bg: "rgba(168,85,247,0.12)", fg: "#6b21a8" },
  adaptation: { bg: "rgba(249,115,22,0.12)", fg: "#9a3412" },
};

function CollapsibleCard({
  q,
  lang,
}: {
  q: InterviewQuestion;
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);

  const lc = levelColors[q.level];
  const tc = typeColors[q.type];

  return (
    <div
      className="rounded-2xl transition-all duration-300 overflow-hidden"
      style={{
        background: "var(--card)",
        border: "1px solid var(--card-border)",
        boxShadow: open ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start gap-3 cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
              style={{ background: lc.bg, color: lc.fg }}
            >
              {q.level}
            </span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
              style={{ background: tc.bg, color: tc.fg }}
            >
              {q.type}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md font-medium" style={{ background: "rgba(0,0,0,0.04)", color: "var(--muted)" }}>
              {q.role}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md font-medium" style={{ background: "rgba(0,0,0,0.04)", color: "var(--muted)" }}>
              {q.topic}
            </span>
          </div>
          <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--fg)" }}>
            {q.question[lang]}
          </p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 shrink-0"
          style={{ color: "var(--muted)" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t" style={{ borderColor: "var(--border)" }}>
              {/* Business Context */}
              <Section icon={Briefcase} label="Business Context" color="#6366f1">
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>{q.businessContext[lang]}</p>
              </Section>

              {/* Data Available */}
              <Section icon={BarChart3} label="Data Available" color="#10b981">
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>{q.dataAvailable[lang]}</p>
              </Section>

              {/* Expected Answer */}
              <Section icon={Lightbulb} label="Expected Answer" color="#f59e0b">
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>{q.expectedAnswer[lang]}</p>
              </Section>

              {/* Technical Pattern */}
              <Section icon={Code} label="Technical Pattern" color="#8b5cf6">
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>{q.technicalPattern[lang]}</p>
              </Section>

              {/* SQL Code */}
              {q.sqlCode && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Code size={14} style={{ color: "#6366f1" }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6366f1" }}>SQL</span>
                  </div>
                  <pre
                    className="text-xs leading-relaxed p-3 rounded-xl overflow-x-auto font-mono"
                    style={{ background: "rgba(0,0,0,0.03)", border: "1px solid var(--border)", color: "var(--fg)" }}
                  ><code>{q.sqlCode}</code></pre>
                </div>
              )}

              {/* Follow-ups */}
              <Section icon={ArrowRight} label="Follow-up Questions" color="#ec4899">
                <ul className="space-y-1">
                  {q.followUps.map((f, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--fg)" }}>
                      <span style={{ color: "var(--muted)" }}>→</span>
                      <span>{f[lang]}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Weak Signals */}
              <Section icon={AlertTriangle} label="Weak Answer Signals" color="#ef4444">
                <ul className="space-y-1">
                  {q.weakSignals.map((w, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--fg)" }}>
                      <span style={{ color: "#ef4444" }}>✗</span>
                      <span>{w[lang]}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({
  icon: Icon,
  label,
  color,
  children,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span style={{ color }}><Icon size={14} /></span>
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

export default function InterviewClient() {
  const [lang, setLang] = useState<Lang>("vi");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");

  const toggleLang = () => setLang((l) => (l === "en" ? "vi" : "en"));

  const filtered = useMemo(() => {
    return interviewQuestions.filter((q) => {
      if (roleFilter !== "all" && q.role !== roleFilter) return false;
      if (levelFilter !== "all" && q.level !== levelFilter) return false;
      if (typeFilter !== "all" && q.type !== typeFilter) return false;
      if (topicFilter !== "all" && q.topic !== topicFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        const text = `${q.question.en} ${q.question.vi} ${q.role} ${q.topic}`.toLowerCase();
        if (!text.includes(s)) return false;
      }
      return true;
    });
  }, [roleFilter, levelFilter, typeFilter, topicFilter, search]);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute top-1/3 -left-60 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight" style={{ fontFamily: "var(--font-archivo)" }}>
              {lang === "en" ? "SC Interview Questions" : "Câu Hỏi Phỏng Vấn SCM"}
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              {lang === "en"
                ? `${filtered.length} of ${interviewQuestions.length} questions | Researched from 25+ companies`
                : `${filtered.length} / ${interviewQuestions.length} câu hỏi | Nghiên cứu từ 25+ công ty`}
            </p>
          </div>
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.72)",
              border: "1px solid var(--card-border)",
              color: "var(--fg)",
            }}
          >
            <Languages size={14} />
            {lang === "en" ? "VI" : "EN"}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === "en" ? "Search questions..." : "Tìm câu hỏi..."}
              className="w-full text-sm px-9 py-2.5 rounded-xl outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.72)",
                border: "1px solid var(--card-border)",
                color: "var(--fg)",
              }}
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs px-3 py-2.5 rounded-xl outline-none font-medium cursor-pointer"
            style={{ background: "rgba(255,255,255,0.72)", border: "1px solid var(--card-border)", color: "var(--fg)" }}
          >
            <option value="all">{lang === "en" ? "All Roles" : "Tất cả vai trò"}</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="text-xs px-3 py-2.5 rounded-xl outline-none font-medium cursor-pointer"
            style={{ background: "rgba(255,255,255,0.72)", border: "1px solid var(--card-border)", color: "var(--fg)" }}
          >
            <option value="all">{lang === "en" ? "All Levels" : "Tất cả cấp độ"}</option>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs px-3 py-2.5 rounded-xl outline-none font-medium cursor-pointer"
            style={{ background: "rgba(255,255,255,0.72)", border: "1px solid var(--card-border)", color: "var(--fg)" }}
          >
            <option value="all">{lang === "en" ? "All Types" : "Tất cả loại"}</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>

          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="text-xs px-3 py-2.5 rounded-xl outline-none font-medium cursor-pointer"
            style={{ background: "rgba(255,255,255,0.72)", border: "1px solid var(--card-border)", color: "var(--fg)" }}
          >
            <option value="all">{lang === "en" ? "All Topics" : "Tất cả chủ đề"}</option>
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Question list */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <div className="text-center py-12" style={{ color: "var(--muted)" }}>
                <p className="text-sm">{lang === "en" ? "No questions match your filters." : "Không có câu hỏi nào phù hợp."}</p>
              </div>
            ) : (
              filtered.map((q) => (
                <motion.div
                  key={q.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <CollapsibleCard q={q} lang={lang} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
