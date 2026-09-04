import { gsap, ScrollTrigger } from "@/lib/gsap/register";
import { experience } from "@/lib/data";

type MediaStore = ReturnType<typeof gsap.matchMedia>;

const CAREER_SCROLL_EVENT = "career-scroll-step";
const DESKTOP_CAREER_STAGE = "#experience .career-journey-stage";
const DESKTOP_CAREER_PIN = "#experience .career-journey-pin";
const DESKTOP_CAREER_NODE = "#experience .career-journey-pin .career-snake-node";
const MOBILE_CAREER_STEP = "#experience .career-mobile-shell .career-journey-step";

/** SVG path anchor Y values — must match SNAKE_PATH_D in experience.tsx (viewBox height 420). */
const PATH_STOP_YS = [25, 100, 175, 250, 325];

function dispatchCareerStep(index: number) {
  const clamped = Math.min(experience.length - 1, Math.max(0, index));
  window.dispatchEvent(new CustomEvent<number>(CAREER_SCROLL_EVENT, { detail: clamped }));
}

function buildStepScrollPx() {
  return experience.map((item, index) => {
    const base = 480;
    const perBullet = 28;
    const leadBonus = index === 0 ? 160 : 0;
    return base + item.bullets.length * perBullet + leadBonus;
  });
}

function journeyScrollPx() {
  return buildStepScrollPx().reduce((sum, px) => sum + px, 0);
}

function buildStepWeights() {
  const stepPx = buildStepScrollPx();
  const total = stepPx.reduce((sum, px) => sum + px, 0);
  return stepPx.map((px) => px / total);
}

function stepThreshold(weights: number[], index: number) {
  return weights.slice(0, index).reduce((acc, value) => acc + value, 0);
}

function pathLengthAtViewBoxY(path: SVGPathElement, targetY: number, minLength = 0) {
  const total = path.getTotalLength();
  let bestLength = minLength;
  let bestScore = Infinity;

  for (let i = 0; i <= 240; i++) {
    const length = minLength + (i / 240) * (total - minLength);
    const point = path.getPointAtLength(length);
    const score = Math.abs(point.y - targetY);
    if (score < bestScore) {
      bestScore = score;
      bestLength = length;
    }
  }

  return bestLength;
}

function buildPathStopsFromAnchors(path: SVGPathElement, stopYs: number[]) {
  let minLength = 0;
  const stops: number[] = [];

  stopYs.forEach((y) => {
    const length = pathLengthAtViewBoxY(path, y, minLength);
    minLength = length;
    stops.push(length);
  });

  return stops;
}

function progressToDrawLength(
  progress: number,
  weights: number[],
  stops: number[],
  totalLength: number,
) {
  const clamped = Math.min(1, Math.max(0, progress));
  let step = 0;
  let acc = 0;

  for (let i = 0; i < weights.length; i++) {
    acc += weights[i];
    if (clamped <= acc) {
      step = i;
      break;
    }
    step = i;
  }

  const start = stepThreshold(weights, step);
  const local = weights[step] > 0 ? (clamped - start) / weights[step] : 1;
  const from = step === 0 ? 0 : stops[step - 1] ?? 0;
  const to = stops[step] ?? totalLength;

  return from + (to - from) * Math.min(1, Math.max(0, local));
}

function activeStepFromDrawLength(drawLength: number, stops: number[]) {
  let active = 0;
  for (let i = 0; i < stops.length; i++) {
    if (drawLength >= stops[i] - 1.5) active = i;
  }
  return active;
}

function updateConnectorLine(
  snake: HTMLElement,
  nodes: HTMLElement[],
  activeIndex: number,
  snakeNodesMeta: { connectorX: number }[],
) {
  const connector = snake.querySelector(".career-snake-connector-line") as SVGLineElement | null;
  const node = nodes[activeIndex];
  const dot = node?.querySelector(".career-snake-node-dot") as HTMLElement | null;
  if (!connector || !dot) return;

  const snakeRect = snake.getBoundingClientRect();
  const dotRect = dot.getBoundingClientRect();
  const yPercent = ((dotRect.top + dotRect.height / 2 - snakeRect.top) / snakeRect.height) * 100;
  const xPercent = snakeNodesMeta[activeIndex]?.connectorX ?? 50;

  connector.setAttribute("y1", String(yPercent));
  connector.setAttribute("y2", String(yPercent));
  connector.setAttribute("x1", String(xPercent));
}

