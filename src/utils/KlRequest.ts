import fetch, { Response } from 'node-fetch'
import { KlAbstract } from './KlAbstract'

export interface KlRequestResponse<TypeResponse> {
  statusCode: number
  data: TypeResponse
}

export interface KlRequestCert {
  cert: string
  key: string
}

export type KlRequestContentType =
  | 'application/x-www-form-urlencoded'
  | 'application/json'
  | 'text/plain'
  | 'application/octet-stream'
  | 'multipart/form-data'

export type KlRequestMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface FileEncodedToBase64Type {
  filename: string
  type: string
  base64: string
}

export class KlRequest extends KlAbstract<string> {
  private headers?: any = undefined
  private cert?: any = undefined

  constructor(urlBase: string) {
    super(urlBase)
  }

  defineHeaders(headers: any) {
    this.headers = headers
    return this
  }

  defineCert(https: any, cert: KlRequestCert) {
    this.cert = new https.Agent(cert)
    return this
  }

  get<TypeResponse>(
    url: string,
    params: any = {},
    contentType?: KlRequestContentType,
  ) {
    return this.request<TypeResponse>('GET', url, params, contentType)
  }

  post<TypeResponse>(
    url: string,
    data: any,
    contentType?: KlRequestContentType,
  ) {
    return this.request<TypeResponse>('POST', url, data, contentType)
  }

  put<TypeResponse>(
    url: string,
    data: any,
    contentType?: KlRequestContentType,
  ) {
    return this.request<TypeResponse>('PUT', url, data, contentType)
  }

  patch<TypeResponse>(
    url: string,
    data: any,
    contentType?: KlRequestContentType,
  ) {
    return this.request<TypeResponse>('PATCH', url, data, contentType)
  }

  delete<TypeResponse>(
    url: string,
    data?: any,
    contentType?: KlRequestContentType,
  ) {
    return this.request<TypeResponse>('DELETE', url, data, contentType)
  }

  async base64ToBlob(file: FileEncodedToBase64Type) {
    return fetch(`data:${file.type};base64,${file.base64}`).then((response) =>
      response.blob(),
    )
  }

  private async request<TypeResponse>(
    method: KlRequestMethodType,
    url: string,
    data: any,
    contentType: KlRequestContentType = 'application/json',
  ) {
    let params = ''
    let body

    if (method === 'GET') {
      params = this.convertDataToPayload(data, contentType, method)
      params = params ? '?' + params : ''
    } else {
      body = this.convertDataToPayload(data, contentType, method)
    }

    return fetch(this.value + url + params, {
      method,
      headers: this.headers,
      agent: this.cert,
      body,
    })
      .then((response) =>
        this.convertResponseByType<TypeResponse>(response, contentType),
      )
      .then((response) => {
        if (response.statusCode.toString().charAt(0) !== '2') {
          throw response
        }
      })
      .catch(async (e: Response) => {
        throw await this.convertResponseByType<TypeResponse>(e, contentType)
      })
  }

  private getParams(data: any) {
    const params = new URLSearchParams()
    Object.keys(data).forEach((indexName) => {
      if (Array.isArray(data[indexName])) {
        data[indexName].forEach((item: string) => {
          params.append(indexName, item)
        })
      } else {
        params.append(indexName, data[indexName])
      }
    })

    return params
  }

  private getFormUrlEncoded(data: any) {
    let result = ''
    Object.keys(data).forEach((indexName) => {
      if (!result) {
        result = `${indexName}=${data[indexName]}`
      } else {
        result += `&${indexName}=${data[indexName]}`
      }
    })

    return result
  }

  private convertDataToPayload(
    data: any,
    contentType: KlRequestContentType,
    method: KlRequestMethodType,
  ) {
    switch (method) {
      case 'GET':
        switch (contentType) {
          case 'application/x-www-form-urlencoded':
          case 'application/json':
            return this.getParams(data).toString()
          case 'text/plain':
          default:
            return data
        }
      case 'POST':
      case 'PUT':
      case 'PATCH':
      case 'DELETE':
        switch (contentType) {
          case 'application/x-www-form-urlencoded':
            return this.getFormUrlEncoded(data)
          case 'application/octet-stream':
          case 'multipart/form-data':
          case 'text/plain':
          case 'application/json':
          default:
            return data
        }
    }
  }

  private async convertResponseByType<TypeResponse>(
    response: Response,
    contentType: KlRequestContentType,
  ) {
    const statusCode = response.status
    return (async () => {
      switch (contentType) {
        case 'application/x-www-form-urlencoded':
        case 'application/json':
        case 'application/octet-stream':
        case 'multipart/form-data':
          return response.json().catch(() => null)
        case 'text/plain':
          return response.text()
      }
    })().then((data) => {
      return {
        statusCode,
        data,
      } as KlRequestResponse<TypeResponse>
    })
  }
}
