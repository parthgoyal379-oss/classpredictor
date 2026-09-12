import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Share2, RotateCcw, AlertTriangle, ChevronDown, 
  Lightbulb, BookOpen, CheckCircle2, 
  Compass, Grid, Network, MessageSquare, Flame
} from "lucide-react";
import { SMETA, WT_ORD } from "../data/chapters";
import { getTip } from "../utils/analyzer";
import RoadmapView from "./RoadmapView";
import PriorityMatrix from "./PriorityMatrix";
import DependencyGraph from "../DependencyGraph";
import SpotlightCard from "./SpotlightCard";
import BrandLogo from "./BrandLogo";

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

  // Celebratory confetti burst on initial report generation
  useEffect(() => {
    try {
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
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{ padding: "0.5rem 0.85rem", fontSize: "0.8rem" }}
          >
            <Share2 size={14} />
            <span>{copyFeedback ? "Copied to Clipboard!" : "Share Report"}</span>
          </button>

          <button
            onClick={onReset}
            className="btn-ghost"
            style={{ padding: "0.5rem 0.85rem", fontSize: "0.8rem" }}
          >
            <RotateCcw size={14} />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid with Cursor Spotlight */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              Sorted by risk priority. Click any chapter to expand foundational gaps and actionable tactics.
            </p>
          </div>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {res.map((ch, idx) => {
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
