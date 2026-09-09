import { gsap } from "@/lib/gsap/register";
import { getScrollY } from "@/lib/gsap/scroll-preserve";
import { experience } from "@/lib/data";

type MediaStore = ReturnType<typeof gsap.matchMedia>;

const CAREER_SCROLL_EVENT = "career-scroll-step";
const DESKTOP_CAREER_TRACK = "#experience .career-journey-scroll-track";
const DESKTOP_CAREER_PIN = "#experience .career-journey-pin";
const MOBILE_CAREER_STEP = "#experience .career-mobile-shell .career-journey-step";

const PATH_STOP_YS = [25, 100, 175, 250, 325];
const CONNECTOR_YS = [6, 24, 42, 60, 77];
const CONNECTOR_XS = [50, 68, 32, 68, 32];
const METRICS_JUMP_PX = 64;

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

function measureTrackMetrics(track: HTMLElement, pinWrap: HTMLElement, clearance: number): TrackMetrics {
  const rect = track.getBoundingClientRect();
  return {
    trackTop: rect.top + getScrollY(),
    scrollSpan: Math.max(1, track.offsetHeight - pinWrap.offsetHeight),
    clearance,
  };
}

function progressFromMetrics(metrics: TrackMetrics) {
  const progress = (getScrollY() + metrics.clearance - metrics.trackTop) / metrics.scrollSpan;
  return Math.min(1, Math.max(0, progress));
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
    const path = root.querySelector("#experience .career-snake-path-draw") as SVGPathElement | null;
    const stepCount = experience.length;
    const clearance = navClearancePx();

    if (!track || !pinWrap || !snake || !stepCount || !path) return;

    const pathLength = path.getTotalLength();
    const pathStops = buildPathStopsFromAnchors(path, PATH_STOP_YS);
    let metrics = measureTrackMetrics(track, pinWrap, clearance);
    let activeStep = -1;
    let pinned = false;
    let tickerOn = false;
    let lastScrollY = getScrollY();

    track.style.setProperty("--career-path-length", `${pathLength}`);
    track.style.setProperty("--career-draw-to", "0");
    track.style.setProperty("--career-scroll-progress", "0");
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;
    path.style.opacity = "0.45";

    const remeasureMetrics = () => {
      metrics = measureTrackMetrics(track, pinWrap, clearance);
    };

    const setStep = (step: number) => {
      const clamped = Math.min(stepCount - 1, Math.max(0, step));
      track.dataset.activeStep = String(clamped);
      if (clamped === activeStep) return;
      activeStep = clamped;
      updateConnectorLine(snake, clamped);
      dispatchCareerStep(clamped);
    };

    const syncFromScroll = () => {
      const progress = progressFromMetrics(metrics);
      const drawTo = drawLengthFromProgress(progress, pathStops, pathLength, stepCount);
      const dashOffset = Math.max(0, pathLength - drawTo);

      track.style.setProperty("--career-draw-to", `${drawTo}`);
      track.style.setProperty("--career-scroll-progress", `${progress}`);
      path.style.strokeDashoffset = `${dashOffset}`;
      path.style.opacity = `${0.45 + progress * 0.5}`;

      setStep(activeStepFromDrawLength(drawTo, pathStops));

      const nextPinned = progress > 0.002 && progress < 0.998;
      if (nextPinned !== pinned) {
        pinned = nextPinned;
        pinWrap.classList.toggle("is-pinned", pinned);
        track.classList.toggle("is-scrolling-career", pinned);
        if (nextPinned) remeasureMetrics();
      }
    };

    const onTick = () => {
      syncFromScroll();
    };

    const enableTicker = () => {
      if (tickerOn) return;
      tickerOn = true;
      remeasureMetrics();
      gsap.ticker.add(onTick);
      syncFromScroll();
    };

    const disableTicker = () => {
      if (!tickerOn) return;
      tickerOn = false;
      gsap.ticker.remove(onTick);
      track.classList.remove("is-scrolling-career");
    };

    const onScroll = () => {
      const scrollY = getScrollY();
      if (Math.abs(scrollY - lastScrollY) >= METRICS_JUMP_PX) {
        remeasureMetrics();
      }
      lastScrollY = scrollY;
    };

    const onResize = () => {
      remeasureMetrics();
      syncFromScroll();
    };

    track.dataset.activeStep = "0";
    updateConnectorLine(snake, 0);
    dispatchCareerStep(0);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          enableTicker();
        } else {
          disableTicker();
        }
      },
      { root: null, rootMargin: "160px 0px 160px 0px", threshold: 0 },
    );

    observer.observe(track);
    enableTicker();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    removeDesktopScroll = () => {
      observer.disconnect();
      disableTicker();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      track.style.removeProperty("--career-path-length");
      track.style.removeProperty("--career-draw-to");
      track.style.removeProperty("--career-scroll-progress");
      path.style.removeProperty("stroke-dasharray");
      path.style.removeProperty("stroke-dashoffset");
      path.style.removeProperty("opacity");
      delete track.dataset.activeStep;
      pinWrap.classList.remove("is-pinned");
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
