import { AlertOctagon, AlertTriangle, CheckCircle2, MinusCircle } from "lucide-react";

export default function PriorityMatrix({ quads, goal }) {
  const cards = [
    {
      key: "critical",
      label: "FOCUS FIRST",
      desc: "High risk · High exam weightage",
      icon: <AlertOctagon size={16} />,
      col: "var(--accent-red)",
      bg: "rgba(239, 68, 68, 0.06)",
      border: "rgba(239, 68, 68, 0.25)",
      badgeText: "Critical Attention",
    },
    {
      key: "review",
      label: "REVIEW CAREFULLY",
      desc: "High risk · Moderate weightage",
      icon: <AlertTriangle size={16} />,
      col: "var(--accent-amber)",
      bg: "rgba(245, 158, 11, 0.06)",
      border: "rgba(245, 158, 11, 0.25)",
      badgeText: "Targeted Drill",
    },
    {
      key: "easywin",
      label: "HIGH-YIELD CONVERSIONS",
      desc: "Low risk · High exam weightage",
      icon: <CheckCircle2 size={16} />,
      col: "var(--accent-emerald)",
      bg: "rgba(16, 185, 129, 0.06)",
      border: "rgba(16, 185, 129, 0.25)",
      badgeText: "High ROI Marks",
    },
    {
      key: "skip",
      label: "MINIMAL OVERHEAD",
      desc: "Low risk · Lower weightage",
      icon: <MinusCircle size={16} />,
      col: "var(--text-secondary)",
      bg: "rgba(255, 255, 255, 0.02)",
      border: "rgba(255, 255, 255, 0.08)",
      badgeText: "Standard Pace",
    },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "1.25rem" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Strategic time allocation matrix cross-referencing your predicted risk with <strong style={{ color: "#EDEDED" }}>{goal}</strong> examination weightage.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1rem",
      }}>
        {cards.map(card => {
          const list = quads[card.key] || [];

          return (
            <div
              key={card.key}
              className="vercel-card"
              style={{
                padding: "1.25rem",
                background: `linear-gradient(180deg, ${card.bg} 0%, rgba(10, 10, 10, 0.95) 100%)`,
                borderColor: card.border,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", color: card.col }}>
                  {card.icon}
                  <span className="font-mono" style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.02em" }}>
                    {card.label}
                  </span>
                </div>

                <span className="font-mono" style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: card.col,
                  background: card.col + "1A",
                  border: "1px solid " + card.col + "33",
                  padding: "1px 6px",
                  borderRadius: 4,
                }}>
                  {list.length} {list.length === 1 ? "Chapter" : "Chapters"}
                </span>
              </div>

              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                {card.desc}
              </p>

              {/* Items List */}
              <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}>
                {list.length === 0 ? (
                  <div style={{
                    padding: "1.5rem 0",
                    textAlign: "center",
                    color: "var(--text-tertiary)",
                    fontSize: "0.78rem",
                    fontStyle: "italic",
                  }}>
                    No chapters in this quadrant
                  </div>
                ) : (
                  list.map(ch => (
                    <div
                      key={ch.id}
                      style={{
                        padding: "0.5rem 0.75rem",
                        borderRadius: 6,
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--text-primary)" }}>
                        {ch.name}
                      </span>
                      <span className="font-mono" style={{
                        fontSize: "0.68rem",
                        color: "var(--text-tertiary)",
                      }}>
                        Class {ch.cls}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
