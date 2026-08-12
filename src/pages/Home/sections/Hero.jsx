import AssetPlaceholder from "../../../components/AssetPlaceholder/AssetPlaceholder.jsx";
import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import "./Hero.css";

function Hero() {
  const scope = useSectionReveal();

  return (
    <section className="hero" ref={scope}>
      <div className="hero__stage">
        <AssetPlaceholder
          path="/assets/hero/frame_001.webp"
          ratio="16/9"
          className="hero__asset"
        />
      </div>

      <div className="hero__content container">
        <SplitLines as="h1" className="hero__heading">
          SAHIL SASTAKAR
        </SplitLines>
        <p className="mono-label reveal-fade">
          [TODO: role line, e.g. Data & AI Graduate, Monash University]
        </p>
      </div>

      <div className="hero__scroll-hint">
        <span className="mono-label">Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}

export default Hero;
