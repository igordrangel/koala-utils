import { KlString } from '../../utils/KlString';

export function string(value: string) {
  return new KlString(value);
}

export function maskCpf(value: string) {
  return string(value).maskCpf().getValue();
}

export function maskCnpj(value: string) {
  return string(value).maskCnpj().getValue();
}

export function randomString(
  length: number,
  options?: {
    numbers?: boolean;
    uppercase?: boolean;
    lowercase?: boolean;
    specialCharacters?: boolean;
  },
) {
  return string('')
    .random(length, options?.numbers ?? true, options?.uppercase, options?.lowercase, options?.specialCharacters)
    .getValue();
}

export function clear(value: string, delimiter?: string) {
  return string(value).clear(delimiter).getValue();
}

export function unmaskCoin(value: string, decimalCount?: number) {
  return string(value).unmaskCoin(decimalCount).getValue();
}

export function toCamelCase(value: string) {
  return string(value).toCamelCase().getValue();
}

export function nbl2br(value: string) {
  return string(value).nbl2br().getValue();
}
