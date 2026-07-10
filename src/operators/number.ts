import { KlNumber } from "../core/KlNumber";

/**
 * Formata um número como moeda (retorno terminal em string).
 */
export function maskCoin(
  value: number,
  options?: {
    prefix?: string;
    thousands?: string;
    decimal?: string;
    decimalCount?: number;
  },
) {
  const {
    prefix = "R$",
    thousands = ".",
    decimal = ",",
    decimalCount = 2,
  } = options ?? {};
  return new KlNumber(value).maskCoin(prefix, thousands, decimal, decimalCount);
}

/**
 * Envolve um número em `KlNumber` para encadeamento fluente.
 */
export function number(value: number) {
  return new KlNumber(value);
}
