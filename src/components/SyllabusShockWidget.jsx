import { Flame, BookOpen, Layers, AlertOctagon } from "lucide-react";
import TiltCard from "./TiltCard";

export default function SyllabusShockWidget() {
  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto 4.5rem", textAlign: "left" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem", padding: "0 0.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Flame size={18} style={{ color: "#EF4444" }} />
          <span className="font-mono" style={{ fontSize: "0.78rem", fontWeight: 700, color: "#EDEDED", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            The Reality Gap • Class 10 vs. Class 11
          </span>
        </div>
        <span
          className="font-mono"
          style={{
            fontSize: "0.7rem",
            color: "#EF4444",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.25)",
            padding: "2px 8px",
            borderRadius: 4,
          }}
        >
          5.8× SYLLABUS EXPANSION
        </span>
      </div>

      <TiltCard
        glowColor="#EF4444"
        style={{
          padding: "1.75rem",
          background: "linear-gradient(180deg, rgba(239, 68, 68, 0.03) 0%, rgba(10, 10, 10, 0.95) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.09)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
              Why 90% scorers get blindsided in Term 1
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              Class 10 tests rote memory of single-concept formulas. Class 11 requires multi-layered conceptual chains (e.g. solving Newton's Laws with Trigonometric decomposition and Calculus derivatives).
            </p>

            <div style={{ display: "flex", gap: "1.25rem" }}>
              <div>
                <div className="font-mono" style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFFFFF" }}>5.8×</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>Textbook Page Volume</div>
              </div>
              <div style={{ width: 1, background: "rgba(255, 255, 255, 0.1)" }} />
              <div>
                <div className="font-mono" style={{ fontSize: "1.6rem", fontWeight: 800, color: "#F59E0B" }}>3.0×</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>Chapter Density</div>
              </div>
              <div style={{ width: 1, background: "rgba(255, 255, 255, 0.1)" }} />
              <div>
                <div className="font-mono" style={{ fontSize: "1.6rem", fontWeight: 800, color: "#EF4444" }}>84%</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>Students Face Backlogs</div>
              </div>
            </div>
          </div>

          {/* Comparative Volume Bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", background: "rgba(255, 255, 255, 0.02)", padding: "1.25rem", borderRadius: 10, border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            {/* Class 10 Bar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: 5 }}>
                <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 5 }}>
                  <BookOpen size={13} style={{ color: "#10B981" }} />
                  Class 10 Science (16 Chapters)
                </span>
                <span className="font-mono" style={{ color: "var(--text-tertiary)" }}>~220 Pages</span>
              </div>
              <div style={{ height: 10, background: "rgba(255, 255, 255, 0.06)", borderRadius: 5, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "18%", background: "#10B981", borderRadius: 5 }} />
              </div>
            </div>

            {/* Class 11 Bar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: 5 }}>
                <span style={{ color: "#FFFFFF", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                  <Layers size={13} style={{ color: "#EF4444" }} />
                  Class 11 Science (48 Chapters)
                </span>
                <span className="font-mono" style={{ color: "#EF4444", fontWeight: 700 }}>~1,280 Pages</span>
              </div>
              <div style={{ height: 10, background: "rgba(255, 255, 255, 0.06)", borderRadius: 5, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "100%", background: "linear-gradient(90deg, #F59E0B, #EF4444)", borderRadius: 5 }} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
              <AlertOctagon size={14} style={{ color: "#F59E0B", flexShrink: 0 }} />
              <span style={{ fontSize: "0.7rem", color: "#FDE68A" }}>
                Without foundation diagnostic, syllabus shock causes immediate Term 1 backlogs.
              </span>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
