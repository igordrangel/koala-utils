import { KlArray } from "../../utils/KlArray";

export function array<T>(value: T[]) {  
  return new KlArray<T>(value);
}