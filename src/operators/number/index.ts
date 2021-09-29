import { koala } from '../../index';

export function maskCoin(
  value: number,
  options: {
    prefix: string;
    thousands: string;
    decimal: string;
    decimalCount: number;
  },
) {
  return koala(value)
    .number()
    .maskCoin(options.prefix, options.thousands, options.decimal, options.decimalCount)
    .getValue();
}
