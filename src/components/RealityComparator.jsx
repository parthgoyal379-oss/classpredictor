import { useState } from "react";
import { Layers, Award, Clock, Zap, ArrowRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { playClick } from "../utils/audio";

export default function RealityComparator({ onStartAnalysis }) {
  const [mode, setMode] = useState("reality"); // "illusion" | "reality"

  const cards = [
    {
      icon: <Layers size={18} />,
      title: "Syllabus Volume & Density",
      illusion: {
        val: "220 Pages",
        tag: "1.0x Baseline",
        sub: "1 single slim Science textbook across Physics, Chemistry & Biology. 16 simple chapters.",
        col: "#10B981",
      },
      reality: {
        val: "1,280+ Pages",
        tag: "5.8x Explosion",
        sub: "6 dense volumes across PCM/PCB. 30+ chapters with 310+ deep theoretical concepts.",
        col: "#EF4444",
      },
    },
    {
      icon: <Award size={18} />,
      title: "Scoring & Evaluation Standards",
      illusion: {
        val: "90% – 98%",
        tag: "Inflated Safety",
        sub: "Predictable textbook questions, forgiving step marking, memorized definitions rewarded.",
        col: "#10B981",
      },
      reality: {
        val: "35% – 52%",
        tag: "Brutal Coaching Average",
        sub: "Novel multi-step numericals, negative marking, tests combine concepts from 3 different topics.",
        col: "#EF4444",
      },
    },
    {
      icon: <Clock size={18} />,
      title: "Study Rhythm & Backlog Sensitivity",
      illusion: {
        val: "2 Weeks Cram",
        tag: "Exam-Time Sprint",
        sub: "Studying 10 days before term exams is sufficient to score top grades in school.",
        col: "#10B981",
      },
      reality: {
        val: "4–6 Hrs Daily",
        tag: "Zero-Tolerance Velocity",
        sub: "Missing 3 days creates an unrecoverable 2-week backlog in fast-paced coaching batches.",
        col: "#F59E0B",
      },
    },
    {
      icon: <Zap size={18} />,
      title: "Prerequisite Dependency Coupling",
      illusion: {
        val: "Isolated Chapters",
        tag: "Forgiving Silos",
        sub: "Weak understanding in Light doesn't hurt your marks in Carbon Compounds or Life Processes.",
        col: "#10B981",
      },
      reality: {
        val: "Strict Cascade",
        tag: "Total System Failure",
        sub: "Weak Class 10 Trigonometry guarantees failure in Calculus, Vectors, and Rotational Dynamics.",
        col: "#EF4444",
      },
    },
  ];

  return (
    <div style={{ width: "100%", maxWidth: 1040, marginBottom: "4.5rem" }}>
      {/* Header with Tactile Switch */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
            <span
              className="font-mono"
              style={{
                fontSize: "0.72rem",
                color: mode === "reality" ? "#EF4444" : "#10B981",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              • THE CLASS 11 COGNITIVE CHASM
            </span>
          </div>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
            The Class 10 Illusion vs. The Class 11 Reality Check
          </h3>
        </div>

        {/* Interactive Mode Toggle */}
        <div
          style={{
            display: "flex",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "4px",
            borderRadius: 10,
            gap: "4px",
          }}
        >
          <button
            onClick={() => {
              playClick();
              setMode("illusion");
            }}
            className="btn-ghost"
            style={{
              padding: "0.45rem 0.9rem",
              borderRadius: 7,
              fontSize: "0.78rem",
              fontWeight: mode === "illusion" ? 700 : 400,
              background: mode === "illusion" ? "rgba(16, 185, 129, 0.15)" : "transparent",
              color: mode === "illusion" ? "#10B981" : "var(--text-secondary)",
              border: mode === "illusion" ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            🎓 The Class 10 Illusion
          </button>

          <button
            onClick={() => {
              playClick();
              setMode("reality");
            }}
            className="btn-ghost"
            style={{
              padding: "0.45rem 0.9rem",
              borderRadius: 7,
              fontSize: "0.78rem",
              fontWeight: mode === "reality" ? 700 : 400,
              background: mode === "reality" ? "rgba(239, 68, 68, 0.15)" : "transparent",
              color: mode === "reality" ? "#EF4444" : "var(--text-secondary)",
              border: mode === "reality" ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            ⚡ The Class 11 Reality
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
          textAlign: "left",
        }}
      >
        {cards.map(c => {
          const isR = mode === "reality";
          const data = isR ? c.reality : c.illusion;

          return (
            <SpotlightCard
              key={c.title}
              style={{
                padding: "1.4rem",
                background: isR 
                  ? "linear-gradient(180deg, rgba(239, 68, 68, 0.04) 0%, rgba(10, 10, 10, 0.95) 100%)" 
                  : "linear-gradient(180deg, rgba(16, 185, 129, 0.04) 0%, rgba(10, 10, 10, 0.95) 100%)",
                border: `1px solid ${isR ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)"}`,
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", position: "relative", zIndex: 2 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: isR ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
                  border: `1px solid ${isR ? "rgba(239, 68, 68, 0.25)" : "rgba(16, 185, 129, 0.25)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: data.col,
                }}>
                  {c.icon}
                </div>

                <span className="font-mono" style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: data.col,
                  background: `${data.col}18`,
                  border: `1px solid ${data.col}33`,
                  padding: "2px 7px",
                  borderRadius: 4,
                }}>
                  {data.tag}
                </span>
              </div>

              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem", position: "relative", zIndex: 2 }}>
                {c.title}
              </div>

              <div
                className="font-mono"
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: data.col,
                  lineHeight: 1.1,
                  marginBottom: "0.65rem",
                  letterSpacing: "-0.02em",
                  position: "relative",
                  zIndex: 2,
                  transition: "color 0.25s ease",
                }}
              >
                {data.val}
              </div>

              <p style={{ fontSize: "0.76rem", color: "var(--text-secondary)", lineHeight: 1.55, position: "relative", zIndex: 2 }}>
                {data.sub}
              </p>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Reality Check Diagnostic Action Button */}
      {onStartAnalysis && (
        <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
          <button
            onClick={() => {
              playClick();
              onStartAnalysis();
            }}
            className="btn-ghost"
            style={{
              fontSize: "0.8rem",
              color: mode === "reality" ? "#FCA5A5" : "#A7F3D0",
              background: mode === "reality" ? "rgba(239, 68, 68, 0.08)" : "rgba(16, 185, 129, 0.08)",
              border: `1px solid ${mode === "reality" ? "rgba(239, 68, 68, 0.25)" : "rgba(16, 185, 129, 0.25)"}`,
              padding: "0.55rem 1.25rem",
              borderRadius: 8,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              transition: "all 0.2s ease",
            }}
          >
            <span>{mode === "reality" ? "Don't let Class 11 blindside you — Run Prerequisite Audit" : "Test whether your Class 10 foundations will hold"}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
