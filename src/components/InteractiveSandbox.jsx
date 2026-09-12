import { useState } from "react";
import { Sliders, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { playRating, playClick } from "../utils/audio";

const SAMPLE_FOUNDATIONS = [
  {
    id: "trig",
    name: "Trigonometry",
    cls: "Class 10 Math",
    impact: "Calculus & Vectors",
    hours: 12,
  },
  {
    id: "nlm",
    name: "Newton's Laws & Force",
    cls: "Class 9 Physics",
    impact: "Rotational Dynamics & Mechanics",
    hours: 14,
  },
  {
    id: "chem",
    name: "Chemical Equations & Mole",
    cls: "Class 10 Chemistry",
    impact: "Thermodynamics & Equilibrium",
    hours: 10,
  },
];

export default function InteractiveSandbox({ onStartAnalysis }) {
  // State: 1 = Weak (Deficit), 3 = Strong (Mastered)
  const [ratings, setRatings] = useState({
    trig: 1,
    nlm: 1,
    chem: 3,
  });

  const toggleRating = (id) => {
    const current = ratings[id];
    const next = current === 1 ? 3 : 1;
    playRating(next);
    setRatings(prev => ({ ...prev, [id]: next }));
  };

  // Calculate deficit
  const totalDeficit = SAMPLE_FOUNDATIONS.reduce((acc, f) => {
    return ratings[f.id] === 1 ? acc + f.hours : acc;
  }, 0);

  const weakCount = Object.values(ratings).filter(v => v === 1).length;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 780,
        margin: "0 auto 3.5rem",
        borderRadius: 14,
        background: "rgba(10, 10, 10, 0.75)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        padding: "1.5rem",
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px -8px rgba(0, 223, 216, 0.15)",
        textAlign: "left",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "rgba(0, 223, 216, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00DFD8",
            }}
          >
            <Sliders size={16} />
          </div>
          <div>
            <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#FFFFFF" }}>
              10-Second Prerequisite Sandbox
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
              Test how foundational weak spots ripple into Class 11
            </div>
          </div>
        </div>

        {/* Live Risk Meter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            background: weakCount > 0 ? "rgba(239, 68, 68, 0.08)" : "rgba(16, 185, 129, 0.08)",
            border: weakCount > 0 ? "1px solid rgba(239, 68, 68, 0.25)" : "1px solid rgba(16, 185, 129, 0.25)",
            padding: "0.35rem 0.75rem",
            borderRadius: 8,
          }}
        >
          {weakCount > 0 ? (
            <AlertTriangle size={14} style={{ color: "#EF4444" }} />
          ) : (
            <CheckCircle2 size={14} style={{ color: "#10B981" }} />
          )}
          <span className="font-mono" style={{ fontSize: "0.75rem", fontWeight: 700, color: weakCount > 0 ? "#EF4444" : "#10B981" }}>
            {weakCount > 0 ? `+${totalDeficit}h STUDY DEFICIT` : "OPTIMAL MASTERY"}
          </span>
        </div>
      </div>

      {/* 3 Sample Interactive Toggles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "0.75rem", marginBottom: "1.25rem" }}>
        {SAMPLE_FOUNDATIONS.map(f => {
          const isWeak = ratings[f.id] === 1;
          return (
            <div
              key={f.id}
              onClick={() => toggleRating(f.id)}
              style={{
                borderRadius: 10,
                padding: "0.85rem",
                cursor: "pointer",
                background: isWeak ? "rgba(239, 68, 68, 0.04)" : "rgba(16, 185, 129, 0.04)",
                border: isWeak ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(16, 185, 129, 0.3)",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text-tertiary)" }}>
                  {f.cls}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: isWeak ? "#EF4444" : "#10B981",
                  }}
                >
                  {isWeak ? "WEAK ⚠️" : "STRONG ⚡"}
                </span>
              </div>

              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#EDEDED", marginBottom: "0.25rem" }}>
                {f.name}
              </div>

              <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                Bottlenecks: <span style={{ color: isWeak ? "#F59E0B" : "#888888" }}>{f.impact}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Bridge CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          paddingTop: "1rem",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
          {weakCount > 0
            ? `${weakCount} of 3 foundational topics need recovery before starting Class 11.`
            : "All 3 sample topics mastered. Ready for advanced syllabus projection."}
        </span>

        <button
          onClick={() => {
            playClick();
            onStartAnalysis();
          }}
          className="btn-ghost"
          style={{
            color: "#00DFD8",
            fontSize: "0.82rem",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <span>Run Full 30+ Chapter Diagnostic</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
