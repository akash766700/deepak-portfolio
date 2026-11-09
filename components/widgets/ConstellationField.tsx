"use client";

import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";

export interface ConstellationFieldProps {
  mode?: "dark" | "light";
  color?: string;
  speed?: number;
  size?: number;
  strokeWidth?: number;
  length?: number;
  density?: number;
  opacity?: number;
  pointerGravity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function ConstellationField({
  mode = "light",
  color,
  speed = 1.25,
  size = 0.85,
  strokeWidth = 1.25,
  length = 1.30,
  density = 0.75,
  opacity = 0.5,
  pointerGravity = 0.20,
  hue = 50,
  saturation = 1.22,
  brightness = 1.17,
  style,
}: ConstellationFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    let animId: number;
    let nodes: Node[] = [];
    let canvasRect = canvas.getBoundingClientRect();

    const linkDistance = Math.round(160 * length);
    const linkDistSq = linkDistance * linkDistance;
    const pointer = { x: -2000, y: -2000 };

    const updateRect = () => {
      if (canvas) {
        canvasRect = canvas.getBoundingClientRect();
      }
    };

    const resize = () => {
      if (!container || !canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateRect();
    };

    const initNodes = () => {
      nodes = [];
      const baseCount = width < 768 ? 40 : 85;
      const maxNodes = Math.max(8, Math.round(baseCount * density));

      for (let i = 0; i < maxNodes; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4 * speed,
          vy: (Math.random() - 0.5) * 0.4 * speed,
          radius: (Math.random() * 2.4 + 1.8) * size,
        });
      }
    };

    resize();
    initNodes();

    // Cache rect and prevent layout reflow thrashing on mousemove
    const handlePointerMove = (e: MouseEvent) => {
      pointer.x = e.clientX - canvasRect.left;
      pointer.y = e.clientY - canvasRect.top;
    };

