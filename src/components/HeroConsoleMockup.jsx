import { useState } from "react";
import { GitFork, Activity, ShieldAlert, CheckCircle2, ChevronRight } from "lucide-react";
import { playClick } from "../utils/audio";

export default function HeroConsoleMockup({ onStart }) {
  const [activeStream, setActiveStream] = useState("PCM");
  const [activeNode, setActiveNode] = useState(null);

  const streams = [
    { id: "PCM", label: "PCM (JEE Track)", exam: "JEE Advanced Target", color: "#00DFD8" },
    { id: "PCB", label: "PCB (NEET Track)", exam: "NEET-UG Target", color: "#10B981" },
    { id: "PCMB", label: "PCMB (Dual Track)", exam: "Dual Competitive Target", color: "#A855F7" },
  ];

  const streamData = {
    PCM: {
      score: 68,
      riskLevel: "ELEVATED VULNERABILITY",
      riskCol: "#F59E0B",
      deficit: "28 Hours",
      criticalCount: 3,
      pipelines: [
        {
          id: "phy",
          subject: "PHYSICS CASCADE",
          subjCol: "#00DFD8",
          nodes: [
            { id: "p1", name: "Trigonometry (Cl 10)", risk: "LOW", col: "#10B981", tag: "FOUNDATION" },
            { id: "p2", name: "Vectors & Kinematics", risk: "MED", col: "#F59E0B", tag: "TRANSITION" },
            { id: "p3", name: "Rotational Dynamics", risk: "HIGH", col: "#EF4444", tag: "BOTTLENECK" },
          ],
        },
        {
          id: "math",
          subject: "MATHEMATICS CASCADE",
          subjCol: "#A855F7",
          nodes: [
            { id: "m1", name: "Quadratic Equations", risk: "LOW", col: "#10B981", tag: "FOUNDATION" },
            { id: "m2", name: "Coordinate Geometry", risk: "MED", col: "#F59E0B", tag: "TRANSITION" },
            { id: "m3", name: "Differential Calculus", risk: "HIGH", col: "#EF4444", tag: "BOTTLENECK" },
          ],
        },
      ],
    },
    PCB: {
      score: 62,
      riskLevel: "CRITICAL VULNERABILITY",
      riskCol: "#EF4444",
      deficit: "34 Hours",
      criticalCount: 4,
      pipelines: [
        {
          id: "chem",
          subject: "CHEMISTRY CASCADE",
          subjCol: "#A855F7",
          nodes: [
            { id: "c1", name: "Chemical Reactions", risk: "LOW", col: "#10B981", tag: "FOUNDATION" },
            { id: "c2", name: "Mole Concept & Stoichiometry", risk: "HIGH", col: "#EF4444", tag: "BOTTLENECK" },
            { id: "c3", name: "General Organic Chemistry", risk: "HIGH", col: "#EF4444", tag: "BOTTLENECK" },
          ],
        },
        {
          id: "bio",
          subject: "BIOLOGY CASCADE",
          subjCol: "#10B981",
          nodes: [
            { id: "b1", name: "Life Processes (Cl 10)", risk: "LOW", col: "#10B981", tag: "FOUNDATION" },
            { id: "b2", name: "Control & Coordination", risk: "MED", col: "#F59E0B", tag: "TRANSITION" },
            { id: "b3", name: "Human Physiology", risk: "HIGH", col: "#EF4444", tag: "BOTTLENECK" },
          ],
        },
      ],
    },
    PCMB: {
      score: 58,
      riskLevel: "SEVERE OVERLOAD RISK",
      riskCol: "#EF4444",
      deficit: "46 Hours",
      criticalCount: 6,
      pipelines: [
        {
          id: "phy_math",
          subject: "MATH + PHYSICS COUPLING",
          subjCol: "#00DFD8",
          nodes: [
            { id: "pm1", name: "Trigonometric Identities", risk: "MED", col: "#F59E0B", tag: "FOUNDATION" },
            { id: "pm2", name: "Calculus in Kinematics", risk: "HIGH", col: "#EF4444", tag: "BOTTLENECK" },
            { id: "pm3", name: "Electrodynamics", risk: "HIGH", col: "#EF4444", tag: "BOTTLENECK" },
          ],
        },
        {
          id: "chem_bio",
          subject: "BIOCHEMISTRY DUAL OVERLAY",
          subjCol: "#10B981",
          nodes: [
            { id: "cb1", name: "Carbon Compounds (Cl 10)", risk: "LOW", col: "#10B981", tag: "FOUNDATION" },
            { id: "cb2", name: "Biomolecules & Cell Cycle", risk: "MED", col: "#F59E0B", tag: "TRANSITION" },
            { id: "cb3", name: "Organic Reaction Mechanisms", risk: "HIGH", col: "#EF4444", tag: "BOTTLENECK" },
          ],
        },
      ],
    },
  };

  const current = streamData[activeStream];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1040,
        marginBottom: "4.5rem",
        perspective: "1200px",
      }}
    >
      {/* 3D Tilted Perspective Glass Frame */}
      <div
        style={{
          borderRadius: 20,
          background: "linear-gradient(180deg, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.96) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 30px 100px -20px rgba(0, 0, 0, 0.9), 0 0 60px -15px rgba(0, 223, 216, 0.15)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
          textAlign: "left",
        }}
      >
        {/* Top Console Status Bar */}
        <div
          style={{
            padding: "0.85rem 1.5rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(255, 255, 255, 0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(239, 68, 68, 0.6)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(245, 158, 11, 0.6)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(16, 185, 129, 0.6)" }} />
            </div>

            <div style={{ width: 1, height: 14, background: "rgba(255, 255, 255, 0.1)" }} />

            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <Activity size={13} style={{ color: "#00DFD8" }} />
              <span className="font-mono" style={{ fontSize: "0.72rem", color: "#EDEDED", fontWeight: 600, letterSpacing: "0.05em" }}>
                INTERACTIVE DIAGNOSTIC SIMULATOR
              </span>
            </div>
          </div>

          {/* Interactive Stream Switcher Pills */}
          <div style={{ display: "flex", gap: "0.35rem", background: "rgba(255, 255, 255, 0.04)", padding: "3px", borderRadius: 8 }}>
            {streams.map(s => {
              const isActive = activeStream === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    playClick();
                    setActiveStream(s.id);
                  }}
                  className="btn-ghost"
                  style={{
                    padding: "3px 10px",
                    borderRadius: 6,
                    fontSize: "0.72rem",
                    fontWeight: isActive ? 700 : 400,
                    background: isActive ? "rgba(255, 255, 255, 0.12)" : "transparent",
                    color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                    border: isActive ? `1px solid ${s.color}66` : "1px solid transparent",
                    boxShadow: isActive ? `0 0 12px ${s.color}33` : "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Console Body */}
        <div style={{ padding: "1.5rem" }}>
          {/* Diagnostic Telemetry Top Bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: 10, padding: "1rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: "4px" }} className="font-mono">
                FOUNDATION READINESS
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                <span className="font-mono" style={{ fontSize: "1.75rem", fontWeight: 800, color: current.riskCol, lineHeight: 1 }}>
                  {current.score}%
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  vs. 92% Topper Benchmark
                </span>
              </div>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: 10, padding: "1rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: "4px" }} className="font-mono">
                DIAGNOSTIC STATUS
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <ShieldAlert size={16} style={{ color: current.riskCol }} />
                <span className="font-mono" style={{ fontSize: "0.85rem", fontWeight: 700, color: current.riskCol }}>
                  {current.riskLevel}
                </span>
              </div>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: 10, padding: "1rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: "4px" }} className="font-mono">
                ESTIMATED RECOVERY DEFICIT
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.45rem" }}>
                <span className="font-mono" style={{ fontSize: "1.75rem", fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>
                  ~{current.deficit}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  across {current.criticalCount} bottlenecks
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Prerequisite Dependency Laser Pathways */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <GitFork size={15} style={{ color: "#00DFD8" }} />
                <span className="font-mono" style={{ fontSize: "0.75rem", fontWeight: 600, color: "#EDEDED", letterSpacing: "0.06em" }}>
                  SIMULATED PREREQUISITE CASCADE FAILURES
                </span>
              </div>
              <span style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
                Hover any node to inspect risk cascade
              </span>
            </div>

            <div style={{ display: "grid", gap: "0.85rem" }}>
              {current.pipelines.map(pipe => (
                <div
                  key={pipe.id}
                  style={{
                    background: "rgba(255, 255, 255, 0.015)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: 12,
                    padding: "1rem 1.25rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span className="font-mono" style={{ fontSize: "0.7rem", color: pipe.subjCol, fontWeight: 700, letterSpacing: "0.08em" }}>
                      {pipe.subject}
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-tertiary)" }}>
                      Linear Prerequisite Flow
                    </span>
                  </div>

                  {/* Connected Pathway Nodes */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    flexWrap: "wrap",
                  }}>
                    {pipe.nodes.map((node, nIdx) => {
                      const isHovered = activeNode === node.id;

                      return (
                        <div key={node.id} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <div
                            onMouseEnter={() => setActiveNode(node.id)}
                            onMouseLeave={() => setActiveNode(null)}
                            style={{
                              padding: "0.55rem 0.85rem",
                              borderRadius: 8,
                              background: isHovered 
                                ? `${node.col}22` 
                                : "rgba(255, 255, 255, 0.03)",
                              border: `1px solid ${isHovered ? node.col : "rgba(255, 255, 255, 0.1)"}`,
                              boxShadow: isHovered ? `0 0 16px ${node.col}44` : "none",
                              cursor: "pointer",
                              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                              transform: isHovered ? "translateY(-2px) scale(1.02)" : "scale(1)",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                              <span style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: node.col,
                                boxShadow: `0 0 8px ${node.col}`,
                              }} />
                              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: isHovered ? "#FFFFFF" : "#EDEDED" }}>
                                {node.name}
                              </span>
                              <span className="font-mono" style={{
                                fontSize: "0.62rem",
                                color: node.col,
                                background: `${node.col}18`,
                                padding: "1px 5px",
                                borderRadius: 3,
                              }}>
                                {node.tag}
                              </span>
                            </div>
                          </div>

                          {nIdx < pipe.nodes.length - 1 && (
                            <div style={{ display: "flex", alignItems: "center", color: "var(--text-tertiary)" }}>
                              <ChevronRight size={16} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Callout & Live Action Button */}
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: 12,
              background: "linear-gradient(90deg, rgba(0, 223, 216, 0.06) 0%, rgba(168, 85, 247, 0.06) 100%)",
              border: "1px solid rgba(0, 223, 216, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <CheckCircle2 size={18} style={{ color: "#00DFD8", flexShrink: 0 }} />
              <p style={{ fontSize: "0.82rem", color: "#EDEDED", lineHeight: 1.4 }}>
                This is a simulated preview. Run your personalized analysis to uncover exact chapter bottlenecks.
              </p>
            </div>

            <button
              onClick={() => {
                playClick();
                onStart();
              }}
              className="btn-primary"
              style={{
                padding: "0.6rem 1.25rem",
                fontSize: "0.82rem",
                borderRadius: 7,
                whiteSpace: "nowrap",
              }}
            >
              <span>Test Your Real Foundations</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
