import {
  format,
  maskCpf,
  clear,
  toCamelCase,
  split,
  clearEmptyValues,
  maskCoin,
  add,
  onlyNumbers,
} from "../src/operators";

describe("operators", () => {
  it("maskCpf returns KlString and chains", () => {
    expect(maskCpf("9964085842").toString()).toBe("099.640.858-42");
    expect(maskCpf("099.640.858-42").onlyNumbers().toString()).toBe(
      "09964085842",
    );
  });

  it("clear and toCamelCase chain", () => {
    expect(clear("Olá Mundo").toCamelCase().toString()).toBe("olaMundo");
    expect(toCamelCase("Olá Mundo").toString()).toBe("olaMundo");
  });

  it("format returns KlString and split chains", () => {
    const parts = format(new Date("2023-10-01T00:00:00"), "dd/MM/yyyy").split(
      "/",
    );
    expect(parts.toString()).toBe("01,10,2023");
  });

  it("split string then clearEmptyValues", () => {
    expect(split("a,,b,c", ",").clearEmptyValues().toString()).toBe("a,b,c");
  });

  it("clearEmptyValues on array", () => {
    expect(clearEmptyValues([1, null, 2, undefined, 0]).toString()).toBe("1,2");
  });

  it("maskCoin", () => {
    expect(maskCoin(1000)).toBe("R$ 1.000,00");
  });

  it("add then format", () => {
    expect(
      format(
        add(new Date("2023-10-01T00:00:00"), 1, "days"),
        "dd/MM/yyyy",
      ).toString(),
    ).toBe("02/10/2023");
  });

  it("onlyNumbers", () => {
    expect(onlyNumbers("abc123").toString()).toBe("123");
  });
});
