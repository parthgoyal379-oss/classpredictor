import { ArrowRight, X } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function NameModal({ nameInput, setNameInput, onProceed, onBack }) {
  const isValid = nameInput.trim().length >= 2;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      padding: "1.5rem",
    }}>
      <div className="vercel-card animate-fade-in" style={{
        maxWidth: 460,
        width: "100%",
        padding: "2rem",
        position: "relative",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
      }}>
        {/* Close Button */}
        <button
          onClick={onBack}
          className="btn-ghost"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            padding: "0.25rem",
          }}
        >
          <X size={18} />
        </button>

        <div style={{ marginBottom: "1.25rem" }}>
          <BrandLogo size={46} variant="icon" glow={true} />
        </div>

        <h2 style={{
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          marginBottom: "0.35rem",
        }}>
          What is your name?
        </h2>
        <p style={{
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          marginBottom: "1.5rem",
          lineHeight: 1.5,
        }}>
          We'll personalize your preparation risk report, dependency map, and tactical timeline.
        </p>

        <div style={{ position: "relative", marginBottom: "1.25rem" }}>
          <input
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && isValid) {
                onProceed();
              }
            }}
            placeholder="e.g. Parth Goyal"
            autoFocus
            style={{
              width: "100%",
              padding: "0.85rem 1rem",
              background: "#111111",
              border: "1px solid " + (isValid ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"),
              borderRadius: 8,
              color: "#FFFFFF",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
          />
          <span className="font-mono" style={{
            position: "absolute",
            right: "0.85rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "0.72rem",
            color: "var(--text-tertiary)",
            background: "rgba(255, 255, 255, 0.05)",
            padding: "2px 6px",
            borderRadius: 4,
            pointerEvents: "none",
          }}>
            ↵ Enter
          </span>
        </div>

        <button
          onClick={onProceed}
          disabled={!isValid}
          className="btn-primary"
          style={{ width: "100%", padding: "0.8rem", borderRadius: 8 }}
        >
          <span>Continue</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
