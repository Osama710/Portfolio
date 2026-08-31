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
const REVEAL_TOGGLE = "play none none reverse";

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

function setupSectionReveals(root: HTMLElement) {
  SECTIONS.slice(1).forEach((s) => {
    if (s.id === "about") return;

    const section = `#${s.id}`;
    const label = root.querySelectorAll(`${section} .section-label`);
    const heading = root.querySelectorAll(`${section} .section-heading-block`);
    const body = root.querySelectorAll(`${section} .section-reveal`);

    gsap.from(label, {
      x: -32,
      autoAlpha: 0,
      duration: 0.65,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        toggleActions: REVEAL_TOGGLE,
      },
    });

    gsap.from(heading, {
      y: 52,
      autoAlpha: 0,
      scale: 0.9,
      filter: "blur(10px)",
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        toggleActions: REVEAL_TOGGLE,
      },
    });

    gsap.from(body, {
      y: 44,
      autoAlpha: 0,
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 74%",
        toggleActions: REVEAL_ONCE,
      },
    });

    if (s.id === "education" || s.id === "contact") return;

    gsap.utils.toArray<HTMLElement>(root.querySelectorAll(`${section} .section-reveal > *`)).forEach((child, index) => {
      gsap.from(child, {
        y: 36,
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.6,
        delay: index * 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: child,
          start: "top 88%",
          toggleActions: REVEAL_TOGGLE,
        },
      });
    });
  });
}

function setupEducationReveals(root: HTMLElement) {
  gsap.from(root.querySelectorAll("#education .edu-degree-panel"), {
    x: -48,
    autoAlpha: 0,
    scale: 0.94,
    rotate: -1,
    duration: 0.85,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#education .edu-degree-panel",
      start: "top 86%",
      toggleActions: REVEAL_ONCE,
    },
  });

  gsap.from(root.querySelectorAll("#education .edu-cert-panel"), {
    x: 48,
    autoAlpha: 0,
    scale: 0.94,
    rotate: 1,
    duration: 0.85,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#education .edu-cert-panel",
      start: "top 86%",
      toggleActions: REVEAL_ONCE,
    },
  });

  gsap.utils.toArray<HTMLElement>(root.querySelectorAll("#education .edu-cert-card")).forEach((card, index) => {
    gsap.from(card, {
      y: 32,
      autoAlpha: 0,
      scale: 0.92,
      duration: 0.55,
      delay: index * 0.07,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: card,
        start: "top 92%",
        toggleActions: REVEAL_ONCE,
      },
    });
  });

  gsap.from(root.querySelectorAll("#education .edu-footnote"), {
    y: 16,
    autoAlpha: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#education .edu-cert-panel",
      start: "top 70%",
      toggleActions: REVEAL_ONCE,
    },
  });
}

function setupContactReveals(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(root.querySelectorAll("#contact .glass-card")).forEach((card, index) => {
    gsap.from(card, {
      x: index % 2 === 0 ? -28 : 28,
      autoAlpha: 0,
      scale: 0.96,
      duration: 0.65,
      delay: index * 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: REVEAL_ONCE,
      },
    });
  });

  gsap.from(root.querySelectorAll("#contact form, #contact .contact-form"), {
    y: 40,
    autoAlpha: 0,
    scale: 0.97,
    duration: 0.75,
    stagger: 0.12,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact .section-reveal",
      start: "top 78%",
      toggleActions: REVEAL_ONCE,
    },
  });
}

function setupExperienceReveals(root: HTMLElement) {
  gsap.from(root.querySelectorAll("#experience .career-snake-path"), {
    scaleY: 0,
    autoAlpha: 0,
    duration: 1.1,
    ease: "power3.inOut",
    transformOrigin: "top center",
    scrollTrigger: {
      trigger: "#experience .career-snake",
      start: "top 80%",
      toggleActions: REVEAL_ONCE,
    },
  });

  gsap.utils.toArray<HTMLElement>(root.querySelectorAll("#experience .career-snake-node")).forEach((node, index) => {
    gsap.from(node, {
      scale: 0,
      autoAlpha: 0,
      duration: 0.55,
      delay: index * 0.1,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: node,
        start: "top 88%",
        toggleActions: REVEAL_ONCE,
      },
    });
  });

  gsap.from(root.querySelectorAll("#experience .career-track"), {
    y: 36,
    autoAlpha: 0,
    filter: "blur(8px)",
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#experience .career-track",
      start: "top 82%",
      toggleActions: REVEAL_ONCE,
    },
  });
}

