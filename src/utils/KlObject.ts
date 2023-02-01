import { KlAbstract } from './KlAbstract';
import { KlString } from './KlString';

export class KlObject<T> extends KlAbstract<T> {
  constructor(value: T) {
    super(value);
  }

  public clone(): T {
    return JSON.parse(JSON.stringify(this.value));
  }

  public merge<ObjectType>(object: ObjectType) {
    const result: any = this.value;
    for (const [index, value] of Object.entries(object as any)) {
      result[index] = value;
    }

    return new KlObject<ObjectType>(result);
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
