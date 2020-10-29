import { Delay } from "../helpers/delay";

export abstract class KlAbstract<T> {
	
	protected constructor(protected value: T) {}
	
	public async delay(ms: number) {
		await Delay.waitFor(ms);
		return this;
	}
	
	public getValue() {
		return this.value;
	}
}
