"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, motionAllowed, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";

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

const INTERACTIVE = ".career-detail-panel, .career-track-detail, .career-mobile-shell";

/** Mobile: hide current section once the next one covers ~80% of the viewport. */
const MOBILE_NEXT_VISIBLE = "top 20%";

const DESKTOP_ORBIT = ".hero-orbit-wrap-desktop";
const MOBILE_ORBIT = ".hero-orbit-wrap-mobile";

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

function setupHeroIntro(root: HTMLElement) {
  const scrollCue = root.querySelector(".hero-scroll-cue");
  const orbit = heroOrbitNodes(root);

  gsap.set(scrollCue, { autoAlpha: 0 });
  gsap.set(aboutTargets(root), { autoAlpha: 0, y: 32 });

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .from(root.querySelectorAll(".hero-copy .tag-pill"), { y: 26, autoAlpha: 0, stagger: 0.08, duration: 0.58 }, 0)
    .from(
      root.querySelectorAll(".hero-copy h1 > span"),
      { y: 52, autoAlpha: 0, stagger: 0.14, duration: 0.82, ease: "power4.out" },
      0.08,
    )
    .from(root.querySelectorAll(".hero-rotator"), { y: 28, autoAlpha: 0, duration: 0.55 }, 0.18)
    .from(root.querySelectorAll(".hero-lead"), { y: 22, autoAlpha: 0, duration: 0.5 }, 0.26)
    .from(root.querySelectorAll(".hero-actions > *"), { y: 20, autoAlpha: 0, stagger: 0.06, duration: 0.46 }, 0.34)
    .from(root.querySelectorAll(".hero-location"), { y: 18, autoAlpha: 0, duration: 0.45 }, 0.42)
    .from(
      root.querySelectorAll(".hero-stat"),
      { y: 22, scale: 0.82, autoAlpha: 0, stagger: 0.07, duration: 0.52, ease: "back.out(1.45)" },
      0.48,
    )
    .from(orbit.wrap, { scale: 0.48, autoAlpha: 0, rotate: -12, duration: 1.05, ease: "back.out(1.65)" }, 0.1)
    .from(orbit.chips, { scale: 0, autoAlpha: 0, stagger: 0.05, duration: 0.48, ease: "back.out(2.1)" }, 0.58)
    .from(orbit.ring, { scale: 0.7, autoAlpha: 0, duration: 0.85, ease: "power2.out" }, 0.18)
    .to(scrollCue, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.88);
}

/** Hero stays visible until ~80% scrolled; orbit zoom + about reveal in the last 20%. */
function setupHeroToAboutTransition(root: HTMLElement) {
  const heroCopy = root.querySelectorAll(".hero-copy");
  const scrollCue = root.querySelector(".hero-scroll-cue");
  const about = aboutTargets(root);

  const build = (orbitScale: number, orbitBlur: number, copyY: number, fadeStart = 0.78) => {
    const orbit = heroOrbitNodes(root);

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
        heroCopy,
        { y: 0, autoAlpha: 1, scale: 1 },
        { y: copyY, autoAlpha: 0, scale: 0.96, ease: "power2.in" },
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
      end: "bottom 14%",
      onEnter: () => showTargets(targets),
      onLeave: () => hideTargets(targets),
      onEnterBack: () => showTargets(targets),
      onLeaveBack: () => hideTargets(targets),
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
      end: "bottom 14%",
      onEnter: show,
      onLeave: hide,
      onEnterBack: show,
      onLeaveBack: hide,
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
    ["#experience .career-snake-node, #experience .career-mobile-shell", "experience", "projects"],
    ["#capabilities .capability-slot, #capabilities .capability-briefing", "capabilities", "education"],
    ["#education .edu-degree-panel, #education .edu-cert-panel, #education .edu-cert-card", "education", "contact"],
    ["#contact .contact-methods, #contact .contact-form", "contact", undefined],
  ];

  pairs.forEach(([selector, id, next]) => {
    const mm = batchSectionElements(root, selector, id, next);
    if (mm) mediaStores.push(mm);
  });

  const projectMm = gsap.matchMedia();
  projectMm.add("(min-width: 1024px)", () => {
    bindProjectCards(root, "top 92%", "bottom 8%");
  });
  projectMm.add("(max-width: 1023px)", () => {
    bindProjectCardsMobile(root);
  });
  mediaStores.push(projectMm);
}

