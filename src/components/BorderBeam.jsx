export default function BorderBeam({
  duration = 4.5,
  borderWidth = 1.5,
  colorFrom = "#00DFD8",
  colorTo = "#A855F7",
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        padding: `${borderWidth}px`,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-150%",
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, ${colorFrom} 315deg, ${colorTo} 350deg, transparent 360deg)`,
          animation: `spinBeam ${duration}s linear infinite`,
        }}
      />
    </div>
  );
}
