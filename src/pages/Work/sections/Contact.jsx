import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import "./Contact.css";

function Contact() {
  const scope = useSectionReveal();

  return (
    <section id="contact" className="contact" ref={scope}>
      <div className="contact__asset-placeholder">
        <span className="mono-label">knot animation</span>
      </div>

      <div className="contact__content container">
        <SplitLines as="h2" className="contact__heading">
          LET&rsquo;S TALK
        </SplitLines>
        <a
          href="mailto:[TODO: email]"
          className="contact__email reveal-fade"
        >
          [TODO: email]
        </a>
        <a href="/resume.pdf" className="contact__resume-button reveal-fade">
          Download resume
        </a>
      </div>
    </section>
  );
}

export default Contact;
