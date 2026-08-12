import "./Experience.css";

const ENTRIES = [
  {
    role: "[TODO: role]",
    org: "[TODO: org]",
    dates: "[TODO: dates]",
    description: "[TODO: one line]",
  },
  {
    role: "[TODO: role]",
    org: "[TODO: org]",
    dates: "[TODO: dates]",
    description: "[TODO: one line]",
  },
  {
    role: "[TODO: role]",
    org: "[TODO: org]",
    dates: "[TODO: dates]",
    description: "[TODO: one line]",
  },
  {
    role: "[TODO: role]",
    org: "[TODO: org]",
    dates: "[TODO: dates]",
    description: "[TODO: one line]",
  },
];

function Experience() {
  return (
    <section className="experience container">
      <h2 className="mono-label experience__label">Experience</h2>

      <div className="experience__timeline">
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
