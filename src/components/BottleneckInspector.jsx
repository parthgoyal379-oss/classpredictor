import { useState } from "react";
import { AlertOctagon, Flame, ChevronRight, CheckCircle2, Zap } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { playRating, playClick } from "../utils/audio";

export default function BottleneckInspector({ onStartAnalysis }) {
  const [selectedId, setSelectedId] = useState("rotational");

  const bottlenecks = [
    {
      id: "rotational",
      name: "Rotational Dynamics",
      subject: "Physics",
      subjCol: "#00DFD8",
      dangerRate: "76% Failure Rate",
      dangerCol: "#EF4444",
      hiddenPrereqs: ["Vectors (Dot/Cross Products)", "Class 9 Laws of Motion & Friction", "Trigonometric Resolution"],
      whyItCrushes: "Class 10 linear physics does not prepare you for moment of inertia, torque vectors, and rolling without slipping. Students treat it like standard kinematics and hit a cognitive wall.",
      vaccine: "Spend 12–15 hours mastering vector decomposition and free-body torque diagrams before your teacher starts the mechanics block.",
    },
    {
      id: "goc",
      name: "General Organic Chemistry (GOC)",
      subject: "Chemistry",
      subjCol: "#A855F7",
      dangerRate: "81% Vulnerability Rate",
      dangerCol: "#EF4444",
      hiddenPrereqs: ["Class 10 Carbon Bonding & Covalency", "Electronegativity & Periodic Trends", "Basic Structural Isomers"],
      whyItCrushes: "Class 10 Carbon & Compounds is largely treated with rote memorization in school. Class 11 introduces resonance structures, hyperconjugation, and electron arrow pushing that cannot be memorized.",
      vaccine: "Establish 100% fluency in Lewis structures, bond hybridization, and formal charges during your pre-term vacation.",
    },
    {
      id: "calculus",
      name: "Calculus & Limits",
      subject: "Mathematics",
      subjCol: "#F59E0B",
      dangerRate: "68% Drop in Term 1",
      dangerCol: "#F59E0B",
      hiddenPrereqs: ["Class 10 Quadratic Equations", "Trigonometric Identities (Compound Angles)", "Domain & Range of Relations"],
      whyItCrushes: "Calculus accounts for 35–40% of JEE Mathematics and directly powers Class 11 Physics derivations. Deficient algebra fluency turns simple integration into an impossible slog.",
      vaccine: "Drill algebraic factorisation and memorize all standard trigonometric transformations until they become muscle memory.",
    },
    {
      id: "physio",
      name: "Human Physiology",
      subject: "Biology / NEET",
      subjCol: "#10B981",
      dangerRate: "59% Mock Deficit",
      dangerCol: "#10B981",
      hiddenPrereqs: ["Class 10 Life Processes (Circulation, Excretion)", "Basic Endocrine Glands", "Cellular Respiration"],
      whyItCrushes: "Huge vocabulary jump from Class 10. NCERT statements carry subtle biochemical nuances that NEET examiners turn into high-yield trap questions.",
      vaccine: "Re-map Class 10 nephron, cardiac cycle, and synaptic transmission pathways with flowcharts before diving into NCERT Class 11.",
    },
  ];

  const active = bottlenecks.find(b => b.id === selectedId) || bottlenecks[0];

  return (
    <div style={{ width: "100%", maxWidth: 1040, marginBottom: "4.5rem" }}>
      {/* Title & Introduction */}
      <div style={{ marginBottom: "1.75rem", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
          <AlertOctagon size={15} style={{ color: "#EF4444" }} />
          <span className="font-mono" style={{ fontSize: "0.72rem", color: "#EF4444", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
            • THE 4 KILLER TRANSITIONS
          </span>
        </div>
        <h3 style={{ fontSize: "clamp(1.2rem, 3.8vw, 1.5rem)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: "0.35rem" }}>
          The Notorious Bottleneck Inspector
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          These 4 chapters cause 80% of student coaching dropouts within the first 12 weeks of Class 11. Click any chapter to inspect the hidden dependency cascade:
        </p>
      </div>

      {/* 4 Interactive Selector Cards */}
      <div
        className="bottleneck-selector-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
          gap: "0.75rem",
          marginBottom: "1.25rem",
        }}
      >
        {bottlenecks.map(b => {
          const isSelected = selectedId === b.id;

          return (
            <div
              key={b.id}
              onClick={() => {
                playRating(3);
                setSelectedId(b.id);
              }}
              className="bottleneck-selector-card"
              style={{
                padding: "1rem 1.15rem",
                borderRadius: 12,
                background: isSelected 
                  ? "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(20, 20, 20, 0.9) 100%)" 
                  : "rgba(255, 255, 255, 0.02)",
                border: isSelected ? `1px solid ${b.subjCol}` : "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: isSelected ? `0 0 20px -5px ${b.subjCol}44` : "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: isSelected ? "translateY(-2px)" : "scale(1)",
                userSelect: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span className="font-mono" style={{ fontSize: "0.68rem", color: b.subjCol, fontWeight: 700 }}>
                  {b.subject.toUpperCase()}
                </span>
                <span className="font-mono" style={{ fontSize: "0.65rem", color: b.dangerCol, background: `${b.dangerCol}15`, padding: "1px 6px", borderRadius: 4 }}>
                  {b.dangerRate}
                </span>
              </div>

              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: isSelected ? "#FFFFFF" : "#EDEDED", marginBottom: "2px" }}>
                {b.name}
              </h4>
            </div>
          );
        })}
      </div>

      {/* Expanded Deep-Dive X-Ray Drawer */}
      <SpotlightCard
        className="mobile-card-p"
        style={{
          padding: "1.75rem",
          background: "linear-gradient(180deg, rgba(20, 20, 20, 0.95) 0%, #0A0A0A 100%)",
          border: `1px solid ${active.subjCol}44`,
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem", position: "relative", zIndex: 2 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
              <span className="font-mono" style={{ fontSize: "0.72rem", color: active.subjCol, fontWeight: 700 }}>
                {active.subject.toUpperCase()} DEEP-DIVE
              </span>
              <span style={{ color: "var(--text-tertiary)" }}>•</span>
              <span className="font-mono" style={{ fontSize: "0.72rem", color: active.dangerCol, fontWeight: 600 }}>
                {active.dangerRate}
              </span>
            </div>
            <h3 style={{ fontSize: "clamp(1.05rem, 3.2vw, 1.3rem)", fontWeight: 800, color: "#FFFFFF" }}>
              {active.name}: Forensic Failure Analysis
            </h3>
          </div>

          <button
            onClick={() => {
              playClick();
              onStartAnalysis();
            }}
            className="btn-secondary mobile-full-w"
            style={{
              padding: "0.55rem 1rem",
              fontSize: "0.78rem",
              background: `${active.subjCol}15`,
              borderColor: `${active.subjCol}44`,
              color: active.subjCol,
            }}
          >
            <span>Run Prerequisite Check</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* 3 Inspection Blocks */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            gap: "1rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Block 1: Hidden Prerequisites */}
          <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: 10, padding: "1.15rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.75rem" }}>
              <Zap size={15} style={{ color: "#00DFD8" }} />
              <span className="font-mono" style={{ fontSize: "0.72rem", fontWeight: 700, color: "#EDEDED" }}>
                CRITICAL CLASS 9–10 PREREQUISITES
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {active.hiddenPrereqs.map((p, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                  <span style={{ color: "#00DFD8" }}>•</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Block 2: Why Students Get Crushed */}
          <div style={{ background: "rgba(239, 68, 68, 0.03)", border: "1px solid rgba(239, 68, 68, 0.15)", borderRadius: 10, padding: "1.15rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.75rem" }}>
              <Flame size={15} style={{ color: "#EF4444" }} />
              <span className="font-mono" style={{ fontSize: "0.72rem", fontWeight: 700, color: "#FCA5A5" }}>
                WHY 80% OF ASPIRANTS FREEZE
              </span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              {active.whyItCrushes}
            </p>
          </div>

          {/* Block 3: Remedial Vaccine Action */}
          <div style={{ background: "rgba(16, 185, 129, 0.03)", border: "1px solid rgba(16, 185, 129, 0.15)", borderRadius: 10, padding: "1.15rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.75rem" }}>
              <CheckCircle2 size={15} style={{ color: "#10B981" }} />
              <span className="font-mono" style={{ fontSize: "0.72rem", fontWeight: 700, color: "#A7F3D0" }}>
                PREVENTIVE VACCINE ACTION
              </span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              {active.vaccine}
            </p>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
