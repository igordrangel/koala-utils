import { KlDate } from './../../utils/KlDate';
import { koala } from '../../index';
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
  return koala(value).date().format(mask).getValue();
}

export function isHoliday(value: string | Date, country?: string) {
  return koala(value).date().isHoliday(country);
}

export function add(value: string | Date, qtd: number, type: KlDateDateType = 'days', ignoreDays?: KlDateDay[]) {
  return koala(value).date().add({ type, qtd, ignoreDays }).getValue();
}

export function sub(value: string | Date, qtd: number, type: KlDateDateType = 'days', ignoreDays?: KlDateDay[]) {
  return koala(value).date().sub({ type, qtd, ignoreDays }).getValue();
}

export function diff(startDate: string | Date, endDate: string | Date, type: KlDateDateType = 'days') {
  return koala(startDate).date().diff(endDate, type).getValue();
}
