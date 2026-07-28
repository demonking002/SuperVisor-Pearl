"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Ocean from "./Ocean";
import WatermelonField from "./WatermelonField";
import PearlPortrait from "./PearlPortrait";
import RippleLayer from "./RippleLayer";
import Birds from "./Birds";
import Clouds from "./Clouds";
import Fish from "./Fish";
import { useRipple } from "@/hooks/useRipple";
import { SITE } from "@/lib/constants";
import { truncateAddress } from "@/lib/utils";

interface HeroProps {
  onSecret: () => void;
  onPop?: () => void;
}

export default function Hero({ onSecret, onPop }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ripples, addRipple } = useRipple(160);
  const [copied, setCopied] = useState(false);
  const [petCount, setPetCount] = useState(0);

  function handleContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    addRipple(e.clientX - rect.left, e.clientY - rect.top);
  }

  function handleContainerMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    // Subtle, throttled water interaction as the cursor moves.
    if (Math.random() > 0.06) return;
    const rect = e.currentTarget.getBoundingClientRect();
    addRipple(e.clientX - rect.left, e.clientY - rect.top, 60);
  }

  function handleWatermelonPop(clientX: number, clientY: number) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      addRipple(clientX - rect.left, clientY - rect.top, 100);
    }
    onPop?.();
  }

  function handleCopy() {
    navigator.clipboard?.writeText(SITE.contractAddress).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function handlePetPearl() {
    const next = petCount + 1;
    setPetCount(next);
    if (next >= 7) {
      onSecret();
      setPetCount(0);
    }
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onClick={handleContainerClick}
      onMouseMove={handleContainerMouseMove}
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-sand-light via-seafoam-light to-seafoam pt-24 dark:from-night dark:via-ink dark:to-lagoon-deep"
    >
      <Ocean />
      <Clouds />
      <Birds />
      <Fish />
      <RippleLayer ripples={ripples} />

      {/* floating background watermelon patch */}
      <div className="pointer-events-auto absolute inset-x-0 top-[18%] z-10 h-[46%] sm:h-[52%]">
        <WatermelonField count={10} onPop={handleWatermelonPop} />
      </div>

      <div className="relative z-20 mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass mb-5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-lagoon-deep dark:text-seafoam"
        >
          On Patrol · Robinhood Chain
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="section-heading gradient-text text-5xl leading-[1.05] sm:text-6xl md:text-7xl"
        >
          Supervisor Pearl
          <br /> HQ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-5 max-w-xl font-body text-lg text-ink/80 dark:text-sand/85"
        >
          Pearl is a community-run mascot who keeps watch over Robinhood
          Chain and shares what she notices. Pop a watermelon. Watch the
          ripples. Say hi to Pearl.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#how-to-buy"
            className="focus-ring rounded-full bg-coral px-7 py-3 font-display text-base font-bold text-white shadow-lg shadow-coral/30 transition-transform hover:scale-105"
          >
            How to Buy {SITE.ticker}
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className="focus-ring glass flex items-center gap-2 rounded-full px-5 py-3 font-mono text-sm font-semibold text-ink dark:text-sand"
          >
            {copied ? "Copied ✓" : truncateAddress(SITE.contractAddress, 5)}
            <span aria-hidden>📋</span>
          </button>
        </motion.div>
      </div>

      <div className="relative z-20 mb-6 flex justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePetPearl();
          }}
          aria-label="Pet Pearl"
          className="focus-ring rounded-full transition-transform hover:scale-105 active:scale-95"
        >
          <PearlPortrait size={140} />
        </button>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 mb-4 flex justify-center text-ink/60 dark:text-sand/60"
        aria-hidden="true"
      >
        <span className="text-xl">⌄</span>
      </motion.div>
    </section>
  );
}
