import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import { THREAD_CONFIG } from "./thread/threadConfig.js";
import "./Intro.css";

function Intro() {
  const scope = useSectionReveal();
  const count = THREAD_CONFIG.stations.length;

  return (
    <section className="work-intro container" ref={scope}>
      <SplitLines as="h1">SELECTED WORK</SplitLines>
      <p className="mono-label reveal-fade">{count} projects</p>
    </section>
  );
}

export default Intro;
