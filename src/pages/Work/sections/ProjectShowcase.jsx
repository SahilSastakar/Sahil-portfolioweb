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

function ProjectShowcase() {
  return (
    <div className="project-showcase">
      {PROJECTS.map((project, index) => (
        <section
          key={project.number}
          className={`project ${index % 2 === 1 ? "project--reversed" : ""}`}
        >
          <div className="project__inner container">
            <div className="project__emblem">
              <div className="project__emblem-mask">
                <span className="mono-label">{project.emblem}</span>
              </div>
            </div>

            <div className="project__info">
              <span className="project__number">{project.number}</span>
              <h3 className="project__title">{project.title}</h3>
              <p className="project__description">{project.description}</p>

              <ul className="project__tags">
                {project.tags.map((tag, i) => (
                  <li key={i} className="mono-label project__tag">
                    {tag}
                  </li>
                ))}
              </ul>

              <p className="mono-label project__outcome">{project.outcome}</p>

              <a href={project.url} className="project__link">
                View project →
              </a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProjectShowcase;
