export class KlArray<T = any> extends Array<T> {
  constructor(initialValue: T[] = []) {
    super();
    if (typeof initialValue[Symbol.iterator] === "function") {
      this.push(...initialValue);
    }
  }

  /**
   * Cria um novo array com o resultado da função de callback aplicada a cada elemento.
   * @param callbackfn Função executada para cada elemento.
   * @param thisArg Valor a ser usado como `this` ao executar `callbackfn`.
   * @returns Um novo `KlArray` com os valores transformados.
   */
  map<U>(
    callbackfn: (value: T, index: number, array: KlArray<T>) => U,
    thisArg?: any,
  ): KlArray<U> {
    return new KlArray(Array.from(super.map(callbackfn as any, thisArg)));
  }

  /**
   * Filtra os elementos do array com base em um predicado de tipo.
   * @param predicate Função que estreita o tipo dos elementos.
   * @param thisArg Valor a ser usado como `this` ao executar `predicate`.
   * @returns Um novo `KlArray` contendo apenas os elementos que satisfazem o predicado.
   */
  filter<S extends T>(
    predicate: (value: T, index: number, array: KlArray<T>) => value is S,
    thisArg?: any,
  ): KlArray<S>;
  /**
   * Filtra os elementos do array com base em um predicado.
   * @param predicate Função que determina se o elemento deve ser incluído.
   * @param thisArg Valor a ser usado como `this` ao executar `predicate`.
   * @returns Um novo `KlArray` contendo apenas os elementos que satisfazem o predicado.
   */
  filter(
    predicate: (value: T, index: number, array: KlArray<T>) => unknown,
    thisArg?: any,
  ): KlArray<T>;
  filter(predicate: any, thisArg?: any): KlArray<T> {
    return new KlArray(Array.from(super.filter(predicate, thisArg)));
  }

  /**
   * Mapeia cada elemento para um array (ou valor) e achata o resultado em um nível.
   * @param callbackfn Função executada para cada elemento.
   * @param thisArg Valor a ser usado como `this` ao executar `callbackfn`.
   * @returns Um novo `KlArray` com os valores achatados.
   */
  flatMap<U, This = undefined>(
    callback: (
      this: This,
      value: T,
      index: number,
      array: KlArray<T>,
    ) => U | readonly U[],
    thisArg?: This,
  ): KlArray<U> {
    return new KlArray(Array.from(super.flatMap(callback as any, thisArg)));
  }

  /**
   * Retorna uma cópia superficial de uma porção do array.
   * @param start Índice inicial (inclusivo).
   * @param end Índice final (exclusivo).
   * @returns Um novo `KlArray` com a porção selecionada.
   */
  slice(start?: number, end?: number): KlArray<T> {
    return new KlArray(Array.from(super.slice(start, end)));
  }

  /**
   * Concatena o array atual com outros arrays ou valores.
   * @param items Arrays ou valores a serem concatenados.
   * @returns Um novo `KlArray` com os elementos concatenados.
   */
  concat(...items: ConcatArray<T>[]): KlArray<T>;
  concat(...items: (T | ConcatArray<T>)[]): KlArray<T>;
  concat(...items: any[]): KlArray<T> {
    return new KlArray(Array.from(super.concat(...items)));
  }

  /**
   * Remove valores "falsy" (como `null`, `undefined`, `false`, `0`, `NaN` e strings vazias) do array.
   * @returns Um novo `KlArray` contendo apenas os valores "truthy".
   */
  clearEmptyValues() {
    return new KlArray<NonNullable<T>>(
      this.filter((item): item is NonNullable<T> => !!item),
    );
  }

  /**
   * Divide o array em subarrays com um número máximo de elementos especificado.
   * @param maxRowsSplit Número máximo de elementos em cada subarray.
   * @returns Um novo KlArray contendo subarrays do tipo KlArray.
   */
  split(maxRowsSplit: number) {
    const result = new KlArray<KlArray<T>>();

    let group = 0;

    this.forEach((value, index) => {
      if (result[group] === undefined) {
        result[group] = new KlArray<T>();
      }

      result[group].push(value);

      if ((index + 1) % maxRowsSplit === 0) {
        group = group + 1;
      }
    });

    return result;
  }

  /**
   * Ordena os elementos do array com base em uma propriedade específica e na direção desejada.
   * @param by Nome da propriedade usada para ordenar os elementos.
   * @param direction Direção da ordenação: 'asc' para ascendente (padrão) ou 'desc' para descendente.
   * @returns O próprio KlArray com os elementos ordenados.
   */
  orderBy(by: string, direction: "asc" | "desc" = "asc") {
    const inverse = direction === "desc";

    this.sort((a: any, b: any) => {
      if (typeof a !== "string" && typeof b !== "string") {
        if ((!inverse && a[by] > b[by]) || (inverse && a[by] < b[by])) {
          return 1;
        } else if ((!inverse && a[by] < b[by]) || (inverse && a[by] > b[by])) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });

    return this;
  }

  /**
   * Embaralha os elementos do array de forma aleatória, garantindo que o resultado seja diferente do original.
   * @returns O próprio KlArray com os elementos embaralhados.
   */
  shuffle() {
    const originalValue = JSON.parse(JSON.stringify(this));

    do {
      for (let i = this.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [this[i], this[rand]] = [this[rand], this[i]];
      }
    } while (JSON.stringify(originalValue) === JSON.stringify(this));

    return this;
  }
}
