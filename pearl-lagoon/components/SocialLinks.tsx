import { SITE } from "@/lib/constants";

const SOCIALS = [
  { name: "X / Twitter", href: SITE.twitter, emoji: "𝕏" },
  { name: "Telegram", href: SITE.telegram, emoji: "📨" },
  { name: "DexScreener", href: SITE.dexscreener, emoji: "📈" },
];

interface SocialLinksProps {
  className?: string;
  variant?: "row" | "grid";
}

export default function SocialLinks({
  className = "",
  variant = "row",
}: SocialLinksProps) {
  return (
    <div
      className={`flex ${
        variant === "grid" ? "flex-wrap justify-center gap-3" : "gap-3"
      } ${className}`}
    >
      {SOCIALS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105 hover:text-coral dark:text-sand"
        >
          <span aria-hidden>{social.emoji}</span>
          {social.name}
        </a>
      ))}
    </div>
  );
}
