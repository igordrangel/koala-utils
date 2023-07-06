import { KlRequest } from '../../utils/KlRequest'

export function klRequest(urlBase: string) {
  return new KlRequest(urlBase)
}
