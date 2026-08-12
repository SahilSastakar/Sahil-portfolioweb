import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

// Each ".what-i-do__row" (with a data-number="01" attribute) counts its
// number up from 00 and draws its accent border in from the left the
// first time it enters the viewport.
export function useCountUpRows() {
  const scope = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const rows = gsap.utils.toArray(".what-i-do__row", scope.current);

      rows.forEach((row) => {
        const numberEl = row.querySelector(".what-i-do__number");
        const borderEl = row.querySelector(".what-i-do__border");
        const target = parseInt(row.dataset.number, 10);

        if (reducedMotion) {
          if (numberEl) numberEl.textContent = row.dataset.number;
          if (borderEl) gsap.set(borderEl, { scaleX: 1 });
          return;
        }

        if (numberEl) numberEl.textContent = "00";
        if (borderEl) gsap.set(borderEl, { scaleX: 0 });

        const counter = { value: 0 };

        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            once: true,
          },
        })
          .to(
            counter,
            {
              value: target,
              duration: 0.9,
              ease: "power2.out",
              onUpdate: () => {
                if (numberEl) {
                  numberEl.textContent = String(
                    Math.round(counter.value),
                  ).padStart(2, "0");
                }
              },
            },
            0,
          )
          .to(borderEl, { scaleX: 1, duration: 0.9, ease: "power3.out" }, 0);
      });
    },
    { scope, dependencies: [reducedMotion] },
  );

  return scope;
}