function bindProjectCardsMobile(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-deck-item, .project-github-item")).forEach((item) => {
    gsap.set(item, { autoAlpha: 0, y: 28 });

    ScrollTrigger.create({
      trigger: item,
      start: "top 94%",
      onEnter: () => gsap.to(item, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", overwrite: "auto" }),
      onEnterBack: () => gsap.to(item, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", overwrite: "auto" }),
    });
  });

  ScrollTrigger.create({
    trigger: "#capabilities",
    start: MOBILE_NEXT_VISIBLE,
    onEnter: () => {
      gsap.to(root.querySelectorAll(".project-deck-item, .project-github-item"), {
        autoAlpha: 0,
        y: 24,
        duration: 0.38,
        stagger: 0.03,
        ease: "power2.in",
        overwrite: "auto",
      });
    },
    onLeaveBack: () => {
      gsap.to(root.querySelectorAll(".project-deck-item, .project-github-item"), {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
  });
}

function bindProjectCards(root: HTMLElement, start: string, end: string) {
  gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-deck-item")).forEach((item) => {
    gsap.set(item, { autoAlpha: 0, y: 32 });
    ScrollTrigger.create({
      trigger: item,
      start,
      end,
      onEnter: () => gsap.to(item, { autoAlpha: 1, y: 0, duration: 0.58, ease: "power3.out", overwrite: "auto" }),
      onLeave: () => gsap.to(item, { autoAlpha: 0, y: 28, duration: 0.38, ease: "power2.in", overwrite: "auto" }),
      onEnterBack: () => gsap.to(item, { autoAlpha: 1, y: 0, duration: 0.58, ease: "power3.out", overwrite: "auto" }),
      onLeaveBack: () => gsap.to(item, { autoAlpha: 0, y: 28, duration: 0.38, ease: "power2.in", overwrite: "auto" }),
    });
  });

  gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-github-item")).forEach((item) => {
    gsap.set(item, { autoAlpha: 0, y: 24 });
    ScrollTrigger.create({
      trigger: item,
      start,
      end,
      onEnter: () => gsap.to(item, { autoAlpha: 1, y: 0, duration: 0.52, ease: "power3.out", overwrite: "auto" }),
      onLeave: () => gsap.to(item, { autoAlpha: 0, y: 22, duration: 0.35, ease: "power2.in", overwrite: "auto" }),
      onEnterBack: () => gsap.to(item, { autoAlpha: 1, y: 0, duration: 0.52, ease: "power3.out", overwrite: "auto" }),
      onLeaveBack: () => gsap.to(item, { autoAlpha: 0, y: 22, duration: 0.35, ease: "power2.in", overwrite: "auto" }),
    });
  });
}

function unlockInteractivePanels(root: HTMLElement) {
  gsap.set(root.querySelectorAll(INTERACTIVE), {
    autoAlpha: 1,
    visibility: "visible",
    x: 0,
    clearProps: "transform",
  });
}

function setupScrollExperience(root: HTMLElement, mediaStores: ReturnType<typeof gsap.matchMedia>[]) {
  setupSectionTracking(root);
  setupHeroIntro(root);
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
        gsap.set(root.querySelectorAll(".section-reveal, .section-heading-block, .section-label, .hero-copy, .hero-orbit-wrap, .hero-scroll-cue, .hero-banner"), {
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

      setupScrollExperience(root, mediaStores);
      setActiveSection(root, "hero");

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", refresh, { passive: true });
      window.addEventListener("orientationchange", refresh);
      window.addEventListener("hashchange", refresh);
      window.visualViewport?.addEventListener("resize", refresh);
      window.setTimeout(refresh, 450);
      window.setTimeout(refresh, 1400);

      return () => {
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
