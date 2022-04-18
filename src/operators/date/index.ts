import { koala } from '../../index';
import { KlDateDateType } from '../../utils/KlDate';
import { KlDateDay } from '../../enums/KlDateDay';

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
