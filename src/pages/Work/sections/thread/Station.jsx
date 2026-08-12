import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { gsap } from "../../../../lib/gsap.js";
import SplitLines from "../../../../components/SplitLines/SplitLines.jsx";
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

const Station = forwardRef(function Station({ station }, forwardedRef) {
  const rootRef = useRef(null);
  const emblemRef = useRef(null);
  const infoRef = useRef(null);
  const videoRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Exposes an update(progress) the parent's single rAF tick calls - avoids
  // each station running its own ticker/ScrollTrigger for the same value.
  useImperativeHandle(forwardedRef, () => ({
    update(progress) {
      const visibility = stationVisibility(progress, station.range);
      const { scaleFrom, scaleTo } = THREAD_CONFIG.emblem;
      const scale = scaleFrom + (scaleTo - scaleFrom) * visibility;

      if (emblemRef.current) {
        gsap.set(emblemRef.current, { opacity: visibility, scale });
      }
      if (infoRef.current) {
        gsap.set(infoRef.current, { opacity: visibility });
        const lines = infoRef.current.querySelectorAll(".split-line__inner");
        if (lines.length) {
          gsap.set(lines, { yPercent: (1 - visibility) * 110 });
        }
      }
      if (rootRef.current) {
        rootRef.current.style.pointerEvents = visibility > 0.05 ? "auto" : "none";
        rootRef.current.setAttribute("aria-hidden", visibility <= 0.05 ? "true" : "false");
      }

      const [fadeInStart, , , fadeOutEnd] = station.range;
      const shouldPlay = progress > fadeInStart && progress < fadeOutEnd;
      const video = videoRef.current;
      if (video && shouldPlay !== isPlayingRef.current) {
        isPlayingRef.current = shouldPlay;
        if (shouldPlay) video.play().catch(() => {});
        else video.pause();
      }
    },
  }));

  useEffect(() => {
    gsap.set(emblemRef.current, { opacity: 0, scale: THREAD_CONFIG.emblem.scaleFrom });
    gsap.set(infoRef.current, { opacity: 0 });
  }, []);

  const reversed = station.side === "right";

  return (
    <div
      ref={rootRef}
      className={`thread-station ${reversed ? "thread-station--reversed" : ""}`}
    >
      <div className="thread-station__emblem" ref={emblemRef}>
        <div className="thread-station__emblem-mask">
          <video
            ref={videoRef}
            src={station.video}
            poster={station.poster}
            muted
            loop
            playsInline
            preload="none"
          />
        </div>
      </div>

      <div className="thread-station__info" ref={infoRef}>
        <span className="thread-station__number">{station.number}</span>
        <SplitLines as="h3" className="thread-station__title">
          {station.title}
        </SplitLines>
        <p className="thread-station__description">{station.description}</p>

        <ul className="thread-station__tags">
          {station.tags.map((tag) => (
            <li key={tag} className="mono-label thread-station__tag">
              {tag}
            </li>
          ))}
        </ul>

        <p className="mono-label thread-station__outcome">{station.outcome}</p>

        <a href={station.url} className="thread-station__link">
          View project →
        </a>
      </div>
    </div>
  );
});

export default Station;
