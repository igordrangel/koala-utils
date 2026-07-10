import type { WritableSignal } from '@angular/core';

export function copyWithFeedback(
  copied: WritableSignal<boolean>,
  text: string,
  resetMs = 2000,
): Promise<void> {
  return navigator.clipboard.writeText(text).then(() => {
    copied.set(true);
    setTimeout(() => copied.set(false), resetMs);
  });
}
