import { ArrowRight, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { FOUNDATION, SMETA, DLABEL, DCOL } from "../data/chapters";
import SpotlightCard from "./SpotlightCard";

export default function ChapterRater({
  studentName,
  subjects,
  subIdx,
  setSubIdx,
  ratings,
  onRate,
  onAnalyze,
  ratedCount,
  totalCount,
  pct,
}) {
  const curSub = subjects[subIdx];
  const curChapters = FOUNDATION[curSub] || [];
  const meta = SMETA[curSub];
  const isLast = subIdx === subjects.length - 1;
  const isFirst = subIdx === 0;

  return (
    <div className="animate-fade-in" style={{ maxWidth: 840, margin: "0 auto", padding: "1rem 0 5rem" }}>
      {/* Subject Navigation Tabs */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
        marginBottom: "1.25rem",
        flexWrap: "wrap",
      }}>
        <div style={{
          display: "flex",
          gap: "0.35rem",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid var(--border)",
          padding: "4px",
          borderRadius: 10,
          overflowX: "auto",
        }}>
          {subjects.map((sub, idx) => {
            const m = SMETA[sub];
            const chs = FOUNDATION[sub] || [];
            const done = chs.filter(c => ratings[c.id] != null).length;
            const isDone = done === chs.length && chs.length > 0;
            const isActive = subIdx === idx;

            return (
              <button
                key={sub}
                onClick={() => setSubIdx(idx)}
                className="btn-ghost"
                style={{
                  padding: "0.45rem 0.85rem",
                  borderRadius: 7,
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                  border: isActive ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid transparent",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                }}
              >
                <span>{m.name}</span>
                <span className="font-mono" style={{
                  fontSize: "0.68rem",
                  color: isDone ? "var(--accent-emerald)" : "var(--text-tertiary)",
                  background: "rgba(255, 255, 255, 0.04)",
                  padding: "1px 5px",
                  borderRadius: 4,
                  marginLeft: "0.25rem",
                }}>
                  {done}/{chs.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Global Progress with pulsating percentage */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            {ratedCount} of {totalCount} rated
          </span>
          <span className="font-mono" style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#FFFFFF",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid var(--border)",
            padding: "2px 7px",
            borderRadius: 6,
            boxShadow: pct === 100 ? "0 0 10px rgba(16, 185, 129, 0.3)" : "none",
          }}>
            {pct}%
          </span>
        </div>
      </div>

      {/* Animated Progress Line */}
      <div style={{
        height: 2,
        background: "rgba(255, 255, 255, 0.06)",
        borderRadius: 2,
        marginBottom: "2rem",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: pct + "%",
          background: "linear-gradient(90deg, #FFFFFF, rgba(255,255,255,0.8))",
          transition: "width 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 0 12px rgba(255, 255, 255, 0.6)",
        }} />
      </div>

      {/* Subject Header & Note */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          marginBottom: "0.25rem",
        }}>
          {meta.name} Foundations
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Rate your honest understanding from Class 9 & 10, {studentName}. Accurate ratings produce precise risk predictions.
        </p>

        {meta.note && (
          <div style={{
            marginTop: "0.75rem",
            padding: "0.6rem 0.85rem",
            background: "rgba(245, 158, 11, 0.05)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            borderRadius: 8,
            fontSize: "0.78rem",
            color: "#FDE68A",
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
          }}>
            <AlertCircle size={14} style={{ color: "var(--accent-amber)", flexShrink: 0 }} />
            <span>{meta.note}</span>
          </div>
        )}
      </div>

      {/* Rating Scale Legend */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        marginBottom: "1.5rem",
        flexWrap: "wrap",
      }}>
        <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", marginRight: "0.25rem" }}>
          SCALE:
        </span>
        {[
          { num: 1, label: "Mastered", col: "#10B981" },
          { num: 2, label: "Confident", col: "#34D399" },
          { num: 3, label: "Moderate", col: "#F59E0B" },
          { num: 4, label: "Struggling", col: "#F97316" },
          { num: 5, label: "Unprepared", col: "#EF4444" },
        ].map(s => (
          <div key={s.num} style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.72rem",
            padding: "2px 7px",
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            color: "var(--text-secondary)",
          }}>
            <span className="font-mono" style={{ fontWeight: 600, color: s.col }}>{s.num}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Chapters Rating Cards with Spotlight Effect */}
      <div style={{ display: "grid", gap: "0.75rem", marginBottom: "2.5rem" }}>
        {curChapters.map((ch, idx) => {
          const rating = ratings[ch.id];
          const hasRated = rating != null;

          return (
            <SpotlightCard
              key={ch.id}
              style={{
                padding: "1rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "1rem",
                position: "relative",
                zIndex: 2,
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                    <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
                      #{idx + 1}
                    </span>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#EDEDED" }}>
                      {ch.name}
                    </h3>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                    {ch.detail}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexShrink: 0 }}>
                  <span className="font-mono" style={{
                    fontSize: "0.68rem",
                    color: "var(--text-tertiary)",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}>
                    Class {ch.cl}
                  </span>
                  {hasRated && (
                    <span className="font-mono" style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      color: DCOL[rating],
                      background: DCOL[rating] + "1A",
                      border: "1px solid " + DCOL[rating] + "44",
                      padding: "2px 7px",
                      borderRadius: 4,
                      animation: "fadeInUp 0.2s ease",
                    }}>
                      {DLABEL[rating]}
                    </span>
                  )}
                </div>
              </div>

              {/* Segmented rating buttons with tactile active state */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "0.35rem",
                background: "rgba(255, 255, 255, 0.02)",
                padding: "3px",
                borderRadius: 8,
                border: "1px solid rgba(255, 255, 255, 0.05)",
                position: "relative",
                zIndex: 2,
              }}>
                {[1, 2, 3, 4, 5].map(val => {
                  const isSelected = rating === val;

                  return (
                    <button
                      key={val}
                      onClick={() => onRate(ch.id, val)}
                      className="btn"
                      style={{
                        padding: "0.45rem 0",
                        borderRadius: 6,
                        border: "1px solid " + (isSelected ? DCOL[val] : "transparent"),
                        background: isSelected 
                          ? DCOL[val] + "2B" 
                          : "transparent",
                        color: isSelected ? "#FFFFFF" : "var(--text-secondary)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "2px",
                        transform: isSelected ? "scale(1.03)" : "scale(1)",
                        boxShadow: isSelected ? `0 0 14px ${DCOL[val]}33` : "none",
                        transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <span className="font-mono" style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: isSelected ? DCOL[val] : "inherit",
                      }}>
                        {val}
                      </span>
                      <span style={{
                        fontSize: "0.62rem",
                        opacity: isSelected ? 1 : 0.6,
                        display: "none",
                        "@media (min-width: 640px)": { display: "inline" },
                      }}>
                        {["","Mastered","Confident","Moderate","Struggling","Unprepared"][val]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div style={{
        position: "sticky",
        bottom: "1rem",
        zIndex: 40,
        display: "flex",
        gap: "0.75rem",
        padding: "0.85rem 1.25rem",
        borderRadius: 12,
        background: "rgba(10, 10, 10, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.8)",
      }}>
        {!isFirst && (
          <button
            onClick={() => setSubIdx(i => i - 1)}
            className="btn-secondary"
            style={{ padding: "0.75rem 1.1rem" }}
          >
            <ChevronLeft size={16} />
            <span>Previous Subject</span>
          </button>
        )}

        <button
          onClick={onAnalyze}
          disabled={ratedCount === 0}
          className="btn-secondary"
          style={{
            flex: 1,
            padding: "0.75rem 1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.45rem",
          }}
        >
          <span>Quick Analyze ({ratedCount}/{totalCount})</span>
        </button>

        {!isLast ? (
          <button
            onClick={() => setSubIdx(i => i + 1)}
            className="btn-primary"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: 8,
            }}
          >
            <span>Next: {SMETA[subjects[subIdx + 1]]?.name}</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={onAnalyze}
            disabled={ratedCount === 0}
            className="btn-primary"
            style={{
              padding: "0.75rem 1.75rem",
              borderRadius: 8,
            }}
          >
            <span>Generate Intelligence Report</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
