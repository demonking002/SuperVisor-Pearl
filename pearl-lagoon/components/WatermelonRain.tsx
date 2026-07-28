"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Watermelon from "./Watermelon";

interface WatermelonRainProps {
  active: boolean;
  onComplete?: () => void;
  durationMs?: number;
}

interface Drop {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotateDir: 1 | -1;
}

export default function WatermelonRain({
  active,
  onComplete,
  durationMs = 4200,
}: WatermelonRainProps) {
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    if (!active) return;
    const generated: Drop[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 2 + Math.random() * 1.6,
      size: 24 + Math.random() * 36,
      rotateDir: Math.random() > 0.5 ? 1 : -1,
    }));
    setDrops(generated);
    const timer = setTimeout(() => {
      setDrops([]);
      onComplete?.();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [active, durationMs, onComplete]);

  return (
    <AnimatePresence>
      {drops.length > 0 && (
        <div
          className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
          aria-hidden="true"
        >
          {drops.map((drop) => (
            <motion.div
              key={drop.id}
              className="absolute top-0"
              style={{ left: `${drop.left}%` }}
              initial={{ y: "-10vh", rotate: 0, opacity: 0 }}
              animate={{ y: "110vh", rotate: 360 * drop.rotateDir, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: drop.duration,
                delay: drop.delay,
                ease: "easeIn",
              }}
            >
              <Watermelon size={drop.size} />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
