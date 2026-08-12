import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap.js";
import { scrollLengthPx } from "../../lib/scrollLength.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import AssetPlaceholder from "../AssetPlaceholder/AssetPlaceholder.jsx";
import "./ScrubSequence.css";

const MAX_DPR = 2;

function framePathFor(template, index) {
  return template.replace("%03d", String(index).padStart(3, "0"));
}

// Cover-fit (crop, never distort) placement for a natural-size frame
// inside a css-pixel-sized box.
function coverRect(naturalW, naturalH, boxW, boxH) {
  const scale = Math.max(boxW / naturalW, boxH / naturalH);
  const drawW = naturalW * scale;
  const drawH = naturalH * scale;
  return { dx: (boxW - drawW) / 2, dy: (boxH - drawH) / 2, drawW, drawH };
}

/**
 * Scroll-scrubbed frame-sequence canvas.
 *
 * Preloads `frameCount` frames from `framePath` (a "%03d"-templated URL),
 * drawing frame 1 the moment it's available so the section is never
 * empty, then progressively fills in the rest (every 4th frame first, so
 * early scrubbing already lands close to the right frame during load).
 *
 * When `pinned`, the component pins itself for `scrollLength` of extra
 * scroll and maps that scroll to frame index. When not pinned, frame
 * index instead maps to the section's own natural scroll-through of the
 * viewport - no pin, no extra scroll distance.
 *
 * Renders `children` layered over the canvas, inside the same pinned (or
 * unpinned) container, so overlaid content moves/pins with it for free.
 */
const ScrubSequence = forwardRef(function ScrubSequence(
  {
    framePath,
    frameCount,
    pinned = false,
    scrollLength = "100%",
    startPreload = true,
    onLeave,
    className = "",
    children,
  },
  forwardedRef,
) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedRef = useRef([]);
  const naturalSizeRef = useRef({ w: 1920, h: 1080 });
  const progressRef = useRef(0);
  const drawnIndexRef = useRef(-1);
  const scrollTriggerRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const [status, setStatus] = useState("loading"); // loading | ready | static | error

  useImperativeHandle(forwardedRef, () => ({
    get el() {
      return containerRef.current;
    },
    get scrollTrigger() {
      return scrollTriggerRef.current;
    },
  }));

  // ---------- Draw ----------
  function drawFrame(index) {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imagesRef.current[index];
    if (!ctx || !canvas || !container || !img || !img.complete) return;

    const boxW = container.clientWidth;
    const boxH = container.clientHeight;
    const { w, h } = naturalSizeRef.current;
    const { dx, dy, drawW, drawH } = coverRect(w, h, boxW, boxH);

    ctx.clearRect(0, 0, boxW, boxH);
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }

  function nearestLoadedIndex(target) {
    if (loadedRef.current[target]) return target;
    for (let radius = 1; radius < frameCount; radius++) {
      const lo = target - radius;
      const hi = target + radius;
      if (lo >= 0 && loadedRef.current[lo]) return lo;
      if (hi < frameCount && loadedRef.current[hi]) return hi;
    }
    return -1;
  }

  // ---------- Canvas sizing ----------
  function sizeCanvas() {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const cssW = container.clientWidth;
    const cssH = container.clientHeight;

    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;

    drawnIndexRef.current = -1; // force a redraw at the new size
    drawFrame(Math.round(progressRef.current * (frameCount - 1)));
  }

  // ---------- Preload ----------
  useEffect(() => {
    if (!startPreload) return undefined;

    let cancelled = false;
    imagesRef.current = new Array(frameCount);
    loadedRef.current = new Array(frameCount).fill(false);

    function loadOne(i) {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return resolve();
          loadedRef.current[i] = true;
          if (i === 0) {
            naturalSizeRef.current = {
              w: img.naturalWidth,
              h: img.naturalHeight,
            };
            sizeCanvas();
            setStatus((s) => (s === "loading" ? "ready" : s));
          }
          resolve();
        };
        img.onerror = () => resolve(); // missing frame - skip, nearest-loaded fallback covers it
        img.src = framePathFor(framePath, i + 1);
        imagesRef.current[i] = img;
      });
    }

    async function preloadAll() {
      // Priority pass: frame 1 first so something is visible immediately.
      await loadOne(0);
      if (cancelled) return;

      if (!loadedRef.current[0]) {
        // Frame 1 itself 404'd - frames aren't there yet. Fail gracefully.
        setStatus("error");
        return;
      }

      // Every 4th frame next, so early scrubbing already lands close.
      const everyFourth = [];
      const rest = [];
      for (let i = 1; i < frameCount; i++) {
        (i % 4 === 0 ? everyFourth : rest).push(i);
      }
      for (const i of everyFourth) {
        if (cancelled) return;
        await loadOne(i);
      }
      // Fill the gaps.
      for (const i of rest) {
        if (cancelled) return;
        await loadOne(i);
      }
    }

    preloadAll();

    return () => {
      cancelled = true;
    };
  }, [framePath, frameCount, startPreload]);

  // ---------- Reduced motion / load failure: static frame 1, no pin ----------
  useEffect(() => {
    if (!reducedMotion || status !== "ready") return;
    drawFrame(0);
  }, [reducedMotion, status]);

  // ---------- ScrollTrigger scrub (skipped for reduced motion / error) ----------
  useEffect(() => {
    if (status !== "ready" || reducedMotion) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: pinned
        ? () => `+=${scrollLengthPx(scrollLength)}`
        : "bottom top",
      pin: pinned,
      scrub: 0.4,
      anticipatePin: pinned ? 1 : 0,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
      onLeave: onLeave,
    });
    scrollTriggerRef.current = st;

    function renderTick() {
      const target = Math.round(progressRef.current * (frameCount - 1));
      if (target === drawnIndexRef.current) return;
      const drawable = loadedRef.current[target]
        ? target
        : nearestLoadedIndex(target);
      if (drawable === -1) return;
      drawFrame(drawable);
      drawnIndexRef.current = target;
    }
    gsap.ticker.add(renderTick);

    function handleResize() {
      sizeCanvas();
      ScrollTrigger.refresh();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(renderTick);
      window.removeEventListener("resize", handleResize);
      st.kill();
      scrollTriggerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, reducedMotion, pinned, scrollLength, frameCount]);

  if (status === "error") {
    return (
      <div ref={containerRef} className={`scrub-sequence ${className}`}>
        <AssetPlaceholder path={framePathFor(framePath, 1)} fill />
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`scrub-sequence ${className}`}>
      <canvas
        ref={canvasRef}
        className={`scrub-sequence__canvas ${status === "ready" ? "is-ready" : ""}`}
      />
      {children}
    </div>
  );
});

export default ScrubSequence;
