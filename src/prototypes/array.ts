import { KlArray } from "../core/KlArray";

Array.prototype.clearEmptyValues = function <T>(this: T[]) {
  return Array.from(new KlArray(this).clearEmptyValues());
};

Array.prototype.split = function <T>(this: T[], maxRowsSplit: number) {
  return Array.from(new KlArray(this).split(maxRowsSplit)).map((group) =>
    Array.from(group),
  );
};

Array.prototype.orderBy = function <T>(
  this: T[],
  by: string,
  direction: "asc" | "desc" = "asc",
) {
  return Array.from(new KlArray(this).orderBy(by, direction));
};

Array.prototype.shuffle = function <T>(this: T[]) {
  return Array.from(new KlArray(this).shuffle());
};

export {};
