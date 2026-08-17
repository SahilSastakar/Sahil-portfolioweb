import SplitLines from "../../../components/SplitLines/SplitLines.jsx";
import { useSectionReveal } from "../../../hooks/useSectionReveal.js";
import { useTimelineScrub } from "../../../hooks/useTimelineScrub.js";
import "./Experience.css";

const ENTRIES = [
  {
    role: "Research Assistant — AI and Data Science",
    org: "Centre for Technology Infusion, La Trobe University",
    dates: "Dec 2025 — Present",
    description: [
      "Designed and built an end-to-end behavioural data pipeline in Python to process raw accelerometer data from 100 ewes across a 26-day pre-lambing window, detecting and classifying over 185,000 discrete idle rest bouts with day/night precision using real astronomical sunrise and sunset calculations for the farm's geographic location.",
      "Engineered a multi-sheet statistical modelling dataset quantifying rest behaviour across seven sustained-rest thresholds (≥1 to ≥30 minutes), producing both daily-resolution and weekly-summary outputs with three metrics per time period — total, daytime, and nighttime idle minutes — structured for direct import into SPSS and other statistical analysis tools.",
      "Produced a suite of visual trend analyses examining pre-lambing idle behaviour by animal category, including temporal trajectory charts, circadian heatmaps, and stacked composition plots, alongside written interpretation of SPSS output comparing resting patterns across treatment groups in the week immediately preceding parturition.",
    ],
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
            {Array.isArray(entry.description) ? (
              <ul className="experience__list">
                {entry.description.map((point) => (
                  <li className="experience__description" key={point.slice(0, 40)}>
                    {point}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="experience__description">{entry.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
