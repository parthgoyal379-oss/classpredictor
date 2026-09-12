import { Shield, Volume2, VolumeX, Search } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { playClick } from "../utils/audio";

export default function Navbar({
  onOpenAdmin,
  onReset,
  onOpenPalette,
  soundEnabled = true,
  onToggleSound,
}) {
  return (
    <header
      className="glass-panel"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
      }}
    >
      <div
        className="mobile-compact-p"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0.85rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <div
          onClick={() => {
            playClick();
            onReset();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <BrandLogo size={32} variant="icon" glow={true} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                }}
              >
                ClassPredictor
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: "0.65rem",
                  color: "#00DFD8",
                  background: "rgba(0, 223, 216, 0.08)",
                  padding: "1px 6px",
                  borderRadius: 4,
                  border: "1px solid rgba(0, 223, 216, 0.15)",
                }}
              >
                v2.5
              </span>
            </div>
            <p className="mobile-hide-text" style={{ fontSize: "0.68rem", color: "var(--text-secondary)", letterSpacing: "-0.01em" }}>
              Prerequisite Gap Engine
            </p>
          </div>
        </div>

        {/* Right Nav actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          {/* Quick Cmd+K Search Pill */}
          <button
            onClick={() => {
              playClick();
              onOpenPalette?.();
            }}
            className="btn-ghost"
            style={{
              padding: "0.35rem 0.55rem",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 6,
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              cursor: "pointer",
            }}
            title="Open Command Palette (Ctrl+K or Cmd+K)"
          >
            <Search size={14} style={{ color: "#00DFD8" }} />
            <span className="mobile-hide-text" style={{ fontSize: "0.75rem" }}>Search</span>
            <kbd
              className="mobile-hide-text"
              style={{
                fontSize: "0.65rem",
                background: "rgba(255, 255, 255, 0.08)",
                padding: "1px 4px",
                borderRadius: 3,
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontFamily: "'Geist Mono', monospace",
              }}
            >
              ⌘K
            </kbd>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              playClick();
              onToggleSound?.();
            }}
            className="btn-ghost"
            style={{
              padding: "0.35rem 0.5rem",
              color: soundEnabled ? "#10B981" : "var(--text-tertiary)",
              background: soundEnabled ? "rgba(16, 185, 129, 0.06)" : "transparent",
              border: soundEnabled ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid transparent",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
            title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span className="mobile-hide-text" style={{ fontSize: "0.7rem", fontFamily: "'Geist Mono', monospace" }}>
              {soundEnabled ? "SFX" : "MUTED"}
            </span>
          </button>

          <div style={{ width: 1, height: 16, background: "var(--border)" }} />

          {/* Admin Lock */}
          <button
            onClick={() => {
              playClick();
              onOpenAdmin();
            }}
            className="btn-ghost"
            style={{
              padding: "0.35rem 0.55rem",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
            title="Admin Dashboard"
          >
            <Shield size={14} />
            <span className="mobile-hide-text">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
