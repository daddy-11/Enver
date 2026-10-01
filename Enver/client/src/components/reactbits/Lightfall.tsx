import React, { useEffect, useRef } from "react";
import "./Lightfall.css";

export interface LightfallProps {
  colors?: string[];
  backgroundColor?: string;
  speed?: number;
  streakCount?: number;
  streakWidth?: number;
  streakLength?: number;
  glow?: number;
  density?: number;
  twinkle?: number;
  zoom?: number;
  backgroundGlow?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVy: number;
  size: number;
  tailLength: number;
  color: string;
  glowColor: string;
  alpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  depth: number;
}

export default function Lightfall({
  colors = ["#FF6F1E", "#FFA048", "#FFD285", "#FF802B", "#FFFFFF"],
  backgroundColor = "#F7F3E9",
  speed = 1.2,
  streakCount = 80,
  streakWidth = 1.4,
  streakLength = 1.6,
  glow = 1.0,
  density = 1.0,
  twinkle = 1.0,
  backgroundGlow = 0.5,
  opacity = 1.0,
  mouseInteraction = true,
  mouseStrength = 1.0,
  mouseRadius = 140,
  className = "",
  style = {}
}: LightfallProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    // Mouse tracker
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    if (mouseInteraction) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerLeave);
    }

    // Particle pool
    const totalCount = Math.floor(streakCount * density);
    const particles: StarParticle[] = [];

    const createParticle = (initialY = -1): StarParticle => {
      const pColor = colors[Math.floor(Math.random() * colors.length)];
      const depth = 0.4 + Math.random() * 0.6; // 0.4 (far/slow) to 1.0 (near/fast)
      const baseVy = (1.2 + Math.random() * 2.2) * speed * depth;

      return {
        x: Math.random() * (width || 800),
        y: initialY >= 0 ? initialY : Math.random() * (height || 600),
        vx: (Math.random() - 0.5) * 0.3 * speed,
        vy: baseVy,
        baseVy,
        size: (0.8 + Math.random() * 1.8) * streakWidth * depth,
        tailLength: (24 + Math.random() * 64) * streakLength * depth,
        color: pColor,
        glowColor: pColor === "#FFFFFF" ? "#FFD285" : pColor,
        alpha: (0.5 + Math.random() * 0.5) * opacity,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: (0.03 + Math.random() * 0.05) * twinkle,
        depth
      };
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Re-populate if count changed or first init
      if (particles.length === 0) {
        for (let i = 0; i < totalCount; i++) {
          particles.push(createParticle(Math.random() * height));
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let lastTime = performance.now();

    // Main 60-120fps render loop
    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const dt = Math.min((time - lastTime) / 16.666, 2.0); // normalize around 60fps
      lastTime = time;

      // Smooth mouse easing
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      // 1. Draw Camel / Mist Background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Ambient Glow (Radial mist & warmth)
      if (backgroundGlow > 0) {
        const radGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.3,
          width * 0.05,
          width * 0.5,
          height * 0.5,
          width * 0.7
        );
        radGrad.addColorStop(0, "rgba(255, 111, 30, 0.06)");
        radGrad.addColorStop(0.5, "rgba(239, 233, 220, 0.4)");
        radGrad.addColorStop(1, "rgba(247, 243, 233, 0)");
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Optional Mouse Ambient Halo
      if (mouseInteraction && mouse.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseRadius * 1.5
        );
        mouseGlow.addColorStop(0, "rgba(255, 111, 30, 0.18)");
        mouseGlow.addColorStop(0.6, "rgba(255, 160, 72, 0.06)");
        mouseGlow.addColorStop(1, "rgba(255, 111, 30, 0)");
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 4. Update and Draw Falling Saffron Stars & Light Streaks
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Twinkle oscillation
        p.twinklePhase += p.twinkleSpeed * dt;
        const currentAlpha = Math.max(
          0.15,
          p.alpha * (0.75 + 0.25 * Math.sin(p.twinklePhase))
        );

        // Mouse physics (repulsion and gentle curve)
        let effVx = p.vx;
        let effVy = p.vy;

        if (mouseInteraction && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const rSq = mouseRadius * mouseRadius;

          if (distSq < rSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouseRadius) * mouseStrength * 3.5;
            effVx += (dx / dist) * force;
            effVy += (dy / dist) * force * 0.4;
          }
        }

        // Move particle downward
        p.x += effVx * dt;
        p.y += effVy * dt;

        // Reset if past bottom or off horizontal bounds
        if (p.y - p.tailLength > height) {
          p.y = -p.tailLength - Math.random() * 20;
          p.x = Math.random() * width;
        }
        if (p.x < -40) p.x = width + 20;
        if (p.x > width + 40) p.x = -20;

        // Draw Falling Streak (Light Trail)
        ctx.save();

        const tailStartY = p.y - p.tailLength;
        const streakGrad = ctx.createLinearGradient(p.x, tailStartY, p.x, p.y);
        streakGrad.addColorStop(0, "rgba(255, 111, 30, 0)");
        streakGrad.addColorStop(0.6, `${p.color}44`);
        streakGrad.addColorStop(1, p.color);

        ctx.strokeStyle = streakGrad;
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(p.x - effVx * 2, tailStartY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Draw Star Head (Luminous Core + Glow Bloom)
        if (glow > 0) {
          const bloomRadius = p.size * 3.2 * glow;
          const starBloom = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            bloomRadius
          );
          starBloom.addColorStop(0, `${p.glowColor}cc`);
          starBloom.addColorStop(0.4, `${p.glowColor}55`);
          starBloom.addColorStop(1, "rgba(255, 111, 30, 0)");

          ctx.fillStyle = starBloom;
          ctx.beginPath();
          ctx.arc(p.x, p.y, bloomRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Crisp Star Core Dot
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size * 0.8), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      if (mouseInteraction) {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, [
    colors,
    backgroundColor,
    speed,
    streakCount,
    streakWidth,
    streakLength,
    glow,
    density,
    twinkle,
    backgroundGlow,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius
  ]);

  return (
    <div
      ref={containerRef}
      className={`lightfall-container ${className}`}
      style={{
        backgroundColor,
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      />
    </div>
  );
}
