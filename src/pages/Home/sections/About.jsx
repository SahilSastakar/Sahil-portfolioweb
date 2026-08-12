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
          I'm a Master of Artificial Intelligence candidate at Monash
          University, building end-to-end ML systems from data pipeline to
          deployment. My work spans computer vision, LLM pipelines, and
          agentic automation, with production experience at La Trobe's
          Centre for Technology Infusion and Foxberry Technologies. Outside
          coursework, I've founded and led AI ventures like RankMax.AI and
          Intelli-harvest from first pitch through to delivery.
        </p>
      </div>
    </section>
  );
}

export default About;
