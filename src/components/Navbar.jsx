import { Shield, Activity } from "lucide-react";

export default function Navbar({ onOpenAdmin, onReset }) {
  return (
    <header className="glass-panel" style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      borderBottom: "1px solid var(--border)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    }}>
      <div style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "0.85rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Brand */}
        <div 
          onClick={onReset}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #FFFFFF 0%, #71717A 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000000",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
          }}>
            <Activity size={17} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
            }}>
              <span style={{
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}>
                ClassPredictor
              </span>
              <span className="font-mono" style={{
                fontSize: "0.65rem",
                color: "var(--text-tertiary)",
                background: "rgba(255,255,255,0.05)",
                padding: "1px 6px",
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                v2.0
              </span>
            </div>
            <p style={{
              fontSize: "0.68rem",
              color: "var(--text-secondary)",
              letterSpacing: "-0.01em",
            }}>
              Prerequisite Gap Engine
            </p>
          </div>
        </div>

        {/* Right Nav actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="pill-badge" style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <span className="status-dot online" />
            <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", letterSpacing: "0.02em" }}>
              FREE · NO LOGIN
            </span>
          </div>

          <div style={{ width: 1, height: 16, background: "var(--border)" }} />

          <button
            onClick={onOpenAdmin}
            className="btn-ghost"
            style={{
              padding: "0.35rem 0.65rem",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
            }}
            title="Admin Dashboard"
          >
            <Shield size={13} />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
