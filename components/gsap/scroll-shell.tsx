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

const REVEAL_ONCE = "play none none none";

const INTERACTIVE_SECTIONS = new Set(["skills", "experience", "capabilities"]);

const NO_GSAP_TRANSFORM = ".scroll-ui-panel, .glass-card, .contact-methods, .edu-degree-panel, .edu-cert-panel, .capability-briefing, .career-mobile-shell";

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

function setupHeroIntro(root: HTMLElement) {
  const scrollCue = root.querySelector(".hero-scroll-cue");
  const orbit = heroOrbitNodes(root);

  gsap.set(scrollCue, { autoAlpha: 0 });
  gsap.set(root.querySelectorAll("#about .section-label, #about .section-heading-block, #about .section-reveal, #about .panel-vivid, #about .panel-hud, #about .stat-chip"), {
    autoAlpha: 0,
  });

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .from(root.querySelectorAll(".hero-copy .tag-pill"), { y: 26, autoAlpha: 0, stagger: 0.08, duration: 0.58 }, 0)
    .from(
      root.querySelectorAll(".hero-copy h1 > span"),
      { y: 52, autoAlpha: 0, stagger: 0.14, duration: 0.82, ease: "power4.out" },
      0.08,
    )
    .from(root.querySelectorAll(".hero-lead"), { y: 28, autoAlpha: 0, duration: 0.55 }, 0.22)
    .from(root.querySelectorAll(".hero-location"), { y: 18, autoAlpha: 0, duration: 0.45 }, 0.3)
    .from(
      root.querySelectorAll(".hero-stat"),
      { y: 22, scale: 0.82, autoAlpha: 0, stagger: 0.07, duration: 0.52, ease: "back.out(1.45)" },
      0.42,
    )
    .from(root.querySelectorAll(".hero-actions > *"), { y: 20, autoAlpha: 0, stagger: 0.06, duration: 0.46 }, 0.52)
    .from(orbit.wrap, { scale: 0.48, autoAlpha: 0, rotate: -12, duration: 1.05, ease: "back.out(1.65)" }, 0.1)
    .from(orbit.chips, { scale: 0, autoAlpha: 0, stagger: 0.05, duration: 0.48, ease: "back.out(2.1)" }, 0.58)
    .from(orbit.ring, { scale: 0.7, autoAlpha: 0, duration: 0.85, ease: "power2.out" }, 0.18)
    .to(scrollCue, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.88);
}

function setupHeroPortalZoom(root: HTMLElement) {
  const heroCopy = root.querySelectorAll(".hero-copy");
  const scrollCue = root.querySelector(".hero-scroll-cue");
  const aboutLabel = root.querySelectorAll("#about .section-label");
  const aboutHeading = root.querySelectorAll("#about .section-heading-block");
  const aboutReveal = root.querySelectorAll("#about .section-reveal");
  const aboutPanels = root.querySelectorAll("#about .panel-vivid, #about .panel-hud, #about .stat-chip");

  const buildTimeline = (
    end: string,
    orbitScale: number,
    orbitBlur: number,
    copyY: number,
    copyFadeStart: number,
  ) => {
    const orbit = heroOrbitNodes(root);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end,
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(heroCopy, { y: 0, autoAlpha: 1, scale: 1 }, { y: copyY, autoAlpha: 0, scale: 0.96, ease: "power2.in" }, copyFadeStart)
      .fromTo(scrollCue, { autoAlpha: 1 }, { autoAlpha: 0, y: -12, ease: "power2.in" }, copyFadeStart)
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
        copyFadeStart,
      )
      .fromTo(aboutLabel, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power3.out" }, 0.08)
      .fromTo(
        aboutHeading,
        { y: 40, autoAlpha: 0, scale: 0.94, filter: "blur(8px)" },
        { y: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)", ease: "power3.out" },
        0.16,
      )
      .fromTo(aboutReveal, { y: 32, autoAlpha: 0, scale: 0.98 }, { y: 0, autoAlpha: 1, scale: 1, ease: "power2.out" }, 0.26)
      .fromTo(
        aboutPanels,
        { y: 24, autoAlpha: 0, scale: 0.98 },
        { y: 0, autoAlpha: 1, scale: 1, stagger: 0.06, ease: "back.out(1.2)" },
        0.34,
      );
  };

  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => buildTimeline("top 28%", 3.1, 6, -64, 0));
  mm.add("(max-width: 1023px)", () => buildTimeline("top 6%", 1.45, 2, -18, 0.35));
  return mm;
}

function revealOnScroll(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
  trigger: string | Element,
  start = "top 88%",
) {
  if (!targets || (targets instanceof NodeList && targets.length === 0)) return;

  gsap.from(targets, {
    y: 24,
    autoAlpha: 0,
    duration: 0.65,
    ease: "power2.out",
    ...vars,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: REVEAL_ONCE,
      invalidateOnRefresh: true,
    },
  });
}

