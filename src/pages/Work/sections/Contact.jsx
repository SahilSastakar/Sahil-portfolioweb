import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import "./Contact.css";

const CONTACT_LINKS = [
  {
    key: "linkedin",
    label: "My LinkedIn",
    href: "https://www.linkedin.com/in/sahil-sastakar-653268178/",
    avatar: "/assets/profiles/linkedin.jpg",
    variant: "linkedin",
  },
  {
    key: "gmail",
    label: "Gmail",
    href: "mailto:sastakar.sahil@gmail.com",
    avatar: "/assets/profiles/gmail.jpg",
    variant: "gmail",
  },
  {
    key: "github",
    label: "Git",
    href: "https://github.com/SahilSastakar",
    avatar: "/assets/profiles/github.jpg",
    variant: "github",
  },
];

function handleAvatarError(e) {
  e.currentTarget.style.display = "none";
}

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

        <div className="contact-cards reveal-fade">
          {CONTACT_LINKS.map((link) => {
            const external = link.key !== "gmail";
            return (
              <a
                key={link.key}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className={`contact-card contact-card--${link.variant}`}
              >
                <span className="contact-card__avatar">
                  <span className="contact-card__avatar-fallback">SS</span>
                  <img
                    src={link.avatar}
                    alt=""
                    onError={handleAvatarError}
                  />
                </span>
                <span className="contact-card__label">{link.label}</span>
              </a>
            );
          })}
        </div>

        <a href="/resume.pdf" className="contact__resume-button reveal-fade">
          Download resume
        </a>
      </div>
    </section>
  );
}

export default Contact;
