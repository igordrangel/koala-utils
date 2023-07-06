import { klRequest } from '../operators/http-request'

describe('KlRequest', () => {
  it('get', async () => {
    const response = await klRequest('http://ip.jsontest.com').get('')

    expect(response.statusCode.toString().charAt(0)).toBe('2')
  })

  it('post', async () => {
    const response = await klRequest('http://ip.jsontest.com').post('', {
      property: ['Sites'],
      report_type: ['ALL'],
    })

    expect(response.statusCode.toString().charAt(0)).toBe('2')
  })
})
