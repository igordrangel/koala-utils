import camelCase from 'lodash/camelCase';
import { KlArray } from './KlArray';
import { KlAbstract } from './KlAbstract';
import { KlNumber } from './KlNumber';

export class KlString extends KlAbstract<string> {
  constructor(value: string) {
    super(value);
  }

  public removeSpaces(delimiter: string = '') {
    this.value = this.value.normalize('NFD').replace(/\s/g, delimiter);
    return this;
  }

  public replace(searchValue: string | RegExp, replaceValue: string) {
    this.value = this.value.replace(searchValue, replaceValue);
    return this;
  }

  public split(delimiter: string = ',') {
    if (this.value.indexOf(delimiter) >= 0) {
      return new KlArray<string>(this.value.split(delimiter));
    } else {
      return new KlArray<string>(this.value.split(new RegExp(/\r\n|\r|\n/, 'gi')));
    }
  }

  public clear(delimiter: string = ' ') {
    this.value = this.value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/([^\w]+|\s+)/g, delimiter) // Substitui espaço e outros caracteres por hífen
      .replace(/\-\-+/g, '-') // Substitui multiplos hífens por um único hífen
      .replace(/(^-+|-+$)/, '');

    return this;
  }

  public toCamelCase() {
    this.value = camelCase(this.clear().getValue());
    return this;
  }

  public unmaskCoin(decimalCount: number = 2) {
    return new KlNumber(
      parseFloat(
        Number(
          this.value
            .replace('R$', '')
            .replace(/\s(?=\s)/g, '')
            .replace(/[\n\r\t]/g, '')
            .replace(/[^0-9a-zA-Z\(,\@\-\!\#\\$\%\&\*\(\)\_\+\=\{\[\}\]\/\?\;\:\.\|)\.]+/g, '')
            .replace(/\./g, '')
            .replace(/,/g, '.'),
        ).toFixed(decimalCount),
      ),
    );
  }

  public concat(value: string, toStart: boolean = false) {
    if (toStart) {
      this.value = `${value}${this.value}`;
    } else {
      this.value = `${this.value}${value}`;
    }

    return this;
  }

  public random(
    length: number,
    numbers: boolean,
    uppercase: boolean = false,
    lowercase: boolean = false,
    specialCharacters: boolean = false,
  ) {
    const lmin = 'abcdefghijklmnopqrstuvwxyz';
    const lmai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = '1234567890';
    const simb = '@%_-#$%&*!';
    let result = '';
    let characters = '';

    if (lowercase) characters += lmin;
    if (uppercase) characters += lmai;
    if (numbers) characters += num;
    if (specialCharacters) characters += simb;

    const len = characters.length;
    for (let n = 1; n <= length; n++) {
      const rand = Math.floor(Math.random() * (len - 1 + 1)) + 1;
      result += characters[rand - 1];
    }

    this.value = result;
    return this;
  }

  public maskCpf() {
    this.value = this.leftPad(this.value.replace(/\D/g, ''), 11)
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return this;
  }

  public maskCnpj() {
    this.value = this.leftPad(this.value.replace(/\D/g, ''), 14).replace(
      /^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/,
      '$1.$2.$3/$4-$5',
    );

    return this;
  }

  public nbl2br() {
    this.value = this.value.replace(new RegExp(/\r\n|\r|\n/, 'gi'), '<br/>');
    return this;
  }

  public normalize() {
    this.value = this.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return this;
  }

  public toBase64() {
    this.value = Buffer.from(this.value).toString('base64');
    return this;
  }

  private leftPad(value: string, totalWidth: number, paddingChar?: string) {
    const length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
  }
}
