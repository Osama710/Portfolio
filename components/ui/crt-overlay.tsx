"use client";

import { useReducedMotion } from "framer-motion";

export function CrtOverlay() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true">
      <div
        className={`scanline-overlay absolute inset-0 ${shouldReduceMotion ? "scanline-static" : "scanline-animated"}`}
      />
      <div className="crt-vignette absolute inset-0" />
      <div className="console-bezel absolute inset-0" />
    </div>
  );
}
