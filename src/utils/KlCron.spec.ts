import { klCron } from '../operators/cron'
import { klDelay } from '../operators/delay'

describe('KlCron', () => {
  it('timer execution cron', async () => {
    const cron = klCron()

    cron.start()
    await klDelay(2000)
    cron.end()

    expect(cron.duration().getValue()).toBe(2)
  })
})
