import AssetPlaceholder from "../../../components/AssetPlaceholder/AssetPlaceholder.jsx";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__stage">
        <AssetPlaceholder
          path="/assets/hero/frame_001.webp"
          ratio="16/9"
          className="hero__asset"
        />
      </div>

      <div className="hero__content container">
        <h1 className="hero__heading">SAHIL SASTAKAR</h1>
        <p className="mono-label">
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
