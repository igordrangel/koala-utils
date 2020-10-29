import { KlAbstract } from './KlAbstract';
import { KlString } from './KlString';

export class KlObject<T> extends KlAbstract<T> {
  constructor(value: T) {
    super(value);
  }
  
  public merge(object: any) {
    if (!this.value) this.value = {} as T;
    const result: any = this.value;
    for (const [index, value] of Object.entries(object)) {
      result[index] = value;
    }
    this.value = result;
    
    return this;
  }
  
  public toString(paramsName: string[], delimiter: string = ' ') {
    const obj: any = this.value;
    let name = '';
    paramsName.forEach((paramName) => {
      if (!name && obj[paramName]) {
        name = obj[paramName];
      } else if (name && obj[paramName]) {
        name += `${delimiter}` + obj[paramName];
      }
    });
    
    return new KlString(name);
  }
}
