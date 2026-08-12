import "./AssetPlaceholder.css";

function AssetPlaceholder({ path, ratio = "16/9", className = "" }) {
  return (
    <div
      className={`asset-placeholder ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="mono-label">{path}</span>
    </div>
  );
}

export default AssetPlaceholder;
