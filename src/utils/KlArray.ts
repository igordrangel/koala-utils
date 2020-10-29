import { KlString } from './KlString';
import { KlAbstract } from './KlAbstract';

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
  
  public map(callbackFn: (value: T, index: number) => T) {
    this.value = this.value.map(callbackFn);
    return this;
  }
  
  public async mapAsync(callbackFn: (value: T, index: number) => Promise<T>) {
    for (const [index, value] of this.value.entries()) {
      this.value[index] = await callbackFn(value, index);
    }
    return this;
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
    
    this.value = result;
    
    return this;
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
  
  public merge(value: any[]) {
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
}
