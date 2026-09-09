import { gsap, ScrollTrigger } from "@/lib/gsap/register";
import { experience } from "@/lib/data";

type MediaStore = ReturnType<typeof gsap.matchMedia>;

const CAREER_SCROLL_EVENT = "career-scroll-step";
const DESKTOP_CAREER_PIN = "#experience .career-journey-pin";
const DESKTOP_CAREER_NODE = "#experience .career-journey-pin .career-snake-node";
const MOBILE_CAREER_STEP = "#experience .career-mobile-shell .career-journey-step";

/** SVG path anchor Y + connector Y (viewBox) — matches experience.tsx snakeNodes. */
const PATH_STOP_YS = [25, 100, 175, 250, 325];
const CONNECTOR_YS = [6, 24, 42, 60, 77];
const CONNECTOR_XS = [50, 68, 32, 68, 32];

function dispatchCareerStep(index: number) {
  const clamped = Math.min(experience.length - 1, Math.max(0, index));
  window.dispatchEvent(new CustomEvent<number>(CAREER_SCROLL_EVENT, { detail: clamped }));
}

/** Equal scroll distance per role (~38vh each). */
function stepScrollPx() {
  if (typeof window === "undefined") return 360;
  return Math.max(300, Math.round(window.innerHeight * 0.38));
}

function journeyScrollPx() {
  return stepScrollPx() * experience.length;
}

function buildStepWeights() {
  const share = 1 / experience.length;
  return experience.map(() => share);
}

function stepThreshold(weights: number[], index: number) {
  return weights.slice(0, index).reduce((acc, value) => acc + value, 0);
}

function pathLengthAtViewBoxY(path: SVGPathElement, targetY: number, minLength = 0) {
  const total = path.getTotalLength();
  let bestLength = minLength;
  let bestScore = Infinity;

  for (let i = 0; i <= 80; i++) {
    const length = minLength + (i / 80) * (total - minLength);
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

function updateConnectorLine(snake: HTMLElement, activeIndex: number) {
  const connector = snake.querySelector(".career-snake-connector-line") as SVGLineElement | null;
  if (!connector) return;

  const y = CONNECTOR_YS[activeIndex] ?? CONNECTOR_YS[0];
  const x = CONNECTOR_XS[activeIndex] ?? 50;

  connector.setAttribute("y1", String(y));
  connector.setAttribute("y2", String(y));
  connector.setAttribute("x1", String(x));
}

function playProjectReveal(item: HTMLElement, index: number) {
  const media = item.querySelector(".project-reveal-media");
  const content = item.querySelector(".project-reveal-content");

  gsap.fromTo(
    item,
    { autoAlpha: 0.85, y: 12 },
    { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" },
  );

  if (media) {
    gsap.fromTo(media, { y: 10 }, { y: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" });
  }

  if (content) {
    gsap.fromTo(
      content,
      { y: 12, x: index % 2 === 0 ? -8 : 8 },
      { y: 0, x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" },
    );
  }
}

export function setupExperienceJourney(root: HTMLElement, mediaStores: MediaStore[]) {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const pinWrap = root.querySelector(DESKTOP_CAREER_PIN) as HTMLElement | null;
    const snake = root.querySelector("#experience .career-snake") as HTMLElement | null;
    const nodes = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(DESKTOP_CAREER_NODE));
    const path = root.querySelector("#experience .career-snake-path-draw") as SVGPathElement | null;
    const stepCount = Math.min(nodes.length, experience.length);
    const journeyEndPx = journeyScrollPx();

    if (!pinWrap || !snake || !stepCount || !path) return;

    const weights = buildStepWeights();
    const pathLength = path.getTotalLength();
    const pathStops = buildPathStopsFromAnchors(path, PATH_STOP_YS);
    let lastStep = -1;

    nodes.forEach((node, i) => {
      gsap.set(node, { clearProps: "opacity,visibility" });
      node.style.opacity = i === 0 ? "1" : "0";
      node.style.visibility = i === 0 ? "visible" : "hidden";
    });

    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;
    path.style.opacity = "0.45";

    const applyJourney = (progress: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      const drawTo = progressToDrawLength(clamped, weights, pathStops, pathLength);
      const activeStep = activeStepFromDrawLength(drawTo, pathStops);

      path.style.strokeDashoffset = `${Math.max(0, pathLength - drawTo)}`;
      path.style.opacity = `${0.45 + clamped * 0.5}`;

      if (activeStep !== lastStep) {
        lastStep = activeStep;
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].style.opacity = i <= activeStep ? "1" : "0";
          nodes[i].style.visibility = i <= activeStep ? "visible" : "hidden";
        }
        updateConnectorLine(snake, activeStep);
        dispatchCareerStep(activeStep);
      }
    };

    ScrollTrigger.create({
      trigger: pinWrap,
      start: "top top+=5.25rem",
      end: `+=${journeyEndPx}`,
      pin: pinWrap,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
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
          node.style.opacity = "1";
          node.style.visibility = "visible";
        });
        path.style.strokeDashoffset = "0";
        path.style.opacity = "0.95";
        updateConnectorLine(snake, stepCount - 1);
        dispatchCareerStep(stepCount - 1);
      },
      onLeaveBack: () => {
        lastStep = -1;
        nodes.forEach((node, i) => {
          node.style.opacity = i === 0 ? "1" : "0";
          node.style.visibility = i === 0 ? "visible" : "hidden";
        });
        path.style.strokeDashoffset = `${pathLength}`;
        path.style.opacity = "0.45";
        updateConnectorLine(snake, 0);
        dispatchCareerStep(0);
      },
      onToggle: (self) => {
        pinWrap.classList.toggle("is-pinned", self.isActive);
      },
    });

    updateConnectorLine(snake, 0);
    dispatchCareerStep(0);

    return () => {
      pinWrap.classList.remove("is-pinned");
    };
  });

  mm.add("(max-width: 1023px)", () => {
    const steps = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(MOBILE_CAREER_STEP));
    steps.forEach((step) => {
      gsap.set(step, { autoAlpha: 1, y: 0 });
    });
  });

  mediaStores.push(mm);
}

export function setupProjectJourney(root: HTMLElement, mediaStores: MediaStore[], mobileHideStart: string) {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-journey-item")).forEach((item, index) => {
      gsap.set(item, { autoAlpha: 1 });

      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        once: true,
        onEnter: () => playProjectReveal(item, index),
      });
    });
  });

  mm.add("(max-width: 1023px)", () => {
    gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-journey-item, .project-github-item")).forEach(
      (item, index) => {
        gsap.set(item, { autoAlpha: 1 });

        if (item.classList.contains("project-journey-item")) {
          ScrollTrigger.create({
            trigger: item,
            start: "top 92%",
            once: true,
            onEnter: () => playProjectReveal(item, index),
          });
        }
      },
    );

    void mobileHideStart;
  });

  mediaStores.push(mm);
}
