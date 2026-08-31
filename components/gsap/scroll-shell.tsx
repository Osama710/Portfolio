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

/** Play on enter only — never reverse-hide content (prevents stuck invisible sections). */
const REVEAL_ONCE = "play none none none";

const INTERACTIVE_SECTIONS = new Set(["skills", "experience"]);

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

  const buildTimeline = (orbitScale: number, orbitBlur: number, copyY: number) => {
    const orbit = heroOrbitNodes(root);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "top 30%",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(heroCopy, { y: 0, autoAlpha: 1, scale: 1 }, { y: copyY, autoAlpha: 0, scale: 0.94, ease: "power2.in" }, 0)
      .fromTo(scrollCue, { autoAlpha: 1 }, { autoAlpha: 0, y: -16, ease: "power2.in" }, 0)
      .fromTo(
        orbit.wrap,
        { scale: 1, rotate: 0, autoAlpha: 1, filter: "blur(0px)" },
        {
          scale: orbitScale,
          rotate: 8,
          autoAlpha: 0,
          filter: `blur(${orbitBlur}px)`,
          ease: "power2.inOut",
          transformOrigin: "50% 50%",
        },
        0,
      )
      .fromTo(aboutLabel, { x: -28, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power3.out" }, 0.12)
      .fromTo(
        aboutHeading,
        { y: 56, autoAlpha: 0, scale: 0.9, filter: "blur(12px)" },
        { y: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)", ease: "power3.out" },
        0.2,
      )
      .fromTo(aboutReveal, { y: 40, autoAlpha: 0, scale: 0.96 }, { y: 0, autoAlpha: 1, scale: 1, ease: "power2.out" }, 0.32)
      .fromTo(
        aboutPanels,
        { y: 32, autoAlpha: 0, scale: 0.94 },
        { y: 0, autoAlpha: 1, scale: 1, stagger: 0.08, ease: "back.out(1.2)" },
        0.42,
      );
  };

  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => buildTimeline(3.1, 6, -64));
  mm.add("(max-width: 1023px)", () => buildTimeline(1.85, 3, -32));
  return mm;
}

