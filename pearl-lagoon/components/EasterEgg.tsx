"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Watermelon from "./Watermelon";
import PearlPortrait from "./PearlPortrait";

interface EasterEggProps {
  open: boolean;
  onClose: () => void;
}

const CONFETTI = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.6,
  duration: 2 + Math.random() * 1.5,
  size: 14 + Math.random() * 18,
}));

export default function EasterEgg({ open, onClose }: EasterEggProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 px-6 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Secret found"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {CONFETTI.map((c) => (
              <motion.span
                key={c.id}
                initial={{ y: "-10%", x: `${c.x}vw`, opacity: 1, rotate: 0 }}
                animate={{ y: "110vh", rotate: 360 }}
                transition={{
                  duration: c.duration,
                  delay: c.delay,
                  repeat: Infinity,
                }}
                className="absolute top-0"
              >
                <Watermelon size={c.size} variant="slice" />
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-solid relative z-10 flex max-w-sm flex-col items-center gap-4 rounded-[2rem] p-8 text-center shadow-glass"
          >
            <span className="text-4xl">✨</span>
            <PearlPortrait size={100} floating={false} />
            <h3 className="font-display text-2xl font-extrabold text-lagoon-deep dark:text-seafoam">
              You found Pearl&apos;s secret!
            </h3>
            <p className="text-ink/75 dark:text-sand/75">
              She&apos;s been waiting for someone patient enough to pet her
              seven times. Here&apos;s a shell for your trouble.
            </p>
            <button
              onClick={onClose}
              className="focus-ring mt-2 rounded-full bg-coral px-6 py-2.5 font-display font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              Back to the lagoon
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
