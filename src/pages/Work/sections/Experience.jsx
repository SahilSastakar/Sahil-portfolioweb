import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import { useTimelineScrub } from "../../../hooks/useTimelineScrub.js";
import "./Experience.css";

const ENTRIES = [
  {
    role: "Research Assistant — AI and Data Science",
    org: "Centre for Technology Infusion, La Trobe University",
    dates: "Dec 2025 — Present",
    description:
      "Built an end-to-end ML pipeline on Azure processing 500+ live IoT sensor streams with zero data loss.",
  },
  {
    role: "Project Lead",
    org: "Intelli-harvest, Monash DeepNeuron",
    dates: "2024",
    description:
      "Led a 5-person team building a crop optimisation tool from sensor, weather, and microbial data.",
  },
  {
    role: "Data Analyst Intern",
    org: "Foxberry Technologies",
    dates: "Jun 2022 — Sep 2023",
    description:
      "Built a tax-default classifier and BI dashboards, cutting manual reporting time by ~40%.",
  },
];

function Experience() {
  const headingScope = useSectionReveal();
  const timelineScope = useTimelineScrub();

  return (
    <section className="experience container" ref={headingScope}>
      <SplitLines as="h2" className="mono-label experience__label">
        Experience
      </SplitLines>

      <div className="experience__timeline" ref={timelineScope}>
        <div className="experience__line" />

        {ENTRIES.map((entry, i) => (
          <div className="experience__entry" key={i}>
            <div className="experience__dot" />
            <p className="mono-label experience__dates">{entry.dates}</p>
            <h3 className="experience__role">{entry.role}</h3>
            <p className="mono-label experience__org">{entry.org}</p>
            <p className="experience__description">{entry.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
