"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface OceanProps {
  className?: string;
}

interface WaveLayer {
  amplitude: number;
  wavelength: number;
  speed: number;
  yOffset: number;
  color: string;
  phase: number;
}

export default function Ocean({ className = "" }: OceanProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    const isDark = () => document.documentElement.classList.contains("dark");

    const layers: WaveLayer[] = [
      { amplitude: 14, wavelength: 340, speed: 0.55, yOffset: 0.32, color: "rgba(111, 214, 196, 0.55)", phase: 0 },
      { amplitude: 18, wavelength: 260, speed: 0.35, yOffset: 0.46, color: "rgba(63, 175, 156, 0.6)", phase: 2 },
      { amplitude: 22, wavelength: 200, speed: 0.22, yOffset: 0.62, color: "rgba(15, 107, 107, 0.85)", phase: 4 },
      { amplitude: 26, wavelength: 160, speed: 0.15, yOffset: 0.8, color: "rgba(11, 74, 74, 1)", phase: 1 },
    ];

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const dark = isDark();

    function drawWave(layer: WaveLayer, time: number) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(0, height);
      const baseY = height * layer.yOffset;
      for (let x = 0; x <= width; x += 8) {
        const y =
          baseY +
          Math.sin(x / layer.wavelength + time * layer.speed + layer.phase) * layer.amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = layer.color;
      ctx.fill();
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      layers.forEach((layer) => drawWave(layer, t));

      // sparkle highlights
      const sparkleCount = 18;
      for (let i = 0; i < sparkleCount; i++) {
        const sx = (Math.sin(i * 12.9898 + t * 0.4) * 0.5 + 0.5) * width;
        const sy =
          height * 0.35 +
          Math.sin(i * 3.1 + t * 0.8) * height * 0.18 +
          i * (height * 0.02);
        const alpha = (Math.sin(t * 1.5 + i) * 0.5 + 0.5) * 0.5;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(183, 238, 225, ${alpha})`
          : `rgba(255, 255, 255, ${alpha + 0.2})`;
        ctx.fill();
      }

      if (!reducedMotion) {
        t += 0.012;
      }
      rafRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
