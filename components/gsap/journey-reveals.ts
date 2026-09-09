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

type TrackMetrics = {
  trackTop: number;
  scrollSpan: number;
  clearance: number;
};

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

/** Each scroll segment draws from the previous node stop to the next. */
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

function cacheTrackMetrics(track: HTMLElement, pinWrap: HTMLElement, clearance: number): TrackMetrics {
  const rect = track.getBoundingClientRect();
  return {
    trackTop: rect.top + window.scrollY,
    scrollSpan: track.offsetHeight - pinWrap.offsetHeight,
    clearance,
  };
}

function progressFromMetrics(metrics: TrackMetrics) {
  if (metrics.scrollSpan <= 0) return 0;
  const progress = (window.scrollY + metrics.clearance - metrics.trackTop) / metrics.scrollSpan;
  return Math.min(1, Math.max(0, progress));
}

function setPathDraw(path: SVGPathElement, pathLength: number, drawTo: number, progress: number) {
  path.style.strokeDashoffset = `${Math.max(0, pathLength - drawTo)}`;
  path.style.opacity = `${0.45 + progress * 0.5}`;
}

function hidePath(path: SVGPathElement, pathLength: number) {
  path.style.strokeDasharray = `${pathLength} ${pathLength}`;
  path.style.strokeDashoffset = `${pathLength}`;
  path.style.opacity = "0.45";
}

function updateConnectorLine(snake: HTMLElement, activeIndex: number) {
  const connector = snake.querySelector(".career-snake-connector-line") as SVGLineElement | null;
  if (!connector) return;

  const y = CONNECTOR_YS[activeIndex] ?? CONNECTOR_YS[0];
  const x = CONNECTOR_XS[activeIndex] ?? CONNECTOR_XS[0];

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
    let metrics = cacheTrackMetrics(track, pinWrap, clearance);
    let activeStep = -1;
    let pinned = false;
    let ticking = false;
    let listening = false;

    track.style.setProperty("--career-path-length", `${pathLength}`);
    hidePath(path, pathLength);

    const setStep = (step: number) => {
      const clamped = Math.min(stepCount - 1, Math.max(0, step));
      if (clamped === activeStep) return;
      activeStep = clamped;

      track.dataset.activeStep = String(clamped);

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.toggle("is-revealed", i <= clamped);
      }

      updateConnectorLine(snake, clamped);
      dispatchCareerStep(clamped);
    };

    const syncFromScroll = () => {
      ticking = false;

      const progress = progressFromMetrics(metrics);
      const drawTo = drawLengthFromProgress(progress, pathStops, pathLength, stepCount);

      setPathDraw(path, pathLength, drawTo, progress);
      setStep(activeStepFromDrawLength(drawTo, pathStops));

      const nextPinned = progress > 0.002 && progress < 0.998;
      if (nextPinned !== pinned) {
        pinned = nextPinned;
        pinWrap.classList.toggle("is-pinned", pinned);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(syncFromScroll);
    };

    const onResize = () => {
      metrics = cacheTrackMetrics(track, pinWrap, clearance);
      onScroll();
    };

    const startListening = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      syncFromScroll();
    };

    const stopListening = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].classList.toggle("is-revealed", i === 0);
      nodes[i].style.removeProperty("opacity");
      nodes[i].style.removeProperty("visibility");
    }

    track.dataset.activeStep = "0";
    updateConnectorLine(snake, 0);
    dispatchCareerStep(0);
    syncFromScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startListening();
        } else {
          stopListening();
          hidePath(path, pathLength);
          pinned = false;
          pinWrap.classList.remove("is-pinned");
        }
      },
      { root: null, rootMargin: "120px 0px 120px 0px", threshold: 0 },
    );
    observer.observe(track);

    removeDesktopScroll = () => {
      observer.disconnect();
      stopListening();
      track.style.removeProperty("--career-path-length");
      delete track.dataset.activeStep;
      pinWrap.classList.remove("is-pinned");
      nodes.forEach((node) => node.classList.remove("is-revealed"));
      path.style.removeProperty("stroke-dasharray");
      path.style.removeProperty("stroke-dashoffset");
      path.style.removeProperty("opacity");
      activeStep = -1;
      pinned = false;
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
