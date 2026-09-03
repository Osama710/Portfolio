"use client";

import type Lenis from "lenis";

const SCROLL_READY_EVENT = "portfolio:scroll-ready";

let lenisRef: Lenis | null = null;
let scrollReady = false;
let preservationInstalled = false;

export function bindLenis(lenis: Lenis | null) {
  lenisRef = lenis;
}

export function isScrollReady() {
  return scrollReady;
}

export function resetScrollReady() {
  scrollReady = false;
}

export function notifyScrollReady() {
  scrollReady = true;
  window.dispatchEvent(new Event(SCROLL_READY_EVENT));
}

export function onScrollReady(fn: () => void) {
  if (scrollReady) {
    fn();
    return;
  }
  window.addEventListener(SCROLL_READY_EVENT, fn, { once: true });
}

export function getScrollY() {
  if (lenisRef) return lenisRef.scroll;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

export function restoreScrollY(y: number) {
  if (lenisRef) {
    lenisRef.scrollTo(y, { immediate: true });
    return;
  }
  if (Math.abs(getScrollY() - y) > 2) {
    window.scrollTo({ top: y, left: 0, behavior: "instant" });
  }
}

export function installScrollPreservation() {
  if (preservationInstalled || typeof window === "undefined") return;
  preservationInstalled = true;
}

/** Run GSAP layout work without losing the user's scroll position. */
export function withScrollPreserved(fn: () => void) {
  const y = getScrollY();
  fn();
  restoreScrollY(y);
}