function playProjectReveal(item: HTMLElement, index: number) {
  const media = item.querySelector(".project-reveal-media");
  const content = item.querySelector(".project-reveal-content");

  const tl = gsap.timeline({ defaults: { ease: "power3.out", overwrite: "auto" } });

  tl.set(item, { autoAlpha: 1 }, 0);

  if (media) {
    tl.fromTo(
      media,
      { scale: 1.05, y: 16 },
      { scale: 1, y: 0, autoAlpha: 1, duration: 0.75, force3D: true },
      0,
    );
  }

  if (content) {
    tl.fromTo(
      content,
      { y: 20, x: index % 2 === 0 ? -12 : 12, autoAlpha: 1 },
      { y: 0, x: 0, autoAlpha: 1, duration: 0.65, force3D: true },
      0.12,
    );
  }

  if (!media && !content) {
    tl.fromTo(item, { y: 20, autoAlpha: 1 }, { y: 0, autoAlpha: 1, duration: 0.6 }, 0);
  }

  return tl;
}

export function setupExperienceJourney(root: HTMLElement, mediaStores: MediaStore[]) {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const pinWrap = root.querySelector(DESKTOP_CAREER_PIN) as HTMLElement | null;
    const stage = root.querySelector(DESKTOP_CAREER_STAGE) as HTMLElement | null;
    const snake = root.querySelector("#experience .career-snake") as HTMLElement | null;
    const nodes = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(DESKTOP_CAREER_NODE));
    const path = root.querySelector("#experience .career-snake-path-draw") as SVGPathElement | null;
    const detail = root.querySelector("#experience .career-track-detail");
    const stepCount = Math.min(nodes.length, experience.length);
    const journeyEndPx = journeyScrollPx();

    if (!pinWrap || !stage || !snake || !stepCount || !path) return;

    const weights = buildStepWeights();
    const connectorMeta = [
      { connectorX: 50 },
      { connectorX: 68 },
      { connectorX: 32 },
      { connectorX: 68 },
      { connectorX: 32 },
    ];

    let pathStops: number[] = [];
    let pathLength = path.getTotalLength();
    let lastStep = -1;

    nodes.forEach((node, i) => {
      gsap.set(node, { autoAlpha: i === 0 ? 1 : 0 });
    });

    if (detail) {
      gsap.set(detail, { autoAlpha: 1, x: 0, y: 0 });
    }

    const measure = () => {
      pathLength = path.getTotalLength();
      pathStops = buildPathStopsFromAnchors(path, PATH_STOP_YS);
      gsap.set(path, { strokeDasharray: pathLength });
    };

    measure();

    const setPathDash = gsap.quickSetter(path, "strokeDashoffset", "px");
    const setPathOpacity = gsap.quickSetter(path, "opacity");

    const applyJourney = (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      const drawTo = progressToDrawLength(clamped, weights, pathStops, pathLength);
      const activeStep = activeStepFromDrawLength(drawTo, pathStops);

      setPathDash(Math.max(0, pathLength - drawTo));
      setPathOpacity(0.45 + clamped * 0.5);

      nodes.forEach((node, i) => {
        gsap.set(node, { autoAlpha: i <= activeStep ? 1 : 0 });
      });

      updateConnectorLine(snake, nodes, activeStep, connectorMeta);

      if (activeStep !== lastStep) {
        lastStep = activeStep;
        dispatchCareerStep(activeStep);
      }
    };

    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength, opacity: 0.45 });

    ScrollTrigger.create({
      trigger: stage,
      start: "top top",
      end: `+=${journeyEndPx}`,
      pin: stage,
      pinSpacing: true,
      scrub: 0.45,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: measure,
      onUpdate: (self) => applyJourney(self.progress),
      onEnter: () => {
        lastStep = -1;
        applyJourney(0);
      },
      onEnterBack: (self) => {
        lastStep = -1;
        applyJourney(self.progress);
      },
      onLeave: () => {
        nodes.forEach((node) => {
          gsap.set(node, { autoAlpha: 1 });
        });
        gsap.set(path, { strokeDashoffset: 0, opacity: 0.95 });
        updateConnectorLine(snake, nodes, stepCount - 1, connectorMeta);
        dispatchCareerStep(stepCount - 1);
      },
      onLeaveBack: () => {
        lastStep = -1;
        nodes.forEach((node, i) => {
          gsap.set(node, { autoAlpha: i === 0 ? 1 : 0 });
        });
        gsap.set(path, { strokeDashoffset: pathLength, opacity: 0.45 });
        updateConnectorLine(snake, nodes, 0, connectorMeta);
        dispatchCareerStep(0);
      },
      onToggle: (self) => {
        pinWrap.classList.toggle("is-pinned", self.isActive);
        if (self.isActive) {
          measure();
          applyJourney(self.progress);
        }
      },
    });

    const onRefreshInit = () => measure();
    ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      window.removeEventListener("resize", measure);
      pinWrap.classList.remove("is-pinned");
    };
  });

  mm.add("(max-width: 1023px)", () => {
    const steps = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(MOBILE_CAREER_STEP));

    steps.forEach((step, i) => {
      gsap.set(step, { autoAlpha: 1, y: 0, rotateX: 0, transformOrigin: "50% 0%" });

      ScrollTrigger.create({
        trigger: step,
        start: "top 93%",
        onEnter: () => {
          gsap.to(step, {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.75,
            delay: Math.min(i * 0.04, 0.2),
            ease: "power3.out",
            overwrite: "auto",
          });
        },
        onEnterBack: () => {
          gsap.to(step, { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.5, overwrite: "auto" });
        },
        invalidateOnRefresh: true,
      });

    });
  });

  mediaStores.push(mm);
}

