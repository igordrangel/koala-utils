import { format } from 'date-fns'
import { KlDate } from './KlDate'
import { KlTimeTimeType } from './types/KlTimeTimeType'
import { KlDateTimeZone } from './types/KlDateTimeZone'

export class KlTime extends Date {
  constructor()
  constructor(value: Date)
  constructor(hours?: number, minutes?: number, seconds?: number, ms?: number)

  constructor(
    value?: number | Date,
    minutes?: number,
    seconds?: number,
    miliseconds?: number,
  ) {
    if (value instanceof Date) {
      super(value)
      return
    }

    const date = new Date()
    super(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      value ?? 0,
      minutes ?? 0,
      seconds ?? 0,
      miliseconds ?? 0,
    )
  }

  /**
   * Formata o horário atual em uma string com base no padrão fornecido.
   * @param mask Máscara de formatação (ex.: 'HH:mm:ss').
   * @returns Uma string representando a data formatada.
   */
  format(mask?: string): string {
    return format(this, mask || 'HH:mm:ss')
  }

  /**
   * Altera o fuso horário (GMT) da data atual.
   * @param GMT String representando o GMT (ex.: '+3', '-2').
   * @returns Uma nova instância de `KlDate` com o GMT ajustado.
   */
  changeTimeZone(timeZone: KlDateTimeZone) {
    const date = new KlDate(this.toLocaleString('en-US', { timeZone }))
    const hours = +date.format('HH')
    const minutes = +date.format('mm')
    const seconds = +date.format('ss')

    return new KlTime(hours, minutes, seconds)
  }

  /**
   * Converte a data atual para o formato UTC.
   * @returns Uma nova instância de `KlDate` no formato UTC.
   */
  toUTC() {
    const date = new KlDate(
      this.toLocaleString('en-US', {
        timeZone: 'UTC',
      }),
    )
    const hours = +date.format('HH')
    const minutes = +date.format('mm')
    const seconds = +date.format('ss')
    return new KlTime(hours, minutes, seconds)
  }

  /**
   * Adiciona uma quantidade de tempo à data atual.
   * @param qty Quantidade de tempo a ser adicionada.
   * @param type Tipo de unidade de tempo (ex.: 'seconds', 'minutes', 'hours').
   * @returns A própria instância de `KlDate` com a data ajustada.
   */
  add(qty: number, type: KlTimeTimeType) {
    switch (type) {
      case 'seconds':
        this.setSeconds(this.getSeconds() + qty)
        break
      case 'minutes':
        this.setMinutes(this.getMinutes() + qty)
        break
      case 'hours':
        this.setHours(this.getHours() + qty)
        break
    }

    return this
  }

  /**
   * Subtrai uma quantidade de tempo da data atual.
   * @param qty Quantidade de tempo a ser subtraída.
   * @param type Tipo de unidade de tempo (ex.: 'seconds', 'minutes', 'hours').
   * @returns A própria instância de `KlDate` com a data ajustada.
   */
  sub(qty: number, type: KlTimeTimeType) {
    switch (type) {
      case 'seconds':
        this.setSeconds(this.getSeconds() - qty)
        break
      case 'minutes':
        this.setMinutes(this.getMinutes() - qty)
        break
      case 'hours':
        this.setHours(this.getHours() - qty)
        break
    }

    return this
  }

  /**
   * Calcula a diferença entre a data atual e outra data fornecida.
   * @param date A data para calcular a diferença.
   * @param type Tipo de unidade de tempo para o cálculo (ex.: 'seconds', 'minutes').
   * @returns A diferença entre as datas na unidade especificada.
   */
  diff(date: Date, type: KlTimeTimeType) {
    const diffInMs = Math.abs(this.getTime() - date.getTime())

    switch (type) {
      case 'seconds':
        return Math.floor(diffInMs / 1000)
      case 'minutes':
        return Math.floor(diffInMs / (1000 * 60))
      case 'hours':
        return Math.floor(diffInMs / (1000 * 60 * 60))
    }
  }
}
