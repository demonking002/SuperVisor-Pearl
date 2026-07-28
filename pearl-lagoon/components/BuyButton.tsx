"use client";

import { SITE } from "@/lib/constants";

interface BuyButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function BuyButton({
  className = "",
  children,
  onClick,
}: BuyButtonProps) {
  return (
    <a
      href={SITE.dexscreener}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-coral font-display font-bold text-white shadow-lg shadow-coral/30 transition-transform hover:scale-105 ${className}`}
    >
      {children ?? <>Buy {SITE.ticker}</>}
    </a>
  );
}
