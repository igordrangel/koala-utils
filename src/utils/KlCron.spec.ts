import { delay } from './KlDelay'
import { KlCron } from './KlCron'

describe('KlCron', () => {
  it('timer execution cron', async () => {
    const cron = new KlCron()

    cron.start()
    await delay(1000)
    cron.end()

    expect(cron.duration()).toBe(1)
  })
})
