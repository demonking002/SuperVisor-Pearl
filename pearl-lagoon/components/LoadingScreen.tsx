"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PearlPortrait from "./PearlPortrait";
import { SITE } from "@/lib/constants";

interface LoadingScreenProps {
  onDone: () => void;
  minDurationMs?: number;
}

/**
 * There's no uploaded audio asset, so "ocean ambience" is generated
 * procedurally with the Web Audio API (filtered noise = soft surf) instead
 * of pointing at a file that doesn't exist. The mute toggle controls this
 * generated sound and it's fully stopped/cleaned up once loading finishes.
 */
function useProceduralOceanAmbience(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ src?: AudioBufferSourceNode; gain?: GainNode }>({});

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    async function start() {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioCtx();
        ctxRef.current = ctx;

        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const src = ctx.createBufferSource();
        src.buffer = buffer;
        src.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 500;

        const gain = ctx.createGain();
        gain.gain.value = 0.05;

        src.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        if (cancelled) return;
        src.start();
        nodesRef.current = { src, gain };
      } catch {
        // Web Audio unavailable — fail silently, ambience is a nice-to-have.
      }
    }

    start();

    return () => {
      cancelled = true;
      try {
        nodesRef.current.src?.stop();
      } catch {
        // already stopped
      }
      ctxRef.current?.close().catch(() => {});
    };
  }, [enabled]);
}

export default function LoadingScreen({
  onDone,
  minDurationMs = 2200,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [muted, setMuted] = useState(true);

  useProceduralOceanAmbience(!muted && visible);

  useEffect(() => {
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / minDurationMs) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 350);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [minDurationMs]);

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-lagoon-deep to-night text-sand-light"
        >
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute ocean ambience" : "Mute ocean ambience"}
            className="focus-ring absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full glass text-lg"
          >
            {muted ? "🔇" : "🔊"}
          </button>

          <PearlPortrait size={140} priority />

          <div className="flex flex-col items-center gap-2">
            <p className="font-display text-lg font-bold tracking-wide">
              {SITE.name}
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-seafoam/80">
              Waking up HQ...
            </p>
          </div>

          <div className="h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-seafoam via-rhgreen to-gold"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-mono text-sm text-sand-light/70">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
