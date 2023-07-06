import { KlNumber } from '../../utils/KlNumber'

export function klNumber(value: number) {
  return new KlNumber(value)
}

export function maskCoin(
  value: number,
  options?: {
    prefix?: string
    thousands?: string
    decimal?: string
    decimalCount?: number
  },
) {
  return klNumber(value)
    .maskCoin(
      options?.prefix,
      options?.thousands,
      options?.decimal,
      options?.decimalCount,
    )
    .getValue()
}
