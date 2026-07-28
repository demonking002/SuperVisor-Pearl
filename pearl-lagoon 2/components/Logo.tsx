"use client";

import { useState } from "react";
import Image from "next/image";
import { SITE } from "@/lib/constants";

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
  priority?: boolean;
}

/**
 * Central brand mark, backed by next/image for automatic resizing and
 * compression. Falls back to a shell emoji only if /public/logo.png is
 * ever removed, so nothing renders a broken image.
 */
export default function Logo({
  size = 32,
  showWordmark = true,
  className = "",
  wordmarkClassName = "",
  priority = false,
}: LogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {!imgFailed ? (
        <span
          className="relative inline-block shrink-0 overflow-hidden rounded-full"
          style={{ width: size, height: size }}
        >
          <Image
            src="/logo.png"
            alt={`${SITE.name} logo`}
            fill
            sizes={`${size}px`}
            priority={priority}
            className="object-contain"
            onError={() => setImgFailed(true)}
          />
        </span>
      ) : (
        <span
          style={{ fontSize: size * 0.75, lineHeight: 1 }}
          aria-hidden="true"
        >
          🐚
        </span>
      )}
      {showWordmark && (
        <span
          className={`font-display font-extrabold tracking-tight ${wordmarkClassName}`}
        >
          {SITE.name}
        </span>
      )}
    </span>
  );
}
