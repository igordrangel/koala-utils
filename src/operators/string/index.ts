import { KlString, KlStringRandomOptions } from "../../utils/KlString";

export function klString(value: string) {
  return new KlString(value);
}

export function maskCpf(value: string) {
  return klString(value).maskCpf().getValue();
}

export function maskCnpj(value: string) {
  return klString(value).maskCnpj().getValue();
}

export function randomString(length: number, options?: KlStringRandomOptions) {
  return klString("")
    .random(length, options ?? { lowercase: true, uppercase: true })
    .getValue();
}

export function clear(value: string, delimiter?: string) {
  return klString(value).clear(delimiter).getValue();
}

export function unmaskCoin(value: string, decimalCount?: number) {
  return klString(value).unmaskCoin(decimalCount).getValue();
}

export function unmaskCpf(value: string) {
  return klString(value).unmaskCpf().getValue();
}

export function unmaskCnpj(value: string) {
  return klString(value).unmaskCnpj().getValue();
}

export function toCamelCase(value: string) {
  return klString(value).toCamelCase().getValue();
}

export function nbl2br(value: string) {
  return klString(value).nbl2br().getValue();
}

export function validateCpf(value: string) {
  return klString(value).validateCpf();
}

export function validateCnpj(value: string) {
  return klString(value).validateCnpj();
}
