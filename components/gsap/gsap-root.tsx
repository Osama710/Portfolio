"use client";

import { useEffect } from "react";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";

export function GsapRoot() {
  useEffect(() => {
    registerGsapPlugins();

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 400);

    window.addEventListener("load", refresh, { passive: true });
    window.addEventListener("resize", refresh, { passive: true });

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return null;
}
