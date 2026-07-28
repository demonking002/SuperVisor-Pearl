"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Ripple } from "@/hooks/useRipple";

interface RippleLayerProps {
  ripples: Ripple[];
}

export default function RippleLayer({ ripples }: RippleLayerProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ opacity: 0.6, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              borderRadius: "9999px",
              border: "2px solid rgba(255,255,255,0.75)",
              boxShadow: "0 0 20px rgba(111,214,196,0.5)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
