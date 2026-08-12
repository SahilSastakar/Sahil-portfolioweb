import { Link } from "react-router-dom";
import "./CtaStrip.css";

function CtaStrip() {
  return (
    <section className="cta-strip container">
      <Link to="/work" className="cta-strip__link">
        See the work <span className="cta-strip__arrow">→</span>
      </Link>
    </section>
  );
}

export default CtaStrip;
