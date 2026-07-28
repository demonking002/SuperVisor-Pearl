export const SITE = {
  name: "Supervisor PEARL HQ",
  shortName: "Pearl",
  ticker: "$PEARL",
  tagline: "Robinhood Chain's community guardian is on patrol.",
  description:
    "Supervisor PEARL HQ is the community hub for $PEARL — a fictional mascot who patrols Robinhood Chain and shares chain-watch observations with the community. Not affiliated with or endorsed by Robinhood.",
  // TODO: replace with the real production domain once one exists — this
  // affects metadataBase, sitemap.xml, robots.txt, and JSON-LD.
  url: "https://supervisorpearl.example",
  contractAddress: "0x4f1a76a88C1633f9151Ab16BDF4d937F9A65E97E",
  twitter: "https://x.com/SupervisorPearl",
  telegram: "https://t.me/SuperVisorPearl",
  dexscreener: "https://dexscreener.com/robinhood/0xB87f4f4B43dB82089757eE6C2D76766D66252207",
  chain: "robinhood",
  pairAddress: "0xB87f4f4B43dB82089757eE6C2D76766D66252207",
};

// Brand/lore note: Pearl is a community mascot inspired by the viral
// watermelon cat from Thailand. Within this site's fiction, Pearl has taken
// on the role of a community "guardian" who watches Robinhood Chain and
// reports what she sees. This is fan/community storytelling — NOT an
// official Robinhood product, security service, or guaranteed protection.
// Always use non-affiliation-safe phrasing: "Community Guardian", "Chain
// Watcher", "On Patrol", "Guardian Reports" — never "Official Robinhood
// Guardian", "official security", or claims of guaranteed protection.
export const GUARDIAN_COPY = {
  eyebrow: "Community Storytelling — Not Affiliated With Robinhood",
  heroBadge: "On Patrol · Robinhood Chain",
  heroHeadline: "Supervisor Pearl HQ",
  heroSubhead:
    "Pearl is a community-run mascot who keeps watch over Robinhood Chain and shares what she notices. Purely for fun — always verify anything important yourself.",
  disclaimer:
    "Supervisor PEARL HQ is an independent, fan-made community project. It is not affiliated with, endorsed by, or operated by Robinhood. Nothing here is official security monitoring, financial advice, or a guarantee of safety — always do your own research.",
};

// DexScreener API config — used by hooks/useDexScreenerData.ts
// Docs: https://docs.dexscreener.com/api/reference
export const DEXSCREENER_API_URL = `https://api.dexscreener.com/latest/dex/pairs/${SITE.chain}/${SITE.pairAddress}`;
export const DEXSCREENER_REFRESH_MS = 30_000;

// ---------------------------------------------------------------------------
// GUARDIAN DASHBOARD — HQ-style monitoring panels.
// "status: live" panels (Market Overview, Chain Watch) are backed by the
// real DexScreener feed in hooks/useDexScreenerData.ts. The rest are
// manually curated — see lib/guardianReports.ts, a local data file the team
// edits directly (no live API/indexer). That's deliberate: safety-relevant
// panels like Rug Alerts and Exploit Watch should only ever reflect what a
// real person has verified, not an automated feed.
// ---------------------------------------------------------------------------
export const GUARDIAN_PANELS = [
  {
    id: "market-overview",
    title: "Market Overview",
    icon: "📊",
    status: "live" as const,
    description: "Live price, market cap, FDV, and 24h change from DexScreener.",
  },
  {
    id: "chain-watch",
    title: "Chain Watch",
    icon: "🩺",
    status: "live" as const,
    description: "Live liquidity and 24h volume — a quick read on trading activity.",
  },
  {
    id: "daily-reports",
    title: "Daily Reports",
    icon: "📰",
    status: "curated" as const,
    description: "Pearl's day-to-day notes from the trenches — posted by the team, not automated.",
  },
  {
    id: "launch-monitor",
    title: "Launch Monitor",
    icon: "🚀",
    status: "curated" as const,
    description: "New pairs on Robinhood Chain the team has manually spotted and verified.",
  },
  {
    id: "graduation-tracker",
    title: "Graduation Tracker",
    icon: "🎓",
    status: "curated" as const,
    description: "Tokens crossing key liquidity milestones, logged by hand by the team.",
  },
  {
    id: "big-winners",
    title: "Big Winners",
    icon: "📈",
    status: "curated" as const,
    description: "Notable 24h performers the team has flagged — not an automated leaderboard.",
  },
  {
    id: "rug-alerts",
    title: "Rug Alerts",
    icon: "⚠️",
    status: "curated" as const,
    description: "Community-flagged risk reports. Manual and best-effort only — never a guarantee of safety.",
  },
  {
    id: "exploit-watch",
    title: "Exploit Watch",
    icon: "🛰️",
    status: "curated" as const,
    description: "Publicly reported exploits relevant to the chain, added by hand by the team.",
  },
] as const;

