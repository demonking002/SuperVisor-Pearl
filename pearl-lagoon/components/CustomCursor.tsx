"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Custom watermelon cursor. Disabled on touch devices (coarse pointer) and
 * for reduced-motion users, since a synthetic cursor adds motion/overhead
 * neither group benefits from — the real system cursor is used instead.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const disabled = isCoarsePointer || reducedMotion;

  useEffect(() => {
    if (disabled) return;

    function onMove(e: MouseEvent) {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${
          e.clientY - 16
        }px, 0)`;
      }
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("button, a, [role='button']"));
    }

    window.addEventListener("mousemove", onMove);
    document.documentElement.classList.add("custom-cursor-active");
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[300] hidden sm:block"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      <svg
        width={32}
        height={32}
        viewBox="0 0 100 100"
        style={{
          transform: hovering ? "scale(1.25)" : "scale(1)",
          transition: "transform 0.15s ease-out",
        }}
      >
        <circle cx="50" cy="50" r="46" fill="#0F6B6B" />
        <path
          d="M50 4 C74 4 94 24 94 50 C 70 40 30 40 6 50 C6 24 26 4 50 4 Z"
          fill="#3FAF9C"
          opacity="0.6"
        />
        <path
          d="M50 4 C74 4 94 24 94 50 C 94 76 74 96 50 96 C 26 96 6 76 6 50 C6 24 26 4 50 4 Z"
          fill="none"
          stroke="#0B4A4A"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}
