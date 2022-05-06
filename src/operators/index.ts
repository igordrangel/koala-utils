import { koala } from '../index';

export function clone<T>(value: T) {
  return koala(value).object<T>().clone();
}

export function shuffleArray<T>(value: T[]) {
  return koala(value).array<T>().shuffle().getValue();
}
