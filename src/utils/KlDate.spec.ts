import { klDate } from "../operators/date";
import { KlDateDay } from "./KlDate";

describe("KlDate", () => {
  it("format date", () =>
    expect(klDate("1993-11-02").format("DD/MM/YYYY").getValue()).toBe(
      "02/11/1993",
    ));

  it("format time", () =>
    expect(klDate("2020-06-20 00:00:00").format("HH:mm:ss").getValue()).toBe(
      "00:00:00",
    ));

  it("format datetime", () =>
    expect(klDate("2020-06-20 00:00:00").format().getValue()).toBe(
      "20/06/2020 00:00:00",
    ));

  it("format with GMT", () =>
    expect(klDate("2020-06-20T13:51:00", "+0300").format().getValue()).toBe(
      "20/06/2020 07:51:00",
    ));

  it("add", () =>
    expect(
      klDate("2020-01-01")
        .add({ qtd: 1, type: "days" })
        .format("DD/MM/YYYY")
        .getValue(),
    ).toBe("02/01/2020"));

  it("sub", () =>
    expect(
      klDate("2020-01-02")
        .sub({ qtd: 1, type: "days" })
        .format("DD/MM/YYYY")
        .getValue(),
    ).toBe("01/01/2020"));

  it("diff", () =>
    expect(klDate("2020-01-02").diff("2020-01-03").getValue()).toBe(1));

  it("sub ignoreDays and format", () =>
    expect(
      klDate("2020-11-03")
        .sub({
          qtd: 1,
          type: "days",
          ignoreDays: [
            KlDateDay.saturday,
            KlDateDay.sunday,
            KlDateDay.holidays,
          ],
        })
        .format("DD/MM/YYYY")
        .getValue(),
    ).toBe("30/10/2020"));
});
