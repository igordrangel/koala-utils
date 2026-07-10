import { KlDateDayEnum } from "../src/core/enums/KlDateDayEnum";
import { enableHolidays } from "../src/core/holidays";
import { isHoliday, KlDate } from "../src/core/KlDate";

describe("KlDate holidays", () => {
  beforeEach(() => {
    enableHolidays();
  });

  it("isHoliday", () => {
    expect(isHoliday(new KlDate("2020-01-01T00:00:00"), "BR")).toBe(true);
  });

  it("sub ignoreDays and format", () => {
    expect(
      new KlDate("2020-11-03T00:00:00")
        .sub(1, "days", {
          skipHolidays: { country: "BR" },
          skipDays: [KlDateDayEnum.saturday, KlDateDayEnum.sunday],
        })
        .format("dd/MM/yyyy"),
    ).toBe("30/10/2020");
  });
});
