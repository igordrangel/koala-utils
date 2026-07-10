import type { KlDateCountry } from "../core/types/KlDateCountry";
import type { KlDateDateType } from "../core/types/KlDateDateType";
import type { KlDateTimeZone } from "../core/types/KlDateTimeZone";
import type { KlDateDayEnum } from "../core/enums/KlDateDayEnum";

type KlDateOptions = {
  skipHolidays?: { country: KlDateCountry };
  skipDays?: KlDateDayEnum[];
};

declare global {
  interface String {
    normalizeAndRemoveSpecialChars(): string;
    removeSpaces(delimiter?: string): string;
    clear(delimiter?: string): string;
    toCamelCase(): string;
    unmaskCoin(decimalCount?: number): number;
    maskCpf(): string;
    maskCnpj(): string;
    validateCpf(): boolean;
    validateCnpj(): boolean;
    onlyNumbers(): string;
    nbl2br(): string;
    toBase64(): string;
    concatenate(...parts: string[]): string;
    concatenateToStart(prefix: string): string;
  }

  interface Number {
    maskCoin(
      prefix?: string,
      thousands?: string,
      decimal?: string,
      decimalCount?: number,
    ): string;
  }

  interface Date {
    format(mask?: string): string;
    changeTimeZone(timeZone: KlDateTimeZone): Date;
    toUTC(): Date;
    add(qty: number, type: KlDateDateType, options?: KlDateOptions): Date;
    sub(qty: number, type: KlDateDateType, options?: KlDateOptions): Date;
    diff(date: Date, type: KlDateDateType): number | undefined;
    isHoliday(country?: KlDateCountry): boolean;
  }

  interface Array<T> {
    clearEmptyValues(): Array<NonNullable<T>>;
    split(maxRowsSplit: number): T[][];
    orderBy(by: string, direction?: "asc" | "desc"): T[];
    shuffle(): T[];
  }
}

export {};
