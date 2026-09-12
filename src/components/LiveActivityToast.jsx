import { useState, useEffect } from "react";
import { X } from "lucide-react";

const RECENT_ACTIVITIES = [
  { city: "Kota", stream: "PCM", goal: "JEE 2027", ago: "14s ago" },
  { city: "Delhi", stream: "PCB", goal: "NEET Target", ago: "28s ago" },
  { city: "Hyderabad", stream: "PCM", goal: "JEE Advanced", ago: "45s ago" },
  { city: "Bangalore", stream: "PCM", goal: "CUET / Boards", ago: "1m ago" },
  { city: "Mumbai", stream: "PCB", goal: "NEET 2026", ago: "2m ago" },
  { city: "Jaipur", stream: "PCM", goal: "JEE 2027", ago: "3m ago" },
];

export default function LiveActivityToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % RECENT_ACTIVITIES.length);
        setVisible(true);
      }, 400);
    }, 15000);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = RECENT_ACTIVITIES[index];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        zIndex: 90,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          background: "rgba(10, 10, 10, 0.88)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          padding: "0.55rem 0.85rem 0.55rem 0.75rem",
          borderRadius: 9999,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 0 15px -3px rgba(0, 223, 216, 0.15)",
        }}
      >
        <span className="status-dot online" style={{ width: 6, height: 6, flexShrink: 0 }} />

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem" }}>
          <span style={{ color: "#FFFFFF", fontWeight: 600 }}>Aspirant in {current.city}</span>
          <span style={{ color: "var(--text-tertiary)" }}>analyzed</span>
          <span
            className="font-mono"
            style={{
              fontSize: "0.68rem",
              color: "#00DFD8",
              background: "rgba(0, 223, 216, 0.1)",
              padding: "1px 5px",
              borderRadius: 3,
            }}
          >
            {current.stream} · {current.goal}
          </span>
          <span style={{ color: "var(--text-tertiary)", fontSize: "0.7rem" }}>• {current.ago}</span>
        </div>

        <button
          onClick={() => setDismissed(true)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-tertiary)",
            cursor: "pointer",
            padding: "2px",
            display: "flex",
            alignItems: "center",
          }}
          title="Dismiss"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
