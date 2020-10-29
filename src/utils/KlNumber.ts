import { KlAbstract } from "./KlAbstract";

export class KlNumber extends KlAbstract<number> {
	
	constructor(value: number) {
		super(value);
	}
	
	public random(min: number, max: number) {
		if (min > max) {
			throw new Error('The min value cannot be greater than the max');
		}
		
		this.value = Math.floor(Math.random() * (max - min + 1)) + min;
		
		return this;
	}
}
