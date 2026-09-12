import { ADVANCED, STREAM_SUBJECTS, FOUNDATION } from "../data/chapters";

export function getTip(ch, goal) {
  return (ch.tips && ch.tips[goal]) ? ch.tips[goal] : (ch.tip || "");
}

export function calcRisk(ch, ratings) {
  let wsum = 0;
  let tot = 0;
  const gaps = [];
  ch.prereqs.forEach(({ id, w }) => {
    const r = ratings[id];
    if (r == null) return;
    wsum += r * w;
    tot += w;
    if (r >= 3.5 && ch.gaps[id]) gaps.push({ id, r, reason: ch.gaps[id] });
  });
  if (tot === 0) return null;
  const raw = wsum / tot;
  const score = raw * ch.cx;
  const risk = score < 2.3 ? "LOW" : score < 3.3 ? "MEDIUM" : "HIGH";
  const mul = risk === "HIGH" ? 1.6 : risk === "MEDIUM" ? 1.2 : 0.85;
  return { ...ch, score, risk, gaps, studyH: Math.round(ch.bH * mul) };
}

export function runAnalysis(ratings, stream, goal) {
  const subjects = (STREAM_SUBJECTS[stream] || []).filter(s => s !== "core_maths");

  const chapters = ADVANCED.filter(ch => {
    if (!subjects.includes(ch.subj)) return false;
    if (goal === "NEET" && ch.wt.NEET === "NA") return false;
    if (goal === "JEE" && ch.wt.JEE === "NA") return false;
    return true;
  });

  const res = chapters.map(ch => calcRisk(ch, ratings)).filter(Boolean);
  const rOrd = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  res.sort((a, b) => rOrd[a.risk] - rOrd[b.risk] || b.score - a.score);

  const highCnt = res.filter(c => c.risk === "HIGH").length;
  const medCnt = res.filter(c => c.risk === "MEDIUM").length;
  const lowCnt = res.filter(c => c.risk === "LOW").length;
  const totalH = res.reduce((s, c) => s + c.studyH, 0);

  // Phased Roadmap
  const roadmap = [];
  const weakFnd = [];
  subjects.forEach(sub => {
    (FOUNDATION[sub] || []).forEach(ch => {
      if ((ratings[ch.id] || 0) >= 4) weakFnd.push(ch.name);
    });
  });
  if (weakFnd.length) {
    roadmap.push({
      phase: "PHASE 1",
      title: "Foundation Repair — Address Before Class 11 Commences",
      col: "#EF4444",
      tag: "Urgent",
      items: weakFnd.slice(0, 6).map(n => ({ label: "Reinforce: " + n, time: "3–5 hrs" })),
    });
  }

  const h11 = res.filter(c => c.risk === "HIGH" && c.cls === 11).slice(0, 5);
  const m11 = res.filter(c => c.risk === "MEDIUM" && c.cls === 11).slice(0, 5);
  const h12 = res.filter(c => c.risk === "HIGH" && c.cls === 12).slice(0, 5);
  const m12 = res.filter(c => c.risk === "MEDIUM" && c.cls === 12).slice(0, 5);

  if (h11.length) {
    roadmap.push({
      phase: "PHASE 2",
      title: "Class 11 High-Risk Core Topics",
      col: "#F97316",
      tag: "Priority 1",
      items: h11.map(c => ({ label: c.name, detail: getTip(c, goal), time: c.studyH + " hrs" })),
    });
  }
  if (m11.length) {
    roadmap.push({
      phase: "PHASE 3",
      title: "Class 11 Medium-Risk Chapters",
      col: "#F59E0B",
      tag: "Priority 2",
      items: m11.map(c => ({ label: c.name, detail: getTip(c, goal), time: c.studyH + " hrs" })),
    });
  }
  if (h12.length) {
    roadmap.push({
      phase: "PHASE 4",
      title: "Class 12 High-Impact Long-Term Preparation",
      col: "#A855F7",
      tag: "Forward Plan",
      items: h12.map(c => ({ label: c.name, detail: getTip(c, goal), time: c.studyH + " hrs" })),
    });
  }
  if (m12.length) {
    roadmap.push({
      phase: "PHASE 5",
      title: "Class 12 Secondary Weightage Chapters",
      col: "#6366F1",
      tag: "Standard",
      items: m12.map(c => ({ label: c.name, detail: getTip(c, goal), time: c.studyH + " hrs" })),
    });
  }

  // Reality Warnings
  const warnings = [];
  const mole = res.find(c => c.id === "mole_concept");
  const calc = res.find(c => c.id === "calculus");
  const org = res.find(c => c.id === "organic_basics");
  const hphy = res.find(c => c.id === "human_physio");

  if (mole && mole.risk === "HIGH") {
    warnings.push({
      title: "Numerical Shift in Chemistry",
      sev: "high",
      text: "Class 11 Chemistry becomes heavily numerical from Day 1. Mole Concept will feel disorienting without ratio fluency. Budget 2–3 weeks of foundation drill before term starts.",
    });
  }
  if (calc && calc.risk === "HIGH" && goal !== "NEET") {
    warnings.push({
      title: "Calculus Foundation Prerequisite",
      sev: "high",
      text: "Calculus represents 35–40% of " + goal + " Mathematics. Weak algebra and trigonometry will directly bottleneck differentiation and integration proficiency.",
    });
  }
  if (org && org.risk === "HIGH") {
    warnings.push({
      title: "Organic Chemistry Dependency",
      sev: "high",
      text: "Organic Chemistry relies 100% on Class 10 Carbon & its Compounds. Students who enter without master-level carbon bonding fall up to 4 weeks behind by mid-year.",
    });
  }
  if (highCnt >= 4) {
    warnings.push({
      title: "Elevated Prerequisite Deficit",
      sev: "medium",
      text: "You have " + highCnt + " high-risk chapters projected ahead. This is fully addressable with a structured 4-week foundation recovery schedule.",
    });
  }
  if (hphy && hphy.risk !== "LOW" && goal === "NEET") {
    warnings.push({
      title: "NEET High-Yield Chapter Impact",
      sev: hphy.risk === "HIGH" ? "high" : "medium",
      text: "Human Physiology alone dictates 15–20 marks in NEET. Reinforce your Class 10 Life Processes and Nervous System modules before starting this chapter.",
    });
  }

  return {
    res,
    roadmap,
    warnings: warnings.slice(0, 4),
    stats: { highCnt, medCnt, lowCnt, totalH, total: res.length },
  };
}
