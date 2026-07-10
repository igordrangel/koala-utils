import "../src/prototypes";

describe("prototypes", () => {
  it("String.maskCpf", () => {
    expect("9964085842".maskCpf()).toBe("099.640.858-42");
  });

  it("String.clear and toCamelCase chain", () => {
    expect("Olá Mundo".clear().toCamelCase()).toBe("olaMundo");
  });

  it("String.split then Array.clearEmptyValues", () => {
    expect("a,,b,c".split(",").clearEmptyValues()).toEqual(["a", "b", "c"]);
  });

  it("Number.maskCoin", () => {
    expect((1000).maskCoin()).toBe("R$ 1.000,00");
  });

  it("Date.format and add", () => {
    const date = new Date("2023-10-01T00:00:00");
    expect(date.format("dd/MM/yyyy")).toBe("01/10/2023");
    expect(date.add(1, "days").format("dd/MM/yyyy")).toBe("02/10/2023");
  });

  it("Array.split chunks", () => {
    expect([1, 2, 3, 4].split(2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
