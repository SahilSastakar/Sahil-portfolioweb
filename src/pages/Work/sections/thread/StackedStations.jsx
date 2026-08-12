import SplitLines from "../../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../../hooks/useSectionReveal.js";
import { THREAD_CONFIG } from "./threadConfig.js";

function StackedStation({ station, useVideo }) {
  const scope = useSectionReveal();

  return (
    <section className="thread-stacked__station" ref={scope}>
      <div className="thread-stacked__emblem reveal-fade">
        <div className="thread-stacked__emblem-mask">
          {useVideo ? (
            <video
              src={station.video}
              poster={station.poster}
              muted
              loop
              autoPlay
              playsInline
              preload="none"
            />
          ) : (
            <img src={station.poster} alt="" />
          )}
        </div>
      </div>

      <div className="thread-stacked__info">
        <span className="thread-stacked__number reveal-fade">
          {station.number}
        </span>
        <SplitLines as="h3" className="thread-stacked__title">
          {station.title}
        </SplitLines>
        <p className="thread-stacked__description reveal-fade">
          {station.description}
        </p>

        <ul className="thread-stacked__tags reveal-fade">
          {station.tags.map((tag) => (
            <li key={tag} className="mono-label thread-stacked__tag">
              {tag}
            </li>
          ))}
        </ul>

        <p className="mono-label thread-stacked__outcome reveal-fade">
          {station.outcome}
        </p>

        <a href={station.url} className="thread-stacked__link reveal-fade">
          View project →
        </a>
      </div>
    </section>
  );
}

// Unpinned fallback for mobile (video still plays, no pin) and reduced
// motion (static posters, no pin) - simple stacked sections connected by
// a plain static line rather than the scrubbed canvas thread.
function StackedStations({ useVideo }) {
  return (
    <div className="thread-stacked">
      <div className="thread-stacked__line" aria-hidden="true" />
      {THREAD_CONFIG.stations.map((station) => (
        <StackedStation key={station.key} station={station} useVideo={useVideo} />
      ))}
    </div>
  );
}

export default StackedStations;
