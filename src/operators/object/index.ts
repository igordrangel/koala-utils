import { KlObject } from "../../utils/KlObject";

export function object<T>(value: T) {
  return new KlObject<T>(value);
}

export function clone<T>(value: T) {
  return object(value).clone();
}