import { koala } from '../../index';

export function maskCoin(value: number) {
  return koala(value).number().maskCoin().getValue();
}
