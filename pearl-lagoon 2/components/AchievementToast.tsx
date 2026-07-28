"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Milestone } from "@/hooks/usePopTracker";

interface AchievementToastProps {
  milestone: Milestone | null;
  onDismiss: () => void;
}

export default function AchievementToast({
  milestone,
  onDismiss,
}: AchievementToastProps) {
  useEffect(() => {
    if (!milestone) return;
    const t = setTimeout(onDismiss, 4200);
    return () => clearTimeout(t);
  }, [milestone, onDismiss]);

  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          key={milestone.id}
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="glass-solid fixed left-1/2 top-24 z-[90] flex w-[92%] max-w-sm -translate-x-1/2 items-center gap-4 rounded-2xl p-4 shadow-glass"
          role="status"
        >
          <span className="text-3xl">{milestone.icon}</span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-bold text-lagoon-deep dark:text-seafoam">
              {milestone.title}
            </p>
            <p className="truncate text-xs text-ink/70 dark:text-sand/70">
              {milestone.description}
            </p>
          </div>
          <button
            onClick={onDismiss}
            aria-label="Dismiss achievement"
            className="focus-ring shrink-0 rounded-full px-2 py-1 text-ink/40 hover:text-coral dark:text-sand/40"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
