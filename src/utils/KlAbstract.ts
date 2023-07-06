import { KlDelay } from './KlDelay'

export abstract class KlAbstract<T> {
  protected constructor(protected value: T) {}

  async delay(ms: number) {
    await KlDelay.waitFor(ms)
    return this
  }

  getValue() {
    return this.value
  }
}
