import { klDelay } from '../operators/delay'

describe('KlDelay', () => {
  it('delay', async () => {
    await klDelay(1000)
    expect(true).toBe(true)
  })
})
