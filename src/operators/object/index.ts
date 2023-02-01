import { KlObject } from '../../utils/KlObject';

export function klObject<T>(value: T) {
  return new KlObject<T>(value);
}

export function clone<T>(value: T) {
  return klObject(value).clone();
}