function setupSectionReveals(root: HTMLElement) {
  SECTIONS.slice(1).forEach((s) => {
    if (s.id === "about") return;

    const section = `#${s.id}`;
    const label = root.querySelectorAll(`${section} .section-label`);
    const heading = root.querySelectorAll(`${section} .section-heading-block`);
    const body = root.querySelectorAll(`${section} .section-reveal`);
    const isInteractive = INTERACTIVE_SECTIONS.has(s.id);

    revealOnScroll(label, { y: 16, duration: 0.55 }, section, "top 90%");
    revealOnScroll(heading, { y: 32, scale: 0.97, filter: "blur(6px)", duration: 0.7 }, section, "top 88%");

    if (!isInteractive) {
      revealOnScroll(body, { y: 28, duration: 0.6 }, section, "top 86%");
    }

    if (isInteractive || s.id === "education" || s.id === "contact" || s.id === "projects") return;

    gsap.utils.toArray<HTMLElement>(root.querySelectorAll(`${section} .section-reveal > *`)).forEach((child, index) => {
      if (child.matches(NO_GSAP_TRANSFORM) || child.querySelector(NO_GSAP_TRANSFORM)) return;
      revealOnScroll(child, { y: 20, delay: index * 0.03, duration: 0.5 }, child, "top 92%");
    });
  });
}

function setupEducationReveals(root: HTMLElement) {
  revealOnScroll(
    root.querySelectorAll("#education .edu-degree-panel"),
    { y: 28, duration: 0.65 },
    "#education .edu-degree-panel",
    "top 90%",
  );

  revealOnScroll(
    root.querySelectorAll("#education .edu-cert-panel"),
    { y: 28, duration: 0.65 },
    "#education .edu-cert-panel",
    "top 90%",
  );

  gsap.utils.toArray<HTMLElement>(root.querySelectorAll("#education .edu-cert-card")).forEach((card, index) => {
    revealOnScroll(card, { y: 16, delay: index * 0.04, duration: 0.45 }, card, "top 94%");
  });
}

function setupContactReveals(root: HTMLElement) {
  revealOnScroll(
    root.querySelectorAll("#contact .contact-methods"),
    { y: 24, duration: 0.6 },
    "#contact .contact-methods",
    "top 90%",
  );

  revealOnScroll(
    root.querySelectorAll("#contact .contact-form"),
    { y: 28, duration: 0.65 },
    "#contact .contact-form",
    "top 88%",
  );
}

function setupExperienceReveals(root: HTMLElement) {
  revealOnScroll(
    root.querySelectorAll("#experience .career-snake-node"),
    { scale: 0.9, y: 12, duration: 0.45, stagger: 0.06, ease: "back.out(1.3)" },
    "#experience .career-snake",
    "top 88%",
  );

  revealOnScroll(
    root.querySelectorAll("#experience .career-mobile-shell"),
    { y: 20, duration: 0.55 },
    "#experience .career-mobile-shell",
    "top 90%",
  );
}

function setupSkillsReveals(root: HTMLElement) {
  revealOnScroll(
    root.querySelectorAll("#skills .skills-loadout-strip"),
    { y: 20, duration: 0.55 },
    "#skills .skills-loadout-strip",
    "top 90%",
  );

  revealOnScroll(
    root.querySelectorAll("#skills .skill-orbit-shell"),
    { y: 24, duration: 0.6 },
    "#skills .skill-orbit-shell",
    "top 88%",
  );
}

function setupProjectScrollFx(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-deck-item")).forEach((item, index) => {
    revealOnScroll(
      item,
      { y: 32, scale: 0.97, delay: index * 0.02, duration: 0.6 },
      item,
      "top 94%",
    );
  });

  gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-github-item")).forEach((item) => {
    revealOnScroll(item, { y: 24, duration: 0.55 }, item, "top 94%");
  });
}

function setupElementReveals(root: HTMLElement) {
  const selectors = [".panel-vivid", ".panel-hud", ".stat-chip", ".capability-slot"].join(", ");

  ScrollTrigger.batch(root.querySelectorAll(selectors), {
    start: "top 92%",
    once: true,
    onEnter: (batch) => {
      const filtered = batch.filter((el) => {
        if (el.matches(NO_GSAP_TRANSFORM) || el.closest(NO_GSAP_TRANSFORM)) return false;
        const section = el.closest("section[id]");
        if (!section) return true;
        const id = section.id;
        return (
          id !== "about" &&
          id !== "education" &&
          id !== "contact" &&
          id !== "experience" &&
          id !== "skills" &&
          id !== "capabilities" &&
          id !== "projects"
        );
      });
      if (!filtered.length) return;
      gsap.fromTo(
        filtered,
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.55, ease: "power2.out", overwrite: true },
      );
    },
  });
}

function protectInteractivePanels(root: HTMLElement) {
  gsap.set(root.querySelectorAll(NO_GSAP_TRANSFORM), { x: 0, y: 0, clearProps: "transform" });
}

function setupScrollExperience(root: HTMLElement, mediaStores: ReturnType<typeof gsap.matchMedia>[]) {
  setupSectionTracking(root);
  setupHeroIntro(root);
  mediaStores.push(setupHeroPortalZoom(root));
  setupSectionReveals(root);
  setupSkillsReveals(root);
  setupExperienceReveals(root);
  setupEducationReveals(root);
  setupContactReveals(root);
  setupProjectScrollFx(root);
  setupElementReveals(root);
  protectInteractivePanels(root);
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
        gsap.set(root.querySelectorAll(".section-reveal, .section-heading-block, .section-label, .hero-copy, .hero-orbit-wrap, .hero-scroll-cue, #about *, .scroll-ui-panel, .glass-card, .contact-methods"), {
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

      const refresh = () => {
        ScrollTrigger.refresh();
        protectInteractivePanels(root);
      };
      window.addEventListener("resize", refresh, { passive: true });
      window.addEventListener("orientationchange", refresh);
      window.addEventListener("hashchange", refresh);
      window.visualViewport?.addEventListener("resize", refresh);
      window.setTimeout(refresh, 400);
      window.setTimeout(refresh, 1200);

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
