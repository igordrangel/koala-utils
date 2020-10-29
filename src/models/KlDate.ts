import * as moment from 'moment';

import { KlAbstract } from './KlAbstract';
import { KlString } from './KlString';
import { DateDayEnum } from '../enums/date-day.enum';

export class KlDate extends KlAbstract<Date> {
  constructor(value: Date) {
    super(value);
  }
  
  public toFormatString(format = 'DD/MM/YYYY HH:mm:ss') {
    return new KlString(moment(this.value).format(format));
  }
  
  public add(config: { qtd: number; type: 'days' | 'months' | 'years'; format?: string; ignoreDays?: DateDayEnum[] }) {
    let momentDate = moment(this.value).add(config.qtd, config.type);
    
    if (!config.ignoreDays) config.ignoreDays = [];
    while (config.ignoreDays.indexOf(momentDate.toDate().getDay()) >= 0) {
      momentDate = moment(momentDate.toDate()).add(config.qtd, config.type);
    }
    
    if (config.format) {
      return momentDate.format(config.format);
    } else {
      return momentDate.toDate();
    }
  }
  
  public sub(config: { qtd: number; type: 'days' | 'months' | 'years'; format?: string; ignoreDays?: DateDayEnum[] }) {
    let momentDate = moment(this.value).subtract(config.qtd, config.type);
    
    if (!config.ignoreDays) config.ignoreDays = [];
    while (config.ignoreDays.indexOf(momentDate.toDate().getDay()) >= 0) {
      momentDate = moment(momentDate.toDate()).subtract(config.qtd, config.type);
    }
    
    if (config.format) {
      return momentDate.format(config.format);
    } else {
      return momentDate.toDate();
    }
  }
}
