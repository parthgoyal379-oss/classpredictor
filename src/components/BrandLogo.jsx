
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

  // Icon Variant
  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(6, Math.round(size * 0.25)),
        background: "linear-gradient(135deg, #0d121c 0%, #05070b 100%)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: glow 
          ? "0 0 20px -4px rgba(56, 189, 248, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
          : "inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* Micro hairline corner glow */}
      <div 
        style={{
          position: "absolute",
          top: -10,
          left: -10,
          width: size,
          height: size,
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)",
          pointerEvents: "none",
        }} 
      />

      <svg 
        width={Math.round(size * 0.72)} 
        height={Math.round(size * 0.72)} 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
      >
        <defs>
          <linearGradient id={`brandCPTitanium_${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="80%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id={`brandCPPrism_${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>

        {/* C Segment (Beveled Foundation Arc) */}
        <path 
          d="M22 13 H13 C10.791 13 9 14.791 9 17 V31 C9 33.209 10.791 35 13 35 H22" 
          stroke={`url(#brandCPTitanium_${size})`} 
          strokeWidth="3.4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* P & Forward Predictive Vector Segment */}
        <path 
          d="M23 35 V13 L29.5 13 C33.09 13 36 15.91 36 19.5 C36 23.09 33.09 26 29.5 26 H23" 
          stroke={`url(#brandCPPrism_${size})`} 
          strokeWidth="3.4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Forward Apex Intersection Core */}
        <circle cx="29.5" cy="19.5" r="1.7" fill="#FFFFFF" />
        <circle cx="23" cy="13" r="1.2" fill="#38BDF8" />
      </svg>
    </div>
  );
}
