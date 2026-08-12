import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import ScrubSequence from "../../../components/ScrubSequence/ScrubSequence.jsx";
import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { gsap } from "../../../lib/gsap.js";
import { scrollLengthPx } from "../../../lib/scrollLength.js";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion.js";
import "./Hero.css";

const FRAME_COUNT = 192;
const SCROLL_LENGTH = "150%";

function Hero({ onPinEnd }) {
  const scope = useSectionReveal();
  const scrubRef = useRef(null);
  const contentRef = useRef(null);
  const scrollHintRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  // Two more scrubs sharing ScrubSequence's own pinned trigger element,
  // each scoped to a different sub-window of the same pin duration -
  // GSAP keeps independent ScrollTriggers on one trigger in lockstep
  // automatically, no need to share a single instance.
  useGSAP(
    () => {
      if (reducedMotion) return;

      const trigger = scrubRef.current?.el;
      if (!trigger) return;

      const totalPx = () => scrollLengthPx(SCROLL_LENGTH);

      // Scroll hint: only useful before the user has started scrolling.
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: () => `top+=${totalPx() * 0.12} top`,
          scrub: true,
        },
      });

      // Heading + role line: fades and drifts up during the final 30%.
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: () => `top+=${totalPx() * 0.7} top`,
          end: () => `top+=${totalPx()} top`,
          scrub: true,
        },
      });
    },
    { dependencies: [reducedMotion] },
  );

  return (
    <section className="hero" ref={scope}>
      <ScrubSequence
        ref={scrubRef}
        framePath="/assets/hero/frame_%03d.webp"
        frameCount={FRAME_COUNT}
        pinned
        scrollLength={SCROLL_LENGTH}
        onLeave={onPinEnd}
        className="hero__scrub"
      >
        <div className="hero__content container" ref={contentRef}>
          <SplitLines as="h1" className="hero__heading">
            SAHIL SASTAKAR
          </SplitLines>
          <p className="mono-label reveal-fade">
            Master of AI Candidate, Monash University
          </p>
        </div>

        <div className="hero__scroll-hint" ref={scrollHintRef}>
          <span className="mono-label">Scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </ScrubSequence>
    </section>
  );
}

export default Hero;
