"use client";

import { useEffect } from "react";
import { registerGsapPlugins } from "@/lib/gsap/register";
import {
  bindLenis,
  installScrollPreservation,
  notifyScrollReady,
} from "@/lib/gsap/scroll-preserve";

/** Native scroll — Lenis lerp added perceived lag with pinned GSAP sections. */
export function SmoothScroll() {
  useEffect(() => {
    registerGsapPlugins();
    installScrollPreservation();
    bindLenis(null);
    notifyScrollReady();
  }, []);

  return null;
}
