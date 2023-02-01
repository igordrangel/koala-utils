import { KlArray } from '../../utils/KlArray';

export function array<T>(value: T[]) {
  return new KlArray<T>(value);
}

export function shuffleArray<T>(value: T[]) {
  return array(value).shuffle().getValue();
}
