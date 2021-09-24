import { KlUtils } from './utils/KlUtils';

export { format, isHoliday, add, sub, diff } from './operators/date';
export { delay } from './operators/delay';
export { maskCoin } from './operators/number';
export { maskCpf, maskCnpj, randomString, clear, unmaskCoin, toCamelCase, nbl2br } from './operators/string';

export { KlDateDay } from './enums/KlDateDay';

export function koala(value: any) {
  return new KlUtils(value);
}