function setupProjectScrollFx(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-deck-item")).forEach((item, index) => {
    gsap.from(item, {
      y: 56,
      autoAlpha: 0,
      scale: 0.9,
      rotate: index % 2 === 0 ? -2 : 2,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 92%",
        toggleActions: REVEAL_ONCE,
      },
    });
  });

  gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-card-shell")).forEach((card) => {
    gsap.to(card, {
      y: -12,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  });
}

function setupElementReveals(root: HTMLElement) {
  const selectors = [
    ".panel-vivid",
    ".panel-hud",
    ".glass-card",
    ".stat-chip",
    ".capability-slot",
    ".project-github-item",
    ".skill-orbit-node",
    ".skills-loadout-strip",
    ".scroll-reveal-item",
  ].join(", ");

  ScrollTrigger.batch(root.querySelectorAll(selectors), {
    start: "top 92%",
    onEnter: (batch) => {
      const filtered = batch.filter((el) => {
        if (el.closest("#about")) return false;
        if (el.closest("#education")) return false;
        if (el.closest("#contact")) return false;
        if (el.closest("#experience")) return false;
        if (el.closest("#projects")) return false;
        return true;
      });
      if (!filtered.length) return;
      gsap.fromTo(
        filtered,
        { y: 48, autoAlpha: 0, scale: 0.92, filter: "blur(6px)" },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.07,
          duration: 0.7,
          ease: "power2.out",
          overwrite: true,
        },
      );
    },
  });

  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    gsap.from("#skills .skill-orbit-hub", {
      scale: 0.6,
      autoAlpha: 0,
      duration: 0.9,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 72%",
        toggleActions: REVEAL_TOGGLE,
      },
    });
    gsap.from("#skills .skill-module-panel", {
      x: 40,
      autoAlpha: 0,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 68%",
        toggleActions: REVEAL_TOGGLE,
      },
    });
    gsap.from("#skills .skill-orbit-node", {
      scale: 0,
      autoAlpha: 0,
      stagger: 0.05,
      duration: 0.45,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: "#skills .skill-orbit-hub",
        start: "top 75%",
        toggleActions: REVEAL_ONCE,
      },
    });
  });
  mm.add("(max-width: 767px)", () => {
    gsap.from("#skills .skill-orbit-hub", {
      scale: 0.75,
      autoAlpha: 0,
      duration: 0.8,
      ease: "back.out(1.35)",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 78%",
        toggleActions: REVEAL_TOGGLE,
      },
    });
    gsap.from("#skills .skill-module-panel", {
      y: 32,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 74%",
        toggleActions: REVEAL_TOGGLE,
      },
    });
  });

  return mm;
}

function setupHeadingFocus(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".section-heading-block h2")).forEach((heading) => {
    gsap.fromTo(
      heading,
      { scale: 1, filter: "blur(0px)" },
      {
        scale: 1.02,
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          end: "top 45%",
          scrub: 0.4,
        },
      },
    );
  });
}

function setupScrollExperience(root: HTMLElement, mediaStores: ReturnType<typeof gsap.matchMedia>[]) {
  setupSectionTracking(root);
  setupHeroIntro(root);
  mediaStores.push(setupHeroPortalZoom(root));
  setupSectionReveals(root);
  setupEducationReveals(root);
  setupContactReveals(root);
  setupExperienceReveals(root);
  setupProjectScrollFx(root);
  setupHeadingFocus(root);
  mediaStores.push(setupElementReveals(root));
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
            ".section-reveal, .section-heading-block, .section-label, .hero-copy, .hero-orbit-wrap, .hero-scroll-cue, #about .panel-vivid, #about .panel-hud, #about .stat-chip, .edu-degree-panel, .edu-cert-panel, .edu-cert-card",
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
