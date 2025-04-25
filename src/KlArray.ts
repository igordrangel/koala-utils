export class KlArray<T = any> extends Array<T> {
  constructor(initialValue: T[] = []) {
    super()
    if (typeof initialValue[Symbol.iterator] === 'function') {
      this.push(...initialValue)
    }
  }

  /**
   * Remove valores "falsy" (como `null`, `undefined`, `false`, `0`, `NaN` e strings vazias) do array.
   * @returns Um novo `KlArray` contendo apenas os valores "truthy".
   */
  clearEmptyValues() {
    return new KlArray<NonNullable<T>>(
      this.filter((item): item is NonNullable<T> => !!item),
    )
  }

  /**
   * Divide o array em subarrays com um número máximo de elementos especificado.
   * @param maxRowsSplit Número máximo de elementos em cada subarray.
   * @returns Um novo KlArray contendo subarrays do tipo KlArray.
   */
  split(maxRowsSplit: number) {
    const result = new KlArray<KlArray<T>>()

    let group = 0

    this.forEach((value, index) => {
      if (result[group] === undefined) {
        result[group] = new KlArray<T>()
      }

      result[group].push(value)

      if ((index + 1) % maxRowsSplit === 0) {
        group = group + 1
      }
    })

    return result
  }

  /**
   * Ordena os elementos do array com base em uma propriedade específica e na direção desejada.
   * @param by Nome da propriedade usada para ordenar os elementos.
   * @param direction Direção da ordenação: 'asc' para ascendente (padrão) ou 'desc' para descendente.
   * @returns Um novo KlArray com os elementos ordenados.
   */
  orderBy(by: string, direction: 'asc' | 'desc' = 'asc') {
    const inverse = direction === 'desc'

    this.sort((a: any, b: any) => {
      if (typeof a !== 'string' && typeof b !== 'string') {
        if ((!inverse && a[by] > b[by]) || (inverse && a[by] < b[by])) {
          return 1
        } else if ((!inverse && a[by] < b[by]) || (inverse && a[by] > b[by])) {
          return -1
        } else {
          return 0
        }
      } else {
        return 0
      }
    })

    return this
  }

  /**
   * Embaralha os elementos do array de forma aleatória, garantindo que o resultado seja diferente do original.
   * @returns O próprio KlArray com os elementos embaralhados.
   */
  shuffle() {
    const originalValue = JSON.parse(JSON.stringify(this))

    do {
      for (let i = this.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1))
        ;[this[i], this[rand]] = [this[rand], this[i]]
      }
    } while (JSON.stringify(originalValue) === JSON.stringify(this))

    return this
  }
}
