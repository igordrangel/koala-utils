import { klNumber } from '../operators/number'

describe('KlNumber', () => {
  it('random', () =>
    expect(typeof klNumber(0).random(1000, 2000).getValue()).toBe('number'))

  it('maskCoin', () =>
    expect(klNumber(1000).maskCoin().getValue()).toBe('R$ 1.000,00'))
})
