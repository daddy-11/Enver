"use client";

import { useEffect, useRef } from "react";

export function MiniGeoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    
    const W = c.width, H = c.height;
    ctx.fillStyle = "#EBF5FF";
    ctx.fillRect(0, 0, W, H);
    
    ctx.strokeStyle = "rgba(27,43,75,0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y <= H; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    
    const pts = [
      [60,25], [90,18], [120,20], [150,18], [180,22], [210,28], [230,35],
      [60,50], [90,42], [120,45], [150,44], [180,48], [210,52],
      [80,70], [110,65], [140,68], [170,70], [200,72]
    ];
    
    pts.forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(27,43,75,0.12)"; ctx.fill();
      ctx.strokeStyle = "rgba(27,43,75,0.4)"; ctx.lineWidth = 0.8; ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#1B2B4B"; ctx.fill();
    });
    
    ctx.strokeStyle = "rgba(232,102,10,0.5)"; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
    ctx.strokeRect(90, 12, 120, 80); ctx.setLineDash([]);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={90} 
      style={{ width: '100%', borderRadius: 8, marginTop: 8 }} 
    />
  );
}
