import { KlDelay } from '../../utils/KlDelay';

export function klDelay(ms: number) {
  return KlDelay.waitFor(ms);
}
