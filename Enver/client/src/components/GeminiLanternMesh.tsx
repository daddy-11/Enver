import React, { useEffect, useRef } from "react";

interface GeminiLanternMeshProps {
  structurization: number; // 0.0 to 1.0
  isThinking: boolean;
  theme?: "tranquil" | "nocturne";
  className?: string;
}

interface Vertex3D {
  lx: number;
  ly: number;
  lz: number;
  // Ambient breathing offsets (slender vertical cylinder, NOT a sphere!)
  driftPhase: number;
  driftSpeed: number;
  driftAmp: number;
  type: "finial" | "dome" | "rib" | "ring" | "base" | "cricket" | "accent";
}

interface Edge {
  a: number;
  b: number;
  isLattice?: boolean;
}

// Architectural 3D wireframe blueprint of the Victorian Sovereign Lantern (Tall Cylindrical)
function createArchitecturalLanternGeometry() {
  const vertices: Vertex3D[] = [];
  const edges: Edge[] = [];

  const addVertex = (
    lx: number,
    ly: number,
    lz: number,
    type: Vertex3D["type"]
  ): number => {
    const idx = vertices.length;
    vertices.push({
      lx,
      ly,
      lz,
      driftPhase: Math.random() * Math.PI * 2,
      driftSpeed: Math.random() * 0.5 + 0.4,
      driftAmp: Math.random() * 4 + 2,
      type
    });
    return idx;
  };

  const addEdge = (a: number, b: number, isLattice = false) => {
    edges.push({ a, b, isLattice });
  };

  // =========================================================================
  // 1. TOP SUSPENSION LOOP & APEX FINIAL (y: -160 to -130)
  // =========================================================================
  const loopCount = 10;
  const loopRadius = 13;
  const loopCenterY = -146;
  const loopIndices: number[] = [];
  for (let i = 0; i < loopCount; i++) {
    const a = (i / loopCount) * Math.PI * 2;
    const x = Math.cos(a) * loopRadius;
    const y = loopCenterY + Math.sin(a) * loopRadius;
    const idx = addVertex(x, y, 0, "finial");
    loopIndices.push(idx);
    if (i > 0) addEdge(loopIndices[i - 1], idx);
  }
  addEdge(loopIndices[loopCount - 1], loopIndices[0]);

  // Apex tip
  const apexIdx = addVertex(0, -132, 0, "finial");
  addEdge(loopIndices[Math.floor(loopCount / 4)], apexIdx);

  // =========================================================================
  // 2. TIERED VICTORIAN DOME & CROWN EAVES (y: -130 to -85)
  // =========================================================================
  // Tier 1 (Upper dome cap: R = 18, y = -118)
  const domeTier1Count = 8;
  const domeTier1R = 18;
  const domeTier1Y = -118;
  const tier1Indices: number[] = [];
  for (let i = 0; i < domeTier1Count; i++) {
    const a = (i / domeTier1Count) * Math.PI * 2;
    const idx = addVertex(Math.cos(a) * domeTier1R, domeTier1Y, Math.sin(a) * domeTier1R, "dome");
    tier1Indices.push(idx);
    addEdge(apexIdx, idx);
    if (i > 0) addEdge(tier1Indices[i - 1], idx);
  }
  addEdge(tier1Indices[domeTier1Count - 1], tier1Indices[0]);

  // Tier 2 (Crown collar eaves: R = 38, y = -95)
  const domeTier2Count = 12;
  const domeTier2R = 38;
  const domeTier2Y = -95;
  const tier2Indices: number[] = [];
  for (let i = 0; i < domeTier2Count; i++) {
    const a = (i / domeTier2Count) * Math.PI * 2;
    const idx = addVertex(Math.cos(a) * domeTier2R, domeTier2Y, Math.sin(a) * domeTier2R, "dome");
    tier2Indices.push(idx);
    if (i > 0) addEdge(tier2Indices[i - 1], idx);
  }
  addEdge(tier2Indices[domeTier2Count - 1], tier2Indices[0]);

  // Connect tier 1 to tier 2
  for (let i = 0; i < domeTier1Count; i++) {
    const t2Idx = Math.round((i / domeTier1Count) * domeTier2Count) % domeTier2Count;
    addEdge(tier1Indices[i], tier2Indices[t2Idx]);
  }

  // Tier 3 (Upper Eaves Rim: R = 44, y = -85)
  const eavesCount = 16;
  const eavesR = 44;
  const eavesY = -85;
  const eavesIndices: number[] = [];
  for (let i = 0; i < eavesCount; i++) {
    const a = (i / eavesCount) * Math.PI * 2;
    const idx = addVertex(Math.cos(a) * eavesR, eavesY, Math.sin(a) * eavesR, "ring");
    eavesIndices.push(idx);
    if (i > 0) addEdge(eavesIndices[i - 1], idx);
  }
  addEdge(eavesIndices[eavesCount - 1], eavesIndices[0]);

  // =========================================================================
  // 3. TALL CYLINDRICAL CAGE (8 Vertical Brass Ribs from y = -85 to +50)
  // Height = 135px, Slender Cylinder Radius = 42px
  // =========================================================================
  const ribCount = 8;
  const cageR = 42;
  const ribLevels = [-85, -55, -20, 15, 50];
  const ribColIndices: number[][] = [];

  for (let r = 0; r < ribCount; r++) {
    const a = (r / ribCount) * Math.PI * 2;
    const x = Math.cos(a) * cageR;
    const z = Math.sin(a) * cageR;
    const col: number[] = [];

    for (let l = 0; l < ribLevels.length; l++) {
      const y = ribLevels[l];
      const idx = addVertex(x, y, z, "rib");
      col.push(idx);
      if (l > 0) addEdge(col[l - 1], idx); // Vertical brass rib strut
    }
    ribColIndices.push(col);

    // Connect top of each rib to upper eaves rim
    const eIdx = Math.round((r / ribCount) * eavesCount) % eavesCount;
    addEdge(col[0], eavesIndices[eIdx]);
  }

  // =========================================================================
  // 4. DUAL WAIST RINGS & LATTICE STRUTS (y = -20 and y = 15)
  // =========================================================================
  for (let r = 0; r < ribCount; r++) {
    const nextR = (r + 1) % ribCount;
    // Waist ring 1 (y = -20)
    addEdge(ribColIndices[r][2], ribColIndices[nextR][2]);
    // Waist ring 2 (y = 15)
    addEdge(ribColIndices[r][3], ribColIndices[nextR][3]);
    // Diagonal Victorian cross-lattice
    addEdge(ribColIndices[r][1], ribColIndices[nextR][2], true);
    addEdge(ribColIndices[r][2], ribColIndices[nextR][3], true);
    addEdge(ribColIndices[r][3], ribColIndices[nextR][4], true);
  }

  // Bottom cage ring (y = 50)
  for (let r = 0; r < ribCount; r++) {
    const nextR = (r + 1) % ribCount;
    addEdge(ribColIndices[r][4], ribColIndices[nextR][4]);
  }

  // =========================================================================
  // 5. INTERNAL EMERALD CRICKET AUTOMATON CORE (y = -35 to +10)
  // Suspended in center: glowing emerald green filament & automaton nodes
  // =========================================================================
  const cricketCount = 14;
  const cricketIndices: number[] = [];
  for (let i = 0; i < cricketCount; i++) {
    const t = i / cricketCount;
    const a = t * Math.PI * 4;
    const r = 6 + Math.sin(t * Math.PI) * 9;
    const y = -30 + t * 38;
    const idx = addVertex(Math.cos(a) * r, y, Math.sin(a) * r, "cricket");
    cricketIndices.push(idx);
    if (i > 0) addEdge(cricketIndices[i - 1], idx);
  }
  // Connect cricket heart to cage ribs with suspension wires
  addEdge(cricketIndices[0], ribColIndices[0][1], true);
  addEdge(cricketIndices[Math.floor(cricketCount / 2)], ribColIndices[4][2], true);
  addEdge(cricketIndices[cricketCount - 1], ribColIndices[2][3], true);

  // =========================================================================
  // 6. FLARED PEDESTAL BASE (y = 50 to 125)
  // =========================================================================
  // Base Collar 1 (R = 48, y = 68)
  const base1Count = 10;
  const base1R = 48;
  const base1Y = 68;
  const base1Indices: number[] = [];
  for (let i = 0; i < base1Count; i++) {
    const a = (i / base1Count) * Math.PI * 2;
    const idx = addVertex(Math.cos(a) * base1R, base1Y, Math.sin(a) * base1R, "base");
    base1Indices.push(idx);
    if (i > 0) addEdge(base1Indices[i - 1], idx);
  }
  addEdge(base1Indices[base1Count - 1], base1Indices[0]);

  // Connect cage bottom to base collar 1
  for (let r = 0; r < ribCount; r++) {
    const b1Idx = Math.round((r / ribCount) * base1Count) % base1Count;
    addEdge(ribColIndices[r][4], base1Indices[b1Idx]);
  }

  // Base Rim 2 (Flared Stepped Ring: R = 58, y = 98)
  const base2Count = 12;
  const base2R = 58;
  const base2Y = 98;
  const base2Indices: number[] = [];
  for (let i = 0; i < base2Count; i++) {
    const a = (i / base2Count) * Math.PI * 2;
    const idx = addVertex(Math.cos(a) * base2R, base2Y, Math.sin(a) * base2R, "base");
    base2Indices.push(idx);
    if (i > 0) addEdge(base2Indices[i - 1], idx);
  }
  addEdge(base2Indices[base2Count - 1], base2Indices[0]);

  for (let i = 0; i < base1Count; i++) {
    const b2Idx = Math.round((i / base1Count) * base2Count) % base2Count;
    addEdge(base1Indices[i], base2Indices[b2Idx]);
  }

  // 4 Ornate Pedestal Feet (y = 118, R = 62)
  const footAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
  footAngles.forEach((fa) => {
    const fx = Math.cos(fa) * 62;
    const fz = Math.sin(fa) * 62;
    const footIdx = addVertex(fx, 118, fz, "base");
    const closestB2 = Math.round(((fa + Math.PI * 2) % (Math.PI * 2)) / ((Math.PI * 2) / base2Count)) % base2Count;
    addEdge(base2Indices[closestB2], footIdx);
  });

  return { vertices, edges };
}

