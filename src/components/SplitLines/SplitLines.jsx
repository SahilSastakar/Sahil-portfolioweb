import { useLayoutEffect, useRef } from "react";
import "./SplitLines.css";

// Splits text into per-line masked spans so a heading can reveal
// line-by-line with an upward wipe, without a paid SplitText plugin.
// Words are measured by offsetTop to group them into visual lines, so
// it re-splits whenever the container's width actually changes (e.g. a
// web font swapping in changes line-wrapping).
function SplitLines({ children, as: Tag = "div", className = "" }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const text = typeof children === "string" ? children : el.textContent;
    const words = text.split(/\s+/).filter(Boolean);

    function measureLineGroups() {
      // Absolutely positioned so measuring never disturbs the already
      // animated lines still in `el`, but pinned to el's actual content
      // width - otherwise it escapes to its nearest positioned ancestor's
      // width and wraps incorrectly.
      const probe = document.createElement("span");
      probe.style.cssText = `position:absolute; visibility:hidden; display:block; top:0; left:0; width:${el.clientWidth}px;`;
      el.appendChild(probe);

      const wordSpans = words.map((word) => {
        const span = document.createElement("span");
        span.textContent = `${word} `;
        probe.appendChild(span);
        return span;
      });

      const groups = [];
      let currentTop = null;
      let currentGroup = [];

      wordSpans.forEach((span) => {
        const top = span.offsetTop;
        if (currentTop !== null && top !== currentTop) {
          groups.push(currentGroup);
          currentGroup = [];
        }
        currentGroup.push(span.textContent);
        currentTop = top;
      });
      if (currentGroup.length) groups.push(currentGroup);

      probe.remove();
      return groups.map((g) => g.join(""));
    }

    function build() {
      const nextLines = measureLineGroups();

      // ResizeObserver fires once immediately on observe() even with no
      // real size change, and ScrollTrigger's reveal is a one-shot - a
      // needless rebuild here would replace already-animated nodes with
      // fresh, unanimated ones. Skip when nothing actually changed.
      const currentLines = Array.from(
        el.querySelectorAll(".split-line__inner"),
      ).map((n) => n.textContent);
      if (
        currentLines.length === nextLines.length &&
        currentLines.every((line, i) => line === nextLines[i])
      ) {
        return;
      }

      // If a genuine rebuild is needed (e.g. font swap changed wrapping)
      // after the reveal already ran, keep the new lines visible rather
      // than snapping them back under the mask with no trigger left to
      // reveal them again.
      const existingInner = el.querySelector(".split-line__inner");
      const alreadyRevealed =
        !!existingInner &&
        ["none", "matrix(1, 0, 0, 1, 0, 0)"].includes(
          getComputedStyle(existingInner).transform,
        );

      el.innerHTML = "";
      nextLines.forEach((lineText) => {
        const mask = document.createElement("span");
        mask.className = "split-line";
        const inner = document.createElement("span");
        inner.className = "split-line__inner";
        if (alreadyRevealed) inner.style.transform = "translateY(0)";
        inner.textContent = lineText;
        mask.appendChild(inner);
        el.appendChild(mask);
      });
    }

    build();

    // ResizeObserver's spec guarantees one callback immediately on
    // observe(), even with no real size change. That redundant call
    // would re-run build() a moment after external code (useSectionReveal)
    // has already queried and wired GSAP up to this first build's nodes -
    // replacing them out from under it with fresh, unanimated ones. Only
    // react to resizes that happen after that guaranteed initial one.
    let skipNext = true;
    const ro = new ResizeObserver(() => {
      if (skipNext) {
        skipNext = false;
        return;
      }
      build();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <Tag ref={containerRef} className={`split-lines-root ${className}`}>
      {children}
    </Tag>
  );
}

export default SplitLines;
