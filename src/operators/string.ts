import { KlString } from "../core/KlString";

/**
 * Aplica a máscara de CPF e retorna um `KlString` para encadeamento fluente.
 */
export function maskCpf(value: string) {
  return new KlString(value).maskCpf();
}

/**
 * Aplica a máscara de CNPJ e retorna um `KlString` para encadeamento fluente.
 */
export function maskCnpj(value: string) {
  return new KlString(value).maskCnpj();
}

/**
 * Remove espaços e caracteres especiais e retorna um `KlString` fluente.
 */
export function clear(value: string, delimiter?: string) {
  return new KlString(value).clear(delimiter);
}

/**
 * Converte para camelCase e retorna um `KlString` fluente.
 */
export function toCamelCase(value: string) {
  return new KlString(value).toCamelCase();
}

/**
 * Remove a máscara de moeda e retorna um `KlNumber` fluente.
 */
export function unmaskCoin(value: string, decimalCount?: number) {
  return new KlString(value).unmaskCoin(decimalCount);
}

/**
 * Mantém apenas dígitos e retorna um `KlString` fluente.
 */
export function onlyNumbers(value: string) {
  return new KlString(value).onlyNumbers();
}

/**
 * Substitui quebras de linha por `<br/>` e retorna um `KlString` fluente.
 */
export function nbl2br(value: string) {
  return new KlString(value).nbl2br();
}

/**
 * Codifica em Base64 e retorna um `KlString` fluente.
 */
export function toBase64(value: string) {
  return new KlString(value).toBase64();
}

/**
 * Normaliza e remove acentos/caracteres especiais; retorna `KlString` fluente.
 */
export function normalizeAndRemoveSpecialChars(value: string) {
  return new KlString(value).normalizeAndRemoveSpecialChars();
}

/**
 * Remove espaços (opcionalmente substituindo por delimitador); retorna `KlString` fluente.
 */
export function removeSpaces(value: string, delimiter?: string) {
  return new KlString(value).removeSpaces(delimiter);
}

/**
 * Valida CPF (retorno terminal booleano).
 */
export function validateCpf(value: string) {
  return new KlString(value).validateCpf();
}

/**
 * Valida CNPJ (retorno terminal booleano).
 */
export function validateCnpj(value: string) {
  return new KlString(value).validateCnpj();
}

/**
 * Concatena strings ao final e retorna um `KlString` fluente.
 */
export function concatenate(value: string, ...parts: string[]) {
  return new KlString(value).contatenate(...parts);
}

/**
 * Concatena uma string no início e retorna um `KlString` fluente.
 */
export function concatenateToStart(value: string, prefix: string) {
  return new KlString(value).concatenateToStart(prefix);
}

/**
 * Remove máscara de CPF (apenas números) e retorna um `KlString` fluente.
 */
export function unmaskCpf(value: string) {
  return new KlString(value).onlyNumbers();
}

/**
 * Remove máscara de CNPJ (apenas números) e retorna um `KlString` fluente.
 */
export function unmaskCnpj(value: string) {
  return new KlString(value).onlyNumbers();
}

/**
 * Envolve um valor string em `KlString` para iniciar encadeamento fluente.
 */
export function string(value: string) {
  return new KlString(value);
}
