import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap.js";
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

    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reducedMotion]);

  // New route content changes document height / trigger positions - let
  // everything settle, then have ScrollTrigger re-measure.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);
}
