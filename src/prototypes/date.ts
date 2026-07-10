import { KlDate } from "../core/KlDate";
import { KlDateCountry } from "../core/types/KlDateCountry";
import { KlDateDateType } from "../core/types/KlDateDateType";
import { KlDateTimeZone } from "../core/types/KlDateTimeZone";
import { KlDateDayEnum } from "../core/enums/KlDateDayEnum";

type KlDateOptions = {
  skipHolidays?: { country: KlDateCountry };
  skipDays?: KlDateDayEnum[];
};

Date.prototype.format = function (mask?: string) {
  return new KlDate(this).format(mask);
};

Date.prototype.changeTimeZone = function (timeZone: KlDateTimeZone) {
  return new KlDate(this).changeTimeZone(timeZone);
};

Date.prototype.toUTC = function () {
  return new KlDate(this).toUTC();
};

Date.prototype.add = function (
  qty: number,
  type: KlDateDateType,
  options?: KlDateOptions,
) {
  return new KlDate(this).add(qty, type, options);
};

Date.prototype.sub = function (
  qty: number,
  type: KlDateDateType,
  options?: KlDateOptions,
) {
  return new KlDate(this).sub(qty, type, options);
};

Date.prototype.diff = function (date: Date, type: KlDateDateType) {
  return new KlDate(this).diff(date, type);
};

Date.prototype.isHoliday = function (country: KlDateCountry = "BR") {
  return new KlDate(this).isHoliday(country);
};

export {};