    const handlePointerLeave = () => {
      pointer.x = -2000;
      pointer.y = -2000;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    let lastW = width;
    let lastH = height;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const curW = entry.contentRect.width;
        const curH = entry.contentRect.height;
        // Only re-init if meaningful size shift occurred (>30px)
        if (Math.abs(curW - lastW) > 30 || Math.abs(curH - lastH) > 30) {
          lastW = curW;
          lastH = curH;
          resize();
          initNodes();
        }
      }
    });
    resizeObserver.observe(container);

    // Color palette: Clean deep graphite/black for light mode, gold/emerald for dark mode
    const nodeColor = color || (mode === "light" ? "#1E293B" : "#E6C879");

    // Pre-allocated path buckets for 32x faster draw batching
    // Bucket 0: faint distant lines, Bucket 1: medium lines, Bucket 2: close strong lines
    let lastTimestamp = performance.now();

    const animateCanvas = (currentTimestamp: number) => {
      const dt = Math.min(32, currentTimestamp - lastTimestamp) * 0.06; // normalize to 60fps unit (~1.0)
      lastTimestamp = currentTimestamp;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.lineWidth = Math.max(0.5, strokeWidth);
      ctx.strokeStyle = nodeColor;

      const n = nodes.length;

      // 1. Path batching arrays to replace 500+ draw calls with 3 single-pass strokes
      const faintPaths: [number, number, number, number][] = [];
      const midPaths: [number, number, number, number][] = [];
      const strongPaths: [number, number, number, number][] = [];

      for (let i = 0; i < n; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < n; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < linkDistSq) {
            const ratio = distSq / linkDistSq; // 0 (very close) to 1 (at link boundary)
            if (ratio > 0.55) {
              faintPaths.push([ni.x, ni.y, nj.x, nj.y]);
            } else if (ratio > 0.22) {
              midPaths.push([ni.x, ni.y, nj.x, nj.y]);
            } else {
              strongPaths.push([ni.x, ni.y, nj.x, nj.y]);
            }
          }
        }
      }

      // Draw Bucket 0 (Faint links)
      if (faintPaths.length > 0) {
        ctx.globalAlpha = Math.min(1, 0.12 * opacity);
        ctx.beginPath();
        for (let k = 0; k < faintPaths.length; k++) {
          const p = faintPaths[k];
          ctx.moveTo(p[0], p[1]);
          ctx.lineTo(p[2], p[3]);
        }
        ctx.stroke();
      }

      // Draw Bucket 1 (Mid-distance links)
      if (midPaths.length > 0) {
        ctx.globalAlpha = Math.min(1, 0.25 * opacity);
        ctx.beginPath();
        for (let k = 0; k < midPaths.length; k++) {
          const p = midPaths[k];
          ctx.moveTo(p[0], p[1]);
          ctx.lineTo(p[2], p[3]);
        }
        ctx.stroke();
      }

      // Draw Bucket 2 (Close strong links)
      if (strongPaths.length > 0) {
        ctx.globalAlpha = Math.min(1, 0.42 * opacity);
        ctx.beginPath();
        for (let k = 0; k < strongPaths.length; k++) {
          const p = strongPaths[k];
          ctx.moveTo(p[0], p[1]);
          ctx.lineTo(p[2], p[3]);
        }
        ctx.stroke();
      }

      // 2. Update node positions with smooth dt
      const gravityRadius = 220;
      const gravityRadiusSq = gravityRadius * gravityRadius;

      for (let i = 0; i < n; i++) {
        const node = nodes[i];

        node.x += node.vx * dt;
        node.y += node.vy * dt;

        // Smooth boundary bounce
        if (node.x < 0) {
          node.x = 0;
          node.vx = Math.abs(node.vx);
        } else if (node.x > width) {
          node.x = width;
          node.vx = -Math.abs(node.vx);
        }

        if (node.y < 0) {
          node.y = 0;
          node.vy = Math.abs(node.vy);
        } else if (node.y > height) {
          node.y = height;
          node.vy = -Math.abs(node.vy);
        }

        // Smooth interactive pointer gravity
        const pdx = node.x - pointer.x;
        const pdy = node.y - pointer.y;
        const pdSq = pdx * pdx + pdy * pdy;

        if (pdSq < gravityRadiusSq) {
          const pd = Math.sqrt(pdSq);
          const pull = (1 - pd / gravityRadius) * 0.065 * dt;
          node.x -= pdx * pull;
          node.y -= pdy * pull;
        }
      }

      // 3. Batched Node Rendering (Only 2 draw passes for ALL nodes instead of 128+)
      ctx.fillStyle = nodeColor;

      // Pass A: Outer soft halos (single batched path)
      ctx.globalAlpha = Math.min(1, 0.12 * opacity);
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const node = nodes[i];
        ctx.moveTo(node.x + node.radius * 2.2, node.y);
        ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
      }
      ctx.fill();

      // Pass B: Inner crisp cores (single batched path)
      ctx.globalAlpha = Math.min(1, 0.65 * opacity);
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const node = nodes[i];
        ctx.moveTo(node.x + node.radius, node.y);
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      }
      ctx.fill();

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animateCanvas);
    };

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(animateCanvas);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", updateRect);
      resizeObserver.disconnect();
    };
  }, [mode, color, speed, size, strokeWidth, length, density, opacity, pointerGravity]);

  // CSS Filter only applied for dark mode colored variants; for light mode with black texture, true black is preserved
  const filter =
    mode === "light"
      ? undefined
      : hue === 0 && saturation === 1 && brightness === 1
      ? undefined
      : `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    >
      {/* 1. Base Studio Radial Gradient Shell */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            mode === "light"
              ? "radial-gradient(ellipse at 50% 45%, #FFFFFF 0%, #F5F7FA 55%, #E3E7ED 100%)"
              : "radial-gradient(ellipse at center, #0E1222 0%, #070914 100%)",
        }}
      />

      {/* 2. Interactive Constellation Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          filter,
        }}
      />

      {/* 3. Smooth Depth Vignette Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            mode === "light"
              ? "linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, transparent 40%, rgba(220,225,232,0.35) 100%)"
              : "linear-gradient(to bottom, transparent, rgba(14, 18, 34, 0.45), #070914)",
          opacity: 0.85,
        }}
      />
    </Box>
  );
}
