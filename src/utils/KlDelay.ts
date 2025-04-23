class KlDelay {
  /**
   * Aguarda um período de tempo especificado antes de resolver a Promise.
   * @param delay Tempo de espera em milissegundos (padrão: 300ms).
   * @returns Uma Promise que será resolvida após o tempo especificado.
   */
  static waitFor(delay: number = 300) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), delay)
    })
  }
}

/**
 * Função utilitária para criar um atraso no código.
 * @param ms Tempo de espera em milissegundos.
 * @returns Uma Promise que será resolvida após o tempo especificado.
 */
export function delay(ms: number) {
  return KlDelay.waitFor(ms)
}
