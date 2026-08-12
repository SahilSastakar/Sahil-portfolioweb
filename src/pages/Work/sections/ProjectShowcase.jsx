import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../../lib/gsap.js";
import { scrollLengthPx } from "../../../lib/scrollLength.js";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion.js";
import { useIsMobile } from "../../../hooks/useIsMobile.js";
import ThreadCanvas from "./thread/ThreadCanvas.jsx";
import Station from "./thread/Station.jsx";
import StackedStations from "./thread/StackedStations.jsx";
import { THREAD_CONFIG } from "./thread/threadConfig.js";
import "./ProjectShowcase.css";

const PIN_LENGTH = `${THREAD_CONFIG.pinVh}%`;

function PinnedThread() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(0);
  const stationRefs = useRef([]);
  const lastTickedRef = useRef(null);

  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${scrollLengthPx(PIN_LENGTH)}`,
        pin: stageRef.current,
        scrub: 0.4,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      function renderTick() {
        const progress = progressRef.current;
        if (progress === lastTickedRef.current) return;
        stationRefs.current.forEach((station) => station?.update(progress));
        lastTickedRef.current = progress;
      }
      gsap.ticker.add(renderTick);

      return () => {
        gsap.ticker.remove(renderTick);
        st.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section className="thread" ref={sectionRef}>
      <div className="thread__stage" ref={stageRef}>
        <ThreadCanvas progressRef={progressRef} />
        {THREAD_CONFIG.stations.map((station, i) => (
          <Station
            key={station.key}
            station={station}
            ref={(el) => {
              stationRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectShowcase() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  if (reducedMotion) return <StackedStations useVideo={false} />;
  if (isMobile) return <StackedStations useVideo />;
  return <PinnedThread />;
}

export default ProjectShowcase;
