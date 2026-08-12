import "./Skills.css";

const ROW_1 = ["Python", "SQL", "Power BI", "Tableau", "Azure", "PyTorch"];
const ROW_2 = [
  "Pandas",
  "Scikit-learn",
  "n8n",
  "Git",
  "Docker",
  "[TODO: more]",
];

function MarqueeRow({ items }) {
  return (
    <div className="skills__row">
      <div className="skills__track">
        {items.map((item, i) => (
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
      <MarqueeRow items={ROW_1} />
      <MarqueeRow items={ROW_2} />
    </section>
  );
}

export default Skills;
