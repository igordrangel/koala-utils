import { KlDate } from './KlDate'

export class KlCron {
  private startDate?: KlDate
  private endDate?: KlDate
  /**
   * Inicia o cronômetro, registrando a data e hora de início.
   * @returns A instância atual de `KlCron` para permitir encadeamento de chamadas.
   */
  start() {
    this.startDate = new KlDate()
    return this
  }

  /**
   * Finaliza o cronômetro, registrando a data e hora de término.
   * @returns A instância atual de `KlCron` para permitir encadeamento de chamadas.
   */
  end() {
    this.endDate = new KlDate()
    return this
  }

  /**
   * Calcula a duração entre o início e o término do cronômetro em segundos.
   * @returns A duração em segundos.
   * @throws Erro caso o cronômetro não tenha sido iniciado ou finalizado.
   */
  duration() {
    if (!this.startDate) throw new Error('The cron is not started.')
    if (!this.endDate) throw new Error('The cron is not ended.')

    return this.startDate.diff(this.endDate, 'seconds')
  }
}
