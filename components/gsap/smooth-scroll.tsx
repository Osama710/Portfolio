"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import {
  bindLenis,
  getScrollY,
  installScrollPreservation,
  notifyScrollReady,
  restoreScrollY,
} from "@/lib/gsap/scroll-preserve";

let lenisSingleton: Lenis | null = null;
let lenisRafId = 0;

function startLenisRaf(lenis: Lenis) {
  const tick = (time: number) => {
    lenis.raf(time);
    lenisRafId = requestAnimationFrame(tick);
  };
  lenisRafId = requestAnimationFrame(tick);
}

function shouldUseLenis() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SmoothScroll() {
  useEffect(() => {
    registerGsapPlugins();
    installScrollPreservation();

    if (!shouldUseLenis()) {
      bindLenis(null);
      notifyScrollReady();
      return;
    }

    if (lenisSingleton) {
      bindLenis(lenisSingleton);
      notifyScrollReady();
      return;
    }

    const savedY = getScrollY();

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
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

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());

    lenisSingleton = lenis;
    bindLenis(lenis);
    startLenisRaf(lenis);

    restoreScrollY(savedY);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      restoreScrollY(savedY);
      notifyScrollReady();
    });

    return () => {
      // Keep Lenis alive across Strict Mode remounts — destroying it caused scroll jumps.
    };
  }, []);

  return null;
}
