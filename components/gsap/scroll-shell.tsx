"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, motionAllowed, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
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

function setupAboutInitialHide(root: HTMLElement) {
  gsap.set(aboutTargets(root), { autoAlpha: 0, y: 32 });
}

/** Hero stays visible until ~80% scrolled; orbit zoom + about reveal in the last 20%. */
function setupHeroToAboutTransition(root: HTMLElement) {
  const heroFadeTargets = root.querySelectorAll(
    ".hero-copy .hero-live-pill, .hero-copy .hero-trait-pill, .hero-copy .hero-name-line, .hero-copy .hero-signal, .hero-copy .hero-stack-pill, .hero-copy .hero-rotator-live, .hero-copy .hero-lead, .hero-copy .hero-bento, .hero-copy .hero-services, .hero-copy .hero-actions, .hero-copy .hero-location, .hero-copy .hero-orbit-wrap-mobile",
  );
  const scrollCue = root.querySelector(".hero-scroll-cue");
  const about = aboutTargets(root);

  const build = (orbitScale: number, orbitBlur: number, copyY: number, fadeStart = 0.78) => {
    const orbit = heroOrbitNodes(root);
    gsap.set(orbit.wrap, { transformOrigin: "50% 50%", force3D: true });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "80% top",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(
        heroFadeTargets,
        { y: 0, autoAlpha: 1, scale: 1 },
        { y: copyY, autoAlpha: 0, scale: 0.98, ease: "power2.in", stagger: 0.02 },
        fadeStart,
      )
      .fromTo(scrollCue, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -12, ease: "power2.in" }, fadeStart)
      .fromTo(
        orbit.wrap,
        { scale: 1, rotate: 0, autoAlpha: 1, filter: "blur(0px)" },
        {
          scale: orbitScale,
          rotate: 6,
          autoAlpha: 0,
          filter: `blur(${orbitBlur}px)`,
          ease: "power2.inOut",
          transformOrigin: "50% 50%",
        },
        fadeStart,
      )
      .fromTo(
        about,
        { y: 32, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.05, ease: "power3.out" },
        fadeStart + 0.08,
      );
  };

  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => build(3.1, 6, -64, 0.78));
  mm.add("(max-width: 1023px)", () => build(1.5, 2, -20, 0.82));
  return mm;
}

function sectionBlock(root: HTMLElement, sectionId: string) {
  if (sectionId === "experience") {
    return root.querySelectorAll(`#${sectionId} .section-label, #${sectionId} .section-heading-block`);
  }

  return root.querySelectorAll(
    `#${sectionId} .section-label, #${sectionId} .section-heading-block, #${sectionId} .section-reveal`,
  );
}

function showTargets(targets: gsap.TweenTarget, stagger = 0.07) {
  gsap.to(targets, {
    autoAlpha: 1,
    y: 0,
    duration: 0.65,
    ease: "power3.out",
    stagger,
    overwrite: "auto",
  });
}

function hideTargets(targets: gsap.TweenTarget, stagger = 0.04) {
  gsap.to(targets, {
    autoAlpha: 0,
    y: 36,
    duration: 0.42,
    ease: "power2.in",
    stagger,
    overwrite: "auto",
  });
}

function gateSection(root: HTMLElement, sectionId: string, nextSectionId?: string) {
  const targets = sectionBlock(root, sectionId);
  if (!targets.length) return;

  gsap.set(targets, { autoAlpha: 0, y: 40 });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: "top 86%",
      once: true,
      onEnter: () => showTargets(targets),
      invalidateOnRefresh: true,
    });
  });

  mm.add("(max-width: 1023px)", () => {
    ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: "top 92%",
      onEnter: () => showTargets(targets),
      onEnterBack: () => showTargets(targets),
      invalidateOnRefresh: true,
    });

    if (nextSectionId) {
      ScrollTrigger.create({
        trigger: `#${nextSectionId}`,
        start: MOBILE_NEXT_VISIBLE,
        onEnter: () => hideTargets(targets),
        onLeaveBack: () => showTargets(targets),
        invalidateOnRefresh: true,
      });
    } else {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: "bottom top+=12%",
        onEnter: () => hideTargets(targets),
        onLeaveBack: () => showTargets(targets),
        invalidateOnRefresh: true,
      });
    }
  });

  return mm;
}

function setupSectionGates(root: HTMLElement, mediaStores: ReturnType<typeof gsap.matchMedia>[]) {
  const gated = SECTIONS.slice(2);
  gated.forEach((s, index) => {
    const mm = gateSection(root, s.id, gated[index + 1]?.id);
    if (mm) mediaStores.push(mm);
  });
}

