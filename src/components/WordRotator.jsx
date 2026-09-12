import { useState, useEffect } from "react";

export default function WordRotator({
  words = ["Class 11 🚀", "Physics ⚡", "Mathematics 📐", "Chemistry 🧪", "NEET & JEE 🎯"],
  interval = 2400,
}) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % words.length);
        setFade(true);
      }, 250);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span
      className="animated-gradient-text"
      style={{
        display: "inline-block",
        opacity: fade ? 1 : 0,
        transform: fade ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
        transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        minWidth: "260px",
      }}
    >
      {words[index]}
    </span>
  );
}
