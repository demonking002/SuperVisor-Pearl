"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { POP_MILESTONES } from "@/lib/constants";

const STORAGE_KEY = "pearl-hq-pop-count";
const UNLOCKED_KEY = "pearl-hq-unlocked";

export type Milestone = (typeof POP_MILESTONES)[number];

export function usePopTracker() {
  const [count, setCount] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const unlockedRef = useRef<Set<string>>(new Set());
  const queueRef = useRef<Milestone[]>([]);

  useEffect(() => {
    try {
      const storedCount = window.localStorage.getItem(STORAGE_KEY);
      const storedUnlocked = window.localStorage.getItem(UNLOCKED_KEY);
      if (storedCount) setCount(parseInt(storedCount, 10) || 0);
      if (storedUnlocked) {
        unlockedRef.current = new Set(JSON.parse(storedUnlocked));
      }
    } catch {
      // localStorage unavailable — degrade to in-memory only
    }
  }, []);

  // Whenever the active toast clears, pull the next queued milestone (if any).
  useEffect(() => {
    if (activeMilestone === null && queueRef.current.length > 0) {
      const next = queueRef.current.shift();
      if (next) setActiveMilestone(next);
    }
  }, [activeMilestone, count]);

  const registerPop = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      try {
        window.localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      const milestone = POP_MILESTONES.find((m) => m.count === next);
      if (milestone && !unlockedRef.current.has(milestone.id)) {
        unlockedRef.current.add(milestone.id);
        try {
          window.localStorage.setItem(
            UNLOCKED_KEY,
            JSON.stringify(Array.from(unlockedRef.current))
          );
        } catch {
          // ignore
        }
        queueRef.current.push(milestone);
      }
      return next;
    });
  }, []);

  const dismissMilestone = useCallback(() => {
    setActiveMilestone(null);
  }, []);

  return { count, activeMilestone, registerPop, dismissMilestone };
}
