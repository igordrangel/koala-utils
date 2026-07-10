import { KlDateDayEnum } from "../src/core/enums/KlDateDayEnum";
import { KlDate, registerHolidayChecker } from "../src/core/KlDate";

describe("KlDate", () => {
  beforeEach(() => {
    registerHolidayChecker(undefined);
  });

  it("format date", () => {
    expect(new KlDate("1993-11-02T00:00:00").format("dd/MM/yyyy")).toBe(
      "02/11/1993",
    );
  });

  it("format time", () => {
    expect(new KlDate("2020-06-20T00:00:00").format("HH:mm:ss")).toBe(
      "00:00:00",
    );
  });

  it("format datetime", () => {
    expect(new KlDate("2020-06-20T00:00:00").format()).toBe(
      "20/06/2020 00:00:00",
    );
  });

  it("format with GMT", () => {
    expect(
      new KlDate("2020-06-20T13:00:00")
        .toUTC()
        .changeTimeZone("America/Sao_Paulo")
        .format(),
    ).toBe("20/06/2020 16:00:00");
  });

  it("add", () => {
    expect(
      new KlDate("2020-01-01T00:00:00").add(1, "days").format("dd/MM/yyyy"),
    ).toBe("02/01/2020");
  });

  it("sub", () => {
    expect(
      new KlDate("2020-01-02T00:00:00").sub(1, "days").format("dd/MM/yyyy"),
    ).toBe("01/01/2020");
  });

  it("diff", () => {
    expect(
      new KlDate("2020-01-02T00:00:00").diff(
        new KlDate("2020-01-03T00:00:00"),
        "days",
      ),
    ).toBe(1);
  });

  it("sub with skipDays only", () => {
    expect(
      new KlDate("2020-11-02T00:00:00")
        .sub(1, "days", {
          skipDays: [KlDateDayEnum.saturday, KlDateDayEnum.sunday],
        })
        .format("dd/MM/yyyy"),
    ).toBe("30/10/2020");
  });

  it("isHoliday throws without holidays module", () => {
    expect(() => new KlDate("2020-01-01T00:00:00").isHoliday("BR")).toThrow(
      'Holiday support requires importing "@koalarx/utils/holidays" and installing the optional peer dependency "date-holidays".',
    );
  });

  it("skipHolidays throws without holidays module", () => {
    expect(() =>
      new KlDate("2020-11-03T00:00:00").sub(1, "days", {
        skipHolidays: { country: "BR" },
      }),
    ).toThrow(
      'Holiday support requires importing "@koalarx/utils/holidays" and installing the optional peer dependency "date-holidays".',
    );
  });
});
