"use client";

import { motion } from "framer-motion";
import { useDexScreenerData } from "@/hooks/useDexScreenerData";
import { GUARDIAN_PANELS, GUARDIAN_COPY } from "@/lib/constants";
import {
  DAILY_REPORTS,
  LAUNCH_MONITOR,
  GRADUATION_TRACKER,
  BIG_WINNERS,
  RUG_ALERTS,
  EXPLOIT_WATCH,
} from "@/lib/guardianReports";
import { formatCompactUsd, formatPercent, formatPrice } from "@/lib/utils";
import PearlPortrait from "./PearlPortrait";

function LivePanel({
  title,
  icon,
  description,
  stats,
  delay,
}: {
  title: string;
  icon: string;
  description: string;
  stats: { label: string; value: string; accent?: "up" | "down" }[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="glass relative flex flex-col gap-4 rounded-2xl p-6 shadow-glass"
    >
      <span className="absolute right-4 top-4 rounded-full bg-rhgreen/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-rhgreen">
        Live
      </span>
      <span className="text-2xl">{icon}</span>
      <h3 className="font-display text-lg font-bold text-ink dark:text-sand">
        {title}
      </h3>
      <p className="text-sm text-ink/60 dark:text-sand/60">{description}</p>
      <div className="mt-1 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label}>
            <div
              className={`font-display text-lg font-extrabold ${
                s.accent === "up"
                  ? "text-emerald-500"
                  : s.accent === "down"
                  ? "text-coral"
                  : "text-lagoon-deep dark:text-seafoam"
              }`}
            >
              {s.value}
            </div>
            <div className="text-xs font-semibold text-ink/50 dark:text-sand/50">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CuratedPanel({
  title,
  icon,
  description,
  delay,
  rows,
}: {
  title: string;
  icon: string;
  description: string;
  delay: number;
  rows: { primary: string; secondary: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="glass relative flex flex-col gap-3 rounded-2xl border border-dashed border-gold/40 p-6 shadow-glass"
    >
      <span className="absolute right-4 top-4 rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-dark dark:text-gold">
        Manually Curated
      </span>
      <span className="text-2xl">{icon}</span>
      <h3 className="font-display text-lg font-bold text-ink dark:text-sand">
        {title}
      </h3>
      <p className="text-sm text-ink/55 dark:text-sand/55">{description}</p>
      <ul className="mt-1 flex flex-col gap-2">
        {rows.map((row, i) => (
          <li
            key={i}
            className="rounded-xl bg-white/40 px-3 py-2 text-left dark:bg-white/5"
          >
            <div className="text-sm font-bold text-ink dark:text-sand">
              {row.primary}
            </div>
            <div className="text-xs text-ink/55 dark:text-sand/55">
              {row.secondary}
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function GuardianDashboard() {
  const { data, status, lastUpdated } = useDexScreenerData();
  const loading = status === "loading" && !data;
  const priceChange = data?.priceChange24h ?? null;
  const accent: "up" | "down" | undefined =
    priceChange === null ? undefined : priceChange >= 0 ? "up" : "down";

  const marketPanel = GUARDIAN_PANELS.find((p) => p.id === "market-overview")!;
  const chainPanel = GUARDIAN_PANELS.find((p) => p.id === "chain-watch")!;
  const panelById = (id: string) => GUARDIAN_PANELS.find((p) => p.id === id)!;

  return (
    <section
      id="dashboard"
      className="relative overflow-hidden bg-sand-light px-6 py-24 dark:bg-ink"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex justify-center">
          <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gold-dark dark:text-gold">
            {GUARDIAN_COPY.eyebrow}
          </span>
        </div>
        <div className="mb-12 flex flex-col items-center text-center">
          <PearlPortrait size={72} floating={false} glow={false} className="mb-4" />
          <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-rhgreen">
            Guardian Dashboard
          </span>
          <h2 className="section-heading mt-3 text-4xl text-lagoon-deep dark:text-seafoam sm:text-5xl">
            Chain Watch HQ
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-ink/60 dark:text-sand/60">
            {status === "error" && !data
              ? "Live data is temporarily unavailable — retrying every 30 seconds."
              : lastUpdated
              ? `Auto-refreshes every 30s · last updated ${lastUpdated.toLocaleTimeString()}`
              : "Fetching the latest numbers..."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <LivePanel
            title={marketPanel.title}
            icon={marketPanel.icon}
            description={marketPanel.description}
            delay={0}
            stats={[
              { label: "Price", value: loading ? "Loading..." : formatPrice(data?.priceUsd) },
              { label: "Market Cap", value: loading ? "Loading..." : formatCompactUsd(data?.marketCap) },
              { label: "FDV", value: loading ? "Loading..." : formatCompactUsd(data?.fdv) },
              {
                label: "24h Change",
                value: loading ? "Loading..." : formatPercent(priceChange),
                accent,
              },
            ]}
          />
          <LivePanel
            title={chainPanel.title}
            icon={chainPanel.icon}
            description={chainPanel.description}
            delay={0.08}
            stats={[
              { label: "Liquidity", value: loading ? "Loading..." : formatCompactUsd(data?.liquidityUsd) },
              { label: "24h Volume", value: loading ? "Loading..." : formatCompactUsd(data?.volume24h) },
              {
                label: "Holders",
                value:
                  loading || data?.holders === null || data?.holders === undefined
                    ? "N/A"
                    : data.holders.toLocaleString(),
              },
              { label: "Dex", value: loading ? "Loading..." : data?.dexId ?? "—" },
            ]}
          />

          <CuratedPanel
            title={panelById("daily-reports").title}
            icon={panelById("daily-reports").icon}
            description={panelById("daily-reports").description}
            delay={0.16}
            rows={DAILY_REPORTS.map((r) => ({
              primary: r.title,
              secondary: `${r.date} — ${r.body}`,
            }))}
          />
          <CuratedPanel
            title={panelById("launch-monitor").title}
            icon={panelById("launch-monitor").icon}
            description={panelById("launch-monitor").description}
            delay={0.22}
            rows={LAUNCH_MONITOR.map((r) => ({
              primary: `${r.name} (${r.symbol})`,
              secondary: `${r.launchedAt} — ${r.note}`,
            }))}
          />
          <CuratedPanel
            title={panelById("graduation-tracker").title}
            icon={panelById("graduation-tracker").icon}
            description={panelById("graduation-tracker").description}
            delay={0.28}
            rows={GRADUATION_TRACKER.map((r) => ({
              primary: `${r.name} (${r.symbol})`,
              secondary: `${r.milestone} — ${r.note}`,
            }))}
          />
          <CuratedPanel
            title={panelById("big-winners").title}
            icon={panelById("big-winners").icon}
            description={panelById("big-winners").description}
            delay={0.34}
            rows={BIG_WINNERS.map((r) => ({
              primary: `${r.name} (${r.symbol}) · ${r.change24h}`,
              secondary: r.note,
            }))}
          />
          <CuratedPanel
            title={panelById("rug-alerts").title}
            icon={panelById("rug-alerts").icon}
            description={panelById("rug-alerts").description}
            delay={0.4}
            rows={RUG_ALERTS.map((r) => ({
              primary: `${r.name} (${r.symbol}) · ${r.severity} risk`,
              secondary: r.note,
            }))}
          />
          <CuratedPanel
            title={panelById("exploit-watch").title}
            icon={panelById("exploit-watch").icon}
            description={panelById("exploit-watch").description}
            delay={0.46}
            rows={EXPLOIT_WATCH.map((r) => ({
              primary: `${r.name} · ${r.severity} risk`,
              secondary: r.note,
            }))}
          />
        </div>

        <p className="mt-6 text-center text-xs text-ink/40 dark:text-sand/40">
          {GUARDIAN_COPY.disclaimer}
        </p>
      </div>
    </section>
  );
}
