import { ArrowRight } from "lucide-react";

export default function MagicButton({ onClick, children, className = "", style = {} }) {
  return (
    <button
      onClick={onClick}
      className={`magic-btn-container ${className}`}
      style={{
        position: "relative",
        display: "inline-flex",
        height: "3.25rem",
        overflow: "hidden",
        borderRadius: 12,
        padding: "2px",
        cursor: "pointer",
        border: "none",
        background: "transparent",
        boxShadow: "0 0 25px -4px rgba(0, 223, 216, 0.4), 0 0 50px -10px rgba(139, 92, 246, 0.3)",
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease",
        ...style,
      }}
    >
      {/* Rapid 360 Conic Laser Spinner */}
      <span
        style={{
          position: "absolute",
          inset: "-150%",
          background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, #00DFD8 315deg, #A855F7 345deg, #FFFFFF 360deg)",
          animation: "spinBeam 2.8s linear infinite",
        }}
      />

      {/* Button Interior */}
      <span
        style={{
          display: "inline-flex",
          height: "100%",
          width: "100%",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          background: "#080808",
          padding: "0 2.25rem",
          fontSize: "1.05rem",
          fontWeight: 600,
          color: "#FFFFFF",
          gap: "0.65rem",
          backdropFilter: "blur(12px)",
          position: "relative",
          zIndex: 2,
          letterSpacing: "-0.01em",
        }}
      >
        <span>{children || "Start Free Analysis"}</span>
        <ArrowRight size={18} className="magic-btn-arrow" />
      </span>
    </button>
  );
}
