import { KlString } from "../core/KlString";

String.prototype.normalizeAndRemoveSpecialChars = function () {
  return new KlString(this.toString())
    .normalizeAndRemoveSpecialChars()
    .toString();
};

String.prototype.removeSpaces = function (delimiter?: string) {
  return new KlString(this.toString()).removeSpaces(delimiter).toString();
};

String.prototype.clear = function (delimiter?: string) {
  return new KlString(this.toString()).clear(delimiter).toString();
};

String.prototype.toCamelCase = function () {
  return new KlString(this.toString()).toCamelCase().toString();
};

String.prototype.unmaskCoin = function (decimalCount?: number) {
  return new KlString(this.toString()).unmaskCoin(decimalCount).toNumber();
};

String.prototype.maskCpf = function () {
  return new KlString(this.toString()).maskCpf().toString();
};

String.prototype.maskCnpj = function () {
  return new KlString(this.toString()).maskCnpj().toString();
};

String.prototype.validateCpf = function () {
  return new KlString(this.toString()).validateCpf();
};

String.prototype.validateCnpj = function () {
  return new KlString(this.toString()).validateCnpj();
};

String.prototype.onlyNumbers = function () {
  return new KlString(this.toString()).onlyNumbers().toString();
};

String.prototype.nbl2br = function () {
  return new KlString(this.toString()).nbl2br().toString();
};

String.prototype.toBase64 = function () {
  return new KlString(this.toString()).toBase64().toString();
};

String.prototype.concatenate = function (...parts: string[]) {
  return new KlString(this.toString()).contatenate(...parts).toString();
};

String.prototype.concatenateToStart = function (prefix: string) {
  return new KlString(this.toString()).concatenateToStart(prefix).toString();
};

export {};
