import { useEffect, useState } from "react";
import TransitionLink from "../TransitionLink/TransitionLink.jsx";
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
        <TransitionLink to="/" className="nav__logo">
          SS
        </TransitionLink>
        <nav className="nav__links">
          <TransitionLink to="/#about" className="mono-label nav__link">
            About
          </TransitionLink>
          <TransitionLink to="/work" className="mono-label nav__link">
            Work
          </TransitionLink>
          <TransitionLink to="/work#contact" className="mono-label nav__link">
            Contact
          </TransitionLink>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
