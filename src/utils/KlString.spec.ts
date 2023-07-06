import { klString } from '../operators/string'

describe('KlString', () => {
  it('clear', () =>
    expect(klString('Olá Mundo').clear('-').getValue()).toBe('Ola-Mundo'))

  it('nbl2br', () =>
    expect(klString('Olá\nMundo').nbl2br().getValue()).toBe('Olá<br/>Mundo'))

  it('maskCpf', () =>
    expect(klString('9964085842').maskCpf().getValue()).toBe('099.640.858-42'))

  it('maskCnpj', () =>
    expect(klString('5581451000183').maskCnpj().getValue()).toBe(
      '05.581.451/0001-83',
    ))

  it('unmaskCpf', () =>
    expect(klString('099.640.858-42').unmaskCpf().getValue()).toBe(
      '09964085842',
    ))

  it('unmaskCnpj', () =>
    expect(klString('05.581.451/0001-83').unmaskCnpj().getValue()).toBe(
      '05581451000183',
    ))

  it('validateCpf', () =>
    expect(klString('099.640.858-42').validateCpf()).toBe(true))

  it('validateCnpj', () =>
    expect(klString('05.581.451/0001-83').validateCnpj()).toBe(true))

  it('toCamelCase', () =>
    expect(klString('Olá Mundo').toCamelCase().getValue()).toBe('olaMundo'))

  it('split', () =>
    expect(klString('1,2').split().getValue()).toStrictEqual(['1', '2']))

  it('unmaskCoin', () =>
    expect(klString('1.000,00').unmaskCoin().getValue()).toBe(1000))

  it('random', () =>
    expect(
      typeof klString('')
        .random(4, {
          lowercase: true,
          numbers: true,
          specialCharacters: true,
          uppercase: true,
        })
        .getValue(),
    ).toBe('string'))

  it('toBase64', () =>
    expect(klString('teste').toBase64().getValue()).toBe('dGVzdGU='))

  it('concat', () =>
    expect(klString('teste').concat('1').getValue()).toBe('teste1'))

  it('replace', () =>
    expect(klString('Hellow World').replace('Hellow', 'Hello').getValue()).toBe(
      'Hello World',
    ))
})
