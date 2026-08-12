import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import "./ProjectShowcase.css";

const PROJECTS = [
  {
    number: "01",
    title: "OutbackShare",
    emblem: "/assets/emblems/outbackshare.mp4",
    description:
      "Food relief coordination platform pairing an image classifier with demand forecasting for high-need postcodes.",
    tags: ["Computer Vision", "Forecasting", "PostgreSQL", "SHAP"],
    outcome: "84.5% top-1 validation accuracy across 101k images",
    url: "[TODO: url]",
  },
  {
    number: "02",
    title: "Intelliharvest",
    emblem: "/assets/emblems/intelliharvest.mp4",
    description:
      "AI-driven crop optimisation combining sensor, weather, and microbial data to guide agricultural decisions.",
    tags: ["Generative AI", "Sensor Fusion", "Python"],
    outcome: "Exceeded traditional benchmarks across all evaluation metrics",
    url: "[TODO: url]",
  },
  {
    number: "03",
    title: "RankMax",
    emblem: "/assets/emblems/rankmax.mp4",
    description:
      "Generative AI platform turning textbook content into gamified quizzes, pitched to a Shark-Tank-style investor panel.",
    tags: ["LLM Pipelines", "Prompt Engineering", "Gamification"],
    outcome: "85%+ content accuracy, ~3x student engagement uplift",
    url: "[TODO: url]",
  },
];

function Project({ project, reversed }) {
  const scope = useSectionReveal();

  return (
    <section
      className={`project ${reversed ? "project--reversed" : ""}`}
      ref={scope}
    >
      <div className="project__inner container">
        <div className="project__emblem reveal-fade">
          <div className="project__emblem-mask">
            <span className="mono-label">{project.emblem}</span>
          </div>
        </div>

        <div className="project__info">
          <span className="project__number reveal-fade">
            {project.number}
          </span>
          <SplitLines as="h3" className="project__title">
            {project.title}
          </SplitLines>
          <p className="project__description reveal-fade">
            {project.description}
          </p>

          <ul className="project__tags reveal-fade">
            {project.tags.map((tag, i) => (
              <li key={i} className="mono-label project__tag">
                {tag}
              </li>
            ))}
          </ul>

          <p className="mono-label project__outcome reveal-fade">
            {project.outcome}
          </p>

          <a href={project.url} className="project__link reveal-fade">
            View project →
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase() {
  return (
    <div className="project-showcase">
      {PROJECTS.map((project, index) => (
        <Project
          key={project.number}
          project={project}
          reversed={index % 2 === 1}
        />
      ))}
    </div>
  );
}

export default ProjectShowcase;