export default function GeminiLanternMesh({
  structurization = 1,
  isThinking = false,
  theme = "tranquil",
  className = ""
}: GeminiLanternMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dataRef = useRef<{
    vertices: Vertex3D[];
    edges: Edge[];
    angleY: number;
    mouseOffsetX: number;
    mouseOffsetY: number;
  }>({
    ...createArchitecturalLanternGeometry(),
    angleY: 0,
    mouseOffsetX: 0,
    mouseOffsetY: 0
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    dataRef.current.mouseOffsetX = nx * 0.35;
    dataRef.current.mouseOffsetY = ny * 0.25;
  };

  const handleMouseLeave = () => {
    dataRef.current.mouseOffsetX = 0;
    dataRef.current.mouseOffsetY = 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Elegant 3D continuous rotation
      const rotSpeed = isThinking ? 0.75 : 0.35;
      dataRef.current.angleY += dt * rotSpeed;

      const yaw = dataRef.current.angleY + dataRef.current.mouseOffsetX;
      const pitch = dataRef.current.mouseOffsetY * 0.4;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      const s = Math.max(0.15, Math.min(1, structurization));
      const { vertices, edges } = dataRef.current;
      const projected: Array<{ x: number; y: number; z: number; scale: number; type: string }> = [];

      // Camera projection constants (Tall perspective framing)
      const fov = 400;
      const cameraZ = 360;

      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];

        // Slender breathing drift around lantern coordinate
        const drift = Math.sin(time * 0.0012 * v.driftSpeed + v.driftPhase) * v.driftAmp * (1 - s * 0.75);
        const x3d = v.lx + (v.type === "rib" ? 0 : drift);
        const y3d = v.ly + drift * 0.5;
        const z3d = v.lz + (v.type === "rib" ? 0 : drift);

        // 3D Matrix Rotation (Yaw around Y, Pitch around X)
        const rx = x3d * cosY + z3d * sinY;
        const rz = -x3d * sinY + z3d * cosY;
        const ry = y3d * cosX - rz * sinX;
        const finalZ = y3d * sinX + rz * cosX;

        const scale = fov / (finalZ + cameraZ);
        const px = centerX + rx * scale;
        const py = centerY + ry * scale;

        projected.push({ x: px, y: py, z: finalZ, scale, type: v.type });
      }

      // Draw Radiant Emerald Core Glow in the heart of the lantern
      const pulse = isThinking ? Math.sin(time * 0.008) * 0.2 : Math.sin(time * 0.003) * 0.08;
      const coreAlpha = 0.45 + pulse + s * 0.3;
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY - 5,
        0,
        centerX,
        centerY - 5,
        75
      );
      coreGrad.addColorStop(0, `rgba(34, 197, 94, ${coreAlpha * 0.9})`);
      coreGrad.addColorStop(0.4, `rgba(16, 185, 129, ${coreAlpha * 0.45})`);
      coreGrad.addColorStop(0.7, `rgba(56, 189, 248, ${coreAlpha * 0.2})`);
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 5, 80, 0, Math.PI * 2);
      ctx.fill();

      // Draw Wireframe Struts & Brass Cage Bars
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        const p1 = projected[edge.a];
        const p2 = projected[edge.b];
        if (!p1 || !p2) continue;

        const avgZ = (p1.z + p2.z) / 2;
        const depthAlpha = Math.max(0.18, Math.min(1, 1 - avgZ / 260));

        let strokeStyle = "";
        let lineWidth = 1;

        if (edge.isLattice) {
          // Victorian cross-lattice support wires
          strokeStyle = theme === "tranquil"
            ? `rgba(2, 132, 199, ${0.25 * depthAlpha})`
            : `rgba(56, 189, 248, ${0.25 * depthAlpha})`;
          lineWidth = 0.8;
        } else if (p1.type === "cricket" || p2.type === "cricket") {
          // Internal living cricket automaton core lines
          strokeStyle = `rgba(34, 197, 94, ${0.75 * depthAlpha})`;
          lineWidth = 1.6;
        } else if (p1.type === "rib" && p2.type === "rib") {
          // Tall vertical brass cage columns
          strokeStyle = theme === "tranquil"
            ? `rgba(2, 132, 199, ${0.85 * depthAlpha})`
            : `rgba(56, 189, 248, ${0.9 * depthAlpha})`;
          lineWidth = 1.7;
        } else {
          // Rings, dome eaves, pedestal base
          strokeStyle = theme === "tranquil"
            ? `rgba(14, 165, 233, ${0.65 * depthAlpha})`
            : `rgba(56, 189, 248, ${0.7 * depthAlpha})`;
          lineWidth = 1.2;
        }

        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Live High-Voltage Sparks traveling along the vertical brass ribs
      if (isThinking) {
        const sparkProgress = (time * 0.0025) % 1;
        const ribEdges = edges.filter(e => !e.isLattice && vertices[e.a].type === "rib" && vertices[e.b].type === "rib");
        for (let k = 0; k < ribEdges.length; k += 2) {
          const e = ribEdges[k];
          const p1 = projected[e.a];
          const p2 = projected[e.b];
          if (p1 && p2) {
            const sx = p1.x + (p2.x - p1.x) * sparkProgress;
            const sy = p1.y + (p2.y - p1.y) * sparkProgress;
            ctx.fillStyle = "#34D399";
            ctx.shadowColor = "#22C55E";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Draw Illuminated Vertices (Nodes)
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthAlpha = Math.max(0.2, Math.min(1, 1 - p.z / 280));
        let nodeColor = "#38BDF8";
        let nodeRadius = 1.8 * p.scale;

        if (p.type === "cricket") {
          nodeColor = "#22C55E";
          nodeRadius = 2.4 * p.scale;
        } else if (p.type === "finial" || p.type === "dome") {
          nodeColor = theme === "tranquil" ? "#0284C7" : "#F59E0B";
          nodeRadius = 2.0 * p.scale;
        } else if (p.type === "rib") {
          nodeColor = "#38BDF8";
          nodeRadius = 2.0 * p.scale;
        }

        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = depthAlpha * 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, nodeRadius), 0, Math.PI * 2);
        ctx.fill();

        if (p.type === "cricket") {
          ctx.fillStyle = "rgba(34, 197, 94, 0.4)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRadius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [structurization, isThinking, theme]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
    >
      {/* 3D Wireframe Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0 z-10 pointer-events-none"
      />

      {/* Sovereign Artifact Materialization: The Transparent Gemini Cricket Lantern */}
      <div
        className="relative z-20 pointer-events-none transition-all duration-700 flex items-center justify-center"
        style={{
          opacity: 0.85 + (isThinking ? 0.15 : 0),
          transform: `scale(${0.92 + structurization * 0.08})`,
          filter: `drop-shadow(0 0 25px rgba(34, 197, 94, ${0.35 + (isThinking ? 0.3 : 0)}))`
        }}
      >
        <img
          src="/gemini-cricket-lantern-transparent.png"
          alt="Gemini the Cricket Lantern (Lies of P Sovereign Artifact)"
          className="w-44 sm:w-52 h-auto object-contain mix-blend-screen opacity-90 transition-opacity duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/gemini-cricket-lantern.png";
          }}
        />
      </div>

      {/* Floating Status HUD below the lantern */}
      <div className="absolute bottom-2 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isThinking
              ? "bg-emerald-400 animate-ping shadow-[0_0_8px_#34D399]"
              : "bg-emerald-400 shadow-[0_0_6px_#22C55E]"
          }`}
        />
        <span>
          {isThinking
            ? `Structurizing Sovereign Blueprint (${Math.round(structurization * 100)}%)`
            : "Gemini Cricket: Sovereign Reactor Locked"}
        </span>
      </div>
    </div>
  );
}
