"use client";

import gsap from "gsap";

export interface CardTiltOptions {
  /** Maximum 3D tilt in degrees (default: 7) */
  maxTilt?: number;
  /** Maximum magnetic translation in pixels (default: 8) */
  maxMove?: number;
  /** 3D Perspective distance in pixels (default: 1000) */
  perspective?: number;
  /** Response duration in seconds for quickTo tracking (default: 0.35) */
  duration?: number;
  /** Easing curve for tracking (default: "power2.out") */
  ease?: string;
  /** Return duration on mouseleave in seconds (default: 0.75) */
  returnDuration?: number;
  /** Elastic bounce-back easing curve on mouseleave (default: "elastic.out(1.1, 0.4)") */
  returnEase?: string;
  /** Micro-scale when hovered (default: 1.012) */
  scaleOnHover?: number;
}

/**
 * Attaches buttery 120 FPS 3D cursor parallax tilt & magnetic move to an HTMLElement using GSAP quickTo.
 * Guarantees zero layout thrashing by caching bounding client rect only on mouseenter.
 * Returns a cleanup function to remove all listeners and reset transforms.
 */
export function attachCard3DTilt(
  element: HTMLElement | null,
  options: CardTiltOptions = {}
): () => void {
  if (!element || typeof window === "undefined") return () => {};

  // Disable on non-pointer / touch devices to prevent sticky hover states
  if (window.matchMedia && !window.matchMedia("(pointer: fine)").matches) {
    return () => {};
  }

  const {
    maxTilt = 7,
    maxMove = 8,
    perspective = 1000,
    duration = 0.35,
    ease = "power2.out",
    returnDuration = 0.75,
    returnEase = "elastic.out(1.1, 0.4)",
    scaleOnHover = 1.012,
  } = options;

  gsap.set(element, {
    transformPerspective: perspective,
    transformStyle: "preserve-3d",
    force3D: true,
  });

  const qRotateX = gsap.quickTo(element, "rotateX", { duration, ease });
  const qRotateY = gsap.quickTo(element, "rotateY", { duration, ease });
  const qX = gsap.quickTo(element, "x", { duration, ease });
  const qY = gsap.quickTo(element, "y", { duration, ease });
  const qScale = gsap.quickTo(element, "scale", { duration, ease });

  let rect: DOMRect | null = null;

  const onMouseEnter = () => {
    rect = element.getBoundingClientRect();
    if (scaleOnHover !== 1.0) {
      qScale(scaleOnHover);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!rect) {
      rect = element.getBoundingClientRect();
    }
    if (rect.width === 0 || rect.height === 0) return;

    // Normalized coordinates from -0.5 to +0.5
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    // Natural 3D tilt: cursor at top tilts top back (-rotateX)
    // cursor at right tilts right back (+rotateY)
    qRotateX(-relY * maxTilt * 2);
    qRotateY(relX * maxTilt * 2);

    if (maxMove > 0) {
      qX(relX * maxMove * 2);
      qY(relY * maxMove * 2);
    }
  };

  const onMouseLeave = () => {
    rect = null;
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      scale: 1.0,
      duration: returnDuration,
      ease: returnEase,
      overwrite: "auto",
    });
  };

  element.addEventListener("mouseenter", onMouseEnter);
  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);

  return () => {
    element.removeEventListener("mouseenter", onMouseEnter);
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("mouseleave", onMouseLeave);
    gsap.killTweensOf(element);
    gsap.set(element, {
      clearProps: "transformPerspective,transformStyle,rotateX,rotateY,x,y,scale",
    });
  };
}

/**
 * Attaches 3D cursor tilt to a list of elements. Returns a single cleanup function.
 */
export function attachCards3DTilt(
  elements: NodeListOf<HTMLElement | Element> | HTMLElement[] | Element[] | null | undefined,
  options: CardTiltOptions = {}
): () => void {
  if (!elements || elements.length === 0) return () => {};
  const cleanups: (() => void)[] = [];
  Array.from(elements).forEach((el) => {
    if (el && el instanceof HTMLElement) {
      cleanups.push(attachCard3DTilt(el, options));
    }
  });
  return () => cleanups.forEach((c) => c());
}
