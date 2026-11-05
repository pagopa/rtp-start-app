// After a new deploy the old hashed chunks are removed from the storage, so a tab
// opened on the previous version fails to load lazy routes (404 on /assets/*.js).
// Reloading the page loads the new index.html and the new chunks.
const LAST_RELOAD_KEY = 'chunk-reload-at';
// Do not reload again within this window, to avoid a reload loop
// when a chunk is really missing from the current deploy
const RELOAD_GUARD_MS = 10_000;

// Returns null when the guard cannot be read (sessionStorage missing or blocked)
const readLastReload = (): number | null => {
  try {
    return Number(sessionStorage.getItem(LAST_RELOAD_KEY)) || 0;
  } catch {
    return null;
  }
};

// Returns false when the guard cannot be persisted (sessionStorage missing or blocked)
const writeLastReload = (time: number): boolean => {
  try {
    sessionStorage.setItem(LAST_RELOAD_KEY, String(time));
    return true;
  } catch {
    return false;
  }
};

export const handlePreloadError = (event: Event, reload: () => void = () => window.location.reload()) => {
  const now = Date.now();
  const lastReload = readLastReload();
  if (lastReload !== null && now - lastReload < RELOAD_GUARD_MS) {
    // Already reloaded a moment ago: let the error surface
    return;
  }
  // Without a persisted guard every reload would hit the same error again:
  // let the error surface instead of risking a reload loop
  if (lastReload === null || !writeLastReload(now)) {
    return;
  }
  // Stop Vite from throwing the error, the page is about to reload
  event.preventDefault();
  reload();
};

export const registerChunkReload = () => {
  window.addEventListener('vite:preloadError', (event) => handlePreloadError(event));
};
