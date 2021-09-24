import { KlDelay } from '../../utils/KlDelay';

export function delay(ms: number) {
  return KlDelay.waitFor(ms);
}
