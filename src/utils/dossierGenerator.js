// ─────────────────────────────────────────────────────────────
// High-Resolution Diagnostic Dossier Generator
// Renders client-side 1200x675 PNG using HTML5 Offscreen Canvas
// ─────────────────────────────────────────────────────────────

export const generateDiagnosticDossier = async ({ studentName, stream, goal, results }) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 675;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { stats, highRiskChapters = [] } = results;

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 675);
  bgGrad.addColorStop(0, "#030712");
  bgGrad.addColorStop(0.5, "#000000");
  bgGrad.addColorStop(1, "#0A0D14");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 675);

  // Subtle coordinate grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 1;
  for (let x = 0; x < 1200; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 675);
    ctx.stroke();
  }
  for (let y = 0; y < 675; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // Corner neon ambient spotlights
  const cyanGlow = ctx.createRadialGradient(100, 100, 10, 100, 100, 350);
  cyanGlow.addColorStop(0, "rgba(0, 223, 216, 0.18)");
  cyanGlow.addColorStop(1, "transparent");
  ctx.fillStyle = cyanGlow;
  ctx.fillRect(0, 0, 600, 400);

  const purpleGlow = ctx.createRadialGradient(1100, 100, 10, 1100, 100, 350);
  purpleGlow.addColorStop(0, "rgba(168, 85, 247, 0.18)");
  purpleGlow.addColorStop(1, "transparent");
  ctx.fillStyle = purpleGlow;
  ctx.fillRect(600, 0, 600, 400);

  // Outer border
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, 1140, 615);

  // Brand Logo Glyph & Wordmark
  ctx.fillStyle = "#00DFD8";
  ctx.font = "bold 26px Geist, system-ui, sans-serif";
  ctx.fillText("CLASSPREDICTOR", 65, 80);

  ctx.fillStyle = "#888888";
  ctx.font = "13px 'Geist Mono', monospace";
  ctx.fillText("PREREQUISITE GAP INTELLIGENCE ENGINE • ASSESSMENT DOSSIER", 65, 104);

  // Status Badge
  ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
  ctx.fillStyle = "rgba(16, 185, 129, 0.1)";
  ctx.beginPath();
  ctx.roundRect(960, 58, 175, 34, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#10B981";
  ctx.font = "bold 12px 'Geist Mono', monospace";
  ctx.fillText("● AUDIT CERTIFIED", 990, 80);

  // Student Title Strip
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 36px Geist, system-ui, sans-serif";
  ctx.fillText(studentName || "Class 11 Aspirant", 65, 175);

  ctx.fillStyle = "#888888";
  ctx.font = "15px Geist, system-ui, sans-serif";
  ctx.fillText(`Stream: ${stream} Curriculum   |   Target Exam: ${goal}   |   Date: ${new Date().toLocaleDateString()}`, 65, 205);

  // Metrics Bento Blocks
  const metrics = [
    { label: "CRITICAL RISK", val: stats.highCnt, color: "#EF4444", bg: "rgba(239, 68, 68, 0.08)" },
    { label: "ELEVATED RISK", val: stats.medCnt, color: "#F59E0B", bg: "rgba(245, 158, 11, 0.08)" },
    { label: "OPTIMAL FOUNDATION", val: stats.lowCnt, color: "#10B981", bg: "rgba(16, 185, 129, 0.08)" },
    { label: "EST. STUDY DEFICIT", val: `~${stats.totalH}h`, color: "#00DFD8", bg: "rgba(0, 223, 216, 0.08)" },
  ];

  metrics.forEach((m, idx) => {
    const cardX = 65 + idx * 272;
    const cardY = 235;

    ctx.fillStyle = m.bg;
    ctx.strokeStyle = `${m.color}44`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, 255, 95, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = m.color;
    ctx.font = "bold 11px 'Geist Mono', monospace";
    ctx.fillText(m.label, cardX + 18, cardY + 30);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 32px 'Geist Mono', monospace";
    ctx.fillText(String(m.val), cardX + 18, cardY + 72);
  });

  // Top Bottlenecks Section
  ctx.fillStyle = "#EDEDED";
  ctx.font = "bold 18px Geist, system-ui, sans-serif";
  ctx.fillText("Primary Class 11 Prerequisite Vulnerabilities", 65, 375);

  const bottlenecks = highRiskChapters.slice(0, 3);
  if (bottlenecks.length === 0) {
    ctx.fillStyle = "#888888";
    ctx.font = "14px Geist, system-ui, sans-serif";
    ctx.fillText("No severe bottlenecks identified. Foundational ratings show strong conceptual mastery.", 65, 415);
  } else {
    bottlenecks.forEach((b, idx) => {
      const bY = 405 + idx * 60;

      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.beginPath();
      ctx.roundRect(65, bY, 1070, 48, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#EF4444";
      ctx.font = "bold 12px 'Geist Mono', monospace";
      ctx.fillText(`[RISK ${idx + 1}]`, 85, bY + 29);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "600 15px Geist, system-ui, sans-serif";
      ctx.fillText(b.name, 175, bY + 29);

      ctx.fillStyle = "#888888";
      ctx.font = "13px Geist, system-ui, sans-serif";
      ctx.fillText(`Subject: ${b.subject || stream}   •   Impact: High exam weightage`, 720, bY + 29);
    });
  }

  // Footer Watermark & Verification
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  ctx.moveTo(65, 595);
  ctx.lineTo(1135, 595);
  ctx.stroke();

  ctx.fillStyle = "#555555";
  ctx.font = "12px 'Geist Mono', monospace";
  ctx.fillText("ALGORITHMIC PREREQUISITE DIAGNOSTIC • ENGINE v2.5-PRO", 65, 622);

  ctx.fillStyle = "#888888";
  ctx.font = "12px Geist, system-ui, sans-serif";
  ctx.fillText("Engineered by Parth Goyal (parthgoyal379@gmail.com) • parth-goyal.vercel.app", 650, 622);

  // Trigger browser download
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = `ClassPredictor_Dossier_${(studentName || "Student").replace(/\s+/g, "_")}.png`;
  link.href = dataUrl;
  link.click();
};