function revealOnScroll(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
  trigger: string | Element,
  start = "top 85%",
) {
  gsap.from(targets, {
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

    revealOnScroll(label, { x: -28, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, section, "top 88%");

    revealOnScroll(
      heading,
      { y: 44, autoAlpha: 0, scale: 0.94, filter: "blur(8px)", duration: 0.75, ease: "power3.out" },
      section,
      "top 86%",
    );

    if (isInteractive) {
      revealOnScroll(body, { y: 28, duration: 0.65, ease: "power2.out" }, section, "top 84%");
    } else if (s.id === "education" || s.id === "contact") {
      revealOnScroll(body, { y: 32, autoAlpha: 0, duration: 0.65, ease: "power2.out" }, section, "top 84%");
    } else {
      revealOnScroll(body, { y: 32, autoAlpha: 0, duration: 0.65, ease: "power2.out" }, section, "top 84%");
    }

    if (isInteractive || s.id === "education" || s.id === "contact" || s.id === "projects") return;

    gsap.utils.toArray<HTMLElement>(root.querySelectorAll(`${section} .section-reveal > *`)).forEach((child, index) => {
      revealOnScroll(
        child,
        { y: 28, autoAlpha: 0, scale: 0.97, duration: 0.55, delay: index * 0.04, ease: "power2.out" },
        child,
        "top 90%",
      );
    });
  });
}

function setupEducationReveals(root: HTMLElement) {
  revealOnScroll(
    root.querySelectorAll("#education .edu-degree-panel"),
    { x: -36, autoAlpha: 0, scale: 0.96, duration: 0.75, ease: "power3.out" },
    "#education .edu-degree-panel",
    "top 88%",
  );

  revealOnScroll(
    root.querySelectorAll("#education .edu-cert-panel"),
    { x: 36, autoAlpha: 0, scale: 0.96, duration: 0.75, ease: "power3.out" },
    "#education .edu-cert-panel",
    "top 88%",
  );

  gsap.utils.toArray<HTMLElement>(root.querySelectorAll("#education .edu-cert-card")).forEach((card, index) => {
    revealOnScroll(
      card,
      { y: 24, autoAlpha: 0, scale: 0.96, duration: 0.5, delay: index * 0.05, ease: "back.out(1.3)" },
      card,
      "top 92%",
    );
  });
}

function setupContactReveals(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(root.querySelectorAll("#contact .glass-card")).forEach((card, index) => {
    revealOnScroll(
      card,
      { x: index % 2 === 0 ? -24 : 24, autoAlpha: 0, scale: 0.97, duration: 0.6, delay: index * 0.06, ease: "power3.out" },
      card,
      "top 92%",
    );
  });

  revealOnScroll(
    root.querySelectorAll("#contact .contact-form"),
    { y: 32, autoAlpha: 0, scale: 0.98, duration: 0.7, ease: "power2.out" },
    "#contact .section-reveal",
    "top 82%",
  );
}

function setupExperienceReveals(root: HTMLElement) {
  revealOnScroll(
    root.querySelectorAll("#experience .career-snake-node"),
    { scale: 0.85, y: 16, duration: 0.5, stagger: 0.07, ease: "back.out(1.4)" },
    "#experience .career-snake",
    "top 85%",
  );
}

function setupSkillsReveals(root: HTMLElement) {
  revealOnScroll(
    root.querySelectorAll("#skills .skills-loadout-strip"),
    { y: 24, autoAlpha: 0, scale: 0.98, duration: 0.6, ease: "power2.out" },
    "#skills .skills-loadout-strip",
    "top 88%",
  );

  revealOnScroll(
    root.querySelectorAll("#skills .skill-orbit-hub"),
    { scale: 0.88, duration: 0.7, ease: "back.out(1.3)" },
    "#skills .skill-orbit-hub",
    "top 86%",
  );

  revealOnScroll(
    root.querySelectorAll("#skills .skill-orbit-node"),
    { scale: 0.85, duration: 0.45, stagger: 0.05, ease: "back.out(1.5)" },
    "#skills .skill-orbit-hub",
    "top 84%",
  );

  revealOnScroll(
    root.querySelectorAll("#skills .skill-module-panel"),
    { x: 32, duration: 0.65, ease: "power3.out" },
    "#skills .skill-module-panel",
    "top 86%",
  );
}

function setupProjectScrollFx(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-deck-item")).forEach((item, index) => {
    revealOnScroll(
      item,
      { y: 40, autoAlpha: 0, scale: 0.94, rotate: index % 2 === 0 ? -1.5 : 1.5, duration: 0.65, ease: "power3.out" },
      item,
      "top 92%",
    );
  });

  gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-github-item")).forEach((item) => {
    revealOnScroll(item, { y: 32, autoAlpha: 0, scale: 0.96, duration: 0.6, ease: "power2.out" }, item, "top 92%");
  });
}

function setupElementReveals(root: HTMLElement) {
  const selectors = [".panel-vivid", ".panel-hud", ".stat-chip", ".capability-slot", ".scroll-reveal-item"].join(", ");

  ScrollTrigger.batch(root.querySelectorAll(selectors), {
    start: "top 90%",
    once: true,
    onEnter: (batch) => {
      const filtered = batch.filter((el) => {
        const section = el.closest("section[id]");
        if (!section) return true;
        const id = section.id;
        return id !== "about" && id !== "education" && id !== "contact" && id !== "experience" && id !== "skills" && id !== "projects";
      });
      if (!filtered.length) return;
      gsap.fromTo(
        filtered,
        { y: 36, autoAlpha: 0, scale: 0.97 },
        { y: 0, autoAlpha: 1, scale: 1, stagger: 0.06, duration: 0.6, ease: "power2.out", overwrite: true },
      );
    },
  });
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
        gsap.set(
          root.querySelectorAll(
            ".section-reveal, .section-heading-block, .section-label, .hero-copy, .hero-orbit-wrap, .hero-scroll-cue, #about .panel-vivid, #about .panel-hud, #about .stat-chip, .edu-degree-panel, .edu-cert-panel, .edu-cert-card, .career-track, .career-snake-node, .skill-module-panel, .skill-orbit-hub, .skill-orbit-node",
          ),
          {
            clearProps: "all",
            opacity: 1,
            visibility: "visible",
            x: 0,
            y: 0,
            scale: 1,
            filter: "none",
          },
        );
        return;
      }

      setupScrollExperience(root, mediaStores);
      setActiveSection(root, "hero");

      const refresh = () => ScrollTrigger.refresh();
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
    <div ref={wrapRef} className="scroll-shell relative overflow-x-clip">
      {children}
    </div>
  );
}
