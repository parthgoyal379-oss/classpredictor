import { useEffect, useRef } from "react";
import { Activity } from "lucide-react";

export default function WaveformHUD() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let step = 0;

    const render = () => {
      const width = (canvas.width = canvas.offsetWidth || 280);
      const height = (canvas.height = canvas.offsetHeight || 46);

      ctx.clearRect(0, 0, width, height);

      // Wave 1: Electric Cyan Sine Wave
      ctx.beginPath();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = "rgba(0, 223, 216, 0.9)";
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * 0.035 + step) * 14 * Math.sin(x * 0.015);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Wave 2: Deep Violet Secondary Wave
      ctx.beginPath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.8)";
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.cos(x * 0.025 - step * 1.2) * 10 * Math.cos(x * 0.02);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      step += 0.055;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 10,
        background: "rgba(0, 0, 0, 0.65)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "0.85rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header with live pulse */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Activity size={14} style={{ color: "#00DFD8" }} />
          <span className="font-mono" style={{ fontSize: "0.72rem", color: "#EDEDED", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Telemetry Core
          </span>
        </div>
        <span
          className="font-mono"
          style={{
            fontSize: "0.65rem",
            color: "#10B981",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            padding: "2px 6px",
            borderRadius: 4,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span className="status-dot online" style={{ width: 5, height: 5 }} />
          LIVE MATRIX
        </span>
      </div>

      {/* Live Waveform Canvas */}
      <div style={{ height: "46px", width: "100%", position: "relative", marginBottom: "0.65rem" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      </div>

      {/* Telemetry Readout Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.45rem", textAlign: "center" }}>
        {[
          { label: "NODES", val: "34" },
          { label: "LATENCY", val: "12ms" },
          { label: "PREDICTION", val: "99.2%" },
        ].map(item => (
          <div key={item.label} style={{ background: "rgba(255, 255, 255, 0.03)", borderRadius: 6, padding: "0.3rem" }}>
            <div className="font-mono" style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFFFFF" }}>{item.val}</div>
            <div className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-tertiary)" }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
