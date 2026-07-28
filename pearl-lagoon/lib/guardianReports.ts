// ---------------------------------------------------------------------------
// GUARDIAN DASHBOARD — manually curated content.
//
// Market Overview and Chain Watch (in components/GuardianDashboard.tsx) pull
// real live numbers from DexScreener via hooks/useDexScreenerData.ts.
//
// Everything in this file is intentionally NOT a live feed. It's a simple,
// hand-edited local data source for the team to update directly — no API,
// no indexer, no automation. That's a deliberate choice: things like rug
// alerts and exploit reports are safety-relevant, so they should only ever
// reflect what a real person has actually verified, not an automated guess.
//
// To update: just edit the arrays below and redeploy. Each item is dated so
// the newest can be sorted to the top.
// ---------------------------------------------------------------------------

export interface GuardianReport {
  id: string;
  date: string; // e.g. "2026-07-28"
  title: string;
  body: string;
}

export const DAILY_REPORTS: GuardianReport[] = [
  {
    id: "report-sample-1",
    date: "2026-07-28",
    title: "Sample Report — Replace Me",
    body: "This is a placeholder daily report. Add real entries here as the team posts updates — newest first.",
  },
];

export interface LaunchEntry {
  id: string;
  name: string;
  symbol: string;
  launchedAt: string; // e.g. "2026-07-28"
  note: string;
}

export const LAUNCH_MONITOR: LaunchEntry[] = [
  {
    id: "launch-sample-1",
    name: "Sample Token",
    symbol: "SAMPLE",
    launchedAt: "2026-07-28",
    note: "Placeholder entry — replace with real, manually verified launches on Robinhood Chain.",
  },
];

export interface GraduationEntry {
  id: string;
  name: string;
  symbol: string;
  milestone: string;
  note: string;
}

export const GRADUATION_TRACKER: GraduationEntry[] = [
  {
    id: "grad-sample-1",
    name: "Sample Token",
    symbol: "SAMPLE",
    milestone: "Crossed $100k liquidity (placeholder)",
    note: "Replace with real, manually verified milestones.",
  },
];

export interface WinnerEntry {
  id: string;
  name: string;
  symbol: string;
  change24h: string; // display string, e.g. "+128%"
  note: string;
}

export const BIG_WINNERS: WinnerEntry[] = [
  {
    id: "winner-sample-1",
    name: "Sample Token",
    symbol: "SAMPLE",
    change24h: "+0%",
    note: "Placeholder entry — replace with real, manually verified 24h performers.",
  },
];

export interface RiskEntry {
  id: string;
  name: string;
  symbol: string;
  severity: "low" | "medium" | "high";
  note: string;
}

export const RUG_ALERTS: RiskEntry[] = [
  {
    id: "rug-sample-1",
    name: "Sample Token",
    symbol: "SAMPLE",
    severity: "low",
    note: "Placeholder entry. Best-effort and manual only — never treat this list as a guarantee of safety, and always verify independently.",
  },
];

export const EXPLOIT_WATCH: RiskEntry[] = [
  {
    id: "exploit-sample-1",
    name: "Sample Protocol",
    symbol: "N/A",
    severity: "low",
    note: "Placeholder entry. Replace with real, publicly reported exploits relevant to the chain, added manually by the team.",
  },
];
