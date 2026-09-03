"use client";

import { useEffect } from "react";
import { registerGsapPlugins } from "@/lib/gsap/register";
import {
  bindLenis,
  installScrollPreservation,
  notifyScrollReady,
} from "@/lib/gsap/scroll-preserve";

/** Native scroll only — Lenis handoff was resetting scroll after hydration. */
export function SmoothScroll() {
  useEffect(() => {
    registerGsapPlugins();
    installScrollPreservation();
    bindLenis(null);
    notifyScrollReady();
  }, []);

  return null;
}
