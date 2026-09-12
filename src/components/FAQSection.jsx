import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { playClick } from "../utils/audio";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Why do 95%+ Class 10 board toppers score below 50% in their first Class 11 coaching tests?",
      a: "Class 10 board examinations reward linear textbook recall and predictable formula substitution. Class 11 competitive curricula (JEE & NEET) demand multi-concept synthesis under negative marking. When a single question requires vectors, quadratics, and trigonometry simultaneously, fragile prerequisites cause an immediate cognitive freeze.",
    },
    {
      q: "How does the dependency graph algorithm calculate my risk and study deficit?",
      a: "Our algorithm uses a directed acyclic graph (DAG) mapping 30+ fundamental Class 9–10 concepts to Class 11–12 syllabus nodes. Each dependency edge carries calibrated cognitive transfer weights and difficulty multipliers. If you have weak trigonometry, the engine projects downstream cascade friction in Rotational Dynamics, Calculus, and Electrodynamics, computing precise hours needed for remediation.",
    },
    {
      q: "Can I calibrate this for JEE, NEET, and CBSE Boards simultaneously?",
      a: "Yes. You can re-run or calibrate your profile for any stream and target (JEE, NEET, CUET, or Class 12 Boards). The engine dynamically adjusts chapter weightage matrices — for instance, Human Physiology carries massive weightage in NEET, whereas Calculus dominates JEE.",
    },
    {
      q: "Is ClassPredictor truly 100% free with zero coaching spam?",
      a: "100% free and open. Engineered by Parth Goyal as an independent educational intelligence tool. We do not sell student phone numbers to coaching sales telemarketers, and there are no hidden paywalls. Your diagnostic dossier and remediation checklist are instantly accessible in your browser.",
    },
  ];

  const toggle = (idx) => {
    playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div style={{ width: "100%", maxWidth: 960, marginBottom: "5rem", textAlign: "left" }}>
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.5rem" }}>
          <HelpCircle size={15} style={{ color: "#00DFD8" }} />
          <span className="font-mono" style={{ fontSize: "0.72rem", color: "#00DFD8", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>
            • CLARITY & METHODOLOGY
          </span>
        </div>
        <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.03em", marginBottom: "0.4rem" }}>
          Frequently Asked Questions
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto" }}>
          Everything parents and students need to know about prerequisite gap diagnosis.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="vercel-card"
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: isOpen ? "1px solid rgba(0, 223, 216, 0.35)" : "1px solid var(--border)",
                background: isOpen ? "rgba(255, 255, 255, 0.03)" : "rgba(10, 10, 10, 0.8)",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <button
                onClick={() => toggle(idx)}
                style={{
                  width: "100%",
                  padding: "1.15rem 1.35rem",
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "0.92rem", fontWeight: 600, color: isOpen ? "#FFFFFF" : "#EDEDED", lineHeight: 1.45 }}>
                  {faq.q}
                </span>
                <div
                  style={{
                    color: isOpen ? "#00DFD8" : "var(--text-tertiary)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  <ChevronDown size={18} />
                </div>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: "0 1.35rem 1.25rem",
                    fontSize: "0.84rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                    borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                    paddingTop: "0.85rem",
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
