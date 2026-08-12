import { useEffect, useRef } from "react";
import { gsap } from "../../../../lib/gsap.js";
import { THREAD_CONFIG } from "./threadConfig.js";

const MAX_DPR = 2;
const CURVE_AMPLITUDE = 36; // px either side of center at the curve's widest
const CURVE_CYCLES = 1.4; // how many gentle S-bends down the full height

function isInsideAnyPlateau(progress, stations) {
  return stations.some(
    ({ range }) => progress >= range[1] && progress <= range[2],
  );
}

// Draws a soft-glowing vertical line with a gentle organic curve down the
// center of the pinned stage, plus a brighter pulse that travels along it
// tied to overall scroll progress - dimmer while a station is in its
// plateau (the station itself is the focus), brighter in the gaps between
// stations (leading the eye down to the next one).
function ThreadCanvas({ progressRef }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const lastDrawnRef = useRef(null);

  function curveX(t, w) {
    // t: 0-1 down the canvas height
    const centerX = w / 2;
    return (
      centerX + Math.sin(t * Math.PI * 2 * CURVE_CYCLES) * CURVE_AMPLITUDE
    );
  }

  function sizeCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;
    sizeRef.current = { w, h, dpr };
    lastDrawnRef.current = null;
  }

  function draw(progress) {
    const ctx = ctxRef.current;
    const { w, h } = sizeRef.current;
    if (!ctx || !w || !h) return;

    ctx.clearRect(0, 0, w, h);

    // The line itself, drawn as a wide soft glow pass then a bright core.
    const steps = 60;
    const points = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      points.push({ x: curveX(t, w), y: t * h });
    }

    function strokePath(width, alpha, blur) {
      ctx.beginPath();
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
      ctx.lineWidth = width;
      ctx.shadowColor = "rgba(0, 229, 255, 0.9)";
      ctx.shadowBlur = blur;
      ctx.stroke();
    }

    strokePath(10, 0.06, 40);
    strokePath(3, 0.18, 16);
    strokePath(1, 0.55, 4);

    // The traveling pulse.
    const dim = isInsideAnyPlateau(progress, THREAD_CONFIG.stations);
    const intensity = dim
      ? THREAD_CONFIG.pulse.dimInStation
      : THREAD_CONFIG.pulse.brightInGap;
    const py = progress * h;
    const px = curveX(progress, w);
    const radius = 26 * intensity;

    const gradient = ctx.createRadialGradient(px, py, 0, px, py, radius);
    gradient.addColorStop(0, `rgba(200, 255, 255, ${0.9 * intensity})`);
    gradient.addColorStop(0.4, `rgba(0, 229, 255, ${0.5 * intensity})`);
    gradient.addColorStop(1, "rgba(0, 229, 255, 0)");

    ctx.shadowBlur = 0;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  useEffect(() => {
    sizeCanvas();

    function renderTick() {
      const progress = progressRef.current;
      if (progress === lastDrawnRef.current) return;
      draw(progress);
      lastDrawnRef.current = progress;
    }
    gsap.ticker.add(renderTick);

    function handleResize() {
      sizeCanvas();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(renderTick);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="thread__canvas" />;
}

export default ThreadCanvas;
