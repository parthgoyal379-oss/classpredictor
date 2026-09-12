import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Share2, RotateCcw, AlertTriangle, ChevronDown, 
  Lightbulb, BookOpen, CheckCircle2, 
  Compass, Grid, Network, MessageSquare, Flame, Download, MessageCircle
} from "lucide-react";
import { SMETA, WT_ORD } from "../data/chapters";
import { getTip } from "../utils/analyzer";
import RoadmapView from "./RoadmapView";
import PriorityMatrix from "./PriorityMatrix";
import DependencyGraph from "../DependencyGraph";
import SpotlightCard from "./SpotlightCard";
import BrandLogo from "./BrandLogo";
import TopperBenchmark from "./TopperBenchmark";
import RemediationChecklist from "./RemediationChecklist";
import { generateDiagnosticDossier } from "../utils/dossierGenerator";
import { playSuccess, playClick } from "../utils/audio";

export default function ReportDashboard({
  studentName,
  stream,
  goal,
  results,
  ratings,
  tab,
  setTab,
  onShare,
  onReset,
  feedback,
  setFeedback,
  onSubmitFeedback,
  CREATOR_EMAIL,
}) {
  const [expanded, setExpanded] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [filterSub, setFilterSub] = useState("all");
  const [filterRisk, setFilterRisk] = useState("all");

  // Celebratory confetti burst on initial report generation
  useEffect(() => {
    try {
      playSuccess();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 },
        colors: ["#FFFFFF", "#3B82F6", "#A855F7", "#10B981"],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }
  }, []);

  const { res, roadmap, warnings, stats } = results;
  const gk = goal === "NEET" ? "NEET" : goal === "JEE" ? "JEE" : goal === "CUET" ? "CUET" : "Boards";

  const wtLabel = v => ({ VH: "Very High", H: "High", M: "Medium", L: "Low", NA: "—" }[v] || "—");
  const wtColor = v => ({ VH: "#EF4444", H: "#F97316", M: "#F59E0B", L: "#10B981", NA: "#666666" }[v] || "#666666");

  const quads = {
    critical: res.filter(c => c.risk !== "LOW" && WT_ORD[c.wt[gk] || "M"] >= 3),
    review: res.filter(c => c.risk !== "LOW" && WT_ORD[c.wt[gk] || "M"] < 3),
    easywin: res.filter(c => c.risk === "LOW" && WT_ORD[c.wt[gk] || "M"] >= 3),
    skip: res.filter(c => c.risk === "LOW" && WT_ORD[c.wt[gk] || "M"] < 3),
  };

  const availableSubjs = Array.from(new Set(res.map(c => c.subj)));
  const filteredRes = res.filter(ch => {
    if (filterSub !== "all" && ch.subj !== filterSub) return false;
    if (filterRisk !== "all" && ch.risk !== filterRisk) return false;
    return true;
  });

  const tabs = [
    { id: "report", label: "Analysis", icon: <BookOpen size={14} /> },
    { id: "roadmap", label: "Roadmap", icon: <Compass size={14} /> },
    { id: "matrix", label: "Priority Matrix", icon: <Grid size={14} /> },
    { id: "graph", label: "Prerequisite Graph", icon: <Network size={14} /> },
    { id: "feedback", label: "Feedback", icon: <MessageSquare size={14} /> },
  ];

  const handleCopy = () => {
    onShare();
    setCopyFeedback(true);
    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.75 },
        colors: ["#FFFFFF", "#F59E0B"],
      });
    } catch {
      // safe fallback
    }
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleWhatsAppShare = () => {
    playClick();
    const criticalChapters = res.filter(c => c.risk === "HIGH").map(c => c.name).slice(0, 3).join(", ");
    const readinessScore = Math.min(100, Math.max(15, Math.round(((stats.lowCnt * 1.0 + stats.medCnt * 0.4) / (stats.total || 1)) * 100)));
    
    const text = `🎯 *Class 11 Diagnostic Report for ${studentName}*\n\n` +
      `📌 *Stream:* ${stream} | *Target Goal:* ${goal}\n` +
      `⚠️ *Critical Bottlenecks:* ${stats.highCnt} chapters (${criticalChapters || "None identified"})\n` +
      `⏱️ *Recovery Deficit:* ~${stats.totalH} hrs foundational study\n` +
      `📊 *Readiness Score:* ${readinessScore}%\n\n` +
      `Check your full prerequisite diagnostic breakdown here:\n${window.location.origin}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 940, margin: "0 auto", padding: "1rem 0 5rem" }}>
      {/* Header Bar */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1rem",
        marginBottom: "2rem",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <BrandLogo size={46} variant="icon" glow={true} />
          <div>
            <div className="shimmer-badge" style={{ marginBottom: "0.5rem" }}>
              <span className="font-mono" style={{ color: "var(--accent-blue)" }}>PREDICTIVE INTELLIGENCE</span>
              <span>•</span>
              <span>{stream} Track</span>
              <span>•</span>
              <span style={{ color: "#FFFFFF" }}>{goal} Target</span>
            </div>

            <h1 style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}>
              {studentName}'s Diagnostic Overview
            </h1>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.35rem" }}>
              {stats.total} Advanced chapters analyzed across {stream} curriculum
            </p>
          </div>
        </div>

        {/* Top actions */}
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              playClick();
              generateDiagnosticDossier({ studentName, stream, goal, results });
            }}
            className="btn-secondary"
            style={{
              padding: "0.5rem 0.85rem",
              fontSize: "0.8rem",
              background: "rgba(0, 223, 216, 0.08)",
              borderColor: "rgba(0, 223, 216, 0.3)",
              color: "#00DFD8",
            }}
            title="Download high-resolution official diagnostic dossier image"
          >
            <Download size={14} />
            <span>Download<span className="mobile-hide-text"> Dossier</span></span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="btn-secondary"
            style={{
              padding: "0.5rem 0.85rem",
              fontSize: "0.8rem",
              background: "rgba(37, 211, 102, 0.08)",
              borderColor: "rgba(37, 211, 102, 0.35)",
              color: "#25D366",
            }}
            title="Share diagnostic summary directly to WhatsApp"
          >
            <MessageCircle size={14} />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => {
              playClick();
              handleCopy();
            }}
            className="btn-secondary"
            style={{ padding: "0.5rem 0.85rem", fontSize: "0.8rem" }}
          >
            <Share2 size={14} />
            <span>{copyFeedback ? "Copied!" : <>Share<span className="mobile-hide-text"> Report</span></>}</span>
          </button>

          <button
            onClick={() => {
              playClick();
              onReset();
            }}
            className="btn-ghost"
            style={{ padding: "0.5rem 0.85rem", fontSize: "0.8rem" }}
          >
            <RotateCcw size={14} />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Executive Diagnostic Verdict Card */}
      <SpotlightCard
        className="mobile-card-p"
        style={{
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          background: stats.highCnt >= 3 
            ? "linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, rgba(10, 10, 10, 0.95) 100%)" 
            : "linear-gradient(180deg, rgba(0, 223, 216, 0.06) 0%, rgba(10, 10, 10, 0.95) 100%)",
          border: stats.highCnt >= 3 ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(0, 223, 216, 0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", position: "relative", zIndex: 2 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: stats.highCnt >= 3 ? "rgba(239, 68, 68, 0.15)" : "rgba(0, 223, 216, 0.15)",
              border: stats.highCnt >= 3 ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(0, 223, 216, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: stats.highCnt >= 3 ? "#EF4444" : "#00DFD8",
              flexShrink: 0,
              marginTop: "2px",
            }}
          >
            <Lightbulb size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
              <span className="font-mono" style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: stats.highCnt >= 3 ? "#EF4444" : "#00DFD8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                EXECUTIVE DIAGNOSTIC VERDICT
              </span>
              <span style={{
                fontSize: "0.7rem",
                color: "var(--text-tertiary)",
              }}>
                • Automated Foundation Intelligence
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#EDEDED", lineHeight: 1.55 }}>
              {stats.highCnt >= 3
                ? `Critical bottleneck vulnerability detected across ${stats.highCnt} core prerequisite domains. Without remediation, you are projected to face steep cognitive drag in early Class 11 terms. Allocate ~${stats.totalH} hours to the structured recovery checklist below.`
                : stats.highCnt > 0
                ? `Moderate foundation gaps detected in ${stats.highCnt} key chapter${stats.highCnt > 1 ? "s" : ""}. Targeted pre-term revision of highlighted prerequisite concepts will prevent early academic slump.`
                : `Excellent foundation baseline! You have 0 critical vulnerabilities. Focus on high-order numerical problem solving to maximize competitive percentile.`}
            </p>
          </div>
        </div>
      </SpotlightCard>

      {/* Metric Cards Grid with Cursor Spotlight */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))",
        gap: "0.75rem",
        marginBottom: "2rem",
      }}>
        {[
          {
            label: "Critical Risk",
            val: stats.highCnt,
            sub: "Requires early foundation drill",
            col: "var(--accent-red)",
            bg: "rgba(239, 68, 68, 0.08)",
            border: "rgba(239, 68, 68, 0.2)",
          },
          {
            label: "Elevated Risk",
            val: stats.medCnt,
            sub: "Manageable with targeted revision",
            col: "var(--accent-amber)",
            bg: "rgba(245, 158, 11, 0.08)",
            border: "rgba(245, 158, 11, 0.2)",
          },
          {
            label: "Optimal Foundation",
            val: stats.lowCnt,
            sub: "Strong conceptual baseline",
            col: "var(--accent-emerald)",
            bg: "rgba(16, 185, 129, 0.08)",
            border: "rgba(16, 185, 129, 0.2)",
          },
          {
            label: "Study Time Deficit",
            val: `~${stats.totalH} hrs`,
            sub: "Estimated recovery workload",
            col: "#FFFFFF",
            bg: "rgba(255, 255, 255, 0.04)",
            border: "rgba(255, 255, 255, 0.1)",
          },
        ].map(card => (
          <SpotlightCard
            key={card.label}
            style={{
              padding: "1.1rem 1.25rem",
              background: `linear-gradient(180deg, ${card.bg} 0%, rgba(10,10,10,0.95) 100%)`,
              borderColor: card.border,
            }}
          >
            <div className="font-mono" style={{
              fontSize: "1.85rem",
              fontWeight: 700,
              color: card.col,
              lineHeight: 1,
              marginBottom: "0.45rem",
              letterSpacing: "-0.02em",
              position: "relative",
              zIndex: 2,
            }}>
              {card.val}
            </div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#EDEDED", position: "relative", zIndex: 2 }}>
              {card.label}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "2px", position: "relative", zIndex: 2 }}>
              {card.sub}
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Kinetic Foundation Health Benchmark vs. 99th-Percentile Toppers */}
      <TopperBenchmark results={results} stream={stream} goal={goal} />

      {/* Reality Warnings Section */}
      {warnings.length > 0 && (
        <div style={{ marginBottom: "2.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.75rem" }}>
            <AlertTriangle size={15} style={{ color: "var(--accent-amber)" }} />
            <span className="font-mono" style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--accent-amber)", letterSpacing: "0.05em" }}>
              CURRICULUM REALITY WARNINGS
            </span>
          </div>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {warnings.map((w, idx) => (
              <SpotlightCard
                key={idx}
                style={{
                  padding: "0.95rem 1.15rem",
                  background: w.sev === "high" ? "rgba(239, 68, 68, 0.05)" : "rgba(245, 158, 11, 0.05)",
                  borderColor: w.sev === "high" ? "rgba(239, 68, 68, 0.25)" : "rgba(245, 158, 11, 0.25)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.85rem",
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: w.sev === "high" ? "rgba(239, 68, 68, 0.15)" : "rgba(245, 158, 11, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: w.sev === "high" ? "var(--accent-red)" : "var(--accent-amber)",
                  flexShrink: 0,
                  marginTop: "2px",
                  position: "relative",
                  zIndex: 2,
                }}>
                  <Flame size={15} />
                </div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <h4 style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: w.sev === "high" ? "#FCA5A5" : "#FDE68A",
                    marginBottom: "2px",
                  }}>
                    {w.title}
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {w.text}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      )}

      {/* Vercel Segmented Navigation Tabs */}
      <div style={{
        display: "flex",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid var(--border)",
        padding: "4px",
        borderRadius: 10,
        marginBottom: "1.75rem",
        overflowX: "auto",
        gap: "4px",
      }}>
        {tabs.map(t => {
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="btn-ghost"
              style={{
                flex: 1,
                padding: "0.6rem 0.85rem",
                borderRadius: 7,
                fontSize: "0.82rem",
                fontWeight: isActive ? 600 : 400,
                background: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
                color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                border: isActive ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid transparent",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.45rem",
                whiteSpace: "nowrap",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 1. REPORT TAB ── */}
      {tab === "report" && (
        <div className="animate-fade-in">
          {/* Interactive Remediation Action Checklist */}
          <RemediationChecklist results={results} />

          {/* Chapter Filter Toolbar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
            padding: "0.75rem 1rem",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border)",
            borderRadius: 10,
          }}>
            {/* Subject Filters */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
              <span className="font-mono" style={{ fontSize: "0.68rem", color: "var(--text-tertiary)", marginRight: "4px" }}>
                SUBJECT:
              </span>
              {["all", ...availableSubjs].map(s => {
                const isAct = filterSub === s;
                const label = s === "all" ? "All Subjects" : SMETA[s]?.name || s;
                return (
                  <button
                    key={s}
                    onClick={() => setFilterSub(s)}
                    className="btn-ghost"
                    style={{
                      padding: "2px 8px",
                      borderRadius: 5,
                      fontSize: "0.72rem",
                      fontWeight: isAct ? 600 : 400,
                      background: isAct ? "rgba(255, 255, 255, 0.1)" : "transparent",
                      color: isAct ? "#FFFFFF" : "var(--text-secondary)",
                      border: isAct ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid transparent",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Risk Filters */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
              <span className="font-mono" style={{ fontSize: "0.68rem", color: "var(--text-tertiary)", marginRight: "4px" }}>
                RISK:
              </span>
              {[
                { id: "all", label: "All" },
                { id: "HIGH", label: `Critical (${stats.highCnt})`, col: "#EF4444" },
                { id: "MEDIUM", label: `Elevated (${stats.medCnt})`, col: "#F59E0B" },
                { id: "LOW", label: `Optimal (${stats.lowCnt})`, col: "#10B981" },
              ].map(r => {
                const isAct = filterRisk === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setFilterRisk(r.id)}
                    className="btn-ghost"
                    style={{
                      padding: "2px 8px",
                      borderRadius: 5,
                      fontSize: "0.72rem",
                      fontWeight: isAct ? 600 : 400,
                      background: isAct ? (r.col ? r.col + "22" : "rgba(255, 255, 255, 0.1)") : "transparent",
                      color: isAct ? (r.col || "#FFFFFF") : "var(--text-secondary)",
                      border: isAct ? `1px solid ${r.col || "rgba(255, 255, 255, 0.2)"}` : "1px solid transparent",
                    }}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              Showing {filteredRes.length} of {res.length} chapters sorted by risk priority. Click any chapter to inspect foundational prerequisites.
            </p>
          </div>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {filteredRes.length === 0 ? (
              <div className="vercel-card" style={{ padding: "2rem", textAlign: "center" }}>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  No chapters match the selected filter criteria.
                </p>
              </div>
            ) : filteredRes.map((ch, idx) => {
              const isOpen = expanded === ch.id;
              const wtVal = ch.wt[gk] || "M";
              const chTip = getTip(ch, goal);
              const riskColor = ch.risk === "HIGH" ? "#EF4444" : ch.risk === "MEDIUM" ? "#F59E0B" : "#10B981";

              return (
                <div
                  key={ch.id}
                  className="vercel-card"
                  style={{
                    overflow: "hidden",
                    borderColor: isOpen ? riskColor + "66" : "var(--border)",
                    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                  }}
                >
                  {/* Card Header Row */}
                  <div
                    onClick={() => setExpanded(isOpen ? null : ch.id)}
                    style={{
                      padding: "1rem 1.25rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      userSelect: "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flex: 1, minWidth: 0 }}>
                      <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", width: 22 }}>
                        #{idx + 1}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          color: "#EDEDED",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          {ch.name}
                        </div>
                        <div style={{
                          fontSize: "0.72rem",
                          color: "var(--text-secondary)",
                          display: "flex",
                          gap: "0.4rem",
                          marginTop: "2px",
                        }}>
                          <span>{SMETA[ch.subj]?.name}</span>
                          <span>•</span>
                          <span>Class {ch.cls}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Meta Indicators */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexShrink: 0 }}>
                      <div style={{ textAlign: "right" }}>
                        <span className={`font-mono ${ch.risk === "HIGH" ? "pulse-ring" : ""}`} style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: riskColor,
                          background: riskColor + "18",
                          border: "1px solid " + riskColor + "33",
                          padding: "2px 8px",
                          borderRadius: 4,
                          display: "inline-block",
                        }}>
                          {ch.risk} RISK
                        </span>
                        <div className="font-mono" style={{
                          fontSize: "0.68rem",
                          color: wtColor(wtVal),
                          marginTop: "3px",
                        }}>
                          {goal}: {wtLabel(wtVal)}
                        </div>
                      </div>

                      <div style={{
                        color: "var(--text-tertiary)",
                        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}>
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Fluid CSS Grid Accordion Drawer */}
                  <div className={`accordion-wrapper ${isOpen ? "open" : ""}`}>
                    <div className="accordion-inner">
                      <div style={{
                        padding: "1.1rem 1.25rem",
                        borderTop: "1px solid var(--border)",
                        background: "rgba(0, 0, 0, 0.4)",
                      }}>
                        {/* Gaps Breakdown */}
                        {ch.gaps && ch.gaps.length > 0 ? (
                          <div style={{ marginBottom: "1.1rem" }}>
                            <span className="font-mono" style={{
                              fontSize: "0.68rem",
                              color: "var(--accent-red)",
                              letterSpacing: "0.08em",
                              fontWeight: 700,
                              display: "block",
                              marginBottom: "0.45rem",
                            }}>
                              CRITICAL PREREQUISITE DEFICITS
                            </span>
                            <div style={{ display: "grid", gap: "0.4rem" }}>
                              {ch.gaps.map((g, gi) => (
                                <div key={gi} style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "0.5rem",
                                  fontSize: "0.8rem",
                                  color: "var(--text-secondary)",
                                  background: "rgba(239, 68, 68, 0.05)",
                                  border: "1px solid rgba(239, 68, 68, 0.15)",
                                  padding: "0.5rem 0.75rem",
                                  borderRadius: 6,
                                }}>
                                  <span style={{ color: "var(--accent-red)", fontWeight: 700 }}>↳</span>
                                  <span>{g.reason}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.45rem",
                            fontSize: "0.82rem",
                            color: "var(--accent-emerald)",
                            marginBottom: "1.1rem",
                          }}>
                            <CheckCircle2 size={15} />
                            <span>No severe foundational deficits detected for this topic.</span>
                          </div>
                        )}

                        {/* Stat Metrics Box */}
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: "0.5rem",
                          marginBottom: "1rem",
                        }}>
                          {[
                            { l: "Target Study Deficit", v: `${ch.studyH} Hours`, c: "#FFFFFF" },
                            { l: "Calculated Risk", v: ch.risk, c: riskColor },
                            { l: `${goal} Weightage`, v: wtLabel(wtVal), c: wtColor(wtVal) },
                          ].map(m => (
                            <div key={m.l} style={{
                              padding: "0.6rem",
                              background: "rgba(255, 255, 255, 0.02)",
                              border: "1px solid var(--border)",
                              borderRadius: 6,
                              textAlign: "center",
                            }}>
                              <div className="font-mono" style={{ fontSize: "0.82rem", fontWeight: 700, color: m.c }}>
                                {m.v}
                              </div>
                              <div style={{ fontSize: "0.68rem", color: "var(--text-tertiary)", marginTop: "2px" }}>
                                {m.l}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action Plan Advice */}
                        {chTip && (
                          <div style={{
                            padding: "0.75rem 0.9rem",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: 8,
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                          }}>
                            <Lightbulb size={16} style={{ color: "var(--accent-amber)", flexShrink: 0, marginTop: "2px" }} />
                            <div style={{ fontSize: "0.82rem", color: "#EDEDED", lineHeight: 1.5 }}>
                              <strong style={{ color: "var(--accent-amber)", fontWeight: 600 }}>Action Tactic: </strong>
                              {chTip}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 2. ROADMAP TAB ── */}
      {tab === "roadmap" && (
        <RoadmapView roadmap={roadmap} studentName={studentName} />
      )}

      {/* ── 3. PRIORITY MATRIX TAB ── */}
      {tab === "matrix" && (
        <PriorityMatrix quads={quads} goal={goal} />
      )}

      {/* ── 4. PREREQUISITE GRAPH TAB ── */}
      {tab === "graph" && (
        <DependencyGraph
          results={results}
          ratings={ratings}
          goal={goal}
          stream={stream}
        />
      )}

      {/* ── 5. FEEDBACK TAB ── */}
      {tab === "feedback" && (
        <div className="animate-fade-in" style={{ maxWidth: 540, margin: "0 auto" }}>
          {feedback.submitted ? (
            <SpotlightCard style={{ padding: "2.5rem 2rem", textAlign: "center" }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.1)",
                color: "var(--accent-emerald)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                position: "relative",
                zIndex: 2,
              }}>
                <CheckCircle2 size={22} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.4rem", position: "relative", zIndex: 2 }}>
                Feedback Submitted!
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.25rem", lineHeight: 1.5, position: "relative", zIndex: 2 }}>
                Thank you, {studentName}. Your candid review helps improve the accuracy and roadmap algorithms for future students.
              </p>
              <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", position: "relative", zIndex: 2 }}>
                Direct Creator Contact: {CREATOR_EMAIL}
              </div>
            </SpotlightCard>
          ) : (
            <SpotlightCard style={{ padding: "1.75rem" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.35rem", position: "relative", zIndex: 2 }}>
                How useful was this diagnostic?
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1.5rem", position: "relative", zIndex: 2 }}>
                Takes 20 seconds. Built independently by Parth Goyal for aspirants like you.
              </p>

              {/* Star rating */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", position: "relative", zIndex: 2 }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setFeedback(f => ({ ...f, rating: star }))}
                    className="btn"
                    style={{
                      flex: 1,
                      padding: "0.65rem 0",
                      borderRadius: 8,
                      border: "1px solid " + (feedback.rating >= star ? "rgba(245, 158, 11, 0.4)" : "var(--border)"),
                      background: feedback.rating >= star ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 255, 255, 0.02)",
                      color: feedback.rating >= star ? "#F59E0B" : "var(--text-tertiary)",
                      fontSize: "1.25rem",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Text feedback */}
              <div style={{ marginBottom: "1.25rem", position: "relative", zIndex: 2 }}>
                <label style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>
                  Any suggestions, missing chapters, or advice? (optional)
                </label>
                <textarea
                  value={feedback.text}
                  onChange={e => setFeedback(f => ({ ...f, text: e.target.value }))}
                  placeholder="Tell us what worked and what could be sharpened..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.85rem",
                    background: "#161616",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    color: "#FFFFFF",
                    fontSize: "0.85rem",
                    resize: "none",
                    outline: "none",
                    lineHeight: 1.5,
                  }}
                />
              </div>

              <button
                onClick={onSubmitFeedback}
                disabled={feedback.rating === 0}
                className="btn-primary"
                style={{ width: "100%", padding: "0.75rem", borderRadius: 8, position: "relative", zIndex: 2 }}
              >
                <span>Submit Feedback</span>
              </button>
            </SpotlightCard>
          )}
        </div>
      )}
    </div>
  );
}
