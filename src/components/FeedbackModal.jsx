import { X } from "lucide-react";

export default function FeedbackModal({
  show,
  onClose,
  feedback,
  setFeedback,
  onSubmit,
}) {
  if (!show || feedback.submitted) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "1.5rem",
      right: "1.5rem",
      zIndex: 99,
      maxWidth: 340,
      width: "calc(100vw - 3rem)",
    }}>
      <div className="vercel-card animate-fade-in" style={{
        padding: "1.25rem",
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        background: "rgba(12, 12, 12, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "0.75rem",
        }}>
          <div>
            <h4 style={{ fontSize: "0.92rem", fontWeight: 600, color: "#FFFFFF" }}>
              How was your experience?
            </h4>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "2px" }}>
              Takes 10 seconds — directly helps improve this tool
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: "0.2rem", color: "var(--text-tertiary)" }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Rating stars */}
        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem" }}>
          {[1, 2, 3, 4, 5].map(v => (
            <button
              key={v}
              onClick={() => setFeedback(f => ({ ...f, rating: v }))}
              className="btn"
              style={{
                flex: 1,
                padding: "0.45rem 0",
                borderRadius: 6,
                border: "1px solid " + (feedback.rating >= v ? "rgba(245, 158, 11, 0.4)" : "var(--border)"),
                background: feedback.rating >= v ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 255, 255, 0.03)",
                color: feedback.rating >= v ? "#F59E0B" : "var(--text-tertiary)",
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={feedback.text}
          onChange={e => setFeedback(f => ({ ...f, text: e.target.value }))}
          placeholder="Any suggestions? (optional)"
          rows={2}
          style={{
            width: "100%",
            padding: "0.6rem 0.75rem",
            background: "#161616",
            border: "1px solid var(--border)",
            borderRadius: 6,
            color: "#FFFFFF",
            fontSize: "0.8rem",
            resize: "none",
            outline: "none",
            marginBottom: "0.75rem",
          }}
        />

        <button
          onClick={() => {
            if (feedback.rating > 0) {
              onSubmit();
              onClose();
            }
          }}
          disabled={feedback.rating === 0}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "0.6rem",
            fontSize: "0.85rem",
            borderRadius: 6,
          }}
        >
          {feedback.rating > 0 ? "Submit Feedback" : "Select a rating first"}
        </button>
      </div>
    </div>
  );
}
