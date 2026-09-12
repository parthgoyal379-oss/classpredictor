import { useState, useRef } from "react";

export default function TiltCard({ children, className = "", style = {}, glowColor = "#38BDF8" }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 11;
    const rotateY = ((x - centerX) / centerX) * 11;

    setCoords({
      x,
      y,
      rotateX,
      rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setCoords(prev => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      isHovered: false,
    }));
  };

  const transform = coords.isHovered
    ? `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card-wrapper ${className}`}
      style={{
        position: "relative",
        borderRadius: 14,
        transform,
        transformStyle: "preserve-3d",
        transition: coords.isHovered
          ? "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease",
        background: "#0A0A0A",
        border: "1px solid rgba(255, 255, 255, 0.09)",
        boxShadow: coords.isHovered
          ? `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px -10px ${glowColor}33`
          : "0 10px 30px -15px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Specular Holographic Glare Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 3,
          background: coords.isHovered
            ? `radial-gradient(circle 380px at ${coords.glareX}% ${coords.glareY}%, rgba(255, 255, 255, 0.08), transparent 60%)`
            : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Cyber Reticle Corner Crosshairs */}
      <div className="cyber-reticle top-left">+</div>
      <div className="cyber-reticle top-right">+</div>
      <div className="cyber-reticle bottom-left">+</div>
      <div className="cyber-reticle bottom-right">+</div>

      {/* Card Content with 3D Depth Layer */}
      <div style={{ position: "relative", zIndex: 2, transform: "translateZ(15px)" }}>
        {children}
      </div>
    </div>
  );
}
