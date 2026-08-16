import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { gsap } from "../../../../lib/gsap.js";
import SplitLines from "../../../../components/SplitLines/SplitLines.jsx";
import StationFrames from "./StationFrames.jsx";
import { THREAD_CONFIG } from "./threadConfig.js";

// 0 outside the range, ramps 0->1 across [fadeInStart, plateauStart], holds
// 1 across the plateau, ramps 1->0 across [plateauEnd, fadeOutEnd].
function stationVisibility(progress, [fadeInStart, plateauStart, plateauEnd, fadeOutEnd]) {
  if (progress <= fadeInStart || progress >= fadeOutEnd) return 0;
  if (progress < plateauStart) {
    return (progress - fadeInStart) / (plateauStart - fadeInStart);
  }
  if (progress <= plateauEnd) return 1;
  return 1 - (progress - plateauEnd) / (fadeOutEnd - plateauEnd);
}

function handleLogoError(e) {
  e.currentTarget.closest(".thread-station__logo-badge").style.display = "none";
}

const Station = forwardRef(function Station({ station }, forwardedRef) {
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const cardRef = useRef(null);
  const framesRef = useRef(null);

  // Exposes an update(progress) the parent's single rAF tick calls - avoids
  // each station running its own ticker/ScrollTrigger for the same value.
  useImperativeHandle(forwardedRef, () => ({
    update(progress) {
      const visibility = stationVisibility(progress, station.range);

      if (bgRef.current) {
        gsap.set(bgRef.current, { opacity: visibility });
      }
      if (cardRef.current) {
        gsap.set(cardRef.current, { opacity: visibility });
        const lines = cardRef.current.querySelectorAll(".split-line__inner");
        if (lines.length) {
          gsap.set(lines, { yPercent: (1 - visibility) * 110 });
        }
      }
      if (rootRef.current) {
        rootRef.current.style.pointerEvents = visibility > 0.05 ? "auto" : "none";
        rootRef.current.setAttribute("aria-hidden", visibility <= 0.05 ? "true" : "false");
      }

      // Frame index is scrubbed by scroll position across the station's
      // whole visible window (fade-in through fade-out) - not a real-time
      // playing clip, so it only moves when the user scrolls.
      const [fadeInStart, , , fadeOutEnd] = station.range;
      const localProgress = (progress - fadeInStart) / (fadeOutEnd - fadeInStart);
      framesRef.current?.setProgress(Math.min(1, Math.max(0, localProgress)));
    },
  }));

  useEffect(() => {
    gsap.set(bgRef.current, { opacity: 0 });
    gsap.set(cardRef.current, { opacity: 0 });
  }, []);

  return (
    <div ref={rootRef} className="thread-station">
      <div className="thread-station__bg" ref={bgRef}>
        <StationFrames
          ref={framesRef}
          framePath={station.framePath}
          frameCount={station.frameCount}
          poster={station.poster}
          className="thread-station__frames"
        />
      </div>

      <div className={`thread-station__card-slot thread-station__card-slot--${station.side}`}>
        <div
          className={`thread-station__card ${station.sections ? "thread-station__card--wide" : ""}`}
          ref={cardRef}
          style={{
            background: THREAD_CONFIG.glass.tint,
            backdropFilter: `blur(${THREAD_CONFIG.glass.blur}px) saturate(${THREAD_CONFIG.glass.saturate})`,
            WebkitBackdropFilter: `blur(${THREAD_CONFIG.glass.blur}px) saturate(${THREAD_CONFIG.glass.saturate})`,
          }}
        >
          {station.logo && (
            <div className="thread-station__logo-badge">
              <img src={station.logo} alt="" onError={handleLogoError} />
            </div>
          )}

          <span className="thread-station__number">{station.number}</span>
          <SplitLines as="h3" className="thread-station__title">
            {station.title}
          </SplitLines>
          {station.role && (
            <p className="mono-label thread-station__role">{station.role}</p>
          )}

          {station.sections ? (
            station.sections.map((section) => (
              <div className="thread-station__section" key={section.label}>
                <p className="mono-label thread-station__section-label">
                  {section.label}
                </p>
                <p className="thread-station__description">{section.body}</p>
              </div>
            ))
          ) : (
            <p className="thread-station__description">{station.description}</p>
          )}

          <ul className="thread-station__tags">
            {station.tags.map((tag) => (
              <li key={tag} className="mono-label thread-station__tag">
                {tag}
              </li>
            ))}
          </ul>

          <p className="mono-label thread-station__outcome">{station.outcome}</p>
        </div>
      </div>
    </div>
  );
});

export default Station;
