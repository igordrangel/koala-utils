import { KlUtils } from './utils/KlUtils';

export * from './operators/string';
export * from './operators/number';
export * from './operators/date';

export function koala(value: any) {
  return new KlUtils(value);
}
