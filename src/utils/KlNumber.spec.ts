import { KlNumber } from './KlNumber'

describe('KlNumber', () => {
  it('random', () => {
    expect(new KlNumber(0).random(1000, 2000)).toBeInstanceOf(KlNumber)
    expect(
      new KlNumber(0).random(1000, 2000).toNumber(),
    ).toBeGreaterThanOrEqual(1000)
  })

  it('maskCoin', () => {
    expect(new KlNumber(1000).maskCoin()).toBe('R$ 1.000,00')
  })
})
