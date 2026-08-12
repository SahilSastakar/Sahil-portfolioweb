import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

// The ".experience__line" scales down from full to zero height as the
// timeline scrolls through view (scrubbed to scroll position), and each
// ".experience__entry" fades/slides in as the line's progress reaches it.
export function useTimelineScrub() {
  const scope = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const line = scope.current?.querySelector(".experience__line");
      const entries = gsap.utils.toArray(".experience__entry", scope.current);

      if (reducedMotion) {
        if (line) gsap.set(line, { scaleY: 1 });
        gsap.set(entries, { opacity: 1, y: 0 });
        return;
      }

      if (line) {
        gsap.set(line, { scaleY: 0, transformOrigin: "top" });
        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 80%",
            end: "bottom 70%",
            scrub: true,
          },
        });
      }

      gsap.set(entries, { opacity: 0, y: 24 });
      entries.forEach((entry) => {
        gsap.to(entry, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 82%",
            once: true,
          },
        });
      });
    },
    { scope, dependencies: [reducedMotion] },
  );

  return scope;
}
