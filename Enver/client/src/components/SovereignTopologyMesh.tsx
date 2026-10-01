import React, { useEffect, useRef } from "react";

interface SovereignTopologyMeshProps {
  isThinking: boolean;
  theme?: "tranquil" | "nocturne";
  className?: string;
}

interface GridNode {
  gx: number; // grid x coordinate (-cols/2 to cols/2)
  gy: number; // grid y coordinate (-rows/2 to rows/2)
  baseZ: number;
}

export default function SovereignTopologyMesh({
  isThinking,
  theme = "tranquil",
  className = ""
}: SovereignTopologyMeshProps) {
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

    // Generate Topological Isometric Grid (Planar matrix, NOT a circle, NOT a lantern)
    const COLS = 22;
    const ROWS = 16;
    const SPACING_X = 26;
    const SPACING_Y = 22;

    const nodes: GridNode[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        nodes.push({
          gx: (c - (COLS - 1) / 2) * SPACING_X,
          gy: (r - (ROWS - 1) / 2) * SPACING_Y,
          baseZ: 0
        });
      }
    }

    // Isometric 3D Projection parameters
    const ISO_PITCH = 0.88; // Tilt angle
    const ISO_YAW = 0.42;   // Rotation angle

    // Floating Telemetry Tags placed at strategic grid intersections
    const telemetryMarkers = [
      { col: 4, row: 3, label: "AST_GUARD :: ACTIVE", tag: "NODE-01" },
      { col: 17, row: 5, label: "0.00% TOKEN DRIFT", tag: "DL-09" },
      { col: 8, row: 12, label: "SOVEREIGN ENCLAVE", tag: "AIR-GAPPED" },
      { col: 15, row: 11, label: "SHA256 :: 8F9B2C", tag: "LOCKED" }
    ];

    let startTime = performance.now();

    const render = () => {
      const now = performance.now();
      const t = (now - startTime) * 0.001;

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.06;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 + 10;

      const dynamicYaw = ISO_YAW + mousePos.current.x * 0.18;
      const dynamicPitch = ISO_PITCH + mousePos.current.y * 0.12;

      const cosYaw = Math.cos(dynamicYaw);
      const sinYaw = Math.sin(dynamicYaw);
      const cosPitch = Math.cos(dynamicPitch);
      const sinPitch = Math.sin(dynamicPitch);

      // Compute vertex elevations & 3D projections
      const waveSpeed = isThinking ? 2.8 : 1.4;
      const waveAmp = isThinking ? 28 : 16;
      const freq = 0.018;

      const projected: Array<{ x: number; y: number; z: number; elevation: number; alpha: number }> = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Complex multi-frequency wave interference
        const distFromCenter = Math.sqrt(node.gx * node.gx + node.gy * node.gy);
        const wave1 = Math.sin(node.gx * freq + t * waveSpeed) * Math.cos(node.gy * freq + t * (waveSpeed * 0.8));
        const wave2 = Math.sin((distFromCenter * 0.02) - t * (waveSpeed * 1.2)) * 0.45;
        const elevation = (wave1 + wave2) * waveAmp;

        // Mouse gravity ripple
        const mdx = node.gx - mousePos.current.x * 120;
        const mdy = node.gy - mousePos.current.y * 100;
        const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mouseEffect = Math.max(0, 1 - mouseDist / 140) * (isThinking ? 22 : 14);

        const totalZ = elevation + mouseEffect;

        // 3D Isometric rotation
        const rx = node.gx * cosYaw - node.gy * sinYaw;
        const ry = node.gx * sinYaw + node.gy * cosYaw;

        const pz = ry * sinPitch + totalZ * cosPitch;
        const py = ry * cosPitch - totalZ * sinPitch;
        const px = rx;

        // Perspective foreshortening
        const cameraDist = 480;
        const perspective = cameraDist / (cameraDist + pz);

        const screenX = centerX + px * perspective;
        const screenY = centerY + py * perspective;

        // Depth fogging
        const depthNorm = Math.max(0.15, Math.min(1, (pz + 180) / 360));
        const alpha = depthNorm * (theme === "tranquil" ? 0.85 : 0.95);

        projected.push({ x: screenX, y: screenY, z: pz, elevation: totalZ, alpha });
      }

      // Draw Grid Lines (Columns & Rows connecting the topological mesh)
      const primaryColor = theme === "tranquil" ? "2, 132, 199" : "56, 189, 248";
      const accentColor = theme === "tranquil" ? "14, 165, 233" : "52, 211, 153";

      // 1. Horizontal row lines
      for (let r = 0; r < ROWS; r++) {
        ctx.beginPath();
        let started = false;
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const p = projected[idx];
          if (!p) continue;
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        const rowAvgAlpha = projected[r * COLS + Math.floor(COLS / 2)]?.alpha || 0.5;
        ctx.strokeStyle = `rgba(${primaryColor}, ${rowAvgAlpha * 0.45})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 2. Vertical column lines
      for (let c = 0; c < COLS; c++) {
        ctx.beginPath();
        let started = false;
        for (let r = 0; r < ROWS; r++) {
          const idx = r * COLS + c;
          const p = projected[idx];
          if (!p) continue;
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        const colAvgAlpha = projected[Math.floor(ROWS / 2) * COLS + c]?.alpha || 0.5;
        ctx.strokeStyle = `rgba(${primaryColor}, ${colAvgAlpha * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. High-Speed Energy Packets traveling along the grid
      const packetCount = isThinking ? 8 : 4;
      for (let k = 0; k < packetCount; k++) {
        const row = (Math.floor(t * (k + 1) * 2.5) + k * 3) % ROWS;
        const colProgress = ((t * (1.2 + k * 0.3) + k * 0.25) % 1) * (COLS - 1);
        const colIndex = Math.floor(colProgress);
        const colFraction = colProgress - colIndex;

        const p1 = projected[row * COLS + colIndex];
        const p2 = projected[row * COLS + Math.min(COLS - 1, colIndex + 1)];

        if (p1 && p2) {
          const px = p1.x + (p2.x - p1.x) * colFraction;
          const py = p1.y + (p2.y - p1.y) * colFraction;

          // Packet radiant head
          const rad = isThinking ? 3.5 : 2.5;
          ctx.beginPath();
          ctx.arc(px, py, rad, 0, Math.PI * 2);
          ctx.fillStyle = theme === "tranquil" ? "#0284C7" : "#34D399";
          ctx.shadowColor = theme === "tranquil" ? "#38BDF8" : "#22C55E";
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 4. Glowing intersection vertices
      for (let i = 0; i < projected.length; i += 3) {
        const p = projected[i];
        if (!p) continue;
        const isPeak = p.elevation > waveAmp * 0.6;
        if (isPeak || isThinking) {
          const ptSize = isPeak ? 2.2 : 1.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, ptSize, 0, Math.PI * 2);
          ctx.fillStyle = isPeak
            ? `rgba(${accentColor}, ${p.alpha * 0.9})`
            : `rgba(${primaryColor}, ${p.alpha * 0.6})`;
          ctx.fill();
        }
      }

      // 5. Draw Floating Telemetry Marker HUDs
      ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
      for (let m = 0; m < telemetryMarkers.length; m++) {
        const marker = telemetryMarkers[m];
        const idx = marker.row * COLS + marker.col;
        const p = projected[idx];
        if (!p) continue;

        const anchorX = p.x;
        const anchorY = p.y - 12;

        // Pointer line
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(anchorX, anchorY);
        ctx.strokeStyle = `rgba(${accentColor}, ${p.alpha * 0.7})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node badge pill
        ctx.fillStyle = theme === "tranquil" ? "rgba(255, 255, 255, 0.92)" : "rgba(7, 25, 38, 0.88)";
        ctx.strokeStyle = `rgba(${accentColor}, ${p.alpha * 0.6})`;
        ctx.lineWidth = 0.8;

        const textWidth = ctx.measureText(marker.label).width;
        const boxW = textWidth + 14;
        const boxH = 16;
        const boxX = anchorX - boxW / 2;
        const boxY = anchorY - boxH;

        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = theme === "tranquil" ? "#0369A1" : "#38BDF8";
        ctx.fillText(marker.label, boxX + 7, boxY + 11);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mousePos.current.targetX = Math.max(-1, Math.min(1, x));
      mousePos.current.targetY = Math.max(-1, Math.min(1, y));
    };

    const handleMouseLeave = () => {
      mousePos.current.targetX = 0;
      mousePos.current.targetY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isThinking, theme]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[160px] flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
    </div>
  );
}
