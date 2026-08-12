import "./Contact.css";

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__asset-placeholder">
        <span className="mono-label">knot animation</span>
      </div>

      <div className="contact__content container">
        <h2 className="contact__heading">LET&rsquo;S TALK</h2>
        <a href="mailto:[TODO: email]" className="contact__email">
          [TODO: email]
        </a>
        <a href="/resume.pdf" className="contact__resume-button">
          Download resume
        </a>
      </div>
    </section>
  );
}

export default Contact;
