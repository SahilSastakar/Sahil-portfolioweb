import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

// Reveals a section's heading (SplitLines' .split-line__inner spans) with
// a staggered upward wipe, and any .reveal-fade children with a fade-up,
// as the section crosses 75% of the viewport.
export function useSectionReveal() {
  const scope = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const lines = gsap.utils.toArray(".split-line__inner", scope.current);
      const fades = gsap.utils.toArray(".reveal-fade", scope.current);

      if (reducedMotion) {
        if (lines.length) gsap.set(lines, { yPercent: 0 });
        if (fades.length) gsap.set(fades, { y: 0, opacity: 1 });
        return;
      }

      if (!lines.length && !fades.length) return;

      if (lines.length) gsap.set(lines, { yPercent: 110 });
      if (fades.length) gsap.set(fades, { y: 24, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top 75%",
          once: true,
        },
      });

      if (lines.length) {
        tl.to(lines, {
          yPercent: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        });
      }
      if (fades.length) {
        tl.to(
          fades,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          },
          lines.length ? "-=0.5" : 0,
        );
      }
    },
    { scope, dependencies: [reducedMotion] },
  );

  return scope;
}
