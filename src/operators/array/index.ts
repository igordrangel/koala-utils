import { KlArray } from "../../utils/KlArray";

export function klArray<T>(value: T[]) {
  return new KlArray<T>(value);
}

export function shuffleArray<T>(value: T[]) {
  return klArray(value).shuffle().getValue();
}
