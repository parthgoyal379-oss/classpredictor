import { useState, useEffect, useRef } from "react";
import { Search, X, Play, Volume2, VolumeX, Shield, RotateCcw, BookOpen, ArrowRight } from "lucide-react";
import { FOUNDATION, ADVANCED } from "../data/chapters";
import { setSoundEnabled, playClick } from "../utils/audio";

export default function CommandPalette({
  isOpen,
  onClose,
  onStartAnalysis,
  onOpenAdmin,
  onReset,
  soundEnabled,
  setSoundEnabledState,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setQuery("");
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Actions
  const actions = [
    {
      id: "start",
      title: "Start Diagnostic Analysis",
      category: "Action",
      icon: <Play size={16} className="text-cyan-400" style={{ color: "#00DFD8" }} />,
      run: () => {
        playClick();
        onClose();
        onStartAnalysis();
      },
    },
    {
      id: "sound",
      title: soundEnabled ? "Mute Web Audio Sound FX" : "Enable Web Audio Sound FX",
      category: "Action",
      icon: soundEnabled ? <VolumeX size={16} style={{ color: "#F59E0B" }} /> : <Volume2 size={16} style={{ color: "#10B981" }} />,
      run: () => {
        const next = !soundEnabled;
        setSoundEnabled(next);
        setSoundEnabledState(next);
        playClick();
      },
    },
    {
      id: "admin",
      title: "Open Admin Intelligence Center",
      category: "Action",
      icon: <Shield size={16} style={{ color: "#A855F7" }} />,
      run: () => {
        playClick();
        onClose();
        onOpenAdmin();
      },
    },
    {
      id: "reset",
      title: "Reset Diagnostic Session",
      category: "Action",
      icon: <RotateCcw size={16} style={{ color: "#EF4444" }} />,
      run: () => {
        playClick();
        onClose();
        onReset();
      },
    },
  ];

  // Foundation Chapters
  const foundationMatches = (FOUNDATION || [])
    .filter(f => f.name.toLowerCase().includes(query.toLowerCase()) || f.subject.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5)
    .map(f => ({
      id: `found-${f.id}`,
      title: f.name,
      category: `Class ${f.cls} Foundation (${f.subject})`,
      icon: <BookOpen size={16} style={{ color: "#38BDF8" }} />,
      tag: `Weight: ${f.wt}`,
      run: () => {
        playClick();
        onClose();
        onStartAnalysis();
      },
    }));

  // Advanced Chapters
  const advancedMatches = (ADVANCED || [])
    .filter(a => a.name.toLowerCase().includes(query.toLowerCase()) || a.subject.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5)
    .map(a => ({
      id: `adv-${a.id}`,
      title: a.name,
      category: `Class 11-12 Target (${a.subject})`,
      icon: <ArrowRight size={16} style={{ color: "#C084FC" }} />,
      tag: `Reqs: ${a.reqs?.length || 0} nodes`,
      run: () => {
        playClick();
        onClose();
        onStartAnalysis();
      },
    }));

  const results = query.trim().length === 0
    ? actions
    : [...actions.filter(a => a.title.toLowerCase().includes(query.toLowerCase())), ...foundationMatches, ...advancedMatches];

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        results[selectedIndex].run();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "12vh",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 620,
          background: "#0A0A0A",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 14,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 35px -5px rgba(0, 223, 216, 0.2)",
          overflow: "hidden",
          animation: "scaleUp 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Search Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.85rem 1.15rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            gap: "0.75rem",
          }}
        >
          <Search size={18} style={{ color: "#00DFD8", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search chapters, prerequisites, actions..."
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#FFFFFF",
              fontSize: "0.98rem",
              fontFamily: "Geist, sans-serif",
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "none",
              borderRadius: 6,
              color: "var(--text-tertiary)",
              padding: "4px",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: "380px", overflowY: "auto", padding: "0.5rem" }}>
          {results.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-tertiary)", fontSize: "0.85rem" }}>
              No chapters or actions found matching "{query}"
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.run}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1rem",
                    borderRadius: 8,
                    cursor: "pointer",
                    background: isSelected ? "rgba(255, 255, 255, 0.08)" : "transparent",
                    transition: "background 0.12s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", overflow: "hidden" }}>
                    {item.icon}
                    <div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 600, color: isSelected ? "#FFFFFF" : "#EDEDED" }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
                        {item.category}
                      </div>
                    </div>
                  </div>
                  {item.tag && (
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.65rem",
                        color: "#00DFD8",
                        background: "rgba(0, 223, 216, 0.08)",
                        padding: "2px 6px",
                        borderRadius: 4,
                        border: "1px solid rgba(0, 223, 216, 0.15)",
                        flexShrink: 0,
                      }}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div
          style={{
            padding: "0.6rem 1.15rem",
            background: "#070707",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.7rem",
            color: "var(--text-tertiary)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <span><kbd style={{ background: "#1A1A1A", padding: "2px 5px", borderRadius: 3, border: "1px solid #333" }}>↑↓</kbd> navigate</span>
            <span><kbd style={{ background: "#1A1A1A", padding: "2px 5px", borderRadius: 3, border: "1px solid #333" }}>↵</kbd> select</span>
            <span><kbd style={{ background: "#1A1A1A", padding: "2px 5px", borderRadius: 3, border: "1px solid #333" }}>esc</kbd> close</span>
          </div>
          <span className="font-mono">ClassPredictor v2.5-PRO</span>
        </div>
      </div>
    </div>
  );
}
