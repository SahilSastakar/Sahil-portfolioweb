// "150%" of a viewport height, in px - the unit ScrollTrigger's
// `end: "+=N"` pin-duration syntax expects. Shared by ScrubSequence (to
// define its own pin) and anything that needs to scrub in sync with it
// (e.g. Hero's text exit) without duplicating the conversion.
export function scrollLengthPx(scrollLength) {
  const pct = parseFloat(scrollLength) || 100;
  return window.innerHeight * (pct / 100);
}
