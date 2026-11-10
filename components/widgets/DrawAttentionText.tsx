"use client";

import React, { useRef, useState, useEffect, useId } from "react";
import gsap from "gsap";

interface DrawAttentionTextProps {
  text: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number | string;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  ease?: string;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function DrawAttentionText({
  text = "",
  fontFamily = "inherit",
  fontSize = 40,
  fontWeight = 400,
  letterSpacing = 0,
  strokeWidth = 1.4,
  drawDuration = 1.3,
  fillDelay = 0.3,
  ease = "power2.out",
  onComplete,
  className = "",
  style = {},
}: DrawAttentionTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const strokeTextRef = useRef<SVGTextElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const [bbox, setBbox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const clipId = `stroke-wipe-${safeId}`;
  const gradId = `gold-grad-${safeId}`;

  // Measure SVG text bounding box accurately
  useEffect(() => {
    if (!strokeTextRef.current) return;
    let isMounted = true;

    const measure = () => {
      if (!isMounted || !strokeTextRef.current) return;
      try {
        const box = strokeTextRef.current.getBBox();
        if (box && box.width > 0) {
          const pad = Math.max(Number(strokeWidth) || 1.5, 0.12 * fontSize);
          const next = {
            x: box.x - pad,
            y: box.y - pad,
            width: box.width + 2 * pad + 6,
            height: box.height + 2 * pad,
          };
          setBbox((prev) =>
            prev &&
            Math.abs(prev.x - next.x) < 0.5 &&
            Math.abs(prev.width - next.width) < 0.5 &&
            Math.abs(prev.y - next.y) < 0.5
              ? prev
              : next
          );
        }
      } catch {
        // Fallback for SSR
      }
    };

    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      isMounted = false;
    };
  }, [text, fontSize, fontWeight, letterSpacing, strokeWidth, fontFamily]);

  // GSAP Outline Stroke Draw + Fill Wipe Animation
  useEffect(() => {
    const strokeEl = strokeTextRef.current;
    const clipRect = clipRectRef.current;
    if (!strokeEl || !bbox) return;

    const strokeDash = Math.max(8 * fontSize, 350);

    // Initial state: hide strokes and clip
    gsap.killTweensOf([strokeEl, clipRect]);
    gsap.set(strokeEl, { strokeDasharray: strokeDash, strokeDashoffset: strokeDash });
    if (clipRect) gsap.set(clipRect, { attr: { width: 0 } });

    // Timeline: 1. Outline stroke line draws forward along text ➔ 2. Solid color wipes across
    const tl = gsap.timeline({
      paused: false,
      defaults: { overwrite: "auto" },
      onComplete: () => {
        onComplete?.();
      },
    });

    // 1. Outline stroke line draws forward along every curve
    tl.to(
      strokeEl,
      {
        strokeDashoffset: 0,
        duration: drawDuration,
        ease: ease,
      },
      0
    );

    // 2. Solid fill wipe follows
    const fillDuration = Math.max(0.4, 0.55 * drawDuration);
    const wipeStart = Math.max(0.38 * drawDuration, fillDelay);

    if (clipRect) {
      tl.to(
        clipRect,
        {
          attr: { width: bbox.width },
          duration: fillDuration,
          ease: "power2.inOut",
        },
        wipeStart
      );
    }

    return () => {
      tl.kill();
      gsap.killTweensOf([strokeEl, clipRect]);
    };
  }, [bbox, drawDuration, fillDelay, ease, text, fontSize, onComplete]);

  const textStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    letterSpacing: typeof letterSpacing === "number" ? `${letterSpacing}px` : letterSpacing,
    fontFamily: fontFamily || "inherit",
    userSelect: "none",
  };

  const svgWidth = bbox ? `${Math.ceil(bbox.width)}px` : "auto";
  const svgHeight = bbox ? `${Math.ceil(bbox.height)}px` : `${Math.round(1.35 * fontSize)}px`;
  const viewBox = bbox ? `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}` : `0 ${-fontSize} 200 ${1.35 * fontSize}`;

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        display: "inline-block",
        width: "fit-content",
        maxWidth: "100%",
        lineHeight: 0,
        userSelect: "none",
        verticalAlign: "middle",
        ...style,
      }}
      role="img"
      aria-label={text}
    >
      <svg
        style={{
          display: "block",
          width: svgWidth,
          maxWidth: "100%",
          height: svgHeight,
          overflow: "visible",
        }}
        viewBox={viewBox}
        preserveAspectRatio="xMinYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* 24K Gold Gradient for Outline Line & Fill */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FFB330" />
          </linearGradient>

          {/* Wipe ClipPath */}
          {bbox && (
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <rect ref={clipRectRef} x={bbox.x} y={bbox.y} width="0" height={bbox.height} />
            </clipPath>
          )}
        </defs>

        {/* 1. Line Stroke Text: Unified string so Devanagari ligatures (नमस्ते) NEVER break into dotted circles */}
        <text
          ref={strokeTextRef}
          x="0"
          y="0"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={textStyle}
        >
          {text}
        </text>

        {/* 2. Solid Fill Text: Wipes in from left to right as stroke completes */}
        <text
          x="0"
          y="0"
          fill={`url(#${gradId})`}
          stroke="none"
          style={textStyle}
          clipPath={bbox ? `url(#${clipId})` : undefined}
        >
          {text}
        </text>
      </svg>
    </span>
  );
}