function setupAboutGate(root: HTMLElement, mediaStores: ReturnType<typeof gsap.matchMedia>[]) {
  const targets = aboutTargets(root);
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    ScrollTrigger.create({
      trigger: "#about",
      start: "bottom 14%",
      end: "bottom top",
      onEnter: () => hideTargets(targets, 0.03),
      onLeaveBack: () => showTargets(targets, 0.05),
      invalidateOnRefresh: true,
    });
  });

  mm.add("(max-width: 1023px)", () => {
    ScrollTrigger.create({
      trigger: "#skills",
      start: MOBILE_NEXT_VISIBLE,
      onEnter: () => hideTargets(targets, 0.03),
      onLeaveBack: () => showTargets(targets, 0.05),
      invalidateOnRefresh: true,
    });
  });

  mediaStores.push(mm);
}

function batchSectionElements(
  root: HTMLElement,
  selector: string,
  sectionId: string,
  nextSectionId?: string,
) {
  const elements = root.querySelectorAll(selector);
  if (!elements.length) return;

  gsap.set(elements, { autoAlpha: 0, y: 28 });

  const show = () =>
    gsap.to(elements, {
      autoAlpha: 1,
      y: 0,
      duration: 0.58,
      ease: "power3.out",
      stagger: 0.07,
      overwrite: "auto",
    });

  const hide = () =>
    gsap.to(elements, {
      autoAlpha: 0,
      y: 24,
      duration: 0.38,
      ease: "power2.in",
      stagger: 0.04,
      overwrite: "auto",
    });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: "top 86%",
      once: true,
      onEnter: show,
      invalidateOnRefresh: true,
    });
  });

  mm.add("(max-width: 1023px)", () => {
    ScrollTrigger.create({
      trigger: `#${sectionId}`,
      start: "top 92%",
      onEnter: show,
      onEnterBack: show,
      invalidateOnRefresh: true,
    });

    if (nextSectionId) {
      ScrollTrigger.create({
        trigger: `#${nextSectionId}`,
        start: MOBILE_NEXT_VISIBLE,
        onEnter: hide,
        onLeaveBack: show,
        invalidateOnRefresh: true,
      });
    } else {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: "bottom top+=12%",
        onEnter: hide,
        onLeaveBack: show,
        invalidateOnRefresh: true,
      });
    }
  });

  return mm;
}

function setupSectionElementBatches(root: HTMLElement, mediaStores: ReturnType<typeof gsap.matchMedia>[]) {
  const pairs: [string, string, string?][] = [
    ["#skills .skills-loadout-strip, #skills .skill-orbit-shell, #skills .skill-module-panel", "skills", "experience"],
    ["#capabilities .capability-slot, #capabilities .capability-briefing", "capabilities", "education"],
    ["#education .edu-degree-panel, #education .edu-cert-panel, #education .edu-cert-card", "education", "contact"],
    ["#contact .contact-methods, #contact .contact-form", "contact", undefined],
  ];

  pairs.forEach(([selector, id, next]) => {
    const mm = batchSectionElements(root, selector, id, next);
    if (mm) mediaStores.push(mm);
  });

  setupExperienceJourney(root, mediaStores);
  setupProjectJourney(root, mediaStores, MOBILE_NEXT_VISIBLE);
}

function unlockInteractivePanels(root: HTMLElement) {
  gsap.set(root.querySelectorAll(".career-mobile-shell, .career-detail-panel, .career-track-detail"), {
    autoAlpha: 1,
    visibility: "visible",
    x: 0,
    y: 0,
    clearProps: "transform",
  });
}

function setupScrollExperience(root: HTMLElement, mediaStores: ReturnType<typeof gsap.matchMedia>[]) {
  setupSectionTracking(root);
  setupAboutInitialHide(root);
  mediaStores.push(setupHeroToAboutTransition(root));
  setupAboutGate(root, mediaStores);
  setupSectionGates(root, mediaStores);
  setupSectionElementBatches(root, mediaStores);
  unlockInteractivePanels(root);
}

export function ScrollShell({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      ScrollTrigger.config({ ignoreMobileResize: true });

      const root = wrapRef.current;
      if (!root) return;

      const mediaStores: ReturnType<typeof gsap.matchMedia>[] = [];

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
        setupScrollExperience(root, mediaStores);
        setActiveSection(root, "hero");
      };

      const bootId = window.setTimeout(bootScroll, 50);

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", refresh, { passive: true });
      window.addEventListener("orientationchange", refresh);
      window.addEventListener("hashchange", refresh);
      window.visualViewport?.addEventListener("resize", refresh);
      window.setTimeout(refresh, 320);

      return () => {
        cancelled = true;
        window.clearTimeout(bootId);
        window.removeEventListener("resize", refresh);
        window.removeEventListener("orientationchange", refresh);
        window.removeEventListener("hashchange", refresh);
        window.visualViewport?.removeEventListener("resize", refresh);
        mediaStores.forEach((mm) => mm.revert());
        delete document.documentElement.dataset.section;
      };
    },
    { scope: wrapRef, dependencies: [] },
  );

  return (
    <div ref={wrapRef} className="scroll-shell relative min-w-0 overflow-x-clip">
      {children}
    </div>
  );
}
