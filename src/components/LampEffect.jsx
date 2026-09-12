export default function LampEffect({ children }) {
  return (
    <div
      className="lamp-effect-container"
      style={{
        position: "relative",
        display: "flex",
        minHeight: "420px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
        width: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          isolation: "isolate",
          zIndex: 0,
        }}
      >
        {/* Left Glowing Cyan Conic Light Beam */}
        <div
          style={{
            position: "absolute",
            inset: "auto",
            right: "50%",
            height: "14rem",
            overflow: "visible",
            width: "30rem",
            background: "conic-gradient(from 70deg at 100% 0%, #00DFD8 0deg, #3B82F6 25deg, transparent 60deg)",
            filter: "blur(40px)",
            opacity: 0.55,
            transform: "translateY(-40%)",
            animation: "lampPulse 6s ease-in-out infinite alternate",
          }}
        />

        {/* Right Glowing Violet Conic Light Beam */}
        <div
          style={{
            position: "absolute",
            inset: "auto",
            left: "50%",
            height: "14rem",
            width: "30rem",
            background: "conic-gradient(from 290deg at 0% 0%, transparent 0deg, #8B5CF6 35deg, #EC4899 60deg)",
            filter: "blur(40px)",
            opacity: 0.55,
            transform: "translateY(-40%)",
            animation: "lampPulse 6s ease-in-out infinite alternate",
            animationDelay: "-3s",
          }}
        />

        {/* Center Intense Neon Focal Orb */}
        <div
          style={{
            position: "absolute",
            top: "0",
            width: "24rem",
            height: "10rem",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(0, 223, 216, 0.4) 0%, rgba(139, 92, 246, 0.25) 45%, transparent 70%)",
            filter: "blur(30px)",
            opacity: 0.8,
            transform: "translateY(-30%)",
          }}
        />

        {/* Radiant Laser Horizon Bar */}
        <div
          style={{
            position: "absolute",
            top: "2px",
            width: "min(34rem, 90vw)",
            height: "2px",
            background: "linear-gradient(90deg, transparent 0%, #00DFD8 25%, #FFFFFF 50%, #EC4899 75%, transparent 100%)",
            boxShadow: "0 0 20px 2px #00DFD8, 0 0 40px 6px #8B5CF6",
            opacity: 0.9,
          }}
        />

        {/* Mask to smoothly fade into dark bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 0%, #000000 95%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {children && (
        <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
          {children}
        </div>
      )}
    </div>
  );
}
