import { signal } from '@angular/core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { copyWithFeedback } from './clipboard';

describe('copyWithFeedback', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('copia texto e alterna o estado copied', async () => {
    vi.useFakeTimers();

    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    const copied = signal(false);
    await copyWithFeedback(copied, 'hello', 2000);

    expect(writeText).toHaveBeenCalledWith('hello');
    expect(copied()).toBe(true);

    vi.advanceTimersByTime(2000);
    expect(copied()).toBe(false);
  });
});
