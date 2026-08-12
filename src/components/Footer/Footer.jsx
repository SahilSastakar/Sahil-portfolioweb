import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__col">
          <p className="footer__name">Sahil Sastakar</p>
          <p className="mono-label">[TODO: one-line tagline]</p>
        </div>

        <div className="footer__col">
          <p className="mono-label footer__heading">Socials</p>
          <ul className="footer__list">
            <li>
              <a href="[TODO: linkedin url]" className="mono-label">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="[TODO: github url]" className="mono-label">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <p className="mono-label footer__heading">Contact</p>
          <a href="mailto:[TODO: email]" className="mono-label">
            [TODO: email]
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
