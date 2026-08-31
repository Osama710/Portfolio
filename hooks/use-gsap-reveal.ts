"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap, motionAllowed, registerGsapPlugins } from "@/lib/gsap/register";

type RevealOptions = {
  selector: string;
  trigger?: string;
  start?: string;
  stagger?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  scrub?: boolean | number;
  once?: boolean;
};

export function useGsapReveal(
  scope: RefObject<HTMLElement | null>,
  {
    selector,
    trigger,
    start = "top 82%",
    stagger = 0.08,
    y = 48,
    x = 0,
    scale = 1,
    duration = 0.75,
    delay = 0,
    scrub = false,
    once = true,
  }: RevealOptions,
  deps: unknown[] = [],
) {
  useGSAP(
    () => {
      registerGsapPlugins();
      if (!motionAllowed()) {
        gsap.set(selector, { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1 });
        return;
      }

      const root = scope.current;
      if (!root) return;

      gsap.from(selector, {
        y,
        x,
        scale,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: scrub ? "none" : "power3.out",
        scrollTrigger: {
          trigger: trigger ?? root,
          start,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
          scrub,
        },
      });
    },
    { scope, dependencies: deps },
  );
}
