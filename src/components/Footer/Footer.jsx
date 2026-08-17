import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__col">
          <p className="footer__name">Sahil Sastakar</p>
          <p className="mono-label">AI &amp; Data Science, Melbourne</p>
        </div>

        <div className="footer__col">
          <p className="mono-label footer__heading">Socials</p>
          <ul className="footer__list">
            <li>
              <a
                href="https://www.linkedin.com/in/sahil-sastakar-653268178/"
                target="_blank"
                rel="noreferrer"
                className="mono-label"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/sahilsastakar"
                target="_blank"
                rel="noreferrer"
                className="mono-label"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <p className="mono-label footer__heading">Contact</p>
          <a href="mailto:sastakar.sahil@gmail.com" className="mono-label">
            sastakar.sahil@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
