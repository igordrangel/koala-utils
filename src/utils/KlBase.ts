import { KlObject } from './KlObject';
import { KlString } from './KlString';
import { KlArray } from './KlArray';
import { KlDate } from './KlDate';
import { KlNumber } from './KlNumber';
import { KlRequest } from './KlRequest';

export abstract class KlBase {
  protected constructor(protected value: any) {}

  public string() {
    return new KlString(this.value);
  }

  public array<T>() {
    return new KlArray<T>(this.value);
  }

  public date() {
    if (typeof this.value === 'string') {
      if (this.value !== 'now') {
        if (this.value.indexOf(':') < 0) {
          this.value += ' 00:00:00';
        } else if (this.value.indexOf('T') >= 0) {
          this.value += '+0000';
        }
        this.value = new Date(this.value);
      } else {
        this.value = new Date();
      }
    }
    return new KlDate(this.value);
  }

  public object<T>() {
    return new KlObject<T>(this.value);
  }

  public number() {
    return new KlNumber(this.value);
  }

  public request() {
    return new KlRequest(this.value);
  }
}
