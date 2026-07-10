import { KlDate } from "../core/KlDate";
import { KlString } from "../core/KlString";
import { KlDateCountry } from "../core/types/KlDateCountry";
import { KlDateDateType } from "../core/types/KlDateDateType";
import { KlDateTimeZone } from "../core/types/KlDateTimeZone";
import { KlDateDayEnum } from "../core/enums/KlDateDayEnum";

type KlDateOptions = {
  skipHolidays?: { country: KlDateCountry };
  skipDays?: KlDateDayEnum[];
};

/**
 * Formata uma data e retorna `KlString` para encadeamento (ex.: `.split("/")`).
 */
export function format(value: Date | string | number, mask?: string) {
  return new KlString(new KlDate(value).format(mask));
}

/**
 * Envolve o valor em `KlDate` para encadeamento fluente.
 */
export function date(value?: Date | string | number) {
  return value === undefined ? new KlDate() : new KlDate(value);
}

/**
 * Adiciona tempo à data e retorna `KlDate` fluente.
 */
export function add(
  value: Date | string | number,
  qty: number,
  type: KlDateDateType,
  options?: KlDateOptions,
) {
  return new KlDate(value).add(qty, type, options);
}

/**
 * Subtrai tempo da data e retorna `KlDate` fluente.
 */
export function sub(
  value: Date | string | number,
  qty: number,
  type: KlDateDateType,
  options?: KlDateOptions,
) {
  return new KlDate(value).sub(qty, type, options);
}

/**
 * Altera o fuso e retorna `KlDate` fluente.
 */
export function changeTimeZone(
  value: Date | string | number,
  timeZone: KlDateTimeZone,
) {
  return new KlDate(value).changeTimeZone(timeZone);
}

/**
 * Converte para UTC e retorna `KlDate` fluente.
 */
export function toUTC(value: Date | string | number) {
  return new KlDate(value).toUTC();
}

/**
 * Diferença entre datas (retorno terminal numérico).
 */
export function diff(
  value: Date | string | number,
  other: Date,
  type: KlDateDateType,
) {
  return new KlDate(value).diff(other, type);
}

/**
 * Verifica feriado (requer `@koalarx/utils/holidays`).
 */
export function isHoliday(
  value: Date | string | number,
  country: KlDateCountry = "BR",
) {
  return new KlDate(value).isHoliday(country);
}
