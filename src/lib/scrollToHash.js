import { getLenisInstance } from "./lenis.js";

const NAV_OFFSET = -84; // fixed nav height, so the target isn't hidden under it

// Scrolls to the element matching a "#id" hash. Instant, not animated -
// this only ever runs either behind the page-transition overlay (already
// covering the screen) or on initial load, so an animated scroll would
// just be invisible motion, not a feature.
export function scrollToHash(hash) {
  if (!hash) return;
  const el = document.querySelector(hash);
  if (!el) return;

  const lenis = getLenisInstance();
  if (lenis) {
    // Lenis caches its own max-scroll "limit" and only recalculates it via
    // its internal ResizeObserver, which is async - on a route change that
    // swaps in a much taller page (e.g. Home's ~2500px -> Work's ~7000px+
    // with the Thread's pin), that observer may not have fired yet, so
    // scrollTo silently clamps to the old, shorter limit. Forcing a resize
    // first guarantees it's targeting the current layout.
    lenis.resize();
    lenis.scrollTo(el, { offset: NAV_OFFSET, immediate: true });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
    window.scrollTo({ top, behavior: "auto" });
  }
}
