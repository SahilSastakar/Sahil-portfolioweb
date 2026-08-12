// Every scroll-range constant for "the Thread" lives here so the
// choreography can be retuned without digging through component code.
export const THREAD_CONFIG = {
  // Total pinned scroll distance, in viewport-heights.
  pinVh: 400,
  // Radial-mask wrapper treatment matches the rest of the site's emblem
  // videos (transparent center fading to --bg-base at the edges).
  stations: [
    {
      key: "outbackshare",
      number: "01",
      title: "OutbackShare",
      logo: "/assets/logos/outbackshare.png",
      video: "/assets/emblems/outbackshare.mp4",
      poster: "/assets/emblems/outbackshare-poster.webp",
      description:
        "Food relief coordination platform pairing an image classifier with demand forecasting for high-need postcodes.",
      tags: ["Computer Vision", "Forecasting", "PostgreSQL", "SHAP"],
      outcome: "84.5% top-1 validation accuracy across 101k images",
      url: "[TODO: url]",
      side: "left",
      // [fadeInStart, plateauStart, plateauEnd, fadeOutEnd] as fractions of
      // overall scroll progress (0-1) through the pinned section. Adjacent
      // stations' fade windows overlap by ~0.06 (~15-20% of a station's
      // own span) so the handoff never shows an empty stage.
      range: [0.02, 0.1, 0.26, 0.36],
      // Optional scroll-scrubbed frame intro, played before this station's
      // video takes over. Only wired up if both a path and frame count are
      // set - no station currently has transition frames provided, so this
      // is inert config, not a per-station hardcoded special case.
      transitionFrames: null,
      transitionFrameCount: 0,
    },
    {
      key: "intelliharvest",
      number: "02",
      title: "Intelliharvest",
      logo: "/assets/logos/intelliharvest.png",
      video: "/assets/emblems/intelliharvest.mp4",
      poster: "/assets/emblems/intelliharvest-poster.webp",
      description:
        "AI-driven crop optimisation combining sensor, weather, and microbial data to guide agricultural decisions.",
      tags: ["Generative AI", "Sensor Fusion", "Python"],
      outcome: "Exceeded traditional benchmarks across all evaluation metrics",
      url: "[TODO: url]",
      side: "right",
      range: [0.3, 0.38, 0.54, 0.64],
      transitionFrames: null,
      transitionFrameCount: 0,
    },
    {
      key: "rankmax",
      number: "03",
      title: "RankMax",
      logo: "/assets/logos/rankmax.png",
      video: "/assets/emblems/rankmax.mp4",
      poster: "/assets/emblems/rankmax-poster.webp",
      description:
        "Generative AI platform turning textbook content into gamified quizzes, pitched to a Shark-Tank-style investor panel.",
      tags: ["LLM Pipelines", "Prompt Engineering", "Gamification"],
      outcome: "85%+ content accuracy, ~3x student engagement uplift",
      url: "[TODO: url]",
      side: "left",
      range: [0.58, 0.66, 0.82, 0.92],
      transitionFrames: null,
      transitionFrameCount: 0,
    },
  ],
  // Glass card scrim: a dark tint (not a new hue - your own --bg-base) at
  // medium opacity, so text stays readable regardless of what's playing
  // in the full-bleed video behind it, while still reading as translucent
  // glass rather than a solid panel.
  glass: {
    tint: "rgba(10, 10, 12, 0.45)",
    blur: 28,
    saturate: 1.6,
  },
  pulse: {
    // Multiplier on pulse glow radius/intensity while inside a station's
    // plateau (dim, station itself is the focus) vs. in a gap between
    // stations (bright, leads the eye down to the next one).
    dimInStation: 0.5,
    brightInGap: 1,
  },
};
