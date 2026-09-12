import { Award, TrendingUp } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function TopperBenchmark({ results, stream, goal }) {
  if (!results) return null;
  const { stats } = results;

  const total = stats.total || 1;
  const studentScore = Math.min(100, Math.max(15, Math.round(((stats.lowCnt * 1.0 + stats.medCnt * 0.4) / total) * 100)));
  const topperScore = 92;

  const getStatusColor = (score) => {
    if (score < 50) return "#EF4444";
    if (score < 75) return "#F59E0B";
    return "#10B981";
  };

  const statusColor = getStatusColor(studentScore);

  // SVG circle calculation
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (studentScore / 100) * circumference;

  return (
    <SpotlightCard
      className="mobile-card-p"
      style={{
        padding: "1.5rem",
        marginBottom: "2rem",
        background: "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.008) 100%), #0A0A0A",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(0, 223, 216, 0.1)",
              border: "1px solid rgba(0, 223, 216, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00DFD8",
            }}
          >
            <TrendingUp size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF" }}>
              Foundation Health Benchmark
            </h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              Comparing your prerequisite readiness against 99th-percentile {stream} ({goal}) aspirants
            </p>
          </div>
        </div>

        <span
          className="font-mono"
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: statusColor,
            background: `${statusColor}1A`,
            border: `1px solid ${statusColor}44`,
            padding: "3px 8px",
            borderRadius: 6,
          }}
        >
          {studentScore >= 75 ? "ELITE READINESS" : studentScore >= 50 ? "MODERATE VULNERABILITY" : "CRITICAL REMEDIATION NEEDED"}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "1.5rem", alignItems: "center" }}>
        {/* Circular SVG Meter */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", width: 110, height: 110, flexShrink: 0 }}>
            <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: "rotate(-90deg)" }}>
              {/* Background track */}
              <circle
                cx="55"
                cy="55"
                r={radius}
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="9"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="55"
                cy="55"
                r={radius}
                fill="transparent"
                stroke={statusColor}
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="font-mono" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>
                {studentScore}%
              </span>
              <span style={{ fontSize: "0.6rem", color: "var(--text-tertiary)", marginTop: 2 }}>
                READINESS
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#EDEDED", marginBottom: "0.25rem" }}>
              Diagnostic Health Rating
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
              {studentScore < 60
                ? "Your preparation gap indicates high vulnerability in Class 11 calculus & mechanics."
                : "Good core foundations with specific isolated chapter bottlenecks to patch."}
            </p>
          </div>
        </div>

        {/* Comparative Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {/* Student Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: 5 }}>
              <span style={{ color: "#EDEDED", fontWeight: 500 }}>Your Foundation Score</span>
              <span className="font-mono" style={{ color: statusColor, fontWeight: 700 }}>{studentScore}%</span>
            </div>
            <div style={{ height: 8, background: "rgba(255, 255, 255, 0.08)", borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${studentScore}%`,
                  background: statusColor,
                  borderRadius: 4,
                  transition: "width 1s ease",
                }}
              />
            </div>
          </div>

          {/* Topper Benchmark Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: 5 }}>
              <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
                <Award size={13} style={{ color: "#00DFD8" }} />
                99th-Percentile Benchmark ({goal})
              </span>
              <span className="font-mono" style={{ color: "#00DFD8", fontWeight: 700 }}>{topperScore}%</span>
            </div>
            <div style={{ height: 8, background: "rgba(255, 255, 255, 0.08)", borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${topperScore}%`,
                  background: "linear-gradient(90deg, #00DFD8, #A855F7)",
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
