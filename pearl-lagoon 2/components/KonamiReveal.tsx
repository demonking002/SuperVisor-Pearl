"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import PearlPortrait from "./PearlPortrait";

interface KonamiRevealProps {
  open: boolean;
  onClose: () => void;
}

export default function KonamiReveal({ open, onClose }: KonamiRevealProps) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 4200);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden bg-night/80 backdrop-blur-sm"
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(120deg, #0F6B6B, #FF6B7A)",
                "linear-gradient(120deg, #00C805, #D4AF37)",
                "linear-gradient(120deg, #3FAF9C, #FF98A2)",
                "linear-gradient(120deg, #0F6B6B, #FF6B7A)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ opacity: 0.35 }}
          />
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="glass-solid relative z-10 flex flex-col items-center gap-4 rounded-[2rem] p-8 text-center shadow-glass"
          >
            <PearlPortrait size={120} />
            <h3 className="font-display text-2xl font-extrabold text-gold">
              Guardian Override Unlocked
            </h3>
            <p className="max-w-xs text-sand-light/90">
              You found the secret code. Pearl salutes you, agent.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
