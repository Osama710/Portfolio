"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const BOOT_DURATION_MS = 1100;

export function BootSequence() {
  const shouldReduceMotion = useReducedMotion();
  const [showBoot, setShowBoot] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const finishedRef = useRef(false);

  const dismiss = useCallback((instant = false) => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    if (instant) {
      setShowBoot(false);
      return;
    }

    setIsFadingOut(true);
    window.setTimeout(() => setShowBoot(false), 220);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    finishedRef.current = false;
    setIsFadingOut(false);
    setShowBoot(true);

    const timer = window.setTimeout(() => dismiss(false), BOOT_DURATION_MS);

    function skip() {
      dismiss(true);
    }

    window.addEventListener("click", skip, { passive: true });
    window.addEventListener("keydown", skip, { passive: true });
    window.addEventListener("scroll", skip, { passive: true });
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("scroll", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [dismiss, shouldReduceMotion]);

  if (shouldReduceMotion || !showBoot) return null;

  return (
    <div
      className={`boot-sequence fixed inset-0 z-[200] flex cursor-pointer items-center justify-center ${isFadingOut ? "boot-sequence-out" : ""}`}
      onClick={() => dismiss(true)}
      onKeyDown={() => dismiss(true)}
      role="presentation"
      aria-hidden="true"
    >
      <div className="boot-sequence-flash absolute inset-0" aria-hidden="true" />
      <div className="boot-sequence-scan absolute inset-0" aria-hidden="true" />
      <div className="boot-sequence-noise absolute inset-0" aria-hidden="true" />
      <p className="boot-sequence-label relative z-10 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-phosphor/50">
        OSAMA.SYS — initializing
      </p>
    </div>
  );
}
