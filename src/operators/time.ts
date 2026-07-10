import { KlTime } from "../core/KlTime";
import { KlString } from "../core/KlString";
import { KlTimeTimeType } from "../core/types/KlTimeTimeType";
import { KlDateTimeZone } from "../core/types/KlDateTimeZone";

/**
 * Envolve horas (ou `Date`) em `KlTime` para encadeamento fluente.
 */
export function time(
  hoursOrDate?: number | Date,
  minutes?: number,
  seconds?: number,
  ms?: number,
) {
  if (hoursOrDate instanceof Date) {
    return new KlTime(hoursOrDate);
  }
  return new KlTime(hoursOrDate, minutes, seconds, ms);
}

/**
 * Formata um horário e retorna `KlString` fluente.
 */
export function formatTime(value: Date | KlTime | number, mask?: string) {
  const t =
    value instanceof KlTime
      ? value
      : typeof value === "number"
        ? new KlTime(value)
        : new KlTime(value);
  return new KlString(t.format(mask));
}

/**
 * Adiciona tempo a um horário e retorna `KlTime` fluente.
 */
export function addTime(
  value: Date | KlTime | number,
  qty: number,
  type: KlTimeTimeType,
) {
  const t =
    value instanceof KlTime
      ? new KlTime(value)
      : typeof value === "number"
        ? new KlTime(value)
        : new KlTime(value);
  return t.add(qty, type);
}

/**
 * Subtrai tempo de um horário e retorna `KlTime` fluente.
 */
export function subTime(
  value: Date | KlTime | number,
  qty: number,
  type: KlTimeTimeType,
) {
  const t =
    value instanceof KlTime
      ? new KlTime(value)
      : typeof value === "number"
        ? new KlTime(value)
        : new KlTime(value);
  return t.sub(qty, type);
}

/**
 * Altera fuso de um horário e retorna `KlTime` fluente.
 */
export function changeTimeZoneTime(
  value: Date | KlTime | number,
  timeZone: KlDateTimeZone,
) {
  const t =
    value instanceof KlTime
      ? new KlTime(value)
      : typeof value === "number"
        ? new KlTime(value)
        : new KlTime(value);
  return t.changeTimeZone(timeZone);
}

/**
 * Converte horário para UTC e retorna `KlTime` fluente.
 */
export function toUTCTime(value: Date | KlTime | number) {
  const t =
    value instanceof KlTime
      ? new KlTime(value)
      : typeof value === "number"
        ? new KlTime(value)
        : new KlTime(value);
  return t.toUTC();
}

/**
 * Diferença entre horários (retorno terminal numérico).
 */
export function diffTime(
  value: Date | KlTime | number,
  other: Date,
  type: KlTimeTimeType,
) {
  const t =
    value instanceof KlTime
      ? new KlTime(value)
      : typeof value === "number"
        ? new KlTime(value)
        : new KlTime(value);
  return t.diff(other, type);
}
