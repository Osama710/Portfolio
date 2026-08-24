"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BootSequenceProps {
  onComplete?: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(!shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete?.();
      return;
    }

    let finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      setActive(false);
      onComplete?.();
    }

    const timer = window.setTimeout(finish, 1200);

    function handleSkip() {
      finish();
    }

    window.addEventListener("click", handleSkip, { passive: true });
    window.addEventListener("keydown", handleSkip, { passive: true });
    window.addEventListener("scroll", handleSkip, { passive: true });
    window.addEventListener("wheel", handleSkip, { passive: true });
    window.addEventListener("touchstart", handleSkip, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("click", handleSkip);
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("scroll", handleSkip);
      window.removeEventListener("wheel", handleSkip);
      window.removeEventListener("touchstart", handleSkip);
    };
  }, [onComplete, shouldReduceMotion]);

  if (!active) return null;

  return (
    <motion.div
      className="boot-sequence fixed inset-0 z-[200] flex cursor-pointer items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div className="boot-sequence-flash absolute inset-0" />
      <div className="boot-sequence-scan absolute inset-0" />
      <p className="relative z-10 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-phosphor/40">
        OSAMA.SYS — initializing
      </p>
    </motion.div>
  );
}
