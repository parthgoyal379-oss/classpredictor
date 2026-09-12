import React from "react";

/**
 * BrandLogo - Extreme Premium Dark Mode Logo Component for ClassPredictor
 *
 * @param {Object} props
 * @param {number} [props.size=32] - Dimension in pixels (for icon mode)
 * @param {'icon' | 'full'} [props.variant='icon'] - 'icon' for glyph squircle, 'full' for complete lockup
 * @param {boolean} [props.glow=true] - Whether to render ambient luminescence
 * @param {string} [props.className=''] - Additional CSS classes
 */
export default function BrandLogo({ size = 32, variant = "icon", glow = true, className = "" }) {
  if (variant === "full") {
    return (
      <div 
        className={`inline-flex items-center gap-3 select-none ${className}`}
        style={{ height: size }}
      >
        <BrandLogo size={size} variant="icon" glow={glow} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{
              fontWeight: 800,
              fontSize: size * 0.46,
              letterSpacing: "-0.035em",
              color: "#FFFFFF",
              fontFamily: "'Geist', -apple-system, sans-serif",
            }}>
              Class<span style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Predictor</span>
            </span>
            <span style={{
              fontSize: size * 0.22,
              fontFamily: "'Geist Mono', monospace",
              color: "#38BDF8",
              background: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              padding: "1px 5px",
              borderRadius: "4px",
              fontWeight: 600,
            }}>
              PRO
            </span>
          </div>
          <span style={{
            fontSize: size * 0.22,
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "var(--text-secondary, #888888)",
            textTransform: "uppercase",
            fontFamily: "'Geist', sans-serif",
          }}>
            Prerequisite Gap Engine
          </span>
        </div>
      </div>
    );
  }

  // Icon Variant - Perfectly Centered Luxury 3D Titanium Mark
  const radius = Math.max(6, Math.round(size * 0.24));

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: "#000000",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        boxShadow: glow 
          ? "0 0 22px -3px rgba(56, 189, 248, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
          : "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <img 
        src="/brand-logo-icon.png" 
        alt="ClassPredictor Logo"
        width={size}
        height={size}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          borderRadius: radius,
          pointerEvents: "none",
          transform: "scale(1.02)", // Seamlessly fill squircle borders
        }}
      />
    </div>
  );
}
