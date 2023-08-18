import camelCase from 'lodash/camelCase'
import { KlArray } from './KlArray'
import { KlAbstract } from './KlAbstract'
import { KlNumber } from './KlNumber'

export interface KlStringRandomOptions {
  numbers?: boolean
  uppercase?: boolean
  lowercase?: boolean
  specialCharacters?: boolean
}

export class KlString extends KlAbstract<string> {
  constructor(value: string) {
    super(value)
  }

  removeSpaces(delimiter: string = '') {
    this.value = this.value.normalize('NFD').replace(/\s/g, delimiter)
    return this
  }

  replace(searchValue: string | RegExp, replaceValue: string) {
    this.value = this.value.replace(searchValue, replaceValue)
    return this
  }

  split(delimiter: string = ',') {
    if (this.value.indexOf(delimiter) >= 0) {
      return new KlArray<string>(this.value.split(delimiter))
    } else {
      return new KlArray<string>(this.value.split(/\r\n|\r|\n/gi))
    }
  }

  clear(delimiter: string = ' ') {
    this.value = this.value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/([^\w]+|\s+)/g, delimiter) // Substitui espaço e outros caracteres por hífen
      .replace(/\-\-+/g, '-') // Substitui multiplos hífens por um único hífen
      .replace(/(^-+|-+$)/, '')

    return this
  }

  toCamelCase() {
    this.value = camelCase(this.clear().getValue())
    return this
  }

  unmaskCoin(decimalCount: number = 2) {
    return new KlNumber(
      parseFloat(
        Number(
          this.value
            .replace('R$', '')
            .replace(/\s(?=\s)/g, '')
            .replace(/[\n\r\t]/g, '')
            .replace(
              /[^0-9a-zA-Z\(,\@\-\!\#\\$\%\&\*\(\)\_\+\=\{\[\}\]\/\?\;\:\.\|)\.]+/g,
              '',
            )
            .replace(/\./g, '')
            .replace(/,/g, '.'),
        ).toFixed(decimalCount),
      ),
    )
  }

  concat(value: string, toStart: boolean = false) {
    if (toStart) {
      this.value = `${value}${this.value}`
    } else {
      this.value = `${this.value}${value}`
    }

    return this
  }

  random(
    length: number,
    { lowercase, uppercase, numbers, specialCharacters }: KlStringRandomOptions,
  ) {
    const lmin = 'abcdefghijklmnopqrstuvwxyz'
    const lmai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const num = '1234567890'
    const simb = '@%_-#$%&*!'
    let result = ''
    let characters = ''

    if (lowercase) characters += lmin
    if (uppercase) characters += lmai
    if (numbers) characters += num
    if (specialCharacters) characters += simb

    const len = characters.length
    for (let n = 1; n <= length; n++) {
      const rand = Math.floor(Math.random() * (len - 1 + 1)) + 1
      result += characters[rand - 1]
    }

    this.value = result
    return this
  }

  maskCpf() {
    this.value = this.leftPad(this.value.replace(/\D/g, ''), 11)
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

    return this
  }

  maskCnpj() {
    this.value = this.leftPad(this.value.replace(/\D/g, ''), 14).replace(
      /^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/,
      '$1.$2.$3/$4-$5',
    )

    return this
  }

  unmaskCpf() {
    this.value = this.removeMaskCpfOrCnpj()
    return this
  }

  unmaskCnpj() {
    this.value = this.removeMaskCpfOrCnpj()
    return this
  }

  validateCpf() {
    function calcChecker1(digits: any) {
      let sum = 0

      for (let j = 0; j < 9; ++j) {
        sum += digits.toString().charAt(j) * (10 - j)
      }

      const lastSumChecker1 = sum % 11

      return lastSumChecker1 < 2 ? 0 : 11 - lastSumChecker1
    }

    function calcChecker2(cpfWithChecker1: any) {
      let sum = 0

      for (let k = 0; k < 10; ++k) {
        sum += cpfWithChecker1.toString().charAt(k) * (11 - k)
      }

      const lastSumChecker2 = sum % 11

      return lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2
    }

    const cleanCPF = this.removeMaskCpfOrCnpj()
    const firstNineDigits = cleanCPF.substring(0, 9)
    const checker = cleanCPF.substring(9, 11)

    if (cleanCPF.length !== 11) {
      return false
    }

    // Checking if all digits are equal
    for (let i = 0; i < 10; i++) {
      if ('' + firstNineDigits + checker === Array(12).join(`${i}`)) {
        return false
      }
    }

    const checker1 = calcChecker1(firstNineDigits)
    const checker2 = calcChecker2(firstNineDigits + '' + checker1)

    return checker.toString() === checker1.toString() + checker2.toString()
  }

  validateCnpj() {
    const value = this.removeMaskCpfOrCnpj()

    if (value === '') {
      return false
    }

    if (value.length !== 14) {
      return false
    }

    // Elimina CNPJs invalidos conhecidos
    if (
      value === '00000000000000' ||
      value === '11111111111111' ||
      value === '22222222222222' ||
      value === '33333333333333' ||
      value === '44444444444444' ||
      value === '55555555555555' ||
      value === '66666666666666' ||
      value === '77777777777777' ||
      value === '88888888888888' ||
      value === '99999999999999'
    ) {
      return false
    }

    // Valida DVs
    let tamanho = value.length - 2
    let numeros = value.substring(0, tamanho)
    const digitos = value.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--
      if (pos < 2) {
        pos = 9
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado !== parseInt(digitos.charAt(0), 10)) {
      return false
    }

    tamanho = tamanho + 1
    numeros = value.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--
      if (pos < 2) {
        pos = 9
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    return !(resultado !== parseInt(digitos.charAt(1), 10))
  }

  nbl2br() {
    this.value = this.value.replace(/\r\n|\r|\n/gi, '<br/>')
    return this
  }

  normalize() {
    this.value = this.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return this
  }

  toBase64() {
    this.value = Buffer.from(this.value).toString('base64')
    return this
  }

  leftPad(value: string, totalWidth: number, paddingChar?: string) {
    const length = totalWidth - value.toString().length + 1
    return Array(length).join(paddingChar || '0') + value
  }

  toRegex() {
    function isDelimiter(value: string) {
      return /(\.|\/|-)/.test(value)
    }

    function getRegexScopeByValue(value: string) {
      if (isNaN(value as any)) {
        return 'S'
      } else {
        return 'd'
      }
    }

    const mask = this.value

    let regex = ''
    let qtyCharactersBeforeDelimiter = 0

    for (let pos = 0; pos < mask.length; pos++) {
      ++qtyCharactersBeforeDelimiter

      const value = mask.substring(pos, pos + 1)
      const beforeValue = mask.substring(pos - 1, pos - 1 + 1)

      if (isDelimiter(value) || pos === mask.length - 1) {
        let delimiter = value

        if (isDelimiter(value)) {
          qtyCharactersBeforeDelimiter -= 1
        } else {
          delimiter = ''
        }

        regex += `\\${getRegexScopeByValue(
          beforeValue,
        )}{${qtyCharactersBeforeDelimiter}}${delimiter}`
        qtyCharactersBeforeDelimiter = 0
      }
    }

    return new RegExp(regex)
  }

  private removeMaskCpfOrCnpj() {
    return this.value.replace(/\D/g, '')
  }
}
