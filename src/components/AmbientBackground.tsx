import { useEffect, useRef } from "react";

interface AmbientBackgroundProps {
  isDarkSide?: boolean;
}

export const AmbientBackground = ({ isDarkSide = false }: AmbientBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create aura particles
    const particleCount = Math.min(25, Math.floor(width / 50));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Color scheme based on isDarkSide
      const colorHue = isDarkSide ? 220 : 350; // Deep Sapphire (220) vs Laser Rose (350)
      const primaryRgb = isDarkSide ? "56, 120, 240" : "255, 7, 58";

      // Soft ambient aura background gradient
      const grad1 = ctx.createRadialGradient(width * 0.3, height * 0.2, 0, width * 0.3, height * 0.2, width * 0.6);
      grad1.addColorStop(0, `rgba(${primaryRgb}, 0.05)`);
      grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, width * 0.5);
      grad2.addColorStop(0, `rgba(${primaryRgb}, 0.03)`);
      grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw floating particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.15;
        const radius = p.radius + Math.sin(p.pulse) * 0.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryRgb}, ${Math.max(0.02, currentAlpha)})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsl(${colorHue}, 100%, 60%)`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkSide]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 opacity-60"
    />
  );
};
