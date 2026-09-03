"use client";

import { useLayoutEffect } from "react";

/** Re-sync hero counters + rotator the instant React hydrates (no 4s wait). */
export function HeroBootSync() {
  useLayoutEffect(() => {
    window.dispatchEvent(new Event("hero:resync"));
  }, []);

  return null;
}
