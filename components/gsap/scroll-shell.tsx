"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, motionAllowed, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { getScrollY, onScrollReady, restoreScrollY } from "@/lib/gsap/scroll-preserve";
import { setupExperienceJourney, setupProjectJourney } from "@/components/gsap/journey-reveals";

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

const MOBILE_NEXT_VISIBLE = "top 20%";
const DESKTOP_ORBIT = ".hero-orbit-wrap-desktop .hero-orbit-zoom";
const MOBILE_ORBIT = ".hero-orbit-wrap-mobile .hero-orbit-zoom";

function setActiveSection(root: HTMLElement, sectionId: string) {
  document.documentElement.dataset.section = sectionId;
  SECTIONS.forEach((id) => {
    root.querySelector(`#${id}`)?.classList.toggle("scroll-active", id === sectionId);
  });
}

function setupSectionTracking(root: HTMLElement) {
  let ticking = false;

  const update = () => {
    ticking = false;
    const marker = window.innerHeight * 0.45;
    let active: (typeof SECTIONS)[number] = "hero";

    for (const id of SECTIONS) {
      const el = root.querySelector(`#${id}`);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= marker) active = id;
    }

    if (document.documentElement.dataset.section !== active) {
      setActiveSection(root, active);
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  update();

  return () => window.removeEventListener("scroll", onScroll);
}

function unlockInteractivePanels(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(
    root.querySelectorAll(".career-mobile-shell, .career-detail-panel, .career-track-detail"),
  ).forEach((el) => {
    gsap.set(el, { clearProps: "opacity,visibility,transform,filter" });
  });
}

/** Hero exit: orbit zoom + copy fade only (no about scrub — avoids layout thrash). */
function setupHeroToAboutTransition(root: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const orbit = root.querySelectorAll(DESKTOP_ORBIT);
    const copy = root.querySelectorAll(".hero-copy-top, .hero-copy-rest");
    const cue = root.querySelector(".hero-scroll-cue");
    if (!orbit.length) return;

    gsap.set(orbit, { transformOrigin: "50% 50%", force3D: true });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "80% top",
          scrub: true,
        },
      })
      .fromTo(copy, { y: 0, autoAlpha: 1 }, { y: -48, autoAlpha: 0, ease: "power2.in" }, 0.74)
      .fromTo(cue, { autoAlpha: 1 }, { autoAlpha: 0, ease: "power2.in" }, 0.74)
      .fromTo(
        orbit,
        { scale: 1, rotate: 0, autoAlpha: 1 },
        { scale: 2.6, rotate: 5, autoAlpha: 0, ease: "power2.inOut", force3D: true },
        0.74,
      );
  });

  mm.add("(max-width: 1023px)", () => {
    const orbit = root.querySelectorAll(MOBILE_ORBIT);
    const copy = root.querySelectorAll(".hero-copy-top, .hero-copy-rest");
    if (!orbit.length) return;

    gsap.set(orbit, { transformOrigin: "50% 50%", force3D: true });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .fromTo(copy, { autoAlpha: 1 }, { autoAlpha: 0, ease: "power2.in" }, 0.88)
      .fromTo(
        orbit,
        { scale: 1, autoAlpha: 1 },
        { scale: 1.45, autoAlpha: 0, ease: "power2.inOut", force3D: true },
        0.88,
      );
  });

  return mm;
}

function setupScrollExperience(root: HTMLElement, mediaStores: ReturnType<typeof gsap.matchMedia>[]) {
  const untrack = setupSectionTracking(root);
  mediaStores.push(setupHeroToAboutTransition(root));
  setupExperienceJourney(root, mediaStores);
  setupProjectJourney(root, mediaStores, MOBILE_NEXT_VISIBLE);
  unlockInteractivePanels(root);
  return untrack;
}

let scrollEngineReady = false;
let untrackSections: (() => void) | null = null;

function ensureScrollEngine(root: HTMLElement) {
  if (scrollEngineReady) return;

  const scrollY = getScrollY();
  const mediaStores: ReturnType<typeof gsap.matchMedia>[] = [];
  untrackSections = setupScrollExperience(root, mediaStores) ?? null;
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
        gsap.set(root.querySelectorAll(".section-reveal, .section-heading-block, .section-label, .hero-copy, .hero-orbit-wrap, .hero-scroll-cue, .hero-banner, .career-journey-step, .career-track-detail, .project-journey-item, .project-reveal-media, .project-reveal-content, .project-github-item"), {
          clearProps: "all",
          opacity: 1,
          visibility: "visible",
          x: 0,
          y: 0,
          scale: 1,
          filter: "none",
        });
        return;
      }

      let cancelled = false;

      const bootScroll = () => {
        if (cancelled || !root) return;
        ensureScrollEngine(root);
      };

      onScrollReady(bootScroll);

      return () => {
        cancelled = true;
        untrackSections?.();
        untrackSections = null;
        delete document.documentElement.dataset.section;
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
