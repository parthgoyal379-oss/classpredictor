import { useState } from "react";
import { Shield, Key, ArrowLeft, Users, MessageSquare, Star } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function AdminDashboard({
  statsData,
  onClose,
  adminUnlocked,
  adminPass,
  setAdminPass,
  onUnlock,
}) {
  const [activeTab, setActiveTab] = useState("responses");

  const avgStars = statsData.feedback && statsData.feedback.length > 0
    ? (statsData.feedback.reduce((s, f) => s + f.rating, 0) / statsData.feedback.length).toFixed(1)
    : "—";

  return (
    <div className="animate-fade-in" style={{
      maxWidth: 960,
      margin: "0 auto",
      padding: "2rem 1.5rem 5rem",
    }}>
      {/* Top Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "2rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <BrandLogo size={36} variant="icon" glow={true} />
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "var(--accent-red)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Shield size={18} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#FFFFFF" }}>
                Admin Operations
              </h2>
              <span className="font-mono" style={{
                fontSize: "0.65rem",
                color: "var(--accent-red)",
                background: "rgba(239, 68, 68, 0.1)",
                padding: "1px 6px",
                borderRadius: 4,
              }}>
                RESTRICTED
              </span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              Direct database telemetry & student feedback logs
            </p>
          </div>
        </div>

        <button onClick={onClose} className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.8rem" }}>
          <ArrowLeft size={14} />
          <span>Exit Admin</span>
        </button>
      </div>

      {/* If Not Unlocked */}
      {!adminUnlocked ? (
        <div className="vercel-card" style={{ maxWidth: 400, margin: "3rem auto", padding: "2rem", textAlign: "center" }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
            color: "#FFFFFF",
          }}>
            <Key size={20} />
          </div>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "0.35rem" }}>
            Enter Security Key
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            This workspace contains private response analytics.
          </p>

          <input
            type="password"
            value={adminPass}
            onChange={e => setAdminPass(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") onUnlock();
            }}
            placeholder="Enter passphrase..."
            autoFocus
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              background: "#111111",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "#FFFFFF",
              fontSize: "0.95rem",
              outline: "none",
              marginBottom: "1rem",
              fontFamily: "monospace",
            }}
          />

          <button
            onClick={onUnlock}
            className="btn-primary"
            style={{ width: "100%", padding: "0.75rem", borderRadius: 8 }}
          >
            Authenticate
          </button>
        </div>
      ) : (
        /* If Authenticated Dashboard */
        <div className="animate-fade-in">
          {/* Analytics Summary Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0.85rem",
            marginBottom: "2rem",
          }}>
            {[
              { label: "Total Diagnoses", val: statsData.total || 0, icon: <Users size={16} />, col: "#FFFFFF" },
              { label: "Feedbacks Received", val: (statsData.feedback || []).length, icon: <MessageSquare size={16} />, col: "var(--accent-emerald)" },
              { label: "Average Star Rating", val: avgStars !== "—" ? `${avgStars} ★` : "—", icon: <Star size={16} />, col: "var(--accent-amber)" },
            ].map(stat => (
              <div key={stat.label} className="vercel-card" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", color: "var(--text-secondary)" }}>
                  <span style={{ fontSize: "0.82rem" }}>{stat.label}</span>
                  {stat.icon}
                </div>
                <div className="font-mono" style={{ fontSize: "1.85rem", fontWeight: 700, color: stat.col }}>
                  {stat.val}
                </div>
              </div>
            ))}
          </div>

          {/* Tab Switcher */}
          <div style={{
            display: "flex",
            gap: "0.5rem",
            borderBottom: "1px solid var(--border)",
            marginBottom: "1.5rem",
            paddingBottom: "0.5rem",
          }}>
            <button
              onClick={() => setActiveTab("responses")}
              className="btn-ghost"
              style={{
                color: activeTab === "responses" ? "#FFFFFF" : "var(--text-secondary)",
                fontWeight: activeTab === "responses" ? 600 : 400,
                borderBottom: activeTab === "responses" ? "2px solid #FFFFFF" : "2px solid transparent",
                borderRadius: 0,
                padding: "0.5rem 0.85rem",
              }}
            >
              Responses ({(statsData.responses || []).length})
            </button>
            <button
              onClick={() => setActiveTab("feedbacks")}
              className="btn-ghost"
              style={{
                color: activeTab === "feedbacks" ? "#FFFFFF" : "var(--text-secondary)",
                fontWeight: activeTab === "feedbacks" ? 600 : 400,
                borderBottom: activeTab === "feedbacks" ? "2px solid #FFFFFF" : "2px solid transparent",
                borderRadius: 0,
                padding: "0.5rem 0.85rem",
              }}
            >
              User Feedbacks ({(statsData.feedback || []).length})
            </button>
          </div>

          {/* Responses Table */}
          {activeTab === "responses" && (
            <div className="vercel-card" style={{ overflow: "hidden" }}>
              {(statsData.responses || []).length === 0 ? (
                <div style={{ padding: "2.5rem", textAlign: "center", color: "var(--text-tertiary)", fontSize: "0.85rem" }}>
                  No responses recorded yet in Firestore.
                </div>
              ) : (
                <div style={{ display: "grid" }}>
                  {[...(statsData.responses || [])].reverse().slice(0, 25).map((r, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "0.85rem 1.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: idx < 24 ? "1px solid rgba(255, 255, 255, 0.04)" : "none",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                      }}
                    >
                      <div>
                        <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#EDEDED" }}>
                          {r.name}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginLeft: "0.5rem" }}>
                          {r.stream} · {r.goal}
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span className="font-mono" style={{
                          fontSize: "0.68rem",
                          color: "var(--accent-red)",
                          background: "rgba(239, 68, 68, 0.1)",
                          padding: "2px 6px",
                          borderRadius: 4,
                        }}>
                          {r.highRisk} HIGH
                        </span>
                        <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
                          {r.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Feedbacks Table */}
          {activeTab === "feedbacks" && (
            <div className="vercel-card" style={{ overflow: "hidden" }}>
              {(statsData.feedback || []).length === 0 ? (
                <div style={{ padding: "2.5rem", textAlign: "center", color: "var(--text-tertiary)", fontSize: "0.85rem" }}>
                  No feedback submissions recorded yet.
                </div>
              ) : (
                <div style={{ display: "grid" }}>
                  {[...(statsData.feedback || [])].reverse().slice(0, 25).map((f, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "1rem 1.25rem",
                        borderBottom: idx < 24 ? "1px solid rgba(255, 255, 255, 0.04)" : "none",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#EDEDED" }}>
                          {f.name}
                        </span>
                        <div style={{ display: "flex", gap: "2px" }}>
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={13} fill={s <= f.rating ? "#F59E0B" : "none"} color={s <= f.rating ? "#F59E0B" : "#444444"} />
                          ))}
                        </div>
                      </div>

                      {f.text && (
                        <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "0.35rem" }}>
                          "{f.text}"
                        </p>
                      )}

                      <div className="font-mono" style={{ fontSize: "0.68rem", color: "var(--text-tertiary)" }}>
                        {f.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
