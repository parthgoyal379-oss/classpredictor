import { useEffect, useRef } from "react";

export default function CosmicCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Celestial Star Field
    const count = Math.min(Math.floor((width * height) / 9500), 140);
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      baseRadius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.7 + 0.3,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.03 + 0.015,
      hue: Math.random() > 0.6 ? (Math.random() > 0.5 ? 190 : 270) : 0,
    }));

    // Shooting Meteors
    const meteors = [];
    const createMeteor = () => {
      const startX = Math.random() * (width * 1.3);
      const startY = -40;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25;
      const speed = Math.random() * 10 + 12;
      meteors.push({
        x: startX,
        y: startY,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 140 + 90,
        thickness: Math.random() * 2.2 + 1.2,
        life: 1,
        decay: Math.random() * 0.012 + 0.008,
      });
    };

    let meteorTimer = 0;

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // ── RENDER STARS & LINKS ──
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        s.twinklePhase += s.twinkleSpeed;
        const currentAlpha = Math.max(0.12, s.alpha + Math.sin(s.twinklePhase) * 0.28);

        const mdx = mouse.x - s.x;
        const mdy = mouse.y - s.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 180) {
          s.x -= (mdx / mdist) * 0.65;
          s.y -= (mdy / mdist) * 0.65;

          const beamIntensity = 1 - mdist / 180;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${beamIntensity * 0.5})`;
          ctx.lineWidth = beamIntensity * 1.6;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.baseRadius, 0, Math.PI * 2);
        if (s.hue === 190) {
          ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`;
          ctx.shadowColor = "#38BDF8";
          ctx.shadowBlur = 6;
        } else if (s.hue === 270) {
          ctx.fillStyle = `rgba(192, 132, 252, ${currentAlpha})`;
          ctx.shadowColor = "#C084FC";
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.shadowColor = "#FFFFFF";
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dx = s.x - s2.x;
          const dy = s.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const linkAlpha = (1 - dist / 135) * 0.22;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${linkAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // ── SPAWN & RENDER SHOOTING METEORS ──
      meteorTimer++;
      if (meteorTimer % 85 === 0 && Math.random() > 0.25) {
        createMeteor();
      }

      for (let m = meteors.length - 1; m >= 0; m--) {
        const meteor = meteors[m];
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.life -= meteor.decay;

        if (meteor.life <= 0 || meteor.x < -100 || meteor.y > height + 100) {
          meteors.splice(m, 1);
          continue;
        }

        const tailX = meteor.x - (meteor.vx / Math.sqrt(meteor.vx * meteor.vx + meteor.vy * meteor.vy)) * meteor.length;
        const tailY = meteor.y - (meteor.vy / Math.sqrt(meteor.vx * meteor.vx + meteor.vy * meteor.vy)) * meteor.length;

        const gradient = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.life})`);
        gradient.addColorStop(0.3, `rgba(56, 189, 248, ${meteor.life * 0.85})`);
        gradient.addColorStop(0.7, `rgba(168, 85, 247, ${meteor.life * 0.45})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = meteor.thickness;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.thickness * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${meteor.life})`;
        ctx.shadowColor = "#38BDF8";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.95,
      }}
    />
  );
}
