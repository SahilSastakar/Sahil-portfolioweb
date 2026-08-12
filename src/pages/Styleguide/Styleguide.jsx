import "./Styleguide.css";

const COLORS = [
  { name: "--bg-base", value: "#0a0a0c" },
  { name: "--bg-raised", value: "#121216" },
  { name: "--accent", value: "#00e5ff" },
  { name: "--accent-dim", value: "#0891b2" },
  { name: "--text-primary", value: "#f4f4f5" },
  { name: "--text-muted", value: "#71717a" },
  { name: "--border-muted", value: "#26262b" },
];

const TYPE_SIZES = [12, 14, 17, 20, 28, 40, 64, 96];

function Styleguide() {
  return (
    <div className="container styleguide">
      <p className="mono-label">Dev only — /styleguide</p>
      <h1>Style Guide</h1>

      <section className="styleguide__section">
        <h2>Color tokens</h2>
        <div className="styleguide__swatches">
          {COLORS.map((c) => (
            <div className="swatch" key={c.name}>
              <div
                className="swatch__chip"
                style={{ background: c.value, border: "1px solid var(--border-muted)" }}
              />
              <p className="mono-label">{c.name}</p>
              <p className="mono-label">{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="styleguide__section">
        <h2>Space Grotesk</h2>
        {TYPE_SIZES.map((size) => (
          <p
            key={size}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: `${size}px`,
              letterSpacing: "-0.03em",
              marginBlockEnd: "0.5rem",
            }}
          >
            {size}px — Space Grotesk
          </p>
        ))}
      </section>

      <section className="styleguide__section">
        <h2>JetBrains Mono</h2>
        {TYPE_SIZES.map((size) => (
          <p
            key={size}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: `${size}px`,
              marginBlockEnd: "0.5rem",
            }}
          >
            {size}px — JetBrains Mono
          </p>
        ))}
      </section>

      <section className="styleguide__section">
        <h2>Utility classes</h2>

        <p className="mono-label styleguide__note">.mono-label</p>
        <p className="mono-label">The quick brown fox jumps over the lazy dog</p>

        <p className="mono-label styleguide__note">.container (this section)</p>

        <p className="mono-label styleguide__note">h1 heading scale</p>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>Display heading</h1>

        <p className="mono-label styleguide__note">body copy, max-width 65ch</p>
        <p>
          [TODO: sample body copy] Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Body text is set at 17px with a max measure of 65
          characters for readability.
        </p>
      </section>
    </div>
  );
}

export default Styleguide;
