import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  type: 'petal' | 'star';
}

interface CursorSparkle {
  x: number;
  y: number;
  symbol: string;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const AmbientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create background ambient particles
    const particleCount = width < 768 ? 20 : 45;
    const particles: Particle[] = [];

    const colors = [
      'rgba(212, 175, 55, ',  // Gold
      'rgba(226, 138, 149, ', // Rose
      'rgba(244, 228, 188, ', // Gold light
      'rgba(249, 220, 221, ', // Blush
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 6 + 4,
        speedY: Math.random() * 0.6 + 0.2,
        speedX: Math.sin(Math.random() * Math.PI) * 0.4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.4 ? 'petal' : 'star',
      });
    }

    // Cursor Sparkle Trail
    const sparkles: CursorSparkle[] = [];
    const symbols = ['✨', '💖', '🌸', '⭐', '❤️'];

    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 45) return;
      lastTime = now;

      sparkles.push({
        x: e.clientX,
        y: e.clientY,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: Math.random() * 6 + 12,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        opacity: 1,
        life: 0,
        maxLife: 35 + Math.random() * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Main Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Ambient Petals & Stardust
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.5 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'petal') {
          // Draw Rose Petal
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size, -p.size, p.size * 1.5, p.size, 0, p.size * 1.5);
          ctx.bezierCurveTo(-p.size * 1.5, p.size, -p.size, -p.size, 0, 0);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fill();
        } else {
          // Draw Stardust Sparkle
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity * 0.8})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#D4AF37';
          ctx.fill();
        }
        ctx.restore();
      });

      // Render Mouse Sparkle Trail
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.opacity = 1 - s.life / s.maxLife;

        ctx.save();
        ctx.font = `${s.size}px sans-serif`;
        ctx.globalAlpha = Math.max(0, s.opacity);
        ctx.fillText(s.symbol, s.x, s.y);
        ctx.restore();

        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};
