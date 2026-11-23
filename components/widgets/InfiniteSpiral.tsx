"use client";

import React, {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material";

export interface InfiniteSpiralProps<T = any> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  speed?: number;
  direction?: "up" | "down";
  animationMode?: "auto" | "drag" | "scroll" | "all";
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardsPerTurn?: number;
  rotation?: number;
  cardTilt?: number;
  cardRadius?: number | string;
  centerScale?: number;
  edgeFade?: number;
  edgeBlur?: number;
  pauseOnHover?: boolean;
  onCardClick?: (item: T, index: number) => void;
  sx?: SxProps<Theme>;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const modulo = (value: number, divisor: number) =>
  ((value % divisor) + divisor) % divisor;

const smoothstep = (min: number, max: number, value: number) => {
  const x = clamp((value - min) / (max - min || 1), 0, 1);
  return x * x * (3 - 2 * x);
};

export default function InfiniteSpiral<T = any>({
  items = [],
  renderItem,
  speed = 0.45,
  direction = "up",
  animationMode = "all",
  radius = 280,
  cardWidth = 360,
  cardHeight = 240,
  verticalSpacing = 72,
  perspective = 1100,
  cardsPerTurn = 5.5,
  rotation = 0,
  cardTilt = 0,
  cardRadius = 36,
  centerScale = 1.15,
  edgeFade = 0.35,
  edgeBlur = 5,
  pauseOnHover = true,
  onCardClick,
  sx,
}: InfiniteSpiralProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const autoSpeedRef = useRef(0);
  const hoveredRef = useRef(false);
  const visibleRef = useRef(true);
  const draggingRef = useRef(false);
  const lastPointerYRef = useRef(0);
  const dragMovedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || items.length === 0) return;

    let frameId = 0;
    let previousTime = performance.now();
    let bounds = root.getBoundingClientRect();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollEnabled = animationMode === "scroll" || animationMode === "all";
    const scrollSpeedMultiplier = Math.max(speed, 0) / 0.55;
    let lastScrollY = window.scrollY;

    const resizeObserver = new ResizeObserver(() => {
      if (root) bounds = root.getBoundingClientRect();
    });
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    intersectionObserver.observe(root);

    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      const scrollDelta = nextScrollY - lastScrollY;
      lastScrollY = nextScrollY;
      if (!scrollEnabled || !visibleRef.current || scrollDelta === 0) return;
      targetProgressRef.current += clamp(
        (scrollDelta * scrollSpeedMultiplier) / Math.max(verticalSpacing * 2, 1),
        -1.2,
        1.2
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const render = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const autoEnabled = animationMode === "auto" || animationMode === "all";
      const motionPaused =
        draggingRef.current || (pauseOnHover && hoveredRef.current);
      const directionMultiplier = direction === "down" ? -1 : 1;
      const desiredAutoSpeed =
        autoEnabled && visibleRef.current && !reducedMotion.matches && !motionPaused
          ? speed * directionMultiplier
          : 0;

      const speedBlend = 1 - Math.exp(-delta * 7);
      autoSpeedRef.current += (desiredAutoSpeed - autoSpeedRef.current) * speedBlend;
      targetProgressRef.current += autoSpeedRef.current * delta;

      const followBlend = 1 - Math.exp(-delta * (draggingRef.current ? 22 : 11));
      progressRef.current +=
        (targetProgressRef.current - progressRef.current) * followBlend;

      const count = items.length;
      const half = count / 2;
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);

      // Responsive fitting for mobile vs desktop
      const isMobile = width < 600;
      const effectiveCardWidth = isMobile
        ? Math.min(cardWidth, width * 0.86)
        : cardWidth;
      const effectiveCardHeight = isMobile
        ? Math.min(cardHeight, height * 0.44)
        : cardHeight;

      const fit = Math.min(
        1,
        width / (effectiveCardWidth * 2.5),
        height / (effectiveCardHeight * 2.2)
      );
      const responsiveRadius =
        Math.min(radius, Math.max(80, width * 0.38)) * (isMobile ? 0.85 : fit);
      const fadeStart = clamp(1 - edgeFade, 0, 0.98);
      const turnSize = Math.max(cardsPerTurn, 1);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const offset = modulo(index - progressRef.current + half, count) - half;
        const edge = Math.min(Math.abs(offset) / Math.max(half, 1), 1);
        const opacity = 1 - smoothstep(fadeStart, 1, edge);
        const focus = 1 - Math.min(Math.abs(offset) / Math.max(turnSize * 0.65, 1), 1);
        const scale = (1 + (centerScale - 1) * focus) * (isMobile ? 1 : fit);
        const angle = offset * (360 / turnSize) + rotation;
        const angleRadians = (angle * Math.PI) / 180;
        const x = Math.sin(angleRadians) * responsiveRadius;
        const z = Math.cos(angleRadians) * responsiveRadius;
        const depthScale = clamp(
          perspective / Math.max(perspective - z, 1),
          0.72,
          1.4
        );
        const visualScale = scale * depthScale;
        const depth = (z / Math.max(responsiveRadius, 1) + 1) / 2;
        const blur = edgeBlur * smoothstep(0.35, 1, edge);

        card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(
          2
        )}px, ${(offset * verticalSpacing * (isMobile ? 0.9 : fit)).toFixed(
          2
        )}px, 0) rotateZ(${cardTilt}deg) scale(${visualScale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = blur > 0.1 ? `blur(${blur.toFixed(2)}px)` : "none";
        card.style.zIndex = String(Math.round(depth * 100000) + index);
        card.style.pointerEvents = opacity > 0.25 ? "auto" : "none";
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    items.length,
    speed,
    direction,
    animationMode,
    radius,
    perspective,
    cardWidth,
    cardHeight,
    verticalSpacing,
    cardsPerTurn,
    rotation,
    cardTilt,
    centerScale,
    edgeFade,
    edgeBlur,
    pauseOnHover,
  ]);

  const dragEnabled = animationMode === "drag" || animationMode === "all";

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.style.cursor = dragEnabled ? "grab" : "default";
  };

  const cardStyle: CSSProperties = {
    width: cardWidth,
    height: cardHeight,
    borderRadius: typeof cardRadius === "number" ? `${cardRadius}px` : cardRadius,
    maxWidth: "88vw",
  };

  return (
    <Box
      ref={rootRef}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      onPointerDown={(event) => {
        if (!dragEnabled || event.button !== 0) return;
        draggingRef.current = true;
        dragMovedRef.current = false;
        lastPointerYRef.current = event.clientY;
        targetProgressRef.current = progressRef.current;
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.style.cursor = "grabbing";
      }}
      onPointerMove={(event) => {
        if (!draggingRef.current) return;
        const pointerDelta = event.clientY - lastPointerYRef.current;
        lastPointerYRef.current = event.clientY;
        if (Math.abs(pointerDelta) > 1.5) dragMovedRef.current = true;
        targetProgressRef.current -= pointerDelta / Math.max(verticalSpacing, 1);
      }}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onClickCapture={(event) => {
        if (!dragMovedRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        dragMovedRef.current = false;
      }}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: { xs: 540, sm: 600, md: 680 },
        overflow: "hidden",
        isolation: "isolate",
        perspective: `${perspective}px`,
        cursor: dragEnabled ? "grab" : "default",
        touchAction: dragEnabled ? "pan-x" : "auto",
        userSelect: "none",
        WebkitUserSelect: "none",
        ...sx,
      }}
    >
      {/* 3D Stage */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            ref={(node: HTMLDivElement | null) => {
              cardRefs.current[index] = node;
            }}
            onClick={() => {
              if (!dragMovedRef.current && onCardClick) {
                onCardClick(item, index);
              }
            }}
            style={cardStyle}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              display: "flex",
              flexDirection: "column",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              willChange: "transform, opacity, filter",
              bgcolor: "#F2F2F2",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.07)",
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              "&:hover": {
                boxShadow: "0 18px 45px rgba(0, 0, 0, 0.12)",
                borderColor: "rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            {renderItem(item, index)}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
