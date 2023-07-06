import Holidays from 'date-holidays'
import moment from 'moment'
import { klDate } from '../operators/date'
import { KlAbstract } from './KlAbstract'
import { KlNumber } from './KlNumber'
import { KlString } from './KlString'

export type KlDateDateType =
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'months'
  | 'years'

export enum KlDateDay {
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  holidays,
}

export class KlDate extends KlAbstract<Date> {
  constructor(value: Date) {
    super(value)
  }

  format(format = 'DD/MM/YYYY HH:mm:ss') {
    return new KlString(moment(this.value).format(format))
  }

  add(config: { qtd: number; type: KlDateDateType; ignoreDays?: KlDateDay[] }) {
    let momentDate = moment(this.value).add(config.qtd, config.type)

    if (!config.ignoreDays) config.ignoreDays = []
    while (
      config.ignoreDays.indexOf(momentDate.toDate().getDay()) >= 0 ||
      (config.ignoreDays.indexOf(KlDateDay.holidays) >= 0 &&
        klDate(momentDate.toDate()).isHoliday())
    ) {
      momentDate = moment(momentDate.toDate()).add(config.qtd, config.type)
    }

    this.value = momentDate.toDate()
    return this
  }

  sub(config: { qtd: number; type: KlDateDateType; ignoreDays?: KlDateDay[] }) {
    let momentDate = moment(this.value).subtract(config.qtd, config.type)

    if (!config.ignoreDays) config.ignoreDays = []
    while (
      config.ignoreDays.indexOf(momentDate.toDate().getDay()) >= 0 ||
      (config.ignoreDays.indexOf(KlDateDay.holidays) >= 0 &&
        klDate(momentDate.toDate()).isHoliday())
    ) {
      momentDate = moment(momentDate.toDate()).subtract(config.qtd, config.type)
    }

    this.value = momentDate.toDate()
    return this
  }

  diff(diffDate: string | Date, type: KlDateDateType = 'days') {
    return new KlNumber(moment(diffDate).diff(this.value, type))
  }

  isHoliday(country: string = 'BR') {
    const hd = new Holidays(country)
    const date = new Date(this.value.toDateString())
    date.setHours(1)
    return !!hd.isHoliday(date)
  }
}
