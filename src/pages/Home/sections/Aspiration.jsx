import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import "./Aspiration.css";

function Aspiration() {
  const scope = useSectionReveal();

  return (
    <section className="aspiration" ref={scope}>
      <div className="aspiration__video-placeholder">
        <span className="mono-label">/assets/particles.mp4</span>
      </div>

      <div className="aspiration__content container">
        <SplitLines as="p" className="aspiration__statement">
          [TODO: aspiration statement]
        </SplitLines>
      </div>
    </section>
  );
}

export default Aspiration;
