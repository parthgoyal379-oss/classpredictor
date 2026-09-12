import { useState, useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function LoadingScanner({ studentName, goal }) {
  const [progress, setProgress] = useState(15);
  const [stage, setStage] = useState(0);

  const stages = [
    "Deconstructing Class 9 & 10 conceptual baseline...",
    "Traversing directed acyclic graph (DAG) prerequisites...",
    `Calibrating exam impact multiplier for ${goal}...`,
    "Synthesizing prioritized remediation roadmap...",
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => { setProgress(45); setStage(1); }, 400);
    const timer2 = setTimeout(() => { setProgress(75); setStage(2); }, 900);
    const timer3 = setTimeout(() => { setProgress(98); setStage(3); }, 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [goal]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000000",
      padding: "2rem 1.5rem",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="ambient-spotlight" />
      <div className="vercel-grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <div className="vercel-card animate-fade-in" style={{
        maxWidth: 480,
        width: "100%",
        padding: "2.5rem 2rem",
        position: "relative",
        zIndex: 1,
        background: "rgba(10, 10, 10, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9)",
      }}>
        {/* Animated Radar Scanner */}
        <div style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          margin: "0 auto 1.5rem",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}>
          {/* Rotating radar line */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            borderTop: "2px solid #FFFFFF",
            borderRight: "2px solid transparent",
            animation: "radarSweep 1.2s linear infinite",
          }} />
          <Loader2 size={24} className="radar-sweep" style={{ color: "#FFFFFF" }} />
        </div>

        <h3 style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          marginBottom: "0.35rem",
        }}>
          Computing Prerequisite Matrix
        </h3>
        <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1.75rem" }}>
          Synthesizing personalized risk equations for <strong style={{ color: "#EDEDED" }}>{studentName}</strong>
        </p>

        {/* Dynamic Progress Bar */}
        <div style={{
          height: 4,
          background: "rgba(255, 255, 255, 0.06)",
          borderRadius: 4,
          overflow: "hidden",
          marginBottom: "1.5rem",
          position: "relative",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #3B82F6, #A855F7, #FFFFFF)",
            transition: "width 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
          }} />
        </div>

        {/* Live Step Checklist */}
        <div style={{ display: "grid", gap: "0.65rem", textAlign: "left", marginBottom: "1.5rem" }}>
          {stages.map((stg, i) => {
            const isCompleted = stage > i;
            const isCurrent = stage === i;

            return (
              <div
                key={stg}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontSize: "0.78rem",
                  color: isCompleted ? "#EDEDED" : isCurrent ? "#FFFFFF" : "var(--text-tertiary)",
                  transition: "all 0.2s ease",
                  padding: "0.25rem 0",
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={15} style={{ color: "var(--accent-emerald)", flexShrink: 0 }} />
                ) : isCurrent ? (
                  <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    border: "2px solid #FFFFFF",
                    borderTopColor: "transparent",
                    animation: "radarSweep 0.8s linear infinite",
                    flexShrink: 0,
                  }} />
                ) : (
                  <div style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    border: "1px solid var(--border)",
                    flexShrink: 0,
                  }} />
                )}
                <span className={isCurrent ? "font-mono" : ""}>{stg}</span>
              </div>
            );
          })}
        </div>

        {/* Monospace Telemetry Footer */}
        <div className="font-mono" style={{
          fontSize: "0.68rem",
          color: "var(--text-tertiary)",
          paddingTop: "0.75rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          letterSpacing: "0.05em",
        }}>
          ENGINE: DAG_PREREQ_CALCULATOR_V2 • STATUS: ACTIVE
        </div>
      </div>
    </div>
  );
}
