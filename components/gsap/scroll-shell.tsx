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

function heroOrbitSelector() {
  return window.matchMedia("(min-width: 1024px)").matches ? DESKTOP_ORBIT : MOBILE_ORBIT;
}

function heroOrbitNodes(root: HTMLElement) {
  const selector = heroOrbitSelector();
  return {
    wrap: root.querySelectorAll(selector),
    chips: root.querySelectorAll(`${selector} .hero-orbit-chip`),
    ring: root.querySelectorAll(`${selector} .hero-orbit-ring`),
  };
}

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

const REVEAL_SECTIONS = ["skills", "experience", "projects", "capabilities", "education", "contact"] as const;

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

/** Hero stays visible until ~80% scrolled; orbit zoom + about reveal in the last 20%. */
function setupHeroToAboutTransition(root: HTMLElement) {
  const heroFadeTargets = root.querySelectorAll(
    ".hero-copy-top, .hero-copy-rest, .hero-orbit-wrap-mobile",
  );
  const scrollCue = root.querySelector(".hero-scroll-cue");
  const about = aboutTargets(root);

  const build = (copyY: number, fadeStart = 0.9) => {
    const orbit = heroOrbitNodes(root);
    gsap.set(orbit.wrap, { transformOrigin: "50% 50%", force3D: true });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
          fastScrollEnd: true,
        },
      })
      .fromTo(
        heroFadeTargets,
        { y: 0, autoAlpha: 1, scale: 1 },
        { y: copyY, autoAlpha: 0, scale: 0.98, ease: "power2.in" },
        fadeStart,
      )
      .fromTo(scrollCue, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -12, ease: "power2.in" }, fadeStart)
      .fromTo(
        orbit.wrap,
        { autoAlpha: 1 },
        { autoAlpha: 0, ease: "power2.in" },
        fadeStart,
      )
      .fromTo(
        about,
        { y: 32 },
        { y: 0, stagger: 0.04, ease: "power3.out" },
        fadeStart + 0.06,
      );
  };

  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => build(-64, 0.9));
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