export function setupProjectJourney(root: HTMLElement, mediaStores: MediaStore[], mobileHideStart: string) {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-journey-item")).forEach((item, index) => {
      const media = item.querySelector(".project-reveal-media");
      const content = item.querySelector(".project-reveal-content");

      gsap.set(item, { autoAlpha: 1 });
      if (media) gsap.set(media, { autoAlpha: 1, scale: 1, y: 0 });
      if (content) gsap.set(content, { autoAlpha: 1, y: 0, x: 0 });

      ScrollTrigger.create({
        trigger: item,
        start: "top 88%",
        end: "bottom 12%",
        onEnter: () => playProjectReveal(item, index),
        onLeave: () => {
          gsap.to(item, { scale: 0.99, duration: 0.35, ease: "power2.in", overwrite: "auto" });
        },
        onEnterBack: () => playProjectReveal(item, index),
        onLeaveBack: () => {
          gsap.set(item, { autoAlpha: 1, scale: 1 });
        },
        invalidateOnRefresh: true,
      });
    });
  });

  mm.add("(max-width: 1023px)", () => {
    const items = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".project-journey-item, .project-github-item"),
    );

    items.forEach((item, index) => {
      if (item.classList.contains("project-journey-item")) {
        gsap.set(item, { autoAlpha: 1 });
        const media = item.querySelector(".project-reveal-media");
        const content = item.querySelector(".project-reveal-content");
        if (media) gsap.set(media, { autoAlpha: 1, scale: 1, y: 0 });
        if (content) gsap.set(content, { autoAlpha: 1, y: 0, x: 0 });
      } else {
        gsap.set(item, { autoAlpha: 1, y: 0 });
      }

      ScrollTrigger.create({
        trigger: item,
        start: "top 94%",
        onEnter: () => {
          if (item.classList.contains("project-journey-item")) {
            playProjectReveal(item, index);
          } else {
            gsap.to(item, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
          }
        },
        onEnterBack: () => {
          if (item.classList.contains("project-journey-item")) {
            playProjectReveal(item, index);
          } else {
            gsap.to(item, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", overwrite: "auto" });
          }
        },
        invalidateOnRefresh: true,
      });
    });

    ScrollTrigger.create({
      trigger: "#capabilities",
      start: mobileHideStart,
      onEnter: () => {
        // keep projects visible — hiding caused blank-screen flicker
      },
      onLeaveBack: () => {
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
          overwrite: "auto",
        });
      },
      invalidateOnRefresh: true,
    });
  });

  mediaStores.push(mm);
}
