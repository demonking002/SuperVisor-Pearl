"use client";

import { useCallback, useRef, useState } from "react";

export interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

let rippleId = 0;

export function useRipple(defaultSize = 120) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const addRipple = useCallback(
    (x: number, y: number, size: number = defaultSize) => {
      const id = rippleId++;
      setRipples((prev) => [...prev, { id, x, y, size }]);
      const timer = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
        timers.current.delete(id);
      }, 1200);
      timers.current.set(id, timer);
    },
    [defaultSize]
  );

  const addRippleFromEvent = useCallback(
    (e: React.MouseEvent | React.TouchEvent, size?: number) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      let clientX: number, clientY: number;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        const mouseEvent = e as React.MouseEvent;
        clientX = mouseEvent.clientX;
        clientY = mouseEvent.clientY;
      }
      addRipple(clientX - rect.left, clientY - rect.top, size);
    },
    [addRipple]
  );

  return { ripples, addRipple, addRippleFromEvent };
}
