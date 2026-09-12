import { Clock, CheckCircle2, ChevronRight } from "lucide-react";

export default function RoadmapView({ roadmap, studentName }) {
  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="vercel-card" style={{ padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(16, 185, 129, 0.1)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          color: "var(--accent-emerald)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1rem",
        }}>
          <CheckCircle2 size={24} />
        </div>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
          Rock-Solid Foundation Detected!
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto" }}>
          Your Class 9 & 10 conceptual baseline is remarkably stable across all tested prerequisites. Maintain consistent weekly problem practice.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ display: "grid", gap: "1.25rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Calculated study sequence for <strong style={{ color: "#EDEDED" }}>{studentName}</strong>. Following this chronological sequence minimizes prerequisite friction.
        </p>
      </div>

      {roadmap.map((ph, idx) => (
        <div key={idx} className="vercel-card" style={{ overflow: "hidden" }}>
          {/* Phase Header */}
          <div style={{
            padding: "0.85rem 1.25rem",
            background: "rgba(255, 255, 255, 0.02)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span className="font-mono" style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: ph.col,
                background: ph.col + "1A",
                border: "1px solid " + ph.col + "33",
                padding: "2px 7px",
                borderRadius: 4,
              }}>
                {ph.phase}
              </span>
              <h4 style={{ fontSize: "0.92rem", fontWeight: 600, color: "#EDEDED" }}>
                {ph.title}
              </h4>
            </div>

            <span className="font-mono" style={{
              fontSize: "0.68rem",
              color: "var(--text-tertiary)",
              background: "rgba(255, 255, 255, 0.04)",
              padding: "2px 6px",
              borderRadius: 4,
            }}>
              {ph.tag || "Milestone"}
            </span>
          </div>

          {/* Phase Items List */}
          <div style={{ padding: "0.5rem 0" }}>
            {ph.items.map((item, itemIdx) => (
              <div
                key={itemIdx}
                style={{
                  padding: "0.75rem 1.25rem",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "1rem",
                  borderBottom: itemIdx < ph.items.length - 1 ? "1px solid rgba(255, 255, 255, 0.04)" : "none",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                    <ChevronRight size={14} style={{ color: ph.col, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--text-primary)" }}>
                      {item.label}
                    </span>
                  </div>

                  {item.detail && (
                    <p style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      marginTop: "0.25rem",
                      marginLeft: "1.35rem",
                      lineHeight: 1.45,
                    }}>
                      {item.detail}
                    </p>
                  )}
                </div>

                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "0.72rem",
                  color: "var(--text-secondary)",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  padding: "3px 8px",
                  borderRadius: 6,
                  flexShrink: 0,
                }}>
                  <Clock size={12} style={{ color: "var(--text-tertiary)" }} />
                  <span className="font-mono">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
