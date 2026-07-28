"use client";

import { motion } from "framer-motion";

interface CloudDef {
  top: string;
  scale: number;
  duration: number;
  delay: number;
  opacity: number;
}

const CLOUDS: CloudDef[] = [
  { top: "6%", scale: 1, duration: 46, delay: 0, opacity: 0.9 },
  { top: "13%", scale: 0.7, duration: 60, delay: -12, opacity: 0.7 },
  { top: "3%", scale: 0.55, duration: 38, delay: -24, opacity: 0.8 },
  { top: "20%", scale: 0.85, duration: 70, delay: -40, opacity: 0.6 },
];

function CloudShape({ opacity = 1 }: { opacity?: number }) {
  return (
    <svg width="140" height="60" viewBox="0 0 140 60" style={{ opacity }}>
      <ellipse cx="40" cy="38" rx="34" ry="20" fill="white" />
      <ellipse cx="72" cy="28" rx="30" ry="24" fill="white" />
      <ellipse cx="100" cy="38" rx="28" ry="18" fill="white" />
      <ellipse cx="60" cy="44" rx="45" ry="14" fill="white" />
    </svg>
  );
}

export default function Clouds({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {CLOUDS.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute left-0"
          style={{ top: cloud.top }}
          initial={{ x: "-20vw" }}
          animate={{ x: "120vw" }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div style={{ transform: `scale(${cloud.scale})` }}>
            <CloudShape opacity={cloud.opacity} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
