"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@emotion/react";

// Rotation animations for the concentric radar dashed rings
const rotateClockwise = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const rotateCounter = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

// Radar ripple expanding outward from the central hub
const radarRipple = keyframes`
  0% {
    transform: scale(0.75);
    opacity: 0.85;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
`;

// Core hub breathing aura
const hubAura = keyframes`
  0% {
    transform: scale(0.96);
    box-shadow: 0 0 24px rgba(59, 130, 246, 0.35);
  }
  50% {
    transform: scale(1.04);
    box-shadow: 0 0 42px rgba(59, 130, 246, 0.7);
  }
  100% {
    transform: scale(0.96);
    box-shadow: 0 0 24px rgba(59, 130, 246, 0.35);
  }
`;

export interface TechStackIcon {
  src: string;
  alt: string;
  name?: string;
  category?: string;
  color?: string;
}

export interface TechStackConvergenceProps {
  icons: TechStackIcon[];
  centralIcon?: string;
  className?: string;
  height?: number | string;
}

interface PulseParticle {
  t: number;
  speed: number;
  color: string;
  length: number;
  width: number;
}

export default function TechStackConvergence({
  icons,
  centralIcon = "/LogoNav.png",
  className = "",
  height = 560,
}: TechStackConvergenceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 1000, height: 560 });
  const [mousePos, setMousePos] = useState({ x: 500, y: 280 });
  const [isMouseInside, setIsMouseInside] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const n = icons.length;

  // Track container dimensions with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Node Positions (Left Column) and Hub Position (Right Side)
  const layout = useMemo(() => {
    const w = containerSize.width;
    const h = containerSize.height;

    // Responsive offsets with perfectly balanced visual margins on both sides
    const isMobile = w < 640;
    const nodeRadius = isMobile ? 22 : 26;
    const hubRadius = isMobile ? 38 : 46;

    // Outer radar ring radius around hub (Ring 3 extends hubRadius + 46px)
    const outerRingRadius = hubRadius + (isMobile ? 36 : 46);

    // Identical visual margin on both left and right edges (40px desktop, 24px mobile)
    const visualMargin = isMobile ? 24 : 40;

    // Left nodes center position:
    const nodeX = visualMargin + nodeRadius;

    // Right hub center position (ensures outer radar rings are completely uncropped):
    const hubX = w - (visualMargin + outerRingRadius);
    const hubY = h / 2;

    // Distribute left nodes vertically
    const topPad = isMobile ? 38 : 48;
    const bottomPad = isMobile ? 38 : 48;
    const availH = h - topPad - bottomPad;
    const spacing = n > 1 ? availH / (n - 1) : 0;

    const nodes = icons.map((_, i) => ({
      x: nodeX,
      y: topPad + i * spacing,
      radius: nodeRadius,
    }));

    return { w, h, nodes, hubX, hubY, hubRadius, nodeRadius };
  }, [containerSize, icons, n]);

  // Canvas Beam Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Initialize laser pulses for each curve
    const defaultPalette = [
      "#F59E0B", // Gold
      "#10B981", // Emerald
      "#3B82F6", // Blue
      "#06B6D4", // Cyan
      "#0070F2", // SAP Blue
      "#F59E0B", // Amber
      "#EF4444", // Crimson
      "#8B5CF6", // Violet
    ];

    // Each line has 2 asynchronous pulses for that rich neural stream flow
    const pulses: PulseParticle[][] = icons.map((icon, i) => {
      const color = icon.color || defaultPalette[i % defaultPalette.length];
      const baseSpeed = 0.0035 + (i % 3) * 0.0008;

      return [
        {
          t: (i * 0.18) % 1,
          speed: baseSpeed,
          color,
          length: 0.16,
          width: 2.8,
        },
        {
          t: (i * 0.18 + 0.52) % 1,
          speed: baseSpeed * 1.05,
          color,
          length: 0.14,
          width: 2.4,
        },
      ];
    });

    const cubicBezier = (
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number },
      t: number
    ) => {
      const mt = 1 - t;
      const mt2 = mt * mt;
      const mt3 = mt2 * mt;
      const t2 = t * t;
      const t3 = t2 * t;

      return {
        x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
        y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
      };
    };

    let sparks: { x: number; y: number; color: string; alpha: number; size: number }[] = [];

    const render = () => {
      const w = layout.w;
      const h = layout.h;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const hubX = layout.hubX;
      const hubY = layout.hubY;
      const hubLandingX = hubX - layout.hubRadius;

      // 1. Draw Base Faint Static Curves
      for (let i = 0; i < layout.nodes.length; i++) {
        const node = layout.nodes[i];
        const startX = node.x + node.radius;
        const startY = node.y;

        const dx = hubLandingX - startX;
        const p0 = { x: startX, y: startY };
        const p1 = { x: startX + dx * 0.44, y: startY };
        const p2 = { x: startX + dx * 0.56, y: hubY };
        const p3 = { x: hubLandingX, y: hubY };

        const isHovered = hoveredIdx === i;
        const hasHover = hoveredIdx !== null;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.strokeStyle = isHovered
          ? "rgba(15, 23, 42, 0.35)"
          : hasHover
          ? "rgba(15, 23, 42, 0.06)"
          : "rgba(15, 23, 42, 0.12)";
        ctx.lineWidth = isHovered ? 2.2 : 1.3;
        ctx.stroke();

        // 2. Draw Moving Glowing Laser Pulses Along the Curve
        const linePulses = pulses[i];
        for (const pulse of linePulses) {
          pulse.t += isHovered ? pulse.speed * 1.5 : pulse.speed;
          if (pulse.t >= 1) {
            pulse.t = 0;
            // Spawn subtle convergence spark at hub entrance
            if (sparks.length < 30) {
              sparks.push({
                x: hubLandingX + (Math.random() - 0.5) * 8,
                y: hubY + (Math.random() - 0.5) * 12,
                color: pulse.color,
                alpha: 1,
                size: Math.random() * 3 + 2,
              });
            }
          }

          const headT = pulse.t;
          const tailT = Math.max(0, headT - pulse.length);

          if (headT > 0 && tailT < 1) {
            const steps = 18;
            ctx.save();
            ctx.shadowColor = pulse.color;
            ctx.shadowBlur = isHovered ? 14 : 9;

            for (let s = 0; s < steps; s++) {
              const segT0 = tailT + ((headT - tailT) * s) / steps;
              const segT1 = tailT + ((headT - tailT) * (s + 1)) / steps;

              const pt0 = cubicBezier(p0, p1, p2, p3, segT0);
              const pt1 = cubicBezier(p0, p1, p2, p3, segT1);

              const segAlpha = (s / steps) * (hasHover ? (isHovered ? 1 : 0.25) : 0.95);

              ctx.beginPath();
              ctx.moveTo(pt0.x, pt0.y);
              ctx.lineTo(pt1.x, pt1.y);
              ctx.strokeStyle = pulse.color;
              ctx.globalAlpha = segAlpha;
              ctx.lineWidth = (isHovered ? pulse.width * 1.4 : pulse.width) * (0.6 + 0.4 * (s / steps));
              ctx.lineCap = "round";
              ctx.stroke();
            }

            // White-hot photon head at the leading tip
            const headPt = cubicBezier(p0, p1, p2, p3, headT);
            ctx.beginPath();
            ctx.arc(headPt.x, headPt.y, isHovered ? 2.5 : 1.8, 0, Math.PI * 2);
            ctx.fillStyle = "#FFFFFF";
            ctx.globalAlpha = hasHover ? (isHovered ? 1 : 0.3) : 1;
            ctx.shadowColor = "#FFFFFF";
            ctx.shadowBlur = 6;
            ctx.fill();

            ctx.restore();
          }
        }
      }

      // 3. Render and Update Convergence Sparks at Hub Entry
      for (let s = sparks.length - 1; s >= 0; s--) {
        const spark = sparks[s];
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = spark.alpha;
        ctx.shadowColor = spark.color;
        ctx.shadowBlur = 8;
        ctx.fill();

        spark.x += 0.8;
        spark.alpha -= 0.04;
        spark.size *= 0.94;

        if (spark.alpha <= 0) sparks.splice(s, 1);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [layout, hoveredIdx, icons]);

  return (
    <Box
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseLeave={() => {
        setIsMouseInside(false);
        setHoveredIdx(null);
      }}
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 1140,
        mx: "auto",
        height: { xs: 520, sm: 560, md: height },
        borderRadius: { xs: "28px", sm: "34px", md: "38px" },
        bgcolor: "#F2F2F2",
        border: "1.5px solid rgba(255, 255, 255, 0.95)",
        boxShadow:
          "inset 0px 1px 3px #FFFFFF, inset 0px -2px 4px rgba(0, 0, 0, 0.05), 0 12px 36px rgba(0, 0, 0, 0.04)",
        overflow: "visible",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* CLIPPED INNER SURFACE (Spotlight & Canvas) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* INTERACTIVE MOUSE SPOTLIGHT (Tactile Apple Pro Glass Sheen) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: isMouseInside ? 1 : 0,
            transition: "opacity 0.35s ease",
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.25) 45%, transparent 75%)`,
            zIndex: 0,
          }}
        />

        {/* CANVAS FOR SMOOTH HARDWARE-ACCELERATED BEAM PARTICLES */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </Box>

      {/* HTML LAYER: LEFT ICON NODES (With overflow visible for outside tooltip pills) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10,
          overflow: "visible",
        }}
      >
        {layout.nodes.map((node, i) => {
          const icon = icons[i];
          if (!icon) return null;
          const isHovered = hoveredIdx === i;

          return (
            <Box
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              sx={{
                position: "absolute",
                left: node.x - node.radius,
                top: node.y - node.radius,
                width: node.radius * 2,
                height: node.radius * 2,
                borderRadius: "50%",
                bgcolor: "#FFFFFF",
                border: isHovered
                  ? `2px solid ${icon.color || "#3B82F6"}`
                  : "1.2px solid rgba(15, 23, 42, 0.12)",
                boxShadow: isHovered
                  ? `0 0 16px ${(icon.color || "#3B82F6")}55, 0 4px 14px rgba(0, 0, 0, 0.08)`
                  : "0 2px 8px rgba(0, 0, 0, 0.05), inset 0px 1px 1px #FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 1.1, sm: 1.3 },
                cursor: "pointer",
                pointerEvents: "auto",
                transition: "transform 0.22s ease, border-color 0.2s ease, box-shadow 0.22s ease",
                transform: isHovered ? "scale(1.15) translateX(3px)" : "scale(1)",
              }}
            >
              <Box
                component="img"
                src={icon.src}
                alt={icon.alt}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />

              {/* TOOLTIP PILL ON HOVER (Shows on the LEFT side of the node, NAME ONLY) */}
              {isHovered && (
                <Box
                  sx={{
                    position: "absolute",
                    right: "calc(100% + 12px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "inline-flex",
                    alignItems: "center",
                    px: { xs: 1.4, sm: 1.8 },
                    py: 0.55,
                    borderRadius: "9999px",
                    bgcolor: "rgba(15, 23, 42, 0.94)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${icon.color || "rgba(255, 255, 255, 0.2)"}`,
                    boxShadow: `0 4px 16px rgba(0, 0, 0, 0.22), 0 0 10px ${(icon.color || "#3B82F6")}33`,
                    whiteSpace: "nowrap",
                    zIndex: 20,
                    pointerEvents: "none",
                    animation: "tooltipFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) both",
                    "@keyframes tooltipFade": {
                      from: { opacity: 0, transform: "translateY(-50%) translateX(6px)" },
                      to: { opacity: 1, transform: "translateY(-50%) translateX(0)" },
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: { xs: "0.75rem", sm: "0.82rem" },
                      fontWeight: 600,
                      color: "#FFFFFF",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {icon.name || icon.alt}
                  </Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {/* HTML LAYER: CENTRAL HUB NODE (Matching Reference Image with Rotating Dashed Rings & Blue Grid) */}
      <Box
        sx={{
          position: "absolute",
          left: layout.hubX - layout.hubRadius,
          top: layout.hubY - layout.hubRadius,
          width: layout.hubRadius * 2,
          height: layout.hubRadius * 2,
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outward Expanding Radar Ripple */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "1.5px solid #3B82F6",
            pointerEvents: "none",
            animation: `${radarRipple} 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite`,
          }}
        />

        {/* Concentric Dashed Radar Ring 1 (Inner, rotating clockwise) */}
        <Box
          sx={{
            position: "absolute",
            width: layout.hubRadius * 2 + 24,
            height: layout.hubRadius * 2 + 24,
            borderRadius: "50%",
            border: "1.3px dashed #3B82F6",
            opacity: 0.45,
            pointerEvents: "none",
            animation: `${rotateClockwise} 24s linear infinite`,
          }}
        />

        {/* Concentric Dashed Radar Ring 2 (Middle, rotating counter-clockwise) */}
        <Box
          sx={{
            position: "absolute",
            width: layout.hubRadius * 2 + 56,
            height: layout.hubRadius * 2 + 56,
            borderRadius: "50%",
            border: "1.2px dashed #2563EB",
            opacity: 0.35,
            pointerEvents: "none",
            animation: `${rotateCounter} 32s linear infinite`,
          }}
        />

        {/* Concentric Dashed Radar Ring 3 (Outer, rotating clockwise) */}
        <Box
          sx={{
            position: "absolute",
            width: layout.hubRadius * 2 + 92,
            height: layout.hubRadius * 2 + 92,
            borderRadius: "50%",
            border: "1px dashed #60A5FA",
            opacity: 0.22,
            pointerEvents: "none",
            animation: `${rotateClockwise} 42s linear infinite`,
          }}
        />

        {/* Central Core Circle with Blue Grid Pattern inside */}
        <Box
          component="a"
          href="#contact"
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            bgcolor: "#F2F2F2",
            // Blue coordinate square grid pattern inside the hub (exact match to screenshot)
            backgroundImage:
              "linear-gradient(rgba(59, 130, 246, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.16) 1px, transparent 1px)",
            backgroundSize: "8px 8px",
            border: "2px solid rgba(255, 255, 255, 0.95)",
            boxShadow:
              "inset 0px 1px 3px #FFFFFF, inset 0px -2px 4px rgba(0, 0, 0, 0.06), 0 10px 28px rgba(59, 130, 246, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            textDecoration: "none",
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            animation: `${hubAura} 3.4s ease-in-out infinite`,
            "&:hover": {
              transform: "scale(1.08)",
            },
          }}
        >
          {/* Central Blue Aura Glow */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.28) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Central Circular Brand Logo (Obsidian Glass Sphere Finish) */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              width: { xs: 42, sm: 48 },
              height: { xs: 42, sm: 48 },
              borderRadius: "50%",
              background: "linear-gradient(145deg, #1F242D 0%, #0A0D14 100%)",
              border: "1.5px solid rgba(255, 255, 255, 0.45)",
              boxShadow:
                "inset 0px 1px 2px rgba(255, 255, 255, 0.75), inset 0px -3px 8px rgba(0, 0, 0, 0.8), 0 8px 24px rgba(0, 0, 0, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1.0,
              overflow: "hidden",
            }}
          >
            {/* Specular curved gloss reflection on top half of sphere */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "45%",
                borderRadius: "50% 50% 100% 100%",
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.02) 100%)",
                pointerEvents: "none",
              }}
            />

            <Box
              component="img"
              src={centralIcon}
              alt="Deepak Gupta Core"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
                opacity: 0.98,
                position: "relative",
                zIndex: 1,
              }}
            />
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
