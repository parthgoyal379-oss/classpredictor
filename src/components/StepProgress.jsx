import { Check } from "lucide-react";

export default function StepProgress({ step }) {
  const steps = [
    { num: 1, label: "Stream & Target" },
    { num: 2, label: "Rate Chapters" },
    { num: 3, label: "Intelligence Report" },
  ];

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "2rem",
      paddingBottom: "1.25rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {steps.map((s, idx) => {
          const isDone = step > s.num;
          const isCurrent = step === s.num;

          return (
            <div key={s.num} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  background: isDone 
                    ? "#FFFFFF" 
                    : isCurrent 
                      ? "#FFFFFF" 
                      : "transparent",
                  color: isDone || isCurrent ? "#000000" : "var(--text-tertiary)",
                  border: isDone || isCurrent ? "none" : "1px solid var(--border)",
                  boxShadow: isCurrent ? "0 0 12px rgba(255, 255, 255, 0.3)" : "none",
                }}>
                  {isDone ? <Check size={13} strokeWidth={3} /> : s.num}
                </div>
                <span
                  className="stepper-label-text"
                  style={{
                    fontWeight: isCurrent ? 600 : 400,
                    color: isCurrent ? "#EDEDED" : isDone ? "var(--text-secondary)" : "var(--text-tertiary)",
                  }}
                >
                  {s.label}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div style={{
                  width: 32,
                  height: 1,
                  background: step > s.num ? "rgba(255, 255, 255, 0.4)" : "var(--border)",
                  transition: "background 0.3s ease",
                }} />
              )}
            </div>
          );
        })}
      </div>

      <div className="font-mono" style={{
        fontSize: "0.75rem",
        color: "var(--text-secondary)",
      }}>
        STEP {step} OF 3
      </div>
    </div>
  );
}
