import * as cnpj from 'validation-br/dist/cnpj'
import { KlString } from './KlString'

describe('KlString', () => {
  it('clear', () => {
    expect(new KlString('Olá Mundo').clear('-').toString()).toBe('Ola-Mundo')
  })

  it('nbl2br', () => {
    expect(new KlString('Olá\nMundo').nbl2br().toString()).toBe('Olá<br/>Mundo')
  })

  it('maskCpf', () => {
    expect(new KlString('9964085842').maskCpf().toString()).toBe(
      '099.640.858-42',
    )
  })

  it('maskCnpj', () => {
    expect(new KlString('5581451000183').maskCnpj().toString()).toBe(
      '05.581.451/0001-83',
    )
  })

  it('onlyNumbers', () => {
    expect(new KlString('05.581.451/0001-83').onlyNumbers().toString()).toBe(
      '05581451000183',
    )
  })

  it('validateCpf', () => {
    expect(new KlString('099.640.858-42').validateCpf()).toBe(true)
  })

  it('validateCnpj', () => {
    expect(new KlString('05.581.451/0001-83').validateCnpj()).toBe(true)
    expect(new KlString(cnpj.fake({ alphanumeric: true })).validateCnpj()).toBe(
      true,
    )
  })

  it('toCamelCase', () => {
    expect(new KlString('Olá Mundo').toCamelCase().toString()).toBe('olaMundo')
  })

  it('split', () => {
    expect(new KlString('1,2').split(',')).toStrictEqual(['1', '2'])
  })

  it('unmaskCoin', () => {
    expect(new KlString('1.000,00').unmaskCoin().toNumber()).toBe(1000)
  })

  it('random', () => {
    expect(
      typeof new KlString('')
        .random(4, {
          lowercase: true,
          numbers: true,
          specialCharacters: true,
          uppercase: true,
        })
        .toString(),
    ).toBe('string')
  })

  it('toBase64', () => {
    expect(new KlString('teste').toBase64().toString()).toBe('dGVzdGU=')
  })

  it('concat', () => {
    expect(new KlString('teste').contatenate('1').toString()).toBe('teste1')
  })
})
