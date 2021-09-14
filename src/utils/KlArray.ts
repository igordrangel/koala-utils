import { KlString } from './KlString';
import { KlAbstract } from './KlAbstract';
import { json2csv } from 'json-2-csv';

export class KlArray<T> extends KlAbstract<T[]> {
  constructor(value: T[]) {
    super(value);
  }

  public toString(delimiter: string = ',') {
    let stringResult = '';

    this.value?.forEach((value: any) => {
      if (value) {
        if (!stringResult) {
          stringResult = value;
        } else {
          stringResult += delimiter + value;
        }
      }
    });

    return new KlString(stringResult);
  }

  public map<NewType>(callbackFn: (value: T, index: number) => NewType) {
    return new KlArray<NewType>(this.value.map(callbackFn));
  }

  public async mapAsync<NewType>(callbackFn: (value: T, index: number) => Promise<NewType>) {
    const newList: NewType[] = [];
    for (const [index, value] of this.value.entries()) {
      newList[index] = (await callbackFn(value, index)) as any;
    }
    return new KlArray<NewType>(newList);
  }

  public forEach(callbackFn: (value: T, index: number) => T) {
    this.value.forEach(callbackFn);
    return this;
  }

  public async forEachAsync(callbackFn: (value: T, index: number) => Promise<T>) {
    for (const [index, value] of this.value.entries()) {
      await callbackFn(value, index);
    }
    return this;
  }

  public clearEmptyValues() {
    this.value = this.value.filter((item) => !!item);
    return this;
  }

  public split(maxRowsSplit: number) {
    const result: any[] = [];
    let group = 0;

    this.value.forEach((value, index) => {
      if (result[group] === undefined) {
        result[group] = [];
      }
      result[group].push(value);

      if ((index + 1) % maxRowsSplit === 0) {
        group = group + 1;
      }
    });

    return new KlArray<T[]>(result);
  }

  public getIndex(key: string, value: string | number) {
    let indexSearched: number = -1;

    this.value.forEach((item: any, index: number) => {
      if (item[key] === value && indexSearched < 0) {
        indexSearched = index;
      }
    });

    return indexSearched;
  }

  public merge(value: T[]) {
    value.forEach((item) => {
      this.value.push(item);
    });

    return this;
  }

  public filter(value: string, index?: string) {
    this.value = this.value.filter((item: any) => {
      const filter = index ? item[index] : item;
      if (filter) {
        let find = false;
        `${value}`
          .toLowerCase()
          .split(' ')
          .forEach((part) => {
            if (`${filter}`.toLowerCase().indexOf(part) >= 0) {
              find = true;
              return false;
            }
          });

        return find;
      }
    });

    return this;
  }

  public orderBy(by: string, inverse: boolean = false) {
    this.value.sort((a: any, b: any) => {
      if (typeof a !== 'string' && typeof b !== 'string') {
        if ((!inverse && a[by] > b[by]) || (inverse && a[by] < b[by])) {
          return 1;
        } else if ((!inverse && a[by] < b[by]) || (inverse && a[by] > b[by])) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });

    return this;
  }

  public toBase64() {
    return new Promise<KlString>(async (resolve, reject) => {
      const value = this.value as any[];
      json2csv(
        value,
        (err, csv) => {
          if (err) reject(err);
          if (csv) {
            resolve(new KlString(csv).toBase64());
          } else {
            reject(new Error('Invalid data.'));
          }
        },
        {
          delimiter: {
            field: ';',
          },
        },
      );
    });
  }

  public pipe<TypeResult>(callbackFn: (value: this) => TypeResult[]) {
    return new KlArray<TypeResult>(callbackFn(this));
  }

  public async pipeAsync<TypeResult>(callbackFn: (value: this) => Promise<TypeResult[]>) {
    return new KlArray<TypeResult>(await callbackFn(this));
  }
}
