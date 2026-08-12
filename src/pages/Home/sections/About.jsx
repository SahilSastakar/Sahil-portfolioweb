import ScrubSequence from "../../../components/ScrubSequence/ScrubSequence.jsx";
import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import "./About.css";

const FRAME_COUNT = 192;

function About({ startPreload }) {
  const scope = useSectionReveal();

  return (
    <section id="about" className="about container" ref={scope}>
      <div className="about__asset reveal-fade">
        <ScrubSequence
          framePath="/assets/about/frame_%03d.webp"
          frameCount={FRAME_COUNT}
          pinned={false}
          startPreload={startPreload}
          className="about__scrub"
        />
      </div>

      <div className="about__content">
        <SplitLines as="h2" className="mono-label about__label">
          About
        </SplitLines>
        <p className="about__body reveal-fade">
          [TODO: 3 short sentences about who I am]
        </p>
      </div>
    </section>
  );
}

export default About;
