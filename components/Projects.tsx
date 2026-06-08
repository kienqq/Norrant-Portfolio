"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import RevealText from "./RevealText";

const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export type Section = {
  title: string;
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
  code?: string;
  datasets?: Array<{ name: string; bullets: string[] }>;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  year: string;
  description: string;
  color: string;
  accent: string;
  image: string;
  size: "large" | "small";
  details: {
    overview: string;
    approach: string[];
    bullets: string[];
    stack: string[];
    outcome: string;
    status?: "in-progress" | "complete";
    gallery?: { src: string; caption: string }[];
    sections?: Section[];
  };
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Lean Six Sigma",
    category: "Process Engineering",
    tags: ["Minitab", "Six Sigma", "Regression"],
    year: "2025",
    description:
      "Root cause analysis and process optimization for a garment manufacturing bottleneck — 33% rework rate reduction.",
    color: "#0d1a14",
    accent: "#10b981",
    image: assetPath("/images/lean-thumbnail.png"),
    size: "large",
    details: {
      overview:
        "Applied DMAIC methodology to identify and eliminate the root cause of rework at a critical bottleneck stage in garment production. Used statistical tools to move from symptom to verified root cause before implementing any fix.",
      approach: [
        "Scoped the problem to the bottleneck stage; collected 30-day rework and process time data across operators and shifts.",
        "Narrowed from 8 suspected causes to 2 root causes using Regression Analysis and 5M Fishbone diagrams in Minitab.",
        "Validated the control plan over a 2-week pilot, confirmed stability, then handed off to the production team.",
      ],
      bullets: [
        "Pinpointed root causes of rework at the critical bottleneck stage by running Regression Analysis, 5 Whys, and 5M Fishbone diagrams on Garment Perfection and Process Time datasets in Minitab.",
        "Reduced rework rate by 33% by standardizing the bottleneck stage and piloting a control plan validated for stability before handoff.",
      ],
      stack: ["Minitab", "DMAIC", "Regression Analysis", "Fishbone Diagram", "5 Whys"],
      outcome: "33% rework rate reduction",
      status: "complete",
      gallery: [
        {
          src: assetPath("/images/lean-regression.png"),
          caption: "Regression Analysis (Minitab) — Fitted Line Plots showing the relationship between Process Time and two sub-steps (Placing shirt on table, Folding shirt). Used to narrow root causes from 8 suspects to 2 confirmed drivers.",
        },
        {
          src: assetPath("/images/lean-hypothesis.png"),
          caption: "Hypothesis Testing — Before vs. After histograms of Total Process Time. p-value = 0.000 confirms the improvement is statistically significant, not random variation.",
        },
        {
          src: assetPath("/images/lean-results.png"),
          caption: "Evaluation Results — Rework rate dropped from 14.88% to 5% (67% reduction), cycle time reduced from 51.97s to 29.79s. All 5 improvement criteria met or exceeded target.",
        },
        {
          src: assetPath("/images/lean-control-chart.png"),
          caption: "Process Control Chart (I-MR) — Rework data after improvement. Majority of points = 0 (no redo), occasional spikes are Special Cause events. Confirms the process is now statistically controlled.",
        },
      ],
    },
  },
  {
    id: "02",
    title: "Content Performance Analytics",
    category: "Data Analytics",
    tags: ["Python", "Apify API", "Dashboard"],
    year: "2026",
    description:
      "End-to-end content analytics pipeline — scraped 70 competitor videos, built a heuristic viral scoring model, tracked 23 published videos across 5 weeks. 12,284 total views · ER trend 4.8% → 7.0%.",
    color: "#1a1400",
    accent: "#f59e0b",
    image: assetPath("/images/content-dashboard.png"),
    size: "large",
    details: {
      overview:
        "Built a data-driven content strategy pipeline for a self-run short-form video channel. Covered two phases: competitor intelligence (what performs well in the niche) and own-channel performance modeling (how the algorithm responds to a new account).",
      approach: [
        "Scraped 70 competitor videos via Apify API; structured data across hook type, topic cluster, and posting time to identify patterns in the niche.",
        "Built a heuristic weighted scoring model using Watch Full %, Save Rate, and Like Rate — weights calibrated to new-account cold-start algorithm signals observed in own-channel data.",
        "Tracked own-channel metrics weekly across 23 published videos (W19–W23); built an HTML dashboard in Python surfacing views trend, ER, save rate, and viral score — 12,284 total views, ER improved from 4.8% to 7.0%, 18 followers gained.",
      ],
      bullets: [
        "Identified content performance patterns for a self-run short-form video channel by scraping 70 competitor videos via Apify API and mining patterns across hook type, topic cluster, and posting time in Python.",
        "Quantified TikTok algorithm response signals for a new-account cold-start context by designing a weighted scoring model using Watch Full %, Save Rate, and Like Rate — avg views per video increased 141% W19→W20; ER trend improved from 4.8% to 7.0% across 5 tracked weeks.",
        "Visualized weekly content performance across 23 published videos by building an HTML dashboard in Python — total 12,284 views, 154 saves, 603 likes, and 18 followers gained over W19–W23.",
      ],
      stack: ["Python", "Apify API", "HTML Dashboard", "Data Mining", "Weighted Scoring Model"],
      outcome: "12,284 total views · 23 videos · 18 followers · ER trend: 4.8% → 7.0% (W19–W23)",
      status: "in-progress",
      gallery: [
        {
          src: assetPath("/images/content-dashboard.png"),
          caption: "Performance Dashboard — Built in Python. Tracks weekly Views trend, ER + Save Rate over time, and all-time per-episode breakdown across 23 published videos (W19–W23). Total: 12,284 views · 6.2% avg ER · 18 followers.",
        },
        {
          src: assetPath("/images/content-data-table.png"),
          caption: "Per-Episode Data Table — Real metrics from the live TikTok account. Each row shows Views, ER, Save Rate, Watch Full %, Followers gained, and algorithm Verdict (Good / Watch / Low) per episode.",
        },
      ],
      sections: [
        {
          title: "Business Context",
          bullets: [
            "TikTok's algorithm delivers immediate FYP reach (~91–96%) to new creators — low-cost, fast-feedback testing environment.",
            "Niche validated: @bit.mt.cht (ER 9.33%) and @problem7174 (ER 8.34%) both operate on identical slideshow format, confirming demand for this content type.",
            "Future monetization path: affiliate marketing, digital products, and brand sponsorships once audience reaches critical mass.",
          ],
        },
        {
          title: "Data Sources",
          datasets: [
            {
              name: "Dataset 1 — TikTok Competitor Analytics (Apify)",
              bullets: [
                "Source: clockworks/free-tiktok-scraper via Apify API",
                "Scope: @bit.mt.cht (39 videos) + @problem7174 (31 videos)",
                "Format: JSON  (data/tiktok-research/*/analytics.json, videos-raw.json)",
                "Key fields: video_id, views, likes, comments, shares, saves, watch_time, hashtags, caption, post_time",
                "Size: ~2 MB raw JSON",
              ],
            },
            {
              name: "Dataset 2 — TikTok Studio Analytics (Manual Entry)",
              bullets: [
                "Source: TikTok Studio dashboard — entered manually each week",
                "Format: Markdown tables  (data/performance-inputs/perf-{WW}.md)",
                "Key fields: views, likes, comments, shares, saves, avg_watch_s, watch_full_%, fyp_%, profile_%, new_followers",
                "Range: W19 (Ep. 1–5) → W21 (Ep. 13–18) → ongoing",
                "Size: ~50 KB cumulative, growing ~5 KB/week",
              ],
            },
            {
              name: "Dataset 3 — YouTube Transcripts",
              bullets: [
                "Source (priority order): NotebookLM MCP → yt-dlp SRT → Supadata API",
                "Notebook: 'Cam Sac — YouTube Research'  (ID: 9a6a9856)",
                "Channels: @AlexHormozi, @danmartell, @AndreiJikh, @duythanhish, @DiaryOfACEO",
                "Local cache: data/youtube-scanner/transcripts/{video_id}.json",
              ],
            },
            {
              name: "Dataset 4 — Content Output Library",
              bullets: [
                "Source: Generated by Agent 3 (YouTube Content Synthesizer)",
                "Format: Markdown  (output/captions/ready-to-post/cam-sac-tap-N.md)",
                "Key fields: source_url, formula, topic_cluster, status, caption text, screenshot brief",
                "Size: 26+ files, ~150 KB total",
              ],
            },
          ],
        },
        {
          title: "Technology Stack",
          table: {
            headers: ["Layer", "Tool", "Why Chosen"],
            rows: [
              ["TikTok Scraping",     "Apify free-tiktok-scraper",     "No blocking, free tier available, clean JSON output"],
              ["YouTube Transcript",  "NotebookLM MCP (primary)",       "Semantic search, high-quality transcripts, persistent notebook with multi-video index"],
              ["Transcript Fallback", "yt-dlp + Supadata API",          "Free, fast, local JSON cache — offline availability"],
              ["Screenshot Pipeline", "Playwright + PIL (youtube_card.py)", "Reproducible, batchable, standardized output format at 3x DPI"],
              ["Data Storage",        "Markdown files (.md)",            "Human-readable, git-friendly, zero setup cost — appropriate for <500 records"],
              ["Content IDE",         "Claude Code (VSCode ext.)",       "AI + file editing + MCP tools in one session; native tool use"],
              ["Task Automation",     "Claude AI Agents (1–4)",          "Context-aware, memory-enabled, flexible output — no code maintenance for logic changes"],
            ],
          },
        },
        {
          title: "Project Architecture",
          code:
`Content Data Analysis/
├── CLAUDE.md                 ← System brain — read at start of every session
├── agents/
│   ├── agent-1-tiktok-scraper.md      PAUSED
│   ├── agent-1b-trend-check.md        PAUSED
│   ├── agent-2-strategy-analyst.md    PAUSED
│   ├── agent-3-youtube-synthesizer.md ACTIVE
│   └── agent-4-performance-check.md   ACTIVE
├── data/
│   ├── tiktok-research/      ← Apify scrape output
│   ├── performance-inputs/   ← Manual TikTok Studio data per week
│   └── youtube-scanner/transcripts/  ← Supadata cache {video_id}.json
├── output/
│   ├── captions/ready-to-post/  ← cam-sac-tap-N.md  (N = 1..26+)
│   └── reports/              ← weekly-analysis, performance, QA reports
├── reference/
│   ├── caption-formulas.md   ← 5 formulas with full templates
│   ├── hashtag-strategy.md   ← 3-4-3 hashtag system
│   └── screenshot-preferences.md
└── scripts/
    ├── youtube_card.py        ← CANONICAL screenshot tool
    └── batch_screenshots.py   ← Batch runner + preflight check`,
        },
        {
          title: "Weekly KPI Dashboard",
          table: {
            headers: ["Metric", "Target", "W19", "W20", "W21", "W22", "W23"],
            rows: [
              ["Total Views",         "—",        "~1,300",  "~5,000",   "~1,400",   "~1,400",  "~2,500"],
              ["Avg Views / Video",   "> 800",    "260",     "714",      "233",      "~350",    "~625"],
              ["Engagement Rate",     "> 8%",     "~4.8%",   "~6.0%",    "~6.2%",    "~7.0%",   "~7.0%"],
              ["Save Rate",           "> 3%",     "~0.7%",   "~1.0%",    "~0.8%",    "~1.0%",   "~1.5%"],
              ["Watch Full %",        "> 28%",    "~22%",    "~26.1%",   "~22.4%",   "~25%",    "~26%"],
              ["Viral Score (best)",  "> 100",    "~60",     "145.9",    "~80",      "~90",     "~110"],
              ["New Followers",       "growing",  "3",       "8",        "2",        "3",       "2"],
            ],
          },
        },
      ],
    },
  },
  {
    id: "03",
    title: "Sales Forecasting Pipeline",
    category: "Machine Learning",
    tags: ["Python", "LightGBM", "SHAP"],
    year: "2026",
    description:
      "Multi-agent ML pipeline for manufacturing revenue forecasting — LightGBM with SHAP explainability, quantile regression for prediction intervals, data drift detection.",
    color: "#0a0f1a",
    accent: "#60a5fa",
    image: assetPath("/images/sales-forecasting.svg"),
    size: "small",
    details: {
      overview:
        "Designed a modular forecasting system for a make-to-stock manufacturer, addressing the asymmetric cost problem: underpredicting (stockout, lost orders) is more costly than overpredicting (excess inventory). Architecture built with agent-based modularity so each component can be updated independently as new data arrives.",
      approach: [
        "Designed modular agent architecture: data audit → feature engineering → model training → SHAP explainability, so each layer can be updated independently as new production data arrives.",
        "Configured LightGBM quantile regression for 90% prediction intervals to handle asymmetric stockout vs overstock cost — underpredicting carries higher business cost in this context.",
        "Built a data drift detection module to flag distribution shifts as the time series expands, preventing stale model assumptions from compounding forecast errors.",
      ],
      bullets: [
        "Designed a sales forecasting pipeline for manufacturing revenue prediction by building modular agents for data auditing, feature engineering, model training, and SHAP-based explainability in Python.",
        "Addressed asymmetric forecasting risk in a make-to-stock context by configuring LightGBM quantile regression for 90% prediction intervals and implementing a data drift detection module for expanding time series data.",
      ],
      stack: ["Python", "LightGBM", "scikit-learn", "SHAP", "Optuna", "pandas"],
      outcome: "In progress — architecture complete, awaiting production data",
      status: "in-progress",
    },
  },
];

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [6, -6]), { stiffness: 150, damping: 16 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-6, 6]), { stiffness: 150, damping: 16 });

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleTiltReset = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
      onClick={() => onSelect(project)}
      onMouseMove={handleTilt}
      onMouseLeave={handleTiltReset}
      className={`group relative cursor-pointer rounded-2xl overflow-hidden ${
        project.size === "large" ? "md:col-span-2" : "md:col-span-1"
      }`}
      style={{
        background: "rgba(255,255,255,0.70)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 16px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ height: project.size === "large" ? "200px" : "150px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: "center center" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = assetPath("/images/content-dashboard.png");
          }}
        />
        {/* Gradient fade to card */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0) 40%, rgba(255,255,255,0.92) 100%)",
          }}
        />
        {/* ID badge */}
        <span className="absolute top-3 left-4 text-[10px] font-mono text-white/80 bg-black/25 px-2 py-0.5 rounded-full backdrop-blur-sm">
          {project.id}
        </span>

        {/* Status badge */}
        <span className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[10px] font-medium text-white px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ background: project.details.status === "complete" ? "rgba(16,185,129,0.75)" : "rgba(0,0,0,0.40)" }}
        >
          {project.details.status === "in-progress" && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          )}
          {project.details.status === "complete" ? "Done" : "On Progress"}
        </span>
        {/* Tags */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 justify-end">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2.5 py-0.5 rounded-full text-white/90 uppercase tracking-wide backdrop-blur-sm"
              style={{ background: "rgba(0,0,0,0.30)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-5 md:p-6" style={{ minHeight: project.size === "large" ? "160px" : "140px" }}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] px-2.5 py-0.5 rounded-full font-medium uppercase tracking-wider"
              style={{ background: project.accent + "18", color: project.accent }}
            >
              {project.category}
            </span>
            <span className="text-[10px] text-[#9090a8]">{project.year}</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-[#0d0d14] mb-1.5 leading-tight">
            {project.title}
          </h3>
          <p className="text-xs text-[#606078] leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Arrow link */}
        <div className="mt-4 flex items-center gap-2 text-xs text-[#9090a8] group-hover:text-[#0d0d14] transition-colors duration-200">
          <span>View project</span>
          <svg
            className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M1 6h10M6 1l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ onSelect }: { onSelect: (p: Project) => void }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="px-6 md:px-10 py-24 md:py-32">
      {/* Section header */}
      <div ref={titleRef} className="flex items-end justify-between mb-12">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] text-[#9090a8] uppercase tracking-[0.2em] mb-3"
          >
            Selected work
          </motion.p>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tighter text-[#0d0d14] leading-none">
            <RevealText text="Projects" stagger={0.05} duration={0.75} />
          </h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:block text-xs text-[#9090a8] text-right max-w-[200px]"
        >
          Data analytics, process engineering, and ML systems.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
