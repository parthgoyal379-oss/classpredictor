import { ArrowRight, GitFork, AlertTriangle, Compass, CheckCircle2, Star, ShieldCheck } from "lucide-react";
import { TESTIMONIALS } from "../data/testimonials";

export const CREATOR_EMAIL = "parthgoyal379@gmail.com";

export default function Hero({ onStart }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background ambient spotlight & grid */}
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
        {/* Creator Pill Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.3rem 0.85rem",
          borderRadius: 9999,
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          marginBottom: "1.75rem",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}>
          <div style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #F59E0B, #EF4444)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.62rem",
            fontWeight: 700,
            color: "#FFFFFF",
          }}>
            P
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            Engineered by <strong style={{ color: "#EDEDED", fontWeight: 600 }}>Parth Goyal</strong>
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--accent-amber)" }}>
            JEE · NEET · Boards · CUET
          </span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: "clamp(2.5rem, 6.5vw, 4.8rem)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          color: "#FFFFFF",
          maxWidth: 860,
          marginBottom: "1.25rem",
        }}>
          Know exactly what<br />
          <span style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
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
          marginBottom: "2.25rem",
        }}>
          Rate your Class 9–10 foundations. Our algorithmic dependency graph projects which Class 11–12 chapters will bottleneck you — and maps precisely how to fix them.
        </p>

        {/* Primary CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem", marginBottom: "3rem" }}>
          <button
            onClick={onStart}
            className="btn-primary"
            style={{
              padding: "0.9rem 2.5rem",
              fontSize: "1.05rem",
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

        {/* Bento Grid Feature Showcase */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "1rem",
          width: "100%",
          maxWidth: 960,
          marginBottom: "4rem",
          textAlign: "left",
        }}>
          {[
            {
              icon: <GitFork size={20} style={{ color: "var(--accent-blue)" }} />,
              title: "Prerequisite Graph",
              desc: "Maps 30+ fundamental Class 9–10 nodes to Class 11–12 advanced chapters.",
              tag: "Graph Theory",
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
            <div key={f.title} className="vercel-card" style={{ padding: "1.35rem" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
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
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: "0.78rem",
                color: "var(--text-secondary)",
                lineHeight: 1.55,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Minimalist Metrics Counter */}
        <div className="vercel-card" style={{
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
            { val: "30+", label: "Chapters Mapped" },
            { val: "4", label: "Target Exams (JEE/NEET/Boards/CUET)" },
            { val: "100%", label: "Free & Independent" },
            { val: "250+", label: "Students Analyzed" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="font-mono" style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}>
                {s.val}
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
        </div>

        {/* Student Testimonials */}
        <div style={{ width: "100%", maxWidth: 960, marginBottom: "4rem" }}>
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
              Validated by Students
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              Average 4.9/5 from 40+ reviews
            </span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
            textAlign: "left",
          }}>
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="vercel-card" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "0.75rem" }}>
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p style={{
                  fontSize: "0.82rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
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
              </div>
            ))}
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
