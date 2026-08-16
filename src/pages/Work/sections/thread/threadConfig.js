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
      // Scope note, not a job title: this project had a wider team/stack
      // (FastAPI, PostgreSQL, deployment) - role and sections below only
      // cover what was actually mine, the AI systems and the frontend.
      role: "AI/ML & Frontend — Solo Build",
      logo: "/assets/logos/outbackshare.png",
      video: "/assets/emblems/outbackshare.mp4",
      poster: "/assets/emblems/outbackshare-poster.webp",
      framePath: "/assets/frames/outbackshare/frame_%03d.webp",
      frameCount: 64,
      // Two labeled blurbs instead of one description line - there was
      // enough real, specific work here to be worth the extra room.
      // Station.jsx renders `sections` when present, falling back to
      // `description` (see the other two stations) otherwise.
      sections: [
        {
          label: "UI/UX",
          body: "Built the full React frontend solo - donor and organisation experience in one app, role-based routing, a bilingual English/中文 interface, a live listing board, in-app messaging, and a Leaflet map rendering real ABS postcode boundaries by risk and supply gap.",
        },
        {
          label: "AI/ML",
          body: "Designed both AI systems: a ConvNeXt-Tiny + Grounding DINO pipeline that recognises food from a photo and auto-fills a listing in under 60 seconds, plus an Area Intelligence engine - K-Means risk clustering and a Random Forest demand model on ABS SEIFA data, explained per-postcode with SHAP.",
        },
      ],
      tags: ["ConvNeXt-Tiny", "Grounding DINO", "SHAP", "React", "Leaflet"],
      outcome: "84.5% top-1 validation accuracy across 101k images",
      side: "left",
      // [fadeInStart, plateauStart, plateauEnd, fadeOutEnd] as fractions of
      // overall scroll progress (0-1) through the pinned section. Adjacent
      // stations' fade windows overlap by ~0.06 (~15-20% of a station's
      // own span) so the handoff never shows an empty stage.
      range: [0.0, 0.03, 0.17, 0.2],
      // Optional scroll-scrubbed frame intro, played before this station's
      // video takes over. Only wired up if both a path and frame count are
      // set - no station currently has transition frames provided, so this
      // is inert config, not a per-station hardcoded special case.
      transitionFrames: null,
      transitionFrameCount: 0,
    },
    {
      key: "pacman-ctf",
      number: "02",
      title: "Pacman CTF",
      role: "AI Agent Planning, Solo Project (FIT5222, Monash)",
      logo: null,
      video: "/assets/emblems/pacman-ctf.mp4",
      poster: "/assets/frames/pacman-ctf/frame_001.webp",
      framePath: "/assets/frames/pacman-ctf/frame_%03d.webp",
      // Source clip morphs into an unrelated abstract pattern after ~1.5s -
      // only the clean maze+ghosts window was extracted (36 frames).
      frameCount: 36,
      sections: [
        {
          label: "Approach",
          body: "Built a two level AI agent for Pacman Capture the Flag: a PDDL planner, solved with the Piglet solver, decides the high level goal (attack, defend, retreat, or chase), and a Python A* search turns that goal into an actual path, bending around live ghosts by raising the cost of nearby tiles. Both team agents share a live memory of positions and enemy sightings so they coordinate instead of acting alone.",
        },
        {
          label: "Results",
          body: "Tested over 30 games against a staff baseline team on Monash's contest server. Two competing designs were compared, a simpler heuristic version that scored higher on average but swung more from game to game, and a steadier version with team messaging and entry point commitment that lost only once.",
        },
      ],
      tags: ["Python", "PDDL Planning", "A* Search", "Multi-Agent Coordination"],
      outcome: "27 of 30 games won against the staff baseline team",
      side: "right",
      range: [0.2, 0.23, 0.37, 0.4],
      transitionFrames: null,
      transitionFrameCount: 0,
    },
    {
      key: "flatland-mapf",
      number: "03",
      title: "Flatland",
      role: "Multi-Agent Pathfinding, Solo Project (FIT5222, Monash)",
      logo: null,
      video: "/assets/emblems/flatland-mapf.mp4",
      poster: "/assets/frames/flatland-mapf/frame_001.webp",
      framePath: "/assets/frames/flatland-mapf/frame_%03d.webp",
      // Source clip explodes into an unrelated particle-burst pattern after
      // ~1.6s - only the clean wireframe-terrain window was extracted (39
      // frames).
      frameCount: 39,
      sections: [
        {
          label: "Approach",
          body: "Solved train routing on a shared railway grid as a search problem, scaling from a single train up to dozens of trains with deadlines and mid-run breakdowns. Built four different multi-agent planners from scratch to compare, including a custom deadlock detection design (ACORD) built to fix the corridor traffic jams the simpler approaches ran into.",
        },
        {
          label: "Results",
          body: "The best performer was a prioritized planner with traffic aware costs and deadline based ordering, hitting a 94% success rate across the full difficulty ladder (5 to 75+ agents). Also benchmarked plain A* against Safe Interval Path Planning, which ran 4x faster but produced longer paths and a lower success rate.",
        },
      ],
      tags: ["Python", "A* Search", "SIPP", "ECBS + LNS", "Prioritized Planning"],
      outcome: "94% success rate, the best of four planners built from scratch",
      side: "left",
      range: [0.4, 0.43, 0.57, 0.6],
      transitionFrames: null,
      transitionFrameCount: 0,
    },
    {
      key: "intelliharvest",
      number: "04",
      title: "Intelliharvest",
      // Unlike OutbackShare/RankMax, this was a 5-person team effort with
      // Sahil as lead, not a solo build - role reflects that honestly.
      role: "Project Lead — 5-Person Team",
      logo: "/assets/logos/intelliharvest.png",
      video: "/assets/emblems/intelliharvest.mp4",
      poster: "/assets/emblems/intelliharvest-poster.webp",
      framePath: "/assets/frames/intelliharvest/frame_%03d.webp",
      frameCount: 64,
      sections: [
        {
          label: "Growth Monitoring",
          body: "Tracks a crop's complete growth cycle from seed sowing through to cultivation, continuously analysing each growth stage against ground sensor data (N, P, K, pH), live weather feeds, and microbial soil data.",
        },
        {
          label: "Real-Time Guidance",
          body: "Turns that analysis into real-time recommendations - how much water and which nutrients to apply, and which microbial cultures to introduce - tuned to help the client's specific crop reach their required commercial quality and yield.",
        },
      ],
      tags: ["Generative AI", "Sensor Fusion", "Precision Agriculture", "Soil Microbiome"],
      outcome: "Exceeded traditional benchmarks across all evaluation metrics",
      side: "right",
      range: [0.6, 0.63, 0.77, 0.8],
      transitionFrames: null,
      transitionFrameCount: 0,
    },
    {
      key: "rankmax",
      number: "05",
      title: "RankMax",
      // Same scope note as OutbackShare: RankMax.AI had more surface area
      // than this (security, Supabase infra) - role/sections cover only
      // the AI systems and frontend, which were solely mine.
      role: "AI/ML & Frontend — Solo Build",
      logo: "/assets/logos/rankmax.png",
      video: "/assets/emblems/rankmax.mp4",
      poster: "/assets/emblems/rankmax-poster.webp",
      framePath: "/assets/frames/rankmax/frame_%03d.webp",
      frameCount: 64,
      sections: [
        {
          label: "UI/UX",
          body: "Built the full Next.js/TypeScript frontend solo - student and teacher experiences in one app: dashboards, a diagnostic quiz, a personal knowledge-graph visualisation, quiz-taking, and a teacher curriculum-upload and gradebook flow.",
        },
        {
          label: "AI/ML",
          body: "Designed a graph neural network that models topic prerequisites and propagates difficulty signals across a unit, self-retraining on real student interaction data. Paired it with an LLM engine (Groq) that rewrites content across 10 difficulty levels, plus a RAG pipeline grounding notes in live job-posting data.",
        },
      ],
      tags: ["Graph Neural Networks", "RAG", "LLM Pipelines", "Next.js", "Supabase"],
      outcome: "Deployed across 4 university units, 12 weeks of curriculum each",
      side: "left",
      range: [0.8, 0.83, 0.97, 1.0],
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
