import { KlRequest } from '../../utils/KlRequest';

export function request(urlBase: string) {
  return new KlRequest(urlBase);
}
