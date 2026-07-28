"use client";

import { motion } from "framer-motion";

function FishShape({ color = "#FF6B7A" }: { color?: string }) {
  return (
    <svg width="28" height="18" viewBox="0 0 28 18">
      <path d="M2 9 C 8 0, 20 0, 26 9 C 20 18, 8 18, 2 9 Z" fill={color} opacity="0.85" />
      <path d="M2 9 L -6 3 L -6 15 Z" fill={color} opacity="0.7" />
      <circle cx="20" cy="7" r="1.6" fill="#0B2E33" />
    </svg>
  );
}

const SCHOOL = [
  { top: "62%", duration: 18, delay: 0, color: "#FF6B7A", reverse: false },
  { top: "70%", duration: 24, delay: -8, color: "#F6E7C1", reverse: true },
  { top: "58%", duration: 21, delay: -4, color: "#3FAF9C", reverse: false },
  { top: "75%", duration: 27, delay: -14, color: "#FF98A2", reverse: true },
];

export default function Fish({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/5 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {SCHOOL.map((fish, i) => (
        <motion.div
          key={i}
          className="absolute left-0"
          style={{
            top: fish.top,
            scaleX: fish.reverse ? -1 : 1,
          }}
          initial={{ x: fish.reverse ? "110vw" : "-10vw" }}
          animate={{ x: fish.reverse ? "-10vw" : "110vw" }}
          transition={{
            duration: fish.duration,
            delay: fish.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FishShape color={fish.color} />
        </motion.div>
      ))}
    </div>
  );
}
