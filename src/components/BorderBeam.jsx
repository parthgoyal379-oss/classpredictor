export default function BorderBeam({
  duration = 5,
  borderWidth = 1.5,
  colorFrom = "#38BDF8",
  colorTo = "#A855F7",
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-150%",
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 300deg, ${colorFrom} 330deg, ${colorTo} 355deg, transparent 360deg)`,
          animation: `spinBeam ${duration}s linear infinite`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: `${borderWidth}px`,
          borderRadius: "inherit",
          background: "#0A0A0A",
        }}
      />
    </div>
  );
}

