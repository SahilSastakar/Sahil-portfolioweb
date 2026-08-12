import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

// Infinite horizontal loop for a track whose content is duplicated once
// (so the track is exactly 2x the width of one set) - translating by 50%
// of the track's own width moves exactly one set over, which loops
// seamlessly. Pauses on hover.
export function useMarquee({ direction = "left", duration = 40 } = {}) {
  const scope = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return undefined;

      const track = scope.current;
      const row = track?.parentElement;
      if (!track || !row) return undefined;

      const from = direction === "left" ? 0 : -50;
      const to = direction === "left" ? -50 : 0;

      const tween = gsap.fromTo(
        track,
        { xPercent: from },
        { xPercent: to, duration, ease: "none", repeat: -1 },
      );

      const pause = () => tween.pause();
      const resume = () => tween.play();
      row.addEventListener("mouseenter", pause);
      row.addEventListener("mouseleave", resume);

      return () => {
        row.removeEventListener("mouseenter", pause);
        row.removeEventListener("mouseleave", resume);
      };
    },
    { scope, dependencies: [reducedMotion, direction, duration] },
  );

  return scope;
}
