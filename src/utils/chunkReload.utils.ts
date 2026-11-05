// After a new deploy the old hashed chunks are removed from the storage, so a tab
// opened on the previous version fails to load lazy routes (404 on /assets/*.js).
// Reloading the page loads the new index.html and the new chunks.
const LAST_RELOAD_KEY = 'chunk-reload-at';
// Do not reload again within this window, to avoid a reload loop
// when a chunk is really missing from the current deploy
const RELOAD_GUARD_MS = 10_000;

const readLastReload = (): number => {
  try {
    return Number(sessionStorage.getItem(LAST_RELOAD_KEY)) || 0;
  } catch {
    return 0;
  }
};

const writeLastReload = (time: number) => {
  try {
    sessionStorage.setItem(LAST_RELOAD_KEY, String(time));
  } catch {
    // sessionStorage not available: the reload still happens
  }
};

export const handlePreloadError = (event: Event, reload: () => void = () => window.location.reload()) => {
  const now = Date.now();
  if (now - readLastReload() < RELOAD_GUARD_MS) {
    // Already reloaded a moment ago: let the error surface
    return;
  }
  // Stop Vite from throwing the error, the page is about to reload
  event.preventDefault();
  writeLastReload(now);
  reload();
};

export const registerChunkReload = () => {
  window.addEventListener('vite:preloadError', (event) => handlePreloadError(event));
};
