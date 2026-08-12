import "./WhatIDo.css";

const ROWS = [
  {
    number: "01",
    title: "Data Analytics & BI",
    description: "[TODO: one-line description]",
  },
  {
    number: "02",
    title: "Machine Learning & NLP",
    description: "[TODO: one-line description]",
  },
  {
    number: "03",
    title: "AI Automation & Agents",
    description: "[TODO: one-line description]",
  },
  {
    number: "04",
    title: "MLOps & Cloud",
    description: "[TODO: one-line description]",
  },
];

function WhatIDo() {
  return (
    <section className="what-i-do">
      <div className="what-i-do__list">
        {ROWS.map((row) => (
          <div className="what-i-do__row" key={row.number}>
            <div className="what-i-do__row-inner container">
              <span className="what-i-do__number mono-label">
                {row.number}
              </span>
              <h3 className="what-i-do__title">{row.title}</h3>
              <p className="what-i-do__description">{row.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatIDo;
