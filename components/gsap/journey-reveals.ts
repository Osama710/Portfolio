import { gsap, ScrollTrigger } from "@/lib/gsap/register";
import { experience } from "@/lib/data";

type MediaStore = ReturnType<typeof gsap.matchMedia>;

const CAREER_SCROLL_EVENT = "career-scroll-step";
const DESKTOP_CAREER_STAGE = "#experience .career-journey-stage";
const DESKTOP_CAREER_PIN = "#experience .career-journey-pin";
const DESKTOP_CAREER_NODE = "#experience .career-journey-stage .career-snake-node";
const MOBILE_CAREER_STEP = "#experience .career-mobile-shell .career-journey-step";

function dispatchCareerStep(index: number) {
  const clamped = Math.min(experience.length - 1, Math.max(0, index));
  window.dispatchEvent(new CustomEvent<number>(CAREER_SCROLL_EVENT, { detail: clamped }));
}

function journeyScrollPx() {
  return experience.reduce((sum, item, index) => {
    const base = index === 0 ? 560 : 400;
    const perBullet = index === 0 ? 90 : 42;
    return sum + base + item.bullets.length * perBullet;
  }, 0);
}

function buildStepWeights() {
  const raw = experience.map((item, index) => {
    if (index === 0) return 18 + item.bullets.length * 4.5;
    return 9 + item.bullets.length * 1.85;
  });
  const sum = raw.reduce((acc, value) => acc + value, 0);
  return raw.map((value) => value / sum);
}

function stepThreshold(weights: number[], index: number) {
  return weights.slice(0, index).reduce((acc, value) => acc + value, 0);
}

function pathLengthAtDot(
  path: SVGPathElement,
  dot: HTMLElement,
  snake: HTMLElement,
  minLength = 0,
) {
  const snakeRect = snake.getBoundingClientRect();
  const dotRect = dot.getBoundingClientRect();
  const targetX = dotRect.left + dotRect.width / 2 - snakeRect.left;
  const targetY = dotRect.top + dotRect.height / 2 - snakeRect.top;
  const total = path.getTotalLength();
  const viewWidth = snakeRect.width || 1;
  const viewHeight = snakeRect.height || 1;

  let bestLength = minLength;
  let bestScore = Infinity;

  for (let i = 0; i <= 240; i++) {
    const length = minLength + (i / 240) * (total - minLength);
    const point = path.getPointAtLength(length);
    const pixelX = (point.x / 100) * viewWidth;
    const pixelY = (point.y / 420) * viewHeight;
    const score = Math.hypot(pixelX - targetX, pixelY - targetY);
    if (score < bestScore) {
      bestScore = score;
      bestLength = length;
    }
  }

  return bestLength;
}

