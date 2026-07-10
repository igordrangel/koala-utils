import { KlArray } from "../core/KlArray";
import { KlString } from "../core/KlString";

/**
 * Divide uma string e retorna `KlArray` fluente (ex.: `.clearEmptyValues()`).
 */
export function split(
  value: string,
  separator: string | RegExp,
  limit?: number,
) {
  return new KlString(value).split(separator, limit);
}

/**
 * Envolve um array em `KlArray` para encadeamento fluente.
 */
export function array<T>(value: T[] = []) {
  return new KlArray(value);
}

/**
 * Remove valores falsy e retorna `KlArray` fluente.
 */
export function clearEmptyValues<T>(value: T[]) {
  return new KlArray(value).clearEmptyValues();
}

/**
 * Divide o array em grupos e retorna `KlArray` fluente.
 */
export function splitArray<T>(value: T[], maxRowsSplit: number) {
  return new KlArray(value).split(maxRowsSplit);
}

/**
 * Ordena por propriedade e retorna `KlArray` fluente.
 */
export function orderBy<T>(
  value: T[],
  by: string,
  direction: "asc" | "desc" = "asc",
) {
  return new KlArray(value).orderBy(by, direction);
}

/**
 * Embaralha o array e retorna `KlArray` fluente.
 */
export function shuffle<T>(value: T[]) {
  return new KlArray(value).shuffle();
}
