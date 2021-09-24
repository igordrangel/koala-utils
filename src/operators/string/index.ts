import { koala } from '../..';

export function maskCpf(value: string) {
  return koala(value).string().maskCpf().getValue();
}

export function maskCnpj(value: string) {
  return koala(value).string().maskCnpj().getValue();
}

export function randomString(
  length: number,
  numbers: boolean,
  uppercase: boolean = false,
  lowercase: boolean = false,
  specialCharacters: boolean = false,
) {
  return koala('').string().random(length, numbers, uppercase, lowercase, specialCharacters).getValue();
}

export function clear(value: string, delimiter?: string) {
  return koala(value).string().clear(delimiter).getValue();
}

export function unmaskCoin(value: string) {
  return koala(value).string().unmaskCoin().getValue();
}

export function toCamelCase(value: string) {
  return koala(value).string().toCamelCase().getValue();
}

export function nbl2br(value: string) {
  return koala(value).string().nbl2br().getValue();
}