function buildPathStops(path: SVGPathElement, snake: HTMLElement, nodes: HTMLElement[]) {
  let minLength = 0;
  const stops: number[] = [];

  nodes.forEach((node) => {
    const dot = node.querySelector(".career-snake-node-dot") as HTMLElement | null;
    if (!dot) {
      stops.push(minLength);
      return;
    }
    const length = pathLengthAtDot(path, dot, snake, minLength);
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
      { autoAlpha: 0, scale: 1.1, y: 28, filter: "blur(8px)", rotateX: 6 },
      { autoAlpha: 1, scale: 1, y: 0, filter: "blur(0px)", rotateX: 0, duration: 0.82 },
      0,
    );
  }

  if (content) {
    tl.fromTo(
      content,
      { autoAlpha: 0, y: 36, x: index % 2 === 0 ? -28 : 28 },
      { autoAlpha: 1, y: 0, x: 0, duration: 0.68 },
      0.14,
    );
  }

  if (!media && !content) {
    tl.fromTo(item, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 0);
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
      gsap.set(node, {
        autoAlpha: i === 0 ? 1 : 0,
        filter: i === 0 ? "blur(0px)" : "blur(6px)",
      });
    });

    if (detail) {
      gsap.set(detail, { autoAlpha: 1, x: 0, y: 0, filter: "blur(0px)" });
    }

    const measure = () => {
      pathLength = path.getTotalLength();
      pathStops = buildPathStops(path, snake, nodes);
      gsap.set(path, { strokeDasharray: pathLength });
    };

    const applyJourney = (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      const drawTo = progressToDrawLength(clamped, weights, pathStops, pathLength);
      const activeStep = activeStepFromDrawLength(drawTo, pathStops);

      nodes.forEach((node, i) => {
        const visible = i <= activeStep;
        gsap.set(node, {
          autoAlpha: visible ? 1 : 0,
          filter: visible ? "blur(0px)" : "blur(6px)",
        });
      });

      gsap.set(path, {
        strokeDashoffset: Math.max(0, pathLength - drawTo),
        opacity: 0.45 + clamped * 0.5,
      });

      updateConnectorLine(snake, nodes, activeStep, connectorMeta);

      if (activeStep !== lastStep) {
        lastStep = activeStep;
        dispatchCareerStep(activeStep);
      }
    };

    const runMeasure = () => {
      requestAnimationFrame(measure);
    };

    measure();

    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength, opacity: 0.45 });

    ScrollTrigger.create({
      trigger: stage,
      start: "top top",
      end: `+=${journeyEndPx}`,
      pin: stage,
      pinSpacing: true,
      scrub: 0.55,
      invalidateOnRefresh: true,
      onRefresh: measure,
      onUpdate: (self) => applyJourney(self.progress),
      onEnter: (self) => {
        lastStep = -1;
        measure();
        applyJourney(self.progress);
      },
      onEnterBack: (self) => {
        lastStep = -1;
        measure();
        applyJourney(self.progress);
      },
      onLeave: () => {
        nodes.forEach((node) => {
          gsap.set(node, { autoAlpha: 1, filter: "blur(0px)" });
        });
        gsap.set(path, { strokeDashoffset: 0, opacity: 0.95 });
        updateConnectorLine(snake, nodes, stepCount - 1, connectorMeta);
        dispatchCareerStep(stepCount - 1);
      },
      onLeaveBack: () => {
        lastStep = -1;
        nodes.forEach((node, i) => {
          gsap.set(node, {
            autoAlpha: i === 0 ? 1 : 0,
            filter: i === 0 ? "blur(0px)" : "blur(6px)",
          });
        });
        gsap.set(path, { strokeDashoffset: pathLength, opacity: 0.45 });
        dispatchCareerStep(0);
      },
      onToggle: (self) => {
        pinWrap.classList.toggle("is-pinned", self.isActive);
        if (self.isActive) runMeasure();
      },
    });

    const onRefreshInit = () => measure();
    ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
    window.addEventListener("resize", runMeasure, { passive: true });

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      window.removeEventListener("resize", runMeasure);
      pinWrap.classList.remove("is-pinned");
    };
  });

  mm.add("(max-width: 1023px)", () => {
    const steps = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(MOBILE_CAREER_STEP));

    steps.forEach((step, i) => {
      gsap.set(step, { autoAlpha: 0, y: 40, rotateX: 10, transformOrigin: "50% 0%" });

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

      ScrollTrigger.create({
        trigger: step,
        start: "top 62%",
        end: "bottom 38%",
        onEnter: () => dispatchCareerStep(i),
        onEnterBack: () => dispatchCareerStep(i),
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
      if (media) gsap.set(media, { autoAlpha: 0, scale: 1.12, y: 32, filter: "blur(8px)" });
      if (content) gsap.set(content, { autoAlpha: 0, y: 40, x: index % 2 === 0 ? -32 : 32 });

      ScrollTrigger.create({
        trigger: item,
        start: "top 88%",
        end: "bottom 12%",
        onEnter: () => playProjectReveal(item, index),
        onLeave: () => {
          gsap.to(item, { autoAlpha: 0.35, scale: 0.98, duration: 0.35, ease: "power2.in", overwrite: "auto" });
        },
        onEnterBack: () => playProjectReveal(item, index),
        onLeaveBack: () => {
          if (media) gsap.set(media, { autoAlpha: 0, scale: 1.12, y: 32, filter: "blur(8px)" });
          if (content) gsap.set(content, { autoAlpha: 0, y: 40, x: index % 2 === 0 ? -32 : 32 });
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
        if (media) gsap.set(media, { autoAlpha: 0, scale: 1.1, y: 28, filter: "blur(8px)" });
        if (content) gsap.set(content, { autoAlpha: 0, y: 36, x: index % 2 === 0 ? -28 : 28 });
      } else {
        gsap.set(item, { autoAlpha: 0, y: 36 });
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
        gsap.to(items, {
          autoAlpha: 0,
          y: 24,
          duration: 0.38,
          stagger: 0.03,
          ease: "power2.in",
          overwrite: "auto",
        });
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
