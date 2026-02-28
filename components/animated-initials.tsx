"use client";

import type { HTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";

const HEIGHT = 72;
const STEM_WIDTH = 20;
const CROSSBAR_HEIGHT = 16;
const BASE_WIDTH = 76;
const MAX_DELTA = 28;
const GAP = 12;
const PADDING = 4;
const MIN_STEP_MS = 1200;
const STEP_VARIANCE_MS = 1600;
const HOVER_EXIT_DELAY_MS = 180;
const EASING = 0.12;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

type HShapeProps = {
  x: number;
  width: number;
};

function HShape({ x, width }: HShapeProps) {
  const rightStemX = x + width - STEM_WIDTH;
  const crossbarY = (HEIGHT - CROSSBAR_HEIGHT) / 2;

  return (
    <>
      <rect x={x} y={0} width={STEM_WIDTH} height={HEIGHT} />
      <rect x={rightStemX} y={0} width={STEM_WIDTH} height={HEIGHT} />
      <rect
        x={x}
        y={crossbarY}
        width={width}
        height={CROSSBAR_HEIGHT}
      />
    </>
  );
}

export function AnimatedInitials() {
  return (
    <AnimatedInitialsBase
      className="my-6 text-fd-foreground"
      svgClassName="h-auto w-full max-w-[16rem] overflow-visible transition-[filter] duration-200"
    />
  );
}

type AnimatedInitialsProps = {
  className?: string;
  svgClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function AnimatedInitialsBase({
  className,
  svgClassName,
  ...props
}: AnimatedInitialsProps = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [delta, setDelta] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const deltaRef = useRef(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      deltaRef.current = 0;
      hasAnimatedRef.current = false;
      setDelta(0);
      return;
    }

    let frameId = 0;
    let timeoutId = 0;
    let currentDelta = deltaRef.current;
    let targetDelta = isHovered ? 0 : deltaRef.current;

    const animate = () => {
      currentDelta += (targetDelta - currentDelta) * EASING;

      if (Math.abs(targetDelta - currentDelta) < 0.05) {
        currentDelta = targetDelta;
      }

      deltaRef.current = currentDelta;
      setDelta(currentDelta);

      if (Math.abs(targetDelta - currentDelta) >= 0.05) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    if (isHovered) {
      targetDelta = 0;
      frameId = window.requestAnimationFrame(animate);
    } else {
      timeoutId = window.setTimeout(() => {
        targetDelta = clamp((Math.random() * 2 - 1) * MAX_DELTA, -MAX_DELTA, MAX_DELTA);
        hasAnimatedRef.current = true;
        frameId = window.requestAnimationFrame(animate);
      }, hasAnimatedRef.current ? HOVER_EXIT_DELAY_MS : MIN_STEP_MS + Math.random() * STEP_VARIANCE_MS);
    }

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, [isHovered, prefersReducedMotion]);

  useEffect(() => {
    deltaRef.current = delta;
  }, [delta]);

  useEffect(() => {
    if (!isHovered || prefersReducedMotion) {
      return;
    }

    hasAnimatedRef.current = true;
  }, [isHovered, prefersReducedMotion]);

  const leftWidth = BASE_WIDTH + delta;
  const rightWidth = BASE_WIDTH - delta;
  const totalWidth = PADDING * 2 + leftWidth + GAP + rightWidth;
  const rightX = PADDING + leftWidth + GAP;

  return (
    <div className={className} {...props}>
      <svg
        viewBox={`0 0 ${totalWidth} ${HEIGHT}`}
        role="img"
        aria-label="Animated HH initials"
        className={svgClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <g fill="currentColor">
          <HShape x={PADDING} width={leftWidth} />
          <HShape x={rightX} width={rightWidth} />
        </g>
      </svg>
    </div>
  );
}
