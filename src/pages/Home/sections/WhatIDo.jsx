import { useCountUpRows } from "../../../hooks/useCountUpRows.js";
import "./WhatIDo.css";

const ROWS = [
  {
    number: "01",
    title: "Data Analytics & BI",
    description:
      "Turning messy data into dashboards and decisions with SQL, Power BI, and Tableau.",
  },
  {
    number: "02",
    title: "Machine Learning & NLP",
    description:
      "Training and deploying models, from ConvNeXt image classifiers to LLM-based content pipelines.",
  },
  {
    number: "03",
    title: "AI Automation & Agents",
    description:
      "Designing agentic workflows with n8n, MCP servers, and LLM APIs that run themselves.",
  },
  {
    number: "04",
    title: "MLOps & Cloud",
    description:
      "Shipping ML pipelines on Azure and Docker with SHAP-backed explainability and governance.",
  },
];

function WhatIDo() {
  const scope = useCountUpRows();

  return (
    <section className="what-i-do" ref={scope}>
      <div className="what-i-do__list">
        {ROWS.map((row) => (
          <div
            className="what-i-do__row"
            key={row.number}
            data-number={row.number}
          >
            <div className="what-i-do__row-inner container">
              <span className="what-i-do__number mono-label">00</span>
              <h3 className="what-i-do__title">{row.title}</h3>
              <p className="what-i-do__description">{row.description}</p>
            </div>
            <span className="what-i-do__border" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatIDo;
