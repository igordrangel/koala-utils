export class KlNumber extends Number {
  /**
   * Gera um número aleatório entre os valores mínimo e máximo especificados.
   * @param min Valor mínimo do intervalo.
   * @param max Valor máximo do intervalo.
   * @returns Uma nova instância de `KlNumber` com o número aleatório gerado.
   * @throws Erro se o valor mínimo for maior que o valor máximo.
   */
  random(min: number, max: number) {
    if (min > max) {
      throw new Error('The min value cannot be greater than the max')
    }

    return new KlNumber(Math.floor(Math.random() * (max - min + 1)) + min)
  }

  /**
   * Formata o número como uma moeda, utilizando prefixo, separadores de milhar e decimal.
   * @param prefix Prefixo da moeda (ex.: 'R$').
   * @param thousands Separador de milhar (ex.: '.').
   * @param decimal Separador decimal (ex.: ',').
   * @param decimalCount Número de casas decimais (padrão: 2).
   * @returns Uma string representando o número formatado como moeda.
   */
  maskCoin(prefix = 'R$', thousands = '.', decimal = ',', decimalCount = 2) {
    const coin = this.formatMoney(
      this.toNumber(),
      decimalCount,
      decimal,
      thousands,
    )
    return `${prefix} ${coin}`
  }

  /**
   * Converte a instância de `KlNumber` para um número primitivo.
   * @returns O valor numérico da instância.
   */
  toNumber() {
    return this.valueOf()
  }

  /**
   * Formata um número com separadores de milhar e casas decimais.
   * @param amount Valor numérico a ser formatado.
   * @param decimalCount Número de casas decimais (padrão: 2).
   * @param decimal Separador decimal (ex.: '.').
   * @param thousands Separador de milhar (ex.: ',').
   * @returns Uma string representando o número formatado.
   */
  private formatMoney(
    amount: number,
    decimalCount = 2,
    decimal = '.',
    thousands = ',',
  ) {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = Number(amount) < 0 ? '-' : ''

    const result = Math.abs(Number(amount) || 0).toFixed(decimalCount)

    const i = parseInt(result, 10).toString()
    const j = i.length > 3 ? i.length % 3 : 0

    return (
      negativeSign +
      (j ? i.substring(0, j) + thousands : '') +
      i.substring(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(Number(amount) - Number(i))
            .toFixed(decimalCount)
            .slice(2)
        : '')
    )
  }
}

/**
 * Função utilitária para formatar um número como moeda.
 * @param value Valor numérico a ser formatado.
 * @returns Uma string representando o número formatado como moeda.
 */
export function maskCoin(value: number) {
  return new KlNumber(value).maskCoin()
}

/**
 * Função utilitária para gerar um número aleatório.
 * @param min Valor mínimo do intervalo (padrão: 0).
 * @param max Valor máximo do intervalo (padrão: 99999999999).
 * @returns Um número aleatório dentro do intervalo especificado.
 */
export function randomNumber(min?: number, max?: number) {
  return new KlNumber().random(min ?? 0, max ?? 99999999999).toNumber()
}
