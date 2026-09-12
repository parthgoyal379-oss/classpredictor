import { useState } from "react";
import { CheckSquare, Square, CheckCircle2, Award } from "lucide-react";
import { playRating } from "../utils/audio";
import SpotlightCard from "./SpotlightCard";

export default function RemediationChecklist({ results }) {
  const [checked, setChecked] = useState({});

  if (!results) return null;
  const res = results.res || [];
  const highRiskChapters = results.highRiskChapters || res.filter(c => c.risk === "HIGH");
  const mediumRiskChapters = results.mediumRiskChapters || res.filter(c => c.risk === "MEDIUM");

  // Generate actionable remediation tasks from vulnerabilities
  const tasks = (highRiskChapters.length > 0 || mediumRiskChapters.length > 0) ? [
    ...highRiskChapters.slice(0, 4).map(c => ({
      id: `task-high-${c.id}`,
      title: `Remediate Prerequisites for: ${c.name}`,
      detail: `Review core Class 9-10 theory, solve 15 foundational problems before starting ${c.name}.`,
      priority: "CRITICAL",
      color: "#EF4444",
    })),
    ...mediumRiskChapters.slice(0, 2).map(c => ({
      id: `task-med-${c.id}`,
      title: `Quick Concept Brush-up: ${c.name}`,
      detail: `Review formula derivations and 5 standard textbook problems.`,
      priority: "ELEVATED",
      color: "#F59E0B",
    })),
  ] : res.slice(0, 3).map(c => ({
    id: `task-adv-${c.id}`,
    title: `Advance Problem Solving: ${c.name}`,
    detail: `Foundation baseline is strong. Tackle higher-difficulty question banks to consolidate mastery.`,
    priority: "ADVANCED",
    color: "#10B981",
  }));

  const toggleCheck = (id) => {
    const next = !checked[id];
    playRating(next ? 3 : 1);
    setChecked(prev => ({ ...prev, [id]: next }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const totalTasks = tasks.length || 1;
  const pct = Math.round((completedCount / totalTasks) * 100);

  return (
    <SpotlightCard
      style={{
        padding: "1.5rem",
        marginBottom: "2rem",
        background: "#0A0A0A",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#10B981",
            }}
          >
            <CheckSquare size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF" }}>
              Actionable Recovery Checklist
            </h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              Step-by-step foundation tasks to eliminate bottlenecks before classes commence
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="font-mono" style={{ fontSize: "0.8rem", fontWeight: 700, color: pct === 100 ? "#10B981" : "#00DFD8" }}>
            {completedCount} of {tasks.length} Completed ({pct}%)
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ height: 6, background: "rgba(255, 255, 255, 0.08)", borderRadius: 3, overflow: "hidden", marginBottom: "1.25rem" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: pct === 100 ? "#10B981" : "linear-gradient(90deg, #00DFD8, #A855F7)",
            borderRadius: 3,
            transition: "width 0.35s ease",
          }}
        />
      </div>

      {/* Task List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {tasks.map(t => {
          const isDone = !!checked[t.id];
          return (
            <div
              key={t.id}
              onClick={() => toggleCheck(t.id)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.85rem",
                padding: "0.85rem",
                borderRadius: 8,
                background: isDone ? "rgba(16, 185, 129, 0.04)" : "rgba(255, 255, 255, 0.02)",
                border: isDone ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(255, 255, 255, 0.06)",
                cursor: "pointer",
                transition: "all 0.18s ease",
              }}
            >
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: isDone ? "#10B981" : "var(--text-tertiary)",
                  cursor: "pointer",
                  marginTop: 2,
                  padding: 0,
                  display: "flex",
                }}
              >
                {isDone ? <CheckCircle2 size={18} /> : <Square size={18} />}
              </button>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: 2 }}>
                  <span
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: isDone ? "var(--text-tertiary)" : "#FFFFFF",
                      textDecoration: isDone ? "line-through" : "none",
                    }}
                  >
                    {t.title}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      color: t.color,
                      background: `${t.color}15`,
                      padding: "1px 5px",
                      borderRadius: 3,
                    }}
                  >
                    {t.priority}
                  </span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                  {t.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {pct === 100 && (
        <div
          style={{
            marginTop: "1.25rem",
            padding: "0.75rem",
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            color: "#6EE7B7",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}
        >
          <Award size={18} />
          <span>All high-priority foundation tasks completed! You are primed for Class 11 launch.</span>
        </div>
      )}
    </SpotlightCard>
  );
}
