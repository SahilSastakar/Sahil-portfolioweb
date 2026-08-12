import AssetPlaceholder from "../../../components/AssetPlaceholder/AssetPlaceholder.jsx";
import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import "./About.css";

function About() {
  const scope = useSectionReveal();

  return (
    <section id="about" className="about container" ref={scope}>
      <div className="about__asset reveal-fade">
        <AssetPlaceholder path="/assets/about/frame_001.webp" ratio="4/5" />
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
