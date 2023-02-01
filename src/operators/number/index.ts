import { KlNumber } from '../../utils/KlNumber';

export function number(value: number) {
  return new KlNumber(value);
}

export function maskCoin(
  value: number,
  options?: {
    prefix?: string;
    thousands?: string;
    decimal?: string;
    decimalCount?: number;
  },
) {
  return number(value)
    .maskCoin(options?.prefix, options?.thousands, options?.decimal, options?.decimalCount)
    .getValue();
}
