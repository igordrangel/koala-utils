import { clone, klObject } from '../operators/object'

describe('KlObject', () => {
  it('merge', () =>
    expect(
      klObject({ teste: 1 }).merge<any>({ teste2: 2 }).getValue(),
    ).toStrictEqual({ teste: 1, teste2: 2 }))

  it('toString', () =>
    expect(
      klObject({
        param1: 'Hello',
        param2: 'World',
      })
        .toString(['param1', 'param2'])
        .getValue(),
    ).toBe('Hello World'))

  it('clone', () => expect(clone({ teste: 1 })).toStrictEqual({ teste: 1 }))
})
