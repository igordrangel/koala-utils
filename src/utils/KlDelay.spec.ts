import { delay } from './KlDelay'

describe('KlDelay', () => {
  it('delay', async () => {
    await delay(10)
    expect(true).toBe(true)
  })
})
