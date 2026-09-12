import { ArrowRight, Check } from "lucide-react";
import { STREAM_SUBJECTS, SMETA } from "../data/chapters";
import SpotlightCard from "./SpotlightCard";

export default function StreamGoalStep({ studentName, stream, setStream, goal, setGoal, onContinue, onBack }) {
  const exams = [
    { id: "JEE", name: "JEE Main & Advanced", desc: "IIT, NIT & Elite Engineering Colleges" },
    { id: "NEET", name: "NEET-UG", desc: "Medical Entrance (MBBS / BDS / AIIMS)" },
    { id: "Boards", name: "Class 12 Boards", desc: "CBSE, CISCE & State Board Excellence" },
    { id: "CUET", name: "CUET-UG", desc: "Central & National University Admissions" },
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: 740, margin: "0 auto", padding: "1rem 0 3rem" }}>
      {/* Title & Introduction */}
      <div style={{ marginBottom: "2.25rem" }}>
        <span className="font-mono" style={{
          fontSize: "0.72rem",
          color: "var(--accent-blue)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          Initial Calibration
        </span>
        <h2 style={{
          fontSize: "clamp(1.35rem, 4.2vw, 1.75rem)",
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          marginTop: "0.35rem",
          marginBottom: "0.35rem",
        }}>
          Configure your academic track, {studentName}
        </h2>
        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          Select your Class 11 stream and primary competitive target so we can calibrate weights and risk equations.
        </p>
      </div>

      {/* 1. Stream Selection */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.85rem",
        }}>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.02em" }}>
            1. CHOOSE YOUR STREAM
          </label>
          <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
            Select one
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(150px, 100%), 1fr))",
          gap: "0.75rem",
        }}>
          {Object.entries(STREAM_SUBJECTS).map(([id, subs]) => {
            const isSelected = stream === id;
            const subNames = subs.filter(s => s !== "core_maths").map(s => SMETA[s].name);

            return (
              <SpotlightCard
                key={id}
                onClick={() => setStream(id)}
                active={isSelected}
                style={{
                  padding: "1.1rem",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.65rem",
                  position: "relative",
                  zIndex: 2,
                }}>
                  <span className="font-mono" style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: isSelected ? "#FFFFFF" : "var(--text-primary)",
                  }}>
                    {id}
                  </span>
                  {isSelected && (
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      color: "#000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      animation: "fadeInUp 0.2s ease",
                    }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>

                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.35rem",
                  position: "relative",
                  zIndex: 2,
                }}>
                  {subNames.map(s => (
                    <span key={s} style={{
                      fontSize: "0.68rem",
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "var(--text-secondary)",
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      {/* 2. Target Exam */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.85rem",
        }}>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.02em" }}>
            2. PRIMARY TARGET EXAM
          </label>
          <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
            Calibrates chapter weightage
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
          gap: "0.75rem",
        }}>
          {exams.map(e => {
            const isSelected = goal === e.id;

            return (
              <SpotlightCard
                key={e.id}
                onClick={() => setGoal(e.id)}
                active={isSelected}
                style={{
                  padding: "1.1rem",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.35rem",
                  position: "relative",
                  zIndex: 2,
                }}>
                  <span style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: isSelected ? "#FFFFFF" : "var(--text-primary)",
                  }}>
                    {e.name}
                  </span>
                  {isSelected && (
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      color: "#000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      animation: "fadeInUp 0.2s ease",
                    }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>

                <p style={{
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.45,
                  position: "relative",
                  zIndex: 2,
                }}>
                  {e.desc}
                </p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      {/* Action CTA */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        {onBack && (
          <button
            onClick={onBack}
            className="btn-secondary"
            style={{
              padding: "0.9rem 1.25rem",
              borderRadius: 8,
              fontSize: "0.9rem",
            }}
          >
            <span>← Back</span>
          </button>
        )}
        <button
          onClick={onContinue}
          disabled={!stream || !goal}
          className="btn-primary"
          style={{
            flex: 1,
            padding: "0.9rem",
            fontSize: "1rem",
            borderRadius: 8,
          }}
        >
          <span>Proceed to Chapter Rating</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