// ---------------------------------------------------------------------------
// STORY — draft placeholder content. Written to fit the HQ / guardian
// theme so the page isn't empty, but treat every word here as a draft:
// swap it out for the real founding story whenever it's ready.
// ---------------------------------------------------------------------------
export const STORY_CHAPTERS: { title: string; text: string }[] = [
  {
    title: "A Cat With a Reputation",
    text: "Long before Robinhood Chain existed, Pearl was already famous — the round, unbothered watermelon cat from Thailand whose photos traveled further than she ever has. The internet decided she looked like she was in charge of something. Nobody argued.",
  },
  {
    title: "The Assignment",
    text: "When a new chain needed a mascot who could sit still, look serious, and somehow make everyone feel a little safer, the community drafted Pearl for the job. She didn't apply. She was simply, unanimously, appointed.",
  },
  {
    title: "On Patrol",
    text: "These days Pearl keeps an eye on the chain the way she keeps an eye on a watermelon: patiently, silently, and with the quiet implication that she's seen more than she's letting on.",
  },
  {
    title: "What HQ Actually Is",
    text: "Supervisor Pearl HQ is where the community gathers her \"reports\" — part running joke, part genuine chain-watch dashboard. It's fan-made, it's for fun, and Pearl remains, as always, extremely good at her job of sitting there looking important.",
  },
];

// ---------------------------------------------------------------------------
// ROADMAP — draft placeholder content, styled as an island-by-island patrol
// route. Replace with the real roadmap whenever it's ready.
// ---------------------------------------------------------------------------
export const ROADMAP: { island: string; title: string; description: string }[] = [
  {
    island: "First Landing",
    title: "HQ Opens Its Doors",
    description:
      "Site launches, socials go live, and the Guardian Dashboard starts tracking $PEARL in real time.",
  },
  {
    island: "Second Watch",
    title: "The Reports Get Real",
    description:
      "Daily Reports and the manually-curated dashboard panels start filling in as the team keeps watch on the chain.",
  },
  {
    island: "Third Horizon",
    title: "The Community Grows the Map",
    description:
      "Community-driven milestones, more easter eggs, and expanded Guardian Dashboard coverage as Robinhood Chain activity grows.",
  },
  {
    island: "Uncharted",
    title: "Beyond the Current Map",
    description:
      "This stop is intentionally blank — replace it with whatever comes next once the real roadmap is locked in.",
  },
];

// ---------------------------------------------------------------------------
// FAQ — draft placeholder content. Replace with the real questions the
// team wants answered.
// ---------------------------------------------------------------------------
export const FAQS: { question: string; answer: string }[] = [
  {
    question: "Is Supervisor Pearl HQ affiliated with Robinhood?",
    answer:
      "No. This is an independent, fan-made community project built around Pearl as a mascot. It is not affiliated with, endorsed by, or operated by Robinhood in any way.",
  },
  {
    question: "What is $PEARL?",
    answer:
      "$PEARL is a community token on Robinhood Chain. It's built around Pearl's mascot lore rather than any promise of returns — always do your own research before buying any token.",
  },
  {
    question: "How do I buy $PEARL?",
    answer:
      "Use the Buy button in the How to Buy section — it opens the live $PEARL pair on DexScreener. Always double-check the contract address on this page before swapping.",
  },
  {
    question: "Is the Guardian Dashboard live data?",
    answer:
      "The Market Overview and Chain Watch panels pull live numbers from DexScreener. The other panels (Daily Reports, Launch Monitor, Rug Alerts, etc.) are manually curated by the team rather than automated — never treat them as a guarantee of safety.",
  },
  {
    question: "Where can I find the community?",
    answer:
      "Links to X and Telegram are in the navbar and footer — that's the best place to ask questions and follow updates.",
  },
];

export const HOW_TO_BUY_STEPS = [
  {
    emoji: "👛",
    title: "Get a Wallet",
    text: "Install a wallet that supports the Robinhood chain and create or import your account. Keep your seed phrase offline and never share it.",
  },
  {
    emoji: "💧",
    title: "Fund It",
    text: "Transfer the native gas token for the Robinhood chain into your wallet so you can cover the swap and network fees.",
  },
  {
    emoji: "🔄",
    title: "Open the Swap",
    text: "Use the Buy button on this page — it opens the live $PEARL pair on DexScreener, where you can jump straight into the swap.",
  },
  {
    emoji: "🏝️",
    title: "Verify & Swap",
    text: "Double-check the contract address below matches exactly, paste it into your swap interface, and confirm the transaction.",
  },
];

// ---------------------------------------------------------------------------
// EASTER EGGS — global watermelon-pop milestones tracked across the page.
// ---------------------------------------------------------------------------
export const POP_MILESTONES = [
  {
    count: 10,
    id: "achievement-10",
    title: "Achievement Unlocked",
    description: "You've popped 10 watermelons. Guardian HQ is taking notes.",
    icon: "🏆",
  },
  {
    count: 50,
    id: "pearl-speaks-50",
    title: "Pearl Speaks",
    description: "\"Okay, okay — you've got my attention. Keep going.\"",
    icon: "🐚",
  },
  {
    count: 100,
    id: "watermelon-rain-100",
    title: "Watermelon Rain",
    description: "You broke the patch. The sky is raining watermelons.",
    icon: "🍉",
  },
  {
    count: 250,
    id: "diamond-hands-250",
    title: "Diamond Hands Unlocked",
    description: "250 pops. Certified HQ legend.",
    icon: "💎",
  },
] as const;

export const EASTER_EGG_HINT =
  "Pearl is hiding somewhere on this page. Try clicking her seven times — and keep an eye on the watermelon patch.";
