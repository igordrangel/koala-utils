import { KlAbstract } from './KlAbstract';
import { KlString } from './KlString';

export class KlNumber extends KlAbstract<number> {
  constructor(value: number) {
    super(value);
  }

  public random(min: number, max: number) {
    if (min > max) {
      throw new Error('The min value cannot be greater than the max');
    }

    this.value = Math.floor(Math.random() * (max - min + 1)) + min;

    return this;
  }
  
  public maskCoin(prefix = 'R$', thousands = '.', decimal = ',', decimalCount = 2) {
    const coin = this.formatMoney(this.value, decimalCount, decimal, thousands);
    return new KlString(`${prefix} ${coin}`);
  }
  
  private formatMoney(amount: number | string, decimalCount = 2, decimal = '.', thousands = ',') {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    
    const negativeSign = amount < 0 ? '-' : '';
    
    const i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)), 10).toString();
    const j = i.length > 3 ? i.length % 3 : 0;
    
    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
        Math.abs(Number(amount) - Number(i))
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  }
}
