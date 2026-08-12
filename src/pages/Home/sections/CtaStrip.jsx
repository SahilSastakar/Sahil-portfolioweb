import TransitionLink from "../../../components/TransitionLink/TransitionLink.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import "./CtaStrip.css";

function CtaStrip() {
  const scope = useSectionReveal();

  return (
    <section className="cta-strip container" ref={scope}>
      <TransitionLink to="/work" className="cta-strip__link reveal-fade">
        See the work <span className="cta-strip__arrow">→</span>
      </TransitionLink>
    </section>
  );
}

export default CtaStrip;
