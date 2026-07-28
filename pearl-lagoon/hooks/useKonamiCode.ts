"use client";

import { useEffect, useRef } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onUnlock: () => void) {
  const progress = useRef(0);
  const callbackRef = useRef(onUnlock);
  callbackRef.current = onUnlock;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const expected = KONAMI_SEQUENCE[progress.current];
      const pressed = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (pressed === expected) {
        progress.current += 1;
        if (progress.current === KONAMI_SEQUENCE.length) {
          progress.current = 0;
          callbackRef.current();
        }
      } else {
        progress.current = pressed === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
