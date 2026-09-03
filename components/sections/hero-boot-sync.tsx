"use client";

import { useLayoutEffect } from "react";

/** Re-sync hero counters only if hydration reset them to empty/zero. */
export function HeroBootSync() {
  useLayoutEffect(() => {
    window.dispatchEvent(new Event("hero:resync"));
  }, []);

  return null;
}
