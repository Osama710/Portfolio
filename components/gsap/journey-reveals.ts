import { gsap } from "@/lib/gsap/register";
import { experience } from "@/lib/data";

type MediaStore = ReturnType<typeof gsap.matchMedia>;

const CAREER_SCROLL_EVENT = "career-scroll-step";
const DESKTOP_CAREER_TRACK = "#experience .career-journey-scroll-track";
const DESKTOP_CAREER_NODE = "#experience .career-journey-pin .career-snake-node";
const MOBILE_CAREER_STEP = "#experience .career-mobile-shell .career-journey-step";

const PATH_STOP_YS = [25, 100, 175, 250, 325];
const CONNECTOR_YS = [6, 24, 42, 60, 77];
const CONNECTOR_XS = [50, 68, 32, 68, 32];

function dispatchCareerStep(index: number) {
  const clamped = Math.min(experience.length - 1, Math.max(0, index));
  window.dispatchEvent(new CustomEvent<number>(CAREER_SCROLL_EVENT, { detail: clamped }));
}

function stepScrollPx() {
  if (typeof window === "undefined") return 340;
  return Math.max(280, Math.round(window.innerHeight * 0.34));
}

function journeyScrollPx() {
  return stepScrollPx() * experience.length;
}

function navClearancePx() {
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue("--site-nav-clearance").trim();
  const value = parseFloat(raw);
  if (!Number.isFinite(value)) return 84;
  return raw.endsWith("rem") ? value * parseFloat(getComputedStyle(root).fontSize) : value;
}

function pathLengthAtViewBoxY(path: SVGPathElement, targetY: number, minLength = 0) {
  const total = path.getTotalLength();
  let bestLength = minLength;
  let bestScore = Infinity;

  for (let i = 0; i <= 48; i++) {
    const length = minLength + (i / 48) * (total - minLength);
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

function updateConnectorLine(snake: HTMLElement, activeIndex: number) {
  const connector = snake.querySelector(".career-snake-connector-line") as SVGLineElement | null;
  if (!connector) return;

  const y = CONNECTOR_YS[activeIndex] ?? CONNECTOR_YS[0];
  const x = CONNECTOR_XS[activeIndex] ?? 50;

  connector.setAttribute("y1", String(y));
  connector.setAttribute("y2", String(y));
  connector.setAttribute("x1", String(x));
}

export function setupExperienceJourney(root: HTMLElement, mediaStores: MediaStore[]) {
  const mm = gsap.matchMedia();
  let removeDesktopScroll: (() => void) | undefined;

  mm.add("(min-width: 1024px)", () => {
    const track = root.querySelector(DESKTOP_CAREER_TRACK) as HTMLElement | null;
    const pinWrap = root.querySelector("#experience .career-journey-pin") as HTMLElement | null;
    const snake = root.querySelector("#experience .career-snake") as HTMLElement | null;
    const nodes = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(DESKTOP_CAREER_NODE));
    const path = root.querySelector("#experience .career-snake-path-draw") as SVGPathElement | null;
    const stepCount = Math.min(nodes.length, experience.length);
    const journeyEndPx = journeyScrollPx();
    const clearance = navClearancePx();

    if (!track || !pinWrap || !snake || !stepCount || !path) return;

    const pathLength = path.getTotalLength();
    const pathStops = buildPathStopsFromAnchors(path, PATH_STOP_YS);
    let activeStep = -1;
    let ticking = false;

    path.style.strokeDasharray = `${pathLength}`;
    path.classList.add("career-snake-path-draw--scroll");

    const applyStep = (step: number) => {
      const clamped = Math.min(stepCount - 1, Math.max(0, step));
      if (clamped === activeStep) return;

      activeStep = clamped;
      const drawTo = pathStops[clamped] ?? 0;

      path.style.strokeDashoffset = `${Math.max(0, pathLength - drawTo)}`;
      path.style.opacity = `${0.45 + (clamped / Math.max(1, stepCount - 1)) * 0.5}`;

      for (let i = 0; i < nodes.length; i++) {
        const visible = i <= clamped;
        nodes[i].style.opacity = visible ? "1" : "0";
        nodes[i].style.visibility = visible ? "visible" : "hidden";
      }

      updateConnectorLine(snake, clamped);
      dispatchCareerStep(clamped);
    };

    const readProgress = () => {
      const rect = track.getBoundingClientRect();
      if (rect.top > clearance) return 0;
      if (rect.bottom <= window.innerHeight) return 1;
      return Math.min(1, Math.max(0, (clearance - rect.top) / journeyEndPx));
    };

    const syncFromScroll = () => {
      ticking = false;
      const progress = readProgress();
      const step = Math.min(stepCount - 1, Math.floor(progress * stepCount + 0.0001));
      applyStep(step);
      pinWrap.classList.toggle("is-pinned", progress > 0 && progress < 1);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(syncFromScroll);
    };

    applyStep(0);
    syncFromScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    removeDesktopScroll = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      pinWrap.classList.remove("is-pinned");
      activeStep = -1;
    };
  });

  mm.add("(max-width: 1023px)", () => {
    gsap.utils.toArray<HTMLElement>(root.querySelectorAll(MOBILE_CAREER_STEP)).forEach((step) => {
      gsap.set(step, { autoAlpha: 1, y: 0 });
    });
  });

  mediaStores.push(mm);

  return () => {
    removeDesktopScroll?.();
    mm.revert();
  };
}

/** Projects — no scroll-linked GSAP (CSS handles entry). */
export function setupProjectJourney(_root: HTMLElement, _mediaStores: MediaStore[], _mobileHideStart: string) {}
