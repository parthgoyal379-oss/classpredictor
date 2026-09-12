import { ArrowRight, GitFork, AlertTriangle, Compass, CheckCircle2, Star, ShieldCheck } from "lucide-react";
import { TESTIMONIALS } from "../data/testimonials";
import SpotlightCard from "./SpotlightCard";
import AnimatedCounter from "./AnimatedCounter";
import BorderBeam from "./BorderBeam";
import BrandLogo from "./BrandLogo";

export const CREATOR_EMAIL = "parthgoyal379@gmail.com";

export default function Hero({ onStart }) {
  // Duplicate testimonials for continuous infinite marquee loop
  const marqueeList = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Aurora Ambient Colored Glow Orbs */}
      <div className="aurora-orb" style={{
        top: "-10%",
        left: "15%",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
      }} />
      <div className="aurora-orb" style={{
        top: "25%",
        right: "10%",
        width: "450px",
        height: "450px",
        background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
        animationDelay: "-6s",
      }} />

      {/* Background ambient spotlight & pulsing grid */}
      <div className="ambient-spotlight" />
      <div className="vercel-grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />

      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1040,
        margin: "0 auto",
        padding: "3.5rem 1.5rem 5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>
        {/* Brand Icon Mark */}
        <div style={{ marginBottom: "1.25rem" }}>
          <BrandLogo size={52} variant="icon" glow={true} />
        </div>


        {/* Hero Title with Shimmering Animated Gradient */}
        <h1 style={{
          fontSize: "clamp(2.5rem, 6.5vw, 4.8rem)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          color: "#FFFFFF",
          maxWidth: 880,
          marginBottom: "1.25rem",
        }}>
          Know exactly what<br />
          <span className="animated-gradient-text" style={{ display: "inline-block" }}>
            Class 11 will hit you with.
          </span>
        </h1>

        {/* Hero Description */}
        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "var(--text-secondary)",
          maxWidth: 620,
          lineHeight: 1.65,
          letterSpacing: "-0.01em",
          marginBottom: "2.5rem",
        }}>
          Rate your Class 9–10 foundations. Our algorithmic dependency graph projects which Class 11–12 chapters will bottleneck you — and maps precisely how to fix them.
        </p>

        {/* Primary CTA with Vercel hover glow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginBottom: "3.5rem" }}>
          <button
            onClick={onStart}
            className="btn-primary"
            style={{
              padding: "0.95rem 2.75rem",
              fontSize: "1.08rem",
              borderRadius: 10,
            }}
          >
            <span>Start Free Analysis</span>
            <ArrowRight size={18} />
          </button>
          
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center" }}>
            {["~3 mins", "30+ chapters mapped", "Instant roadmap", "100% Free"].map(item => (
              <span key={item} style={{
                fontSize: "0.75rem",
                color: "var(--text-tertiary)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}>
                <CheckCircle2 size={13} style={{ color: "var(--accent-emerald)" }} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bento Grid Feature Showcase with Border Beam on Primary Card */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "1rem",
          width: "100%",
          maxWidth: 960,
          marginBottom: "4.5rem",
          textAlign: "left",
        }}>
          {[
            {
              icon: <GitFork size={20} style={{ color: "var(--accent-blue)" }} />,
              title: "Prerequisite Graph",
              desc: "Maps 30+ fundamental Class 9–10 nodes to Class 11–12 advanced chapters.",
              tag: "Graph Theory",
              hasBeam: true,
            },
            {
              icon: <ShieldCheck size={20} style={{ color: "var(--accent-purple)" }} />,
              title: "Predictive Risk Scoring",
              desc: "Calculates individual risk probabilities: Critical, Elevated, and Optimal.",
              tag: "Algorithmic",
            },
            {
              icon: <Compass size={20} style={{ color: "var(--accent-emerald)" }} />,
              title: "Phased Roadmap",
              desc: "Step-by-step study sequence with concrete preparation hours tailored to your goal.",
              tag: "Tactical Plan",
            },
            {
              icon: <AlertTriangle size={20} style={{ color: "var(--accent-amber)" }} />,
              title: "Reality Warnings",
              desc: "Data-driven advisories on syllabus jumps and blind spots before term begins.",
              tag: "Early Warning",
            },
          ].map(f => (
            <SpotlightCard key={f.title} style={{ padding: "1.35rem", position: "relative" }}>
              {f.hasBeam && <BorderBeam size={160} duration={6} colorFrom="#38BDF8" colorTo="#A855F7" />}

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
                position: "relative",
                zIndex: 2,
              }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {f.icon}
                </div>
                <span className="font-mono" style={{
                  fontSize: "0.65rem",
                  color: "var(--text-tertiary)",
                  background: "rgba(255, 255, 255, 0.03)",
                  padding: "2px 6px",
                  borderRadius: 4,
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}>
                  {f.tag}
                </span>
              </div>
              <h3 style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#EDEDED",
                marginBottom: "0.35rem",
                letterSpacing: "-0.01em",
                position: "relative",
                zIndex: 2,
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: "0.78rem",
                color: "var(--text-secondary)",
                lineHeight: 1.55,
                position: "relative",
                zIndex: 2,
              }}>
                {f.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>

        {/* Minimalist Metrics Counter with Animated Count-Up */}
        <SpotlightCard style={{
          width: "100%",
          maxWidth: 880,
          padding: "1.75rem 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1.5rem",
          marginBottom: "4.5rem",
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.005) 100%), #0A0A0A",
        }}>
          {[
            { target: 30, suffix: "+", label: "Chapters Mapped" },
            { target: 4, suffix: "", label: "Target Exams (JEE/NEET/Boards/CUET)" },
            { target: 100, suffix: "%", label: "Free & Independent" },
            { target: 250, suffix: "+", label: "Students Analyzed" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <div className="font-mono" style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}>
                <AnimatedCounter target={s.target} suffix={s.suffix} duration={1400} />
              </div>
              <div style={{
                fontSize: "0.72rem",
                color: "var(--text-secondary)",
                marginTop: "0.35rem",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </SpotlightCard>

        {/* Continuous Infinite Marquee Testimonials Ticker */}
        <div style={{ width: "100%", maxWidth: 1000, marginBottom: "4rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.25rem",
            padding: "0 0.5rem",
          }}>
            <span className="font-mono" style={{
              fontSize: "0.72rem",
              color: "var(--text-tertiary)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Validated by Aspirants
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              Hover to pause • 4.9/5 satisfaction
            </span>
          </div>

          {/* Marquee Ticker */}
          <div className="marquee-container">
            <div className="marquee-content">
              {marqueeList.map((t, idx) => (
                <SpotlightCard
                  key={idx}
                  style={{
                    padding: "1.25rem",
                    width: 320,
                    flexShrink: 0,
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", gap: "2px", marginBottom: "0.75rem", position: "relative", zIndex: 2 }}>
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <p style={{
                    fontSize: "0.82rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "1rem",
                    position: "relative",
                    zIndex: 2,
                  }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", position: "relative", zIndex: 2 }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#EDEDED" }}>
                        {t.name}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
                        {t.role}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          width: "100%",
          paddingTop: "2.5rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
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
