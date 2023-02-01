import { KlString } from '../../utils/KlString';

export function klString(value: string) {
  return new KlString(value);
}

export function maskCpf(value: string) {
  return klString(value).maskCpf().getValue();
}

export function maskCnpj(value: string) {
  return klString(value).maskCnpj().getValue();
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
  return klString('')
    .random(length, options?.numbers ?? true, options?.uppercase, options?.lowercase, options?.specialCharacters)
    .getValue();
}

export function clear(value: string, delimiter?: string) {
  return klString(value).clear(delimiter).getValue();
}

export function unmaskCoin(value: string, decimalCount?: number) {
  return klString(value).unmaskCoin(decimalCount).getValue();
}

export function toCamelCase(value: string) {
  return klString(value).toCamelCase().getValue();
}

export function nbl2br(value: string) {
  return klString(value).nbl2br().getValue();
}
