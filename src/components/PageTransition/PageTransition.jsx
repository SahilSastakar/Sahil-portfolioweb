import { createContext, useCallback, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "../../lib/gsap.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import "./PageTransition.css";

const PageTransitionContext = createContext(null);

export function usePageTransitionNav() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransitionNav must be used within a PageTransitionProvider",
    );
  }
  return ctx;
}

// Renders the full-screen accent sweep and hands descendants a
// navigateWithTransition(path) function: covers the screen (scaleX from
// the left), swaps the route underneath, then sweeps off to the right.
export function PageTransitionProvider({ children }) {
  const overlayRef = useRef(null);
  const animating = useRef(false);
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();

  const navigateWithTransition = useCallback(
    (to) => {
      if (animating.current) return;

      if (reducedMotion) {
        navigate(to);
        return;
      }

      const el = overlayRef.current;
      if (!el) {
        navigate(to);
        return;
      }

      animating.current = true;

      gsap.set(el, { visibility: "visible", scaleX: 0, transformOrigin: "left" });
      gsap
        .timeline({
          onComplete: () => {
            animating.current = false;
          },
        })
        .to(el, { scaleX: 1, duration: 0.5, ease: "power2.inOut" })
        .call(() => {
          navigate(to);
          window.scrollTo(0, 0);
        })
        .set(el, { transformOrigin: "right" })
        .to(el, { scaleX: 0, duration: 0.5, ease: "power2.inOut" })
        .set(el, { visibility: "hidden" });
    },
    [navigate, reducedMotion],
  );

  return (
    <PageTransitionContext.Provider value={navigateWithTransition}>
      {children}
      <div
        ref={overlayRef}
        className="page-transition-overlay"
        aria-hidden="true"
      />
    </PageTransitionContext.Provider>
  );
}
