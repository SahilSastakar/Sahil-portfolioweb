import { useState } from "react";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import WhatIDo from "./sections/WhatIDo.jsx";
import Aspiration from "./sections/Aspiration.jsx";
import CtaStrip from "./sections/CtaStrip.jsx";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

function Home() {
  const reducedMotion = usePrefersReducedMotion();
  const [heroPinEnded, setHeroPinEnded] = useState(false);

  // Hero's sequence preloads immediately; About's only starts once Hero's
  // pin is scrolled past, so the two don't compete for bandwidth. With
  // reduced motion there's no pin to wait for, so About just loads now.
  const aboutShouldPreload = reducedMotion || heroPinEnded;

  return (
    <>
      <Hero onPinEnd={() => setHeroPinEnded(true)} />
      <About startPreload={aboutShouldPreload} />
      <WhatIDo />
      <Aspiration />
      <CtaStrip />
    </>
  );
}

export default Home;
