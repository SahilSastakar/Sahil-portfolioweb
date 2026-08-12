import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const SCROLL_THRESHOLD = 100;

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__logo">
          SS
        </Link>
        <nav className="nav__links">
          <Link to="/#about" className="mono-label nav__link">
            About
          </Link>
          <Link to="/work" className="mono-label nav__link">
            Work
          </Link>
          <Link to="/work#contact" className="mono-label nav__link">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
