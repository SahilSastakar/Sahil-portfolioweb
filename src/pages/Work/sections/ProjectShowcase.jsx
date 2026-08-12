import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import "./ProjectShowcase.css";

const PROJECTS = [
  {
    number: "01",
    title: "OutbackShare",
    emblem: "/assets/emblems/outbackshare.mp4",
    description: "[TODO: one-line description]",
    tags: ["[TODO]", "[TODO]", "[TODO]"],
    outcome: "[TODO: outcome line]",
    url: "[TODO: url]",
  },
  {
    number: "02",
    title: "Intelliharvest",
    emblem: "/assets/emblems/intelliharvest.mp4",
    description: "[TODO: one-line description]",
    tags: ["[TODO]", "[TODO]", "[TODO]"],
    outcome: "[TODO: outcome line]",
    url: "[TODO: url]",
  },
  {
    number: "03",
    title: "RankMax",
    emblem: "/assets/emblems/rankmax.mp4",
    description: "[TODO: one-line description]",
    tags: ["[TODO]", "[TODO]", "[TODO]"],
    outcome: "[TODO: outcome line]",
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
