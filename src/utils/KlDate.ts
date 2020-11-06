import * as moment from 'moment';
import * as Holidays from 'date-holidays';

import { KlAbstract } from './KlAbstract';
import { KlString } from './KlString';
import { KlDateDay } from '../enums/KlDateDay';
import { koala } from '../index';

export class KlDate extends KlAbstract<Date> {
  constructor(value: Date) {
    super(value);
  }

  public format(format = 'DD/MM/YYYY HH:mm:ss') {
    return new KlString(moment(this.value).format(format));
  }

  public add(config: { qtd: number; type: 'days' | 'months' | 'years'; ignoreDays?: KlDateDay[] }) {
    let momentDate = moment(this.value).add(config.qtd, config.type);
  
    if (!config.ignoreDays) config.ignoreDays = [];
    while (
      config.ignoreDays.indexOf(momentDate.toDate().getDay()) >= 0 ||
      (config.ignoreDays.indexOf(KlDateDay.holidays) >= 0 && koala(momentDate.toDate()).date().isHoliday())
      ) {
      momentDate = moment(momentDate.toDate()).add(config.qtd, config.type);
    }
  
    this.value = momentDate.toDate();
    return this;
  }
  
  public sub(config: { qtd: number; type: 'days' | 'months' | 'years'; ignoreDays?: KlDateDay[] }) {
    let momentDate = moment(this.value).subtract(config.qtd, config.type);
    
    if (!config.ignoreDays) config.ignoreDays = [];
    while (
      config.ignoreDays.indexOf(momentDate.toDate().getDay()) >= 0 ||
      (config.ignoreDays.indexOf(KlDateDay.holidays) >= 0 && koala(momentDate.toDate()).date().isHoliday())
      ) {
      momentDate = moment(momentDate.toDate()).subtract(config.qtd, config.type);
    }
    
    this.value = momentDate.toDate();
    return this;
  }
  
  public isHoliday(country: string = 'BR') {
    const hd = new Holidays(country);
    const date = new Date(this.value.toDateString());
    date.setHours(1);
    return !!hd.isHoliday(date);
  }
}
