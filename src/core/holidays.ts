import Holidays from "date-holidays";
import { registerHolidayChecker } from "./KlDate";
import { KlDateCountry } from "./types/KlDateCountry";

/**
 * Habilita a verificação de feriados em `KlDate` usando `date-holidays`.
 * Também é executada automaticamente ao importar este módulo.
 */
export function enableHolidays() {
  registerHolidayChecker((date, country: KlDateCountry) => {
    const hd = new Holidays(country);
    return !!hd.isHoliday(date);
  });
}

enableHolidays();
