import "./AssetPlaceholder.css";

// `fill`: size to 100% of the parent instead of an intrinsic aspect-ratio
// box - for placeholders standing in inside a container that already
// dictates its own height (e.g. ScrubSequence's error fallback).
function AssetPlaceholder({ path, ratio = "16/9", fill = false, className = "" }) {
  return (
    <div
      className={`asset-placeholder ${className}`}
      style={fill ? { width: "100%", height: "100%" } : { aspectRatio: ratio }}
    >
      <span className="mono-label">{path}</span>
    </div>
  );
}

export default AssetPlaceholder;
