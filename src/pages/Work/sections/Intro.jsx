import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import "./Intro.css";

function Intro() {
  const scope = useSectionReveal();

  return (
    <section className="work-intro container" ref={scope}>
      <SplitLines as="h1">SELECTED WORK</SplitLines>
      <p className="mono-label reveal-fade">3 projects</p>
    </section>
  );
}

export default Intro;
