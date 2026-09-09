"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, motionAllowed, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { getScrollY, onScrollReady, restoreScrollY } from "@/lib/gsap/scroll-preserve";
import { setupExperienceJourney } from "@/components/gsap/journey-reveals";

const SECTIONS = [
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "capabilities",
  "education",
  "contact",
] as const;

function supportsViewTimeline() {
  return typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()");
}

function setActiveSection(root: HTMLElement, sectionId: string) {
  document.documentElement.dataset.section = sectionId;
  SECTIONS.forEach((id) => {
    root.querySelector(`#${id}`)?.classList.toggle("scroll-active", id === sectionId);
  });
}

function setupSectionTracking(root: HTMLElement) {
  const observed = SECTIONS.map((id) => root.querySelector(`#${id}`)).filter(Boolean) as HTMLElement[];

  const observer = new IntersectionObserver(
    (entries) => {
      let best: { id: (typeof SECTIONS)[number]; ratio: number } | null = null;

      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id as (typeof SECTIONS)[number];
        if (!SECTIONS.includes(id)) continue;
        if (!best || entry.intersectionRatio > best.ratio) {
          best = { id, ratio: entry.intersectionRatio };
        }
      }

      if (best && document.documentElement.dataset.section !== best.id) {
        setActiveSection(root, best.id);
      }
    },
    { root: null, rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.12, 0.25, 0.5] },
  );

  observed.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}

function setupScrollPauseHint() {
  let timer = 0;

  const onScroll = () => {
    document.documentElement.classList.add("is-scrolling");
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      document.documentElement.classList.remove("is-scrolling");
    }, 120);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.clearTimeout(timer);
    document.documentElement.classList.remove("is-scrolling");
  };
}

function setupHeroFallback(root: HTMLElement): () => void {
  if (supportsViewTimeline()) {
    document.documentElement.dataset.heroScroll = "css";
    return () => {};
  }

  document.documentElement.dataset.heroScroll = "gsap";
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const orbit = root.querySelector(".hero-orbit-wrap-desktop .hero-orbit-zoom");
    const copy = root.querySelectorAll(".hero-copy-top, .hero-copy-rest");
    if (!orbit) return;

    gsap.set(orbit, { transformOrigin: "50% 50%", force3D: true });

    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "80% top",
      onLeave: () => {
        gsap.to(orbit, { scale: 2.4, autoAlpha: 0, duration: 0.45, ease: "power2.in", overwrite: true });
        gsap.to(copy, { y: -32, autoAlpha: 0, duration: 0.4, ease: "power2.in", overwrite: true });
      },
      onEnterBack: () => {
        gsap.set(orbit, { scale: 1, autoAlpha: 1, rotate: 0 });
        gsap.set(copy, { y: 0, autoAlpha: 1 });
      },
    });
  });

  return () => {
    mm.revert();
  };
}

let scrollEngineReady = false;
let cleanupFns: Array<() => void> = [];

function ensureScrollEngine(root: HTMLElement) {
  if (scrollEngineReady) return;

  const scrollY = getScrollY();
  const mediaStores: ReturnType<typeof gsap.matchMedia>[] = [];

  cleanupFns.push(setupSectionTracking(root));
  cleanupFns.push(setupScrollPauseHint());
  cleanupFns.push(setupHeroFallback(root));

  const removeExperience = setupExperienceJourney(root, mediaStores);
  if (removeExperience) cleanupFns.push(removeExperience);
  ScrollTrigger.sort();
  restoreScrollY(scrollY);
  document.documentElement.dataset.scrollReady = "1";
  scrollEngineReady = true;
}

export function ScrollShell({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.config({ ignoreMobileResize: true });

      const root = wrapRef.current;
      if (!root) return;

      if (!motionAllowed()) {
        document.documentElement.dataset.heroScroll = "off";
        return;
      }

      let cancelled = false;

      const bootScroll = () => {
        if (cancelled || !root) return;

        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => {
            if (!cancelled) ensureScrollEngine(root);
          });
        } else {
          setTimeout(() => {
            if (!cancelled) ensureScrollEngine(root);
          }, 1);
        }
      };

      onScrollReady(bootScroll);

      return () => {
        cancelled = true;
        cleanupFns.forEach((fn) => fn());
        cleanupFns = [];
        scrollEngineReady = false;
        delete document.documentElement.dataset.section;
        delete document.documentElement.dataset.heroScroll;
        delete document.documentElement.dataset.scrollReady;
      };
    },
    { scope: wrapRef, dependencies: [] },
  );

  return (
    <div ref={wrapRef} className="scroll-shell relative min-w-0 overflow-x-clip overflow-y-visible">
      {children}
    </div>
  );
}
