import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handlePreloadError } from 'src/utils/chunkReload.utils';

const createEvent = () => new Event('vite:preloadError', { cancelable: true });

describe('handlePreloadError', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-05T10:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('reloads the page and prevents the error', () => {
    const reload = vi.fn();
    const event = createEvent();

    handlePreloadError(event, reload);

    expect(reload).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('does not reload again right after a reload', () => {
    const reload = vi.fn();
    handlePreloadError(createEvent(), reload);

    const secondEvent = createEvent();
    vi.advanceTimersByTime(5_000);
    handlePreloadError(secondEvent, reload);

    expect(reload).toHaveBeenCalledTimes(1);
    expect(secondEvent.defaultPrevented).toBe(false);
  });

  it('reloads again once the guard window has passed', () => {
    const reload = vi.fn();
    handlePreloadError(createEvent(), reload);

    vi.advanceTimersByTime(11_000);
    handlePreloadError(createEvent(), reload);

    expect(reload).toHaveBeenCalledTimes(2);
  });
});
