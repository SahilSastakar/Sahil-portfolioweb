import { useMarquee } from "../../../hooks/useMarquee.js";
import "./Skills.css";

const ROW_1 = ["Python", "SQL", "Power BI", "Tableau", "Azure", "PyTorch"];
const ROW_2 = [
  "Pandas",
  "Scikit-learn",
  "n8n",
  "Git",
  "Docker",
  "TensorFlow",
  "FastAPI",
  "Supabase",
];

function MarqueeRow({ items, direction }) {
  const scope = useMarquee({ direction, duration: 40 });
  // Duplicated so the track is exactly 2x one set's width - see useMarquee.
  const doubled = [...items, ...items];

  return (
    <div className="skills__row">
      <div className="skills__track" ref={scope}>
        {doubled.map((item, i) => (
          <span className="skills__item" key={i}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section className="skills">
      <MarqueeRow items={ROW_1} direction="left" />
      <MarqueeRow items={ROW_2} direction="right" />
    </section>
  );
}

export default Skills;
