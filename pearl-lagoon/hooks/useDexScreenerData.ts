"use client";

import { useEffect, useRef, useState } from "react";
import { DEXSCREENER_API_URL, DEXSCREENER_REFRESH_MS } from "@/lib/constants";

export interface DexPairData {
  priceUsd: string | null;
  marketCap: number | null;
  fdv: number | null;
  liquidityUsd: number | null;
  volume24h: number | null;
  priceChange24h: number | null;
  pairUrl: string | null;
  dexId: string | null;
  baseTokenSymbol: string | null;
  // DexScreener's public API does not expose holder counts — this stays
  // null until a chain explorer / indexer source is wired in.
  holders: number | null;
}

interface DexScreenerResponse {
  pairs:
    | {
        priceUsd?: string;
        marketCap?: number;
        fdv?: number;
        liquidity?: { usd?: number };
        volume?: { h24?: number };
        priceChange?: { h24?: number };
        url?: string;
        dexId?: string;
        baseToken?: { symbol?: string };
      }[]
    | null;
}

export type DexFetchStatus = "loading" | "success" | "error";

export function useDexScreenerData() {
  const [data, setData] = useState<DexPairData | null>(null);
  const [status, setStatus] = useState<DexFetchStatus>("loading");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    async function fetchData() {
      try {
        const res = await fetch(DEXSCREENER_API_URL, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`DexScreener responded ${res.status}`);
        const json: DexScreenerResponse = await res.json();
        const pair = json.pairs?.[0];
        if (!pair) throw new Error("No pair data returned");

        if (!mounted.current) return;
        setData({
          priceUsd: pair.priceUsd ?? null,
          marketCap: pair.marketCap ?? null,
          fdv: pair.fdv ?? null,
          liquidityUsd: pair.liquidity?.usd ?? null,
          volume24h: pair.volume?.h24 ?? null,
          priceChange24h: pair.priceChange?.h24 ?? null,
          pairUrl: pair.url ?? null,
          dexId: pair.dexId ?? null,
          baseTokenSymbol: pair.baseToken?.symbol ?? null,
          holders: null,
        });
        setStatus("success");
        setLastUpdated(new Date());
      } catch {
        if (!mounted.current) return;
        // Graceful fallback: keep whatever we last had (so the numbers
        // don't flicker to zero), but flag the error state so the UI can
        // show "Loading..." instead of fake data if we never got a value.
        setStatus("error");
      }
    }

    fetchData();
    const interval = setInterval(fetchData, DEXSCREENER_REFRESH_MS);

    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, []);

  return { data, status, lastUpdated };
}
