"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="h-10 w-16 rounded-full bg-white/30" aria-hidden />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      aria-pressed={isDark}
      className="focus-ring relative flex h-10 w-16 items-center rounded-full border border-white/40 bg-gradient-to-r from-sand to-seafoam-light px-1 shadow-inner transition-colors dark:border-seafoam/20 dark:from-ink dark:to-night"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-base shadow-md dark:bg-ink-light"
        style={{ marginLeft: isDark ? "auto" : 0 }}
      >
        {isDark ? "🌙" : "☀️"}
      </motion.span>
    </button>
  );
}
