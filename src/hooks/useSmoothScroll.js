import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap.js";
import { setLenisInstance } from "../lib/lenis.js";
import { scrollToHash } from "../lib/scrollToHash.js";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

// Standard Lenis + ScrollTrigger integration: Lenis drives scroll, GSAP's
// ticker drives Lenis's raf loop so both stay on the same frame clock.
export function useSmoothScroll() {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({ autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    setLenisInstance(lenis);

    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [reducedMotion]);

  // New route content changes document height / trigger positions (most
  // of all, a section pinned for several screens' worth of scroll) - let
  // everything settle, have ScrollTrigger re-measure, then scroll to the
  // URL's hash target if it has one. Depends on the hash too, not just
  // pathname, so clicking a hash link while already on that page (e.g.
  // Work -> Work#contact) still scrolls - the pathname alone wouldn't
  // change there.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      requestAnimationFrame(() => scrollToHash(location.hash));
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname, location.hash]);
}
