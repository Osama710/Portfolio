import { gsap } from "@/lib/gsap/register";
import { experience } from "@/lib/data";

type MediaStore = ReturnType<typeof gsap.matchMedia>;

const CAREER_SCROLL_EVENT = "career-scroll-step";
const DESKTOP_CAREER_TRACK = "#experience .career-journey-scroll-track";
const DESKTOP_CAREER_PIN = "#experience .career-journey-pin";
const DESKTOP_CAREER_NODE = "#experience .career-journey-pin .career-snake-node";
const MOBILE_CAREER_STEP = "#experience .career-mobile-shell .career-journey-step";

const PATH_STOP_YS = [25, 100, 175, 250, 325];
const CONNECTOR_YS = [6, 24, 42, 60, 77];
const CONNECTOR_XS = [50, 68, 32, 68, 32];

function dispatchCareerStep(index: number) {
  const clamped = Math.min(experience.length - 1, Math.max(0, index));
  window.dispatchEvent(new CustomEvent<number>(CAREER_SCROLL_EVENT, { detail: clamped }));
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

function activeStepFromDrawLength(drawLength: number, stops: number[]) {
  let active = 0;
  for (let i = 0; i < stops.length; i++) {
    if (drawLength >= stops[i] - 0.5) active = i;
  }
  return active;
}

/** Map scroll progress 0–1 to a smooth draw length between path stops. */
function drawLengthFromProgress(progress: number, stops: number[], pathLength: number, stepCount: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  if (clamped <= 0) return 0;
  if (clamped >= 1) return pathLength;

  const scaled = clamped * stepCount;
  const stepIndex = Math.min(stepCount - 1, Math.floor(scaled));
  const local = scaled - stepIndex;
  const from = stepIndex === 0 ? 0 : (stops[stepIndex - 1] ?? 0);
  const to = stops[stepIndex] ?? pathLength;

  return from + (to - from) * Math.min(1, Math.max(0, local));
}

function readTrackProgress(track: HTMLElement, pinWrap: HTMLElement, clearance: number) {
  const scrollSpan = track.offsetHeight - pinWrap.offsetHeight;
  if (scrollSpan <= 0) return 0;

  const trackTop = track.getBoundingClientRect().top;
  const progress = (clearance - trackTop) / scrollSpan;
  return Math.min(1, Math.max(0, progress));
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
    const pinWrap = root.querySelector(DESKTOP_CAREER_PIN) as HTMLElement | null;
    const snake = root.querySelector("#experience .career-snake") as HTMLElement | null;
    const nodes = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(DESKTOP_CAREER_NODE));
    const path = root.querySelector("#experience .career-snake-path-draw") as SVGPathElement | null;
    const stepCount = Math.min(nodes.length, experience.length);
    const clearance = navClearancePx();

    if (!track || !pinWrap || !snake || !stepCount || !path) return;

    const pathLength = path.getTotalLength();
    const pathStops = buildPathStopsFromAnchors(path, PATH_STOP_YS);
    let activeStep = -1;
    let ticking = false;

    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;
    path.style.opacity = "0.45";

    const setStep = (step: number) => {
      const clamped = Math.min(stepCount - 1, Math.max(0, step));
      if (clamped === activeStep) return;
      activeStep = clamped;

      for (let i = 0; i < nodes.length; i++) {
        const visible = i <= clamped;
        nodes[i].style.opacity = visible ? "1" : "0";
        nodes[i].style.visibility = visible ? "visible" : "hidden";
      }

      updateConnectorLine(snake, clamped);
      dispatchCareerStep(clamped);
    };

    const syncFromScroll = () => {
      ticking = false;
      const progress = readTrackProgress(track, pinWrap, clearance);
      const drawTo = drawLengthFromProgress(progress, pathStops, pathLength, stepCount);

      path.style.strokeDashoffset = `${Math.max(0, pathLength - drawTo)}`;
      path.style.opacity = `${0.45 + progress * 0.5}`;

      setStep(activeStepFromDrawLength(drawTo, pathStops));
      pinWrap.classList.toggle("is-pinned", progress > 0.002 && progress < 0.998);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(syncFromScroll);
    };

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].style.opacity = i === 0 ? "1" : "0";
      nodes[i].style.visibility = i === 0 ? "visible" : "hidden";
    }
    updateConnectorLine(snake, 0);
    dispatchCareerStep(0);
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
