import { KlString } from './KlString'
import { KlAbstract } from './KlAbstract'
import { json2csv } from 'json-2-csv'
import clone from 'lodash/clone'

export type KlArrayFilterComparatorType =
  | 'like'
  | '='
  | '!='
  | '>='
  | '<='
  | '>'
  | '<'

export class KlArray<T> extends KlAbstract<T[]> {
  constructor(value: T[]) {
    super(value)
  }

  toString(delimiter: string = ',') {
    let stringResult = ''

    this.value?.forEach((value: any) => {
      if (value) {
        if (!stringResult) {
          stringResult = value
        } else {
          stringResult += delimiter + value
        }
      }
    })

    return new KlString(stringResult)
  }

  map<NewType>(callbackFn: (value: T, index: number) => NewType) {
    return new KlArray<NewType>(this.value.map(callbackFn))
  }

  async mapAsync<NewType>(
    callbackFn: (value: T, index: number) => Promise<NewType>,
  ) {
    const newList: NewType[] = []
    for (const [index, value] of this.value.entries()) {
      newList[index] = (await callbackFn(value, index)) as any
    }
    return new KlArray<NewType>(newList)
  }

  forEach(callbackFn: (value: T, index: number) => T) {
    this.value.forEach(callbackFn)
    return this
  }

  async forEachAsync(callbackFn: (value: T, index: number) => Promise<T>) {
    for (const [index, value] of this.value.entries()) {
      await callbackFn(value, index)
    }
    return this
  }

  clearEmptyValues() {
    this.value = this.value.filter((item) => !!item)
    return this
  }

  split(maxRowsSplit: number) {
    const result: any[] = []
    let group = 0

    this.value.forEach((value, index) => {
      if (result[group] === undefined) {
        result[group] = []
      }
      result[group].push(value)

      if ((index + 1) % maxRowsSplit === 0) {
        group = group + 1
      }
    })

    return new KlArray<T[]>(result)
  }

  getIndex(key: string, value: string | number) {
    let indexSearched: number = -1

    this.value.forEach((item: any, index: number) => {
      if (item[key] === value && indexSearched < 0) {
        indexSearched = index
      }
    })

    return indexSearched
  }

  merge(value: T[]) {
    value.forEach((item) => {
      this.value.push(item)
    })

    return this
  }

  filter(
    value: string,
    index?: string,
    options?: {
      comparator?: KlArrayFilterComparatorType
    },
  ) {
    this.value = clone(this.value).filter((item: any) => {
      const filter = index ? item[index] : item
      if (filter) {
        let find = false

        switch (options?.comparator) {
          case '=':
            find = filter === value
            break
          case '!=':
            find = filter !== value
            break
          case '>':
            find = value > filter
            break
          case '<':
            find = value < filter
            break
          case '>=':
            find = value > filter || filter === value
            break
          case '<=':
            find = value < filter || filter === value
            break
          case 'like':
          default:
            ;`${value}`
              .toLowerCase()
              .split(' ')
              .forEach((part) => {
                if (`${filter}`.toLowerCase().indexOf(part) >= 0) {
                  find = true
                  return false
                }
                return false
              })
        }

        return find
      }
      return false
    })

    return this
  }

  orderBy(by: string, inverse: boolean = false) {
    this.value.sort((a: any, b: any) => {
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

  toBase64() {
    return new Promise<KlString>((resolve, reject) => {
      const value = this.value as any[]
      json2csv(
        value,
        (err, csv) => {
          if (err) reject(err)
          if (csv) {
            resolve(new KlString(csv).toBase64())
          } else {
            reject(new Error('Invalid data.'))
          }
        },
        {
          delimiter: {
            field: ';',
          },
        },
      )
    })
  }

  pipe<TypeResult>(callbackFn: (value: this) => TypeResult[]) {
    return new KlArray<TypeResult>(callbackFn(this))
  }

  async pipeAsync<TypeResult>(
    callbackFn: (value: this) => Promise<TypeResult[]>,
  ) {
    return new KlArray<TypeResult>(await callbackFn(this))
  }

  shuffle() {
    for (let i = this.value.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1))
      ;[this.value[i], this.value[rand]] = [this.value[rand], this.value[i]]
    }

    return this
  }
}
