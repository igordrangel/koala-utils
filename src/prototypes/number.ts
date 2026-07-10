import { KlNumber } from "../core/KlNumber";

Number.prototype.maskCoin = function (
  prefix = "R$",
  thousands = ".",
  decimal = ",",
  decimalCount = 2,
) {
  return new KlNumber(this.valueOf()).maskCoin(
    prefix,
    thousands,
    decimal,
    decimalCount,
  );
};

export {};
