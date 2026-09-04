"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, motionAllowed, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { getScrollY, onScrollReady, restoreScrollY } from "@/lib/gsap/scroll-preserve";
import { setupExperienceJourney, setupProjectJourney } from "@/components/gsap/journey-reveals";

const SECTIONS = [
  { id: "hero" },
  { id: "about" },
  { id: "skills" },
  { id: "experience" },
  { id: "projects" },
  { id: "capabilities" },
  { id: "education" },
  { id: "contact" },
] as const;

/** Mobile: hide current section once the next one covers ~80% of the viewport. */
const MOBILE_NEXT_VISIBLE = "top 20%";

const DESKTOP_ORBIT = ".hero-orbit-wrap-desktop .hero-orbit-zoom";
const MOBILE_ORBIT = ".hero-orbit-wrap-mobile .hero-orbit-zoom";

function setActiveSection(root: HTMLElement, sectionId: string) {
  document.documentElement.dataset.section = sectionId;
  SECTIONS.forEach((s) => {
    root.querySelector(`#${s.id}`)?.classList.toggle("scroll-active", s.id === sectionId);
  });
}

function syncActiveSectionFromScroll(root: HTMLElement) {
  let active: (typeof SECTIONS)[number]["id"] = "hero";
  const marker = window.innerHeight * 0.45;

  for (const section of SECTIONS) {
    const el = root.querySelector(`#${section.id}`);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= marker) active = section.id;
  }

  setActiveSection(root, active);
}

function setupSectionTracking(root: HTMLElement) {
  SECTIONS.forEach((s) => {
    ScrollTrigger.create({
      trigger: `#${s.id}`,
      start: "top 55%",
      end: "bottom 45%",
      onEnter: () => setActiveSection(root, s.id),
      onEnterBack: () => setActiveSection(root, s.id),
    });
  });
}

function aboutTargets(root: HTMLElement) {
  return root.querySelectorAll(
    "#about .section-label, #about .section-heading-block, #about .section-reveal, #about .panel-vivid, #about .panel-hud, #about .stat-chip",
  );
}

function unlockInteractivePanels(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(
    root.querySelectorAll(".career-mobile-shell, .career-detail-panel, .career-track-detail"),
  ).forEach((el) => {
    gsap.set(el, { clearProps: "opacity,visibility,transform,filter" });
  });
}

const REVEAL_SECTIONS = ["skills", "projects", "capabilities", "education", "contact"] as const;

/** Lightweight one-shot reveals — desktop only to keep mobile scroll snappy. */
function setupSectionReveals(root: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    REVEAL_SECTIONS.forEach((id) => {
      const section = root.querySelector(`#${id}`);
      if (!section) return;

      const targets = section.querySelectorAll(".section-label, .section-heading-block, .section-reveal");
      if (!targets.length) return;

      gsap.from(targets, {
        y: 28,
        opacity: 0,
        duration: 0.72,
        stagger: 0.06,
        ease: "power3.out",
        immediateRender: false,
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top 86%",
          once: true,
          fastScrollEnd: true,
        },
      });
    });
  });

  return mm;
}

/** Hero → about handoff: zoom orbit + fade copy in the final stretch of hero scroll. */
function setupHeroToAboutTransition(root: HTMLElement) {
  const scrollCue = root.querySelector(".hero-scroll-cue");
  const about = aboutTargets(root);
  const copyFade = root.querySelectorAll(".hero-copy-top, .hero-copy-rest");

  const attachTimeline = ({
    orbitSelector,
    orbitScale,
    orbitRotate,
    copyY,
    fadeStart,
    scrollEnd,
  }: {
    orbitSelector: string;
    orbitScale: number;
    orbitRotate: number;
    copyY: number;
    fadeStart: number;
    scrollEnd: string;
  }) => {
    const orbitWrap = root.querySelectorAll(orbitSelector);
    gsap.set(orbitWrap, { transformOrigin: "50% 50%", force3D: true });
    gsap.set(about, { y: 0, autoAlpha: 1 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: scrollEnd,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(
        copyFade,
        { y: 0, autoAlpha: 1, scale: 1 },
        { y: copyY, autoAlpha: 0, scale: 0.98, ease: "power2.in" },
        fadeStart,
      )
      .fromTo(
        scrollCue,
        { autoAlpha: 1, y: 0 },
        { autoAlpha: 0, y: -12, ease: "power2.in" },
        fadeStart,
      )
      .fromTo(
        orbitWrap,
        { scale: 1, rotate: 0, autoAlpha: 1 },
        {
          scale: orbitScale,
          rotate: orbitRotate,
          autoAlpha: 0,
          ease: "power2.inOut",
          transformOrigin: "50% 50%",
        },
        fadeStart,
      )
      .fromTo(
        about,
        { y: 28 },
        { y: 0, stagger: 0.04, ease: "power3.out" },
        fadeStart + 0.04,
      );
  };

  const mm = gsap.matchMedia();

  /* Laptop/desktop: hero fits one screen — 80% scroll span gives room for zoom */
  mm.add("(min-width: 1024px)", () =>
    attachTimeline({
      orbitSelector: DESKTOP_ORBIT,
      orbitScale: 3.1,
      orbitRotate: 6,
      copyY: -64,
      fadeStart: 0.74,
      scrollEnd: "80% top",
    }),
  );

  /* Mobile: tall hero — tie animation to hero leaving viewport, fade only at the end */
  mm.add("(max-width: 1023px)", () =>
    attachTimeline({
      orbitSelector: MOBILE_ORBIT,
      orbitScale: 1.55,
      orbitRotate: 5,
      copyY: -28,
      fadeStart: 0.9,
      scrollEnd: "bottom top",
    }),
  );

  return mm;
}

function setupScrollExperience(root: HTMLElement, mediaStores: ReturnType<typeof gsap.matchMedia>[]) {
  setupSectionTracking(root);
  mediaStores.push(setupSectionReveals(root));
  mediaStores.push(setupHeroToAboutTransition(root));
  setupExperienceJourney(root, mediaStores);
  setupProjectJourney(root, mediaStores, MOBILE_NEXT_VISIBLE);
  unlockInteractivePanels(root);
}

let scrollEngineStores: ReturnType<typeof gsap.matchMedia>[] = [];
let scrollEngineReady = false;

function ensureScrollEngine(root: HTMLElement) {
  if (scrollEngineReady) return;

  const scrollY = getScrollY();
  setupScrollExperience(root, scrollEngineStores);
  ScrollTrigger.sort();
  ScrollTrigger.update();
  syncActiveSectionFromScroll(root);
  restoreScrollY(scrollY);
  document.documentElement.dataset.scrollReady = "1";
  scrollEngineReady = true;
}

export function ScrollShell({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

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
