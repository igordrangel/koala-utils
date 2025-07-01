import { format } from 'date-fns'
import { KlDateDayEnum } from '../enums/KlDateDayEnum'
import { KlDateDateType } from '../types/KlDateDateType'
import { KlDateTimeZone } from '../types/KlDateTimeZone'

interface KlDateOptions {
  skipDays?: KlDateDayEnum[]
}

export class KlDate extends Date {
  /**
   * Formata a data atual em uma string com base no padrão fornecido.
   * @param mask Máscara de formatação (ex.: 'dd/MM/yyyy HH:mm:ss').
   * @returns Uma string representando a data formatada.
   */
  format(mask?: string) {
    return format(this, mask || 'dd/MM/yyyy HH:mm:ss')
  }

  /**
   * Altera o fuso horário (GMT) da data atual.
   * @param timeZone String representando o GMT (ex.: '+3', '-2').
   * @returns Uma nova instância de `KlDate` com o GMT ajustado.
   */
  changeTimeZone(timeZone: KlDateTimeZone) {
    return new KlDate(this.toLocaleString('en-US', { timeZone }))
  }

  /**
   * Converte a data atual para o formato UTC.
   * @returns Uma nova instância de `KlDate` no formato UTC.
   */
  toUTC() {
    return new KlDate(
      this.toLocaleString('en-US', {
        timeZone: 'UTC',
      }),
    )
  }

  /**
   * Adiciona uma quantidade de tempo à data atual.
   * @param qty Quantidade de tempo a ser adicionada.
   * @param type Tipo de unidade de tempo (ex.: 'seconds', 'days', 'months').
   * @param options Opções para ignorar feriados ou dias específicos.
   * @returns A própria instância de `KlDate` com a data ajustada.
   */
  add(qty: number, type: KlDateDateType, options?: KlDateOptions) {
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
      case 'days':
        this.setDate(this.getDate() + qty)
        break
      case 'months':
        this.setMonth(this.getMonth() + qty)
        break
      case 'years':
        this.setFullYear(this.getFullYear() + qty)
        break
    }

    // Ignora feriados ou dias específicos, se configurado.
    if (options?.skipDays && options.skipDays.includes(this.getDay())) {
      this.add(1, 'days', options)
    }

    return this
  }

  /**
   * Subtrai uma quantidade de tempo da data atual.
   * @param qty Quantidade de tempo a ser subtraída.
   * @param type Tipo de unidade de tempo (ex.: 'seconds', 'days', 'months').
   * @param options Opções para ignorar feriados ou dias específicos.
   * @returns A própria instância de `KlDate` com a data ajustada.
   */
  sub(qty: number, type: KlDateDateType, options?: KlDateOptions) {
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
      case 'days':
        this.setDate(this.getDate() - qty)
        break
      case 'months':
        this.setMonth(this.getMonth() - qty)
        break
      case 'years':
        this.setFullYear(this.getFullYear() - qty)
        break
    }

    // Ignora feriados ou dias específicos, se configurado.
    if (options?.skipDays && options.skipDays.includes(this.getDay())) {
      return this.sub(1, 'days', options)
    }

    return this
  }

  /**
   * Calcula a diferença entre a data atual e outra data fornecida.
   * @param date A data para calcular a diferença.
   * @param type Tipo de unidade de tempo para o cálculo (ex.: 'seconds', 'days').
   * @returns A diferença entre as datas na unidade especificada.
   */
  diff(date: Date, type: KlDateDateType) {
    const diffInMs = Math.abs(this.getTime() - date.getTime())

    switch (type) {
      case 'seconds':
        return Math.floor(diffInMs / 1000)
      case 'minutes':
        return Math.floor(diffInMs / (1000 * 60))
      case 'hours':
        return Math.floor(diffInMs / (1000 * 60 * 60))
      case 'days':
        return Math.floor(diffInMs / (1000 * 60 * 60 * 24))
      case 'months':
        return Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30))
      case 'years':
        return Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365))
    }
  }
}
