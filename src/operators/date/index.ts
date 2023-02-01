import { KlDate } from './../../utils/KlDate';
import { KlDateDateType } from '../../utils/KlDate';
import { KlDateDay } from '../../enums/KlDateDay';

export function date(value: any, GMT?: string) {
  if (typeof value === 'string') {
    if (value !== 'now') {
      if (value.indexOf(':') < 0) {
        value += ' 00:00:00';
      } else if (value.indexOf('T') >= 0) {
        value += GMT ? GMT : '-0300';
      }
      value = new Date(value);
    } else {
      value = new Date();
    }
  }
  return new KlDate(value);
}

export function format(value: string | Date, mask?: string) {
  return date(value).format(mask).getValue();
}

export function isHoliday(value: string | Date, country?: string) {
  return date(value).isHoliday(country);
}

export function add(value: string | Date, qtd: number, type: KlDateDateType = 'days', ignoreDays?: KlDateDay[]) {
  return date(value).add({ type, qtd, ignoreDays }).getValue();
}

export function sub(value: string | Date, qtd: number, type: KlDateDateType = 'days', ignoreDays?: KlDateDay[]) {
  return date(value).sub({ type, qtd, ignoreDays }).getValue();
}

export function diff(startDate: string | Date, endDate: string | Date, type: KlDateDateType = 'days') {
  return date(startDate).diff(endDate, type).getValue();
}
