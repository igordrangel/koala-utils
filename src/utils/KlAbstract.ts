import { KlDelay } from './KlDelay';

export abstract class KlAbstract<T> {
  protected constructor(protected value: T) {}

  public async delay(ms: number) {
    await KlDelay.waitFor(ms);
    return this;
  }

  public getValue() {
    return this.value;
  }
}
