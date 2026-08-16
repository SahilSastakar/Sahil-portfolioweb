import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import AssetPlaceholder from "../../../../components/AssetPlaceholder/AssetPlaceholder.jsx";

const MAX_DPR = 2;

function framePathFor(template, index) {
  return template.replace("%03d", String(index).padStart(3, "0"));
}

// Cover-fit (crop, never distort) placement for a natural-size frame
// inside a css-pixel-sized box. Same math as ScrubSequence.
function coverRect(naturalW, naturalH, boxW, boxH) {
  const scale = Math.max(boxW / naturalW, boxH / naturalH);
  const drawW = naturalW * scale;
  const drawH = naturalH * scale;
  return { dx: (boxW - drawW) / 2, dy: (boxH - drawH) / 2, drawW, drawH };
}

/**
 * Canvas frame-sequence renderer for a Thread station's background.
 *
 * Unlike ScrubSequence, this owns no ScrollTrigger of its own - Station.jsx
 * already gets a single progress value per frame from the shared Thread
 * scroll tick, so this just exposes an imperative setProgress(0-1) that
 * picks and draws the nearest loaded frame. Preload strategy mirrors
 * ScrubSequence: frame 1 first (so the station is never empty), then every
 * 4th frame, then the rest.
 */
const StationFrames = forwardRef(function StationFrames(
  { framePath, frameCount, poster, className = "" },
  forwardedRef,
) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedRef = useRef([]);
  const naturalSizeRef = useRef({ w: 960, h: 540 });
  const drawnIndexRef = useRef(-1);
  const lastProgressRef = useRef(0);

  const [status, setStatus] = useState("loading"); // loading | ready | error

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

    drawnIndexRef.current = -1;
    const target = Math.round(lastProgressRef.current * (frameCount - 1));
    const drawable = loadedRef.current[target] ? target : nearestLoadedIndex(target);
    if (drawable !== -1) drawFrame(drawable);
  }

  useImperativeHandle(forwardedRef, () => ({
    get el() {
      return containerRef.current;
    },
    setProgress(progress) {
      lastProgressRef.current = progress;
      if (status !== "ready") return;
      const target = Math.round(progress * (frameCount - 1));
      if (target === drawnIndexRef.current) return;
      const drawable = loadedRef.current[target] ? target : nearestLoadedIndex(target);
      if (drawable === -1) return;
      drawFrame(drawable);
      drawnIndexRef.current = target;
    },
  }));

  useEffect(() => {
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
            naturalSizeRef.current = { w: img.naturalWidth, h: img.naturalHeight };
            sizeCanvas();
            setStatus((s) => (s === "loading" ? "ready" : s));
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePathFor(framePath, i + 1);
        imagesRef.current[i] = img;
      });
    }

    async function preloadAll() {
      await loadOne(0);
      if (cancelled) return;
      if (!loadedRef.current[0]) {
        setStatus("error");
        return;
      }
      const everyFourth = [];
      const rest = [];
      for (let i = 1; i < frameCount; i++) {
        (i % 4 === 0 ? everyFourth : rest).push(i);
      }
      for (const i of everyFourth) {
        if (cancelled) return;
        await loadOne(i);
      }
      for (const i of rest) {
        if (cancelled) return;
        await loadOne(i);
      }
    }

    preloadAll();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [framePath, frameCount]);

  useEffect(() => {
    function handleResize() {
      sizeCanvas();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "error") {
    return (
      <div ref={containerRef} className={`station-frames ${className}`}>
        <AssetPlaceholder path={framePathFor(framePath, 1)} fill />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`station-frames ${className}`}>
      {poster && (
        <img
          src={poster}
          alt=""
          className={`station-frames__poster ${status === "ready" ? "is-hidden" : ""}`}
        />
      )}
      <canvas
        ref={canvasRef}
        className={`station-frames__canvas ${status === "ready" ? "is-ready" : ""}`}
      />
    </div>
  );
});

export default StationFrames;
