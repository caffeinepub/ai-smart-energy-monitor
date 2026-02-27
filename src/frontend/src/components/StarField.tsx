import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  twinkle: number;
  twinkleSpeed: number;
  color: string;
  vx: number;
  vy: number;
}

const STAR_COLORS = [
  "rgba(255,255,255,",
  "rgba(0,245,255,",
  "rgba(168,85,247,",
  "rgba(200,220,255,",
];

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1,
        size: Math.random() * 2.2 + 0.3,
        twinkle: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.05,
      }));
    };

    const draw = () => {
      // Draw dark galaxy gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.4, canvas.height * 0.3, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.9
      );
      gradient.addColorStop(0, "#0f0520");
      gradient.addColorStop(0.4, "#080818");
      gradient.addColorStop(0.7, "#04040e");
      gradient.addColorStop(1, "#000000");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle nebula glow
      const nebula = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.2, 0,
        canvas.width * 0.7, canvas.height * 0.2, canvas.width * 0.35
      );
      nebula.addColorStop(0, "rgba(168,85,247,0.04)");
      nebula.addColorStop(0.5, "rgba(0,245,255,0.02)");
      nebula.addColorStop(1, "transparent");
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.7, 0,
        canvas.width * 0.2, canvas.height * 0.7, canvas.width * 0.3
      );
      nebula2.addColorStop(0, "rgba(0,245,255,0.03)");
      nebula2.addColorStop(1, "transparent");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach((star) => {
        star.twinkle += star.twinkleSpeed;
        const alpha = 0.3 + Math.abs(Math.sin(star.twinkle)) * 0.7;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${alpha.toFixed(2)})`;
        ctx.fill();

        // Bright stars get a glow
        if (star.size > 1.8) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color}${(alpha * 0.15).toFixed(3)})`;
          ctx.fill();
        }

        // Slow drift
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around
        if (star.x < -5) star.x = canvas.width + 5;
        if (star.x > canvas.width + 5) star.x = -5;
        if (star.y < -5) star.y = canvas.height + 5;
        if (star.y > canvas.height + 5) star.y = -5;
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="starfield-canvas" />;
}
