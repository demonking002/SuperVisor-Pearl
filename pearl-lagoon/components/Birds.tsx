"use client";

import { motion } from "framer-motion";

function BirdShape() {
  return (
    <motion.svg
      width="34"
      height="16"
      viewBox="0 0 34 16"
      animate={{ scaleY: [1, 0.5, 1] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "center" }}
    >
      <path
        d="M1 8 C 7 -2, 10 -2, 17 6 C 24 -2, 27 -2, 33 8"
        stroke="#0B2E33"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

const FLOCK = [
  { top: "10%", duration: 22, delay: 0, scale: 1 },
  { top: "16%", duration: 26, delay: -6, scale: 0.75 },
  { top: "8%", duration: 30, delay: -14, scale: 0.6 },
];

export default function Birds({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 h-1/3 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {FLOCK.map((bird, i) => (
        <motion.div
          key={i}
          className="absolute left-0"
          style={{ top: bird.top }}
          initial={{ x: "-10vw" }}
          animate={{ x: "110vw" }}
          transition={{
            duration: bird.duration,
            delay: bird.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div style={{ transform: `scale(${bird.scale})` }}>
            <BirdShape />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
