import { KlArray } from './KlArray'

describe('KlArray', () => {
  it('split', () => {
    expect(new KlArray([1, 2, 3, 4]).split(2)).toEqual([
      [1, 2],
      [3, 4],
    ])
  })

  it('orderBy', () => {
    expect(
      new KlArray([
        { date: new Date('2020-06-18') },
        { date: new Date('2020-06-15') },
        { date: new Date('2020-06-17') },
        { date: new Date('2020-06-20') },
      ]).orderBy('date'),
    ).toEqual([
      { date: new Date('2020-06-15') },
      { date: new Date('2020-06-17') },
      { date: new Date('2020-06-18') },
      { date: new Date('2020-06-20') },
    ])
  })

  it('orderBy inversed', () => {
    expect(
      new KlArray([
        { date: new Date('2020-06-18') },
        { date: new Date('2020-06-15') },
        { date: new Date('2020-06-17') },
        { date: new Date('2020-06-20') },
      ]).orderBy('date', 'desc'),
    ).toEqual([
      { date: new Date('2020-06-20') },
      { date: new Date('2020-06-18') },
      { date: new Date('2020-06-17') },
      { date: new Date('2020-06-15') },
    ])
  })

  it('shuffleArray', () => {
    const originalArray = new KlArray([{ id: 1 }, { id: 2 }, { id: 3 }])
    const shuffledArray = new KlArray(originalArray).shuffle()

    expect(
      JSON.stringify(originalArray) !== JSON.stringify(shuffledArray),
    ).toBe(true)
  })

  it('clearEmptyValues', () => {
    expect(new KlArray([1, 2, null, 3]).clearEmptyValues()).toEqual([1, 2, 3])
  })
})
