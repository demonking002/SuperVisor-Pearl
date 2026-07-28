"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PearlPortraitProps {
  size?: number;
  className?: string;
  breathing?: boolean;
  floating?: boolean;
  glow?: boolean;
  priority?: boolean;
}

/**
 * The real Pearl photo badge (gold ring, from the official uploaded asset
 * at /public/logo.png + /public/pearl-badge.png). Used everywhere the site
 * needs the authentic mascot image. Since it's a flat photo rather than a
 * rigged/transparent sprite, it gets breathing + floating motion (no
 * blink/tail-wag — that would need a transparent, multi-pose asset).
 *
 * Uses next/image so the 900x900 source is automatically resized and
 * compressed to whatever display size is requested, instead of shipping
 * the full ~900KB file at every size on the page.
 */
export default function PearlPortrait({
  size = 220,
  className = "",
  breathing = true,
  floating = true,
  glow = true,
  priority = false,
}: PearlPortraitProps) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={floating ? { y: [0, -10, 0] } : undefined}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {glow && (
        <div
          className="absolute inset-0 -z-10 rounded-full bg-gold/30 blur-2xl"
          aria-hidden="true"
        />
      )}
      <motion.div
        style={{ width: size, height: size, borderRadius: "9999px" }}
        className="relative select-none overflow-hidden shadow-glass"
        animate={breathing ? { scale: [1, 1.02, 1] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/pearl-badge.png"
          alt="Pearl, the community mascot of Supervisor Pearl HQ"
          fill
          sizes={`${size}px`}
          priority={priority}
          className="select-none object-cover"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
