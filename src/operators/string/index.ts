import { koala } from '../..';

export function maskCpf(value: string) {
  return koala(value).string().maskCpf().getValue();
}

export function maskCnpj(value: string) {
  return koala(value).string().maskCnpj().getValue();
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
  return koala('')
    .string()
    .random(length, options?.numbers ?? true, options?.uppercase, options?.lowercase, options?.specialCharacters)
    .getValue();
}

export function clear(value: string, delimiter?: string) {
  return koala(value).string().clear(delimiter).getValue();
}

export function unmaskCoin(value: string, decimalCount?: number) {
  return koala(value).string().unmaskCoin(decimalCount).getValue();
}

export function toCamelCase(value: string) {
  return koala(value).string().toCamelCase().getValue();
}

export function nbl2br(value: string) {
  return koala(value).string().nbl2br().getValue();
}
