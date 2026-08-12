import AssetPlaceholder from "../../../components/AssetPlaceholder/AssetPlaceholder.jsx";
import "./About.css";

function About() {
  return (
    <section id="about" className="about container">
      <div className="about__asset">
        <AssetPlaceholder path="/assets/about/frame_001.webp" ratio="4/5" />
      </div>

      <div className="about__content">
        <h2 className="mono-label about__label">About</h2>
        <p className="about__body">
          [TODO: 3 short sentences about who I am]
        </p>
      </div>
    </section>
  );
}

export default About;
