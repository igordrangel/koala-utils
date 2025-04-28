import { KlTime } from './KlTime'

describe('KlTime', () => {
  it('compare time', () => {
    const date = new Date()
    date.setHours(8, 0, 0, 0)

    expect(new KlTime(10, 0, 0) > date).toBeTruthy()
  })

  it('format time', () => {
    expect(new KlTime(10, 0, 0).format()).toBe('10:00:00')
  })

  it('format with GMT', () => {
    expect(
      new KlTime(13).toUTC().changeTimeZone('America/Sao_Paulo').format(),
    ).toBe('16:00:00')
  })

  it('add', () => {
    expect(new KlTime(13).add(1, 'hours').format()).toBe('14:00:00')
  })

  it('sub', () => {
    expect(new KlTime(13).sub(1, 'hours').format()).toBe('12:00:00')
  })

  it('diff', () => {
    expect(new KlTime(13).diff(new KlTime(14), 'hours')).toBe(1)
  })
})
