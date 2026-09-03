"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";

function useNativeScroll() {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(max-width: 1023px)").matches
  );
}

export function SmoothScroll() {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const boot = () => {
      if (cancelled) return;
      registerGsapPlugins();

      const refresh = () => ScrollTrigger.refresh();

      if (useNativeScroll()) {
        window.setTimeout(refresh, 180);
        window.addEventListener("load", refresh, { passive: true });
        cleanup = () => window.removeEventListener("load", refresh);
        return;
      }

      const lenis = new Lenis({
        duration: 0.78,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 0.9,
        wheelMultiplier: 0.95,
      });

      lenis.scrollTo(0, { immediate: true });
      lenis.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (value !== undefined) {
            lenis.scrollTo(value, { immediate: Math.abs(value - lenis.scroll) < window.innerHeight * 0.6, force: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.documentElement.style.transform ? "transform" : "fixed",
      });

      const onRefresh = () => lenis.resize();
      ScrollTrigger.addEventListener("refresh", onRefresh);

      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(500, 33);

      window.setTimeout(refresh, 220);
      window.addEventListener("load", refresh, { passive: true });

      cleanup = () => {
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        gsap.ticker.remove(tick);
        lenis.destroy();
        window.removeEventListener("load", refresh);
      };
    };

    const bootId = window.setTimeout(boot, 60);

    return () => {
      cancelled = true;
      window.clearTimeout(bootId);
      cleanup?.();
    };
  }, []);

  return null;
}
