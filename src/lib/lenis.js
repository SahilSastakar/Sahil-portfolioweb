// A shared reference to the current Lenis instance. useSmoothScroll owns
// the actual instance (created/destroyed with its own effect); this just
// lets other code (hash-scrolling, anything programmatic) reach it
// without threading it through props/context.
let instance = null;

export function setLenisInstance(lenis) {
  instance = lenis;
}

export function getLenisInstance() {
  return instance;
}
