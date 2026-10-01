import React, { useEffect, useRef } from "react";

interface SnowflakeCrystalMeshProps {
  isThinking: boolean;
  theme?: "tranquil" | "nocturne";
  className?: string;
}

export default function SnowflakeCrystalMesh({
  isThinking,
  theme = "tranquil",
  className = ""
}: SnowflakeCrystalMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // Mouse movement listener for subtle 3D crystal tilt & specular gleam
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mousePos.current.targetX = Math.max(-1, Math.min(1, x));
      mousePos.current.targetY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Floating Ice Crystal Micro-Particles
    interface IceSparkle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
    }

    const sparkles: IceSparkle[] = [];
    for (let i = 0; i < 30; i++) {
      sparkles.push({
        x: (Math.random() - 0.5) * 260,
        y: (Math.random() - 0.5) * 260,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.4,
        size: 0.8 + Math.random() * 1.8,
        alpha: Math.random() * 0.7,
        life: Math.random() * 120,
        maxLife: 80 + Math.random() * 100
      });
    }

    const startTime = performance.now();

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseR = Math.min(width, height) * 0.42;

      // Pulse / Crystallization wave when formulating response (isThinking)
      const pulseSpeed = isThinking ? 2.4 : 0.8;
      const pulseAmp = isThinking ? 0.05 : 0.02;
      const currentR = baseR * (1 + Math.sin(elapsed * pulseSpeed) * pulseAmp);

      // Subtle slow majestic rotation
      const rot = elapsed * (isThinking ? 0.12 : 0.04) + mousePos.current.x * 0.15;

      // Colors: Pure Snow-White & Frozen Lake Blue
      const isDark = theme === "nocturne";
      const frozenLakeDeep = isDark ? "#091B29" : "#133852";
      const frozenLakeMid = isDark ? "#112F47" : "#1B4D70";
      const frozenLakeLight = isDark ? "#1E4A6E" : "#24618C";
      const iceCyan = "#38BDF8";
      const iceCyanGlow = "rgba(56, 189, 248, 0.45)";
      const snowWhite = "#FFFFFF";
      const frostWhite = "rgba(240, 249, 255, 0.95)";

      // Draw subtle ambient frozen lake radial glow behind the crystal
      const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, currentR * 1.35);
      if (isDark) {
        bgGlow.addColorStop(0, "rgba(27, 77, 112, 0.28)");
        bgGlow.addColorStop(0.5, "rgba(17, 47, 71, 0.15)");
        bgGlow.addColorStop(1, "rgba(9, 27, 41, 0)");
      } else {
        bgGlow.addColorStop(0, "rgba(186, 230, 253, 0.35)");
        bgGlow.addColorStop(0.5, "rgba(224, 242, 254, 0.18)");
        bgGlow.addColorStop(1, "rgba(240, 249, 255, 0)");
      }
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, currentR * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // =======================================================================
      // EXACT MATHEMATICAL 6-FOLD CRYSTALLINE SNOWFLAKE (Matching User Image 1)
      // =======================================================================
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      // Tilt effect with mouse
      const tiltX = mousePos.current.x * 0.08;
      const tiltY = mousePos.current.y * 0.08;
      ctx.transform(1, tiltY, tiltX, 1, 0, 0);

      // Specular light sweep across facets
      const lightSweep = (Math.sin(elapsed * (isThinking ? 3 : 1)) + 1) * 0.5;

      for (let k = 0; k < 6; k++) {
        const theta = (k * Math.PI) / 3;

        ctx.save();
        ctx.rotate(theta);

        // -------------------------------------------------------------------
        // 1. CENTRAL STAR: Diamond Petal (6 Petals forming central ice star)
        // -------------------------------------------------------------------
        const starTipR = currentR * 0.22;
        const starMidR = currentR * 0.12;
        const starAngleDelta = Math.PI / 12; // 15 deg

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(
          starMidR * Math.cos(-starAngleDelta),
          starMidR * Math.sin(-starAngleDelta)
        );
        ctx.lineTo(starTipR, 0);
        ctx.lineTo(
          starMidR * Math.cos(starAngleDelta),
          starMidR * Math.sin(starAngleDelta)
        );
        ctx.closePath();

        // Shading: Frozen Lake Blue fill with crisp Snow-White contour
        ctx.fillStyle = frozenLakeDeep;
        ctx.fill();
        ctx.strokeStyle = frostWhite;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // -------------------------------------------------------------------
        // 2. INNER CHEVRON / ARROWHEAD BARBS
        // -------------------------------------------------------------------
        const barbBaseR = currentR * 0.26;
        const barbTipR = currentR * 0.50;
        const barbSideR = currentR * 0.42;
        const barbSideAngle = Math.PI / 9; // 20 deg
        const barbNotchR = currentR * 0.35;

        // Left wing facet
        ctx.beginPath();
        ctx.moveTo(barbBaseR, 0);
        ctx.lineTo(
          barbSideR * Math.cos(-barbSideAngle),
          barbSideR * Math.sin(-barbSideAngle)
        );
        ctx.lineTo(barbTipR, 0);
        ctx.lineTo(barbNotchR, 0);
        ctx.closePath();
        ctx.fillStyle = frostWhite;
        ctx.fill();
        ctx.strokeStyle = frozenLakeMid;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Right wing facet
        ctx.beginPath();
        ctx.moveTo(barbBaseR, 0);
        ctx.lineTo(
          barbSideR * Math.cos(barbSideAngle),
          barbSideR * Math.sin(barbSideAngle)
        );
        ctx.lineTo(barbTipR, 0);
        ctx.lineTo(barbNotchR, 0);
        ctx.closePath();
        ctx.fillStyle = frostWhite;
        ctx.fill();
        ctx.strokeStyle = frozenLakeMid;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // -------------------------------------------------------------------
        // 3. INTERMEDIATE DIAMOND (Negative & Positive Crystalline Mosaic)
        // -------------------------------------------------------------------
        const midDiamondInnerR = currentR * 0.44;
        const midDiamondOuterR = currentR * 0.72;
        const midDiamondSideR = currentR * 0.58;
        const midDiamondAngle = Math.PI / 10;

        ctx.beginPath();
        ctx.moveTo(midDiamondInnerR, 0);
        ctx.lineTo(
          midDiamondSideR * Math.cos(-midDiamondAngle),
          midDiamondSideR * Math.sin(-midDiamondAngle)
        );
        ctx.lineTo(midDiamondOuterR, 0);
        ctx.lineTo(
          midDiamondSideR * Math.cos(midDiamondAngle),
          midDiamondSideR * Math.sin(midDiamondAngle)
        );
        ctx.closePath();
        ctx.fillStyle = frozenLakeMid;
        ctx.fill();
        ctx.strokeStyle = frostWhite;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // -------------------------------------------------------------------
        // 4. OUTER CRYSTAL LANCE & BRANCHING DENDRITES (The Snowflake Crown)
        // -------------------------------------------------------------------
        const crownBaseR = currentR * 0.70;
        const crownTipR = currentR * 0.96;
        const crownBarbR = currentR * 0.84;
        const crownBarbAngle = Math.PI / 11; // ~16 deg

        ctx.beginPath();
        ctx.moveTo(crownBaseR, 0);
        ctx.lineTo(
          crownBarbR * Math.cos(-crownBarbAngle),
          crownBarbR * Math.sin(-crownBarbAngle)
        );
        ctx.lineTo(crownTipR, 0);
        ctx.lineTo(
          crownBarbR * Math.cos(crownBarbAngle),
          crownBarbR * Math.sin(crownBarbAngle)
        );
        ctx.closePath();
        ctx.fillStyle = frostWhite;
        ctx.fill();
        ctx.strokeStyle = frozenLakeDeep;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Inner ridge line along the arm axis for 3D crystal refraction
        ctx.beginPath();
        ctx.moveTo(barbBaseR, 0);
        ctx.lineTo(crownTipR, 0);
        ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.8)" : "rgba(2, 132, 199, 0.7)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Outer crystal node tip (Glowing ice node)
        ctx.beginPath();
        ctx.arc(crownTipR, 0, isThinking ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = snowWhite;
        ctx.shadowColor = iceCyan;
        ctx.shadowBlur = isThinking ? 12 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // -------------------------------------------------------------------
        // 5. INTER-ARM SECONDARY DIAMONDS (Rotated by 30 deg between arms)
        // -------------------------------------------------------------------
        ctx.save();
        ctx.rotate(Math.PI / 6); // 30 deg offset

        const interInnerR = currentR * 0.40;
        const interOuterR = currentR * 0.76;
        const interSideR = currentR * 0.58;
        const interSideAngle = Math.PI / 14;

        ctx.beginPath();
        ctx.moveTo(interInnerR, 0);
        ctx.lineTo(
          interSideR * Math.cos(-interSideAngle),
          interSideR * Math.sin(-interSideAngle)
        );
        ctx.lineTo(interOuterR, 0);
        ctx.lineTo(
          interSideR * Math.cos(interSideAngle),
          interSideR * Math.sin(interSideAngle)
        );
        ctx.closePath();

        // Shading: Deep Frozen Lake Blue with subtle ice gleam
        ctx.fillStyle = isDark ? frozenLakeLight : frozenLakeMid;
        ctx.fill();
        ctx.strokeStyle = snowWhite;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Little outer diamond star at the tip of the inter-arm
        ctx.beginPath();
        ctx.arc(interOuterR, 0, isThinking ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = iceCyan;
        ctx.fill();

        ctx.restore();

        ctx.restore();
      }

      // Central Core Jewel (Ice Hexagon Center)
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const rx = Math.cos(a) * (currentR * 0.05);
        const ry = Math.sin(a) * (currentR * 0.05);
        if (i === 0) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      ctx.closePath();
      ctx.fillStyle = snowWhite;
      ctx.shadowColor = iceCyan;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      // =======================================================================
      // FLOATING ICE SPARKLE PARTICLES (Crystalline snow drifting gracefully)
      // =======================================================================
      for (let i = 0; i < sparkles.length; i++) {
        const sp = sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life += 1;

        if (sp.life > sp.maxLife || Math.abs(sp.x) > baseR * 1.5 || Math.abs(sp.y) > baseR * 1.5) {
          sp.x = (Math.random() - 0.5) * baseR * 1.2;
          sp.y = (Math.random() - 0.5) * baseR * 1.2;
          sp.life = 0;
        }

        const lifeRatio = sp.life / sp.maxLife;
        const currentAlpha = Math.sin(lifeRatio * Math.PI) * (isThinking ? 0.8 : 0.45);

        ctx.beginPath();
        ctx.arc(cx + sp.x, cy + sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.shadowColor = iceCyan;
        ctx.shadowBlur = isThinking ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [isThinking, theme]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative flex items-center justify-center overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none select-none"
      />
    </div>
  );
}
