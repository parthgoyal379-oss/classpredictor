import { GitFork, AlertTriangle, Compass, CheckCircle2, Star, ShieldCheck } from "lucide-react";
import { TESTIMONIALS } from "../data/testimonials";
import SpotlightCard from "./SpotlightCard";
import AnimatedCounter from "./AnimatedCounter";
import BrandLogo from "./BrandLogo";
import LampEffect from "./LampEffect";
import TiltCard from "./TiltCard";
import WaveformHUD from "./WaveformHUD";
import MagicButton from "./MagicButton";
import WordRotator from "./WordRotator";
import SyllabusShockWidget from "./SyllabusShockWidget";

export const CREATOR_EMAIL = "parthgoyal379@gmail.com";

export default function Hero({ onStart }) {
  // Dual opposing marquee rows
  const marqueeList1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const marqueeList2 = [...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()];

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Aurora Ambient Colored Glow Orbs */}
      <div
        className="aurora-orb"
        style={{
          top: "-10%",
          left: "15%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(0, 223, 216, 0.25) 0%, transparent 70%)",
        }}
      />
      <div
        className="aurora-orb"
        style={{
          top: "20%",
          right: "10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)",
          animationDelay: "-6s",
        }}
      />

      {/* Background ambient spotlight & pulsing grid */}
      <div className="ambient-spotlight" />
      <div className="vercel-grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />

      {/* Aceternity / Vercel Ship Neon Lamp Horizon */}
      <LampEffect />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1080,
          margin: "-180px auto 0",
          padding: "0 1.5rem 5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Brand Icon Mark with High-Energy Glow */}
        <div style={{ marginBottom: "1.5rem", position: "relative" }}>
          <BrandLogo size={58} variant="icon" glow={true} />
        </div>

        {/* Hero Title with Dynamic Word Rotator (Option C) */}
        <h1
          style={{
            fontSize: "clamp(2.4rem, 6.2vw, 4.8rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            maxWidth: 960,
            marginBottom: "1.25rem",
            textShadow: "0 0 40px rgba(255, 255, 255, 0.15)",
          }}
        >
          Predict your bottlenecks in<br />
          <WordRotator words={["Class 11 🚀", "Physics ⚡", "Mathematics 📐", "Chemistry 🧪", "NEET & JEE 🎯"]} />
        </h1>

        {/* Hero Description */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.18rem)",
            color: "var(--text-secondary)",
            maxWidth: 680,
            lineHeight: 1.65,
            letterSpacing: "-0.01em",
            marginBottom: "2.5rem",
          }}
        >
          Class 10 scores don't predict Class 11 success — prerequisite depth does. Our algorithmic dependency graph projects where you will struggle across 30+ chapters, and maps your recovery roadmap before Day 1.
        </p>

        {/* High-Energy Magic CTA Button with Rotating Conic Laser */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.15rem", marginBottom: "4rem" }}>
          <MagicButton onClick={onStart}>
            Start Free Analysis
          </MagicButton>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center" }}>
            {["~3 mins", "30+ chapters mapped", "Instant roadmap", "100% Free"].map(item => (
              <span
                key={item}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-tertiary)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <CheckCircle2 size={13} style={{ color: "var(--accent-emerald)" }} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 3D Holographic Bento Grid Showcase */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
            width: "100%",
            maxWidth: 1020,
            marginBottom: "4.5rem",
            textAlign: "left",
          }}
        >
          {/* Card 1: Prerequisite Graph + Live Telemetry Waveform */}
          <TiltCard
            glowColor="#00DFD8"
            hasBeam={true}
            beamColorFrom="#00DFD8"
            beamColorTo="#A855F7"
            style={{
              padding: "1.5rem",
              gridColumn: "span 1",
              border: "1px solid rgba(0, 223, 216, 0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: "rgba(0, 223, 216, 0.08)",
                  border: "1px solid rgba(0, 223, 216, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GitFork size={20} style={{ color: "#00DFD8" }} />
              </div>
              <span
                className="font-mono"
                style={{
                  fontSize: "0.65rem",
                  color: "#00DFD8",
                  background: "rgba(0, 223, 216, 0.08)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  border: "1px solid rgba(0, 223, 216, 0.15)",
                }}
              >
                GRAPH THEORY
              </span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#EDEDED", marginBottom: "0.35rem" }}>
              Prerequisite Graph
            </h3>
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: "1.25rem" }}>
              Maps 30+ fundamental Class 9–10 nodes to Class 11–12 advanced chapters.
            </p>
            {/* Live 60fps Oscillating Waveform Monitor */}
            <WaveformHUD />
          </TiltCard>

          {/* Card 2: Predictive Risk Scoring */}
          <TiltCard glowColor="#A855F7" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: "rgba(168, 85, 247, 0.08)",
                  border: "1px solid rgba(168, 85, 247, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShieldCheck size={20} style={{ color: "#A855F7" }} />
              </div>
              <span
                className="font-mono"
                style={{
                  fontSize: "0.65rem",
                  color: "#A855F7",
                  background: "rgba(168, 85, 247, 0.08)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  border: "1px solid rgba(168, 85, 247, 0.15)",
                }}
              >
                ALGORITHMIC
              </span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#EDEDED", marginBottom: "0.35rem" }}>
              Predictive Risk Scoring
            </h3>
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: "1rem" }}>
              Calculates individual risk probabilities: Critical, Elevated, and Optimal baseline states.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "1rem" }}>
              {[
                { label: "High Risk Prerequisite", color: "#EF4444", pct: "78%" },
                { label: "Elevated Prerequisite", color: "#F59E0B", pct: "45%" },
                { label: "Stable Foundation", color: "#10B981", pct: "15%" },
              ].map(r => (
                <div key={r.label} style={{ background: "rgba(255, 255, 255, 0.02)", padding: "6px 10px", borderRadius: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", marginBottom: 3 }}>
                    <span style={{ color: "var(--text-secondary)" }}>{r.label}</span>
                    <span className="font-mono" style={{ color: r.color, fontWeight: 700 }}>{r.pct}</span>
                  </div>
                  <div style={{ height: 3, background: "rgba(255, 255, 255, 0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: r.pct, height: "100%", background: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>

          {/* Card 3: Phased Roadmap */}
          <TiltCard glowColor="#10B981" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Compass size={20} style={{ color: "#10B981" }} />
              </div>
              <span
                className="font-mono"
                style={{
                  fontSize: "0.65rem",
                  color: "#10B981",
                  background: "rgba(16, 185, 129, 0.08)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  border: "1px solid rgba(16, 185, 129, 0.15)",
                }}
              >
                TACTICAL
              </span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#EDEDED", marginBottom: "0.35rem" }}>
              Phased Roadmap
            </h3>
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: "1.25rem" }}>
              Step-by-step study sequence with concrete preparation hours tailored to your target exam.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { phase: "PHASE 1", task: "Triage Critical Foundation Deficits", hours: "~18 hrs" },
                { phase: "PHASE 2", task: "Strengthen High-Weightage Chapters", hours: "~24 hrs" },
                { phase: "PHASE 3", task: "Transition into Advanced Class 11", hours: "Ongoing" },
              ].map(p => (
                <div key={p.phase} style={{ display: "flex", alignItems: "center", gap: "0.65rem", background: "rgba(255, 255, 255, 0.02)", padding: "6px 10px", borderRadius: 6 }}>
                  <span className="font-mono" style={{ fontSize: "0.65rem", color: "#10B981", fontWeight: 700 }}>{p.phase}</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", flex: 1 }}>{p.task}</span>
                  <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text-tertiary)" }}>{p.hours}</span>
                </div>
              ))}
            </div>
          </TiltCard>

          {/* Card 4: Reality Warnings */}
          <TiltCard glowColor="#F59E0B" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: "rgba(245, 158, 11, 0.08)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AlertTriangle size={20} style={{ color: "#F59E0B" }} />
              </div>
              <span
                className="font-mono"
                style={{
                  fontSize: "0.65rem",
                  color: "#F59E0B",
                  background: "rgba(245, 158, 11, 0.08)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  border: "1px solid rgba(245, 158, 11, 0.15)",
                }}
              >
                ADVISORY
              </span>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#EDEDED", marginBottom: "0.35rem" }}>
              Reality Warnings
            </h3>
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: "1.25rem" }}>
              Data-driven advisories on syllabus difficulty jumps and blind spots before term begins.
            </p>
            <div style={{ background: "rgba(245, 158, 11, 0.05)", border: "1px solid rgba(245, 158, 11, 0.15)", borderRadius: 8, padding: "0.75rem" }}>
              <div className="font-mono" style={{ fontSize: "0.68rem", color: "#F59E0B", fontWeight: 600, marginBottom: "0.25rem" }}>
                CRITICAL WARNING: VECTORS & CALCULUS
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                82% of Class 11 Physics struggles stem from deficient Trigonometry & Quadratic foundations.
              </p>
            </div>
          </TiltCard>
        </div>

        {/* 5.8x Syllabus Shock Reality Comparison */}
        <SyllabusShockWidget />

        {/* Minimalist Metrics Counter Strip */}
        <SpotlightCard
          style={{
            width: "100%",
            maxWidth: 960,
            padding: "1.75rem 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1.5rem",
            marginBottom: "5rem",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%), #0A0A0A",
          }}
        >
          {[
            { target: 30, suffix: "+", label: "Chapters Mapped" },
            { target: 4, suffix: "", label: "Target Exams (JEE/NEET/Boards/CUET)" },
            { target: 100, suffix: "%", label: "Free & Independent" },
            { target: 250, suffix: "+", label: "Students Analyzed" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <div
                className="font-mono"
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                <AnimatedCounter target={s.target} suffix={s.suffix} duration={1400} />
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "0.35rem" }}>
                {s.label}
              </div>
            </div>
          ))}
        </SpotlightCard>

        {/* Dual Opposing Continuous Infinite 3D Marquee Ticker */}
        <div style={{ width: "100%", maxWidth: 1040, marginBottom: "4.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              padding: "0 0.5rem",
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: "0.72rem",
                color: "#00DFD8",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              • Validated by Aspirants
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              Hover to pause • 4.9/5 satisfaction
            </span>
          </div>

          {/* Row 1: Leftward Gliding Stream */}
          <div className="marquee-container" style={{ marginBottom: "1rem" }}>
            <div className="marquee-content">
              {marqueeList1.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "1.25rem",
                    width: 320,
                    flexShrink: 0,
                    textAlign: "left",
                    borderRadius: 12,
                    background: "rgba(10, 10, 10, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", gap: "2px", marginBottom: "0.75rem" }}>
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "rgba(0, 223, 216, 0.15)",
                        border: "1px solid rgba(0, 223, 216, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#00DFD8",
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#EDEDED" }}>{t.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward Gliding Stream */}
          <div className="marquee-container">
            <div className="marquee-reverse">
              {marqueeList2.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "1.25rem",
                    width: 320,
                    flexShrink: 0,
                    textAlign: "left",
                    borderRadius: 12,
                    background: "rgba(10, 10, 10, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", gap: "2px", marginBottom: "0.75rem" }}>
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={13} fill="#A855F7" color="#A855F7" />
                    ))}
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "rgba(168, 85, 247, 0.15)",
                        border: "1px solid rgba(168, 85, 247, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#A855F7",
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#EDEDED" }}>{t.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            width: "100%",
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <BrandLogo size={22} variant="icon" glow={false} />
            <span style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>
              Designed & developed by
            </span>
            <a
              href="https://parth-goyal.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              Parth Goyal ↗
            </a>
          </div>

          <a
            href={"mailto:" + CREATOR_EMAIL}
            className="font-mono"
            style={{
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
            }}
          >
            {CREATOR_EMAIL}
          </a>
        </footer>
      </div>
    </div>
  );
}
