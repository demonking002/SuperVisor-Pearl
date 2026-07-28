"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/constants";

export default function ContractAddress() {
  const [copied, setCopied] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SITE.contractAddress);
    } catch {
      // ignore
    }
    setCopied(true);
    setToastOpen(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setToastOpen(false), 2400);
  }

  return (
    <>
      <div className="glass mx-auto flex w-full max-w-xl flex-col items-center gap-3 rounded-2xl p-5 shadow-glass sm:flex-row sm:justify-between">
        <div className="flex min-w-0 flex-col items-center gap-1 sm:items-start">
          <span className="text-xs font-bold uppercase tracking-widest text-ink/50 dark:text-sand/50">
            Contract Address
          </span>
          <code className="w-full truncate text-center font-mono text-sm font-semibold text-lagoon-deep dark:text-seafoam sm:text-left">
            {SITE.contractAddress}
          </code>
        </div>
        <button
          onClick={handleCopy}
          className="focus-ring relative flex shrink-0 items-center gap-2 rounded-full bg-lagoon px-5 py-2.5 font-display text-sm font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 dark:bg-seafoam-dark"
          aria-label="Copy contract address"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="flex items-center gap-1.5"
              >
                Copied <span aria-hidden>✓</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="flex items-center gap-1.5"
              >
                Copy <span aria-hidden>📋</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {toastOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            role="status"
            className="glass-solid fixed bottom-6 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-3 rounded-full px-5 py-3 shadow-glass"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-rhgreen text-sm text-white"
            >
              ✓
            </motion.span>
            <span className="text-sm font-semibold text-ink dark:text-sand">
              Contract address copied
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
