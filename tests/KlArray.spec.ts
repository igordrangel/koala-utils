import { KlArray } from "../src/core/KlArray";

describe("KlArray", () => {
  it("split", () => {
    expect(new KlArray([1, 2, 3, 4]).split(2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("orderBy", () => {
    expect(
      new KlArray([
        { date: new Date("2020-06-18") },
        { date: new Date("2020-06-15") },
        { date: new Date("2020-06-17") },
        { date: new Date("2020-06-20") },
      ]).orderBy("date"),
    ).toEqual([
      { date: new Date("2020-06-15") },
      { date: new Date("2020-06-17") },
      { date: new Date("2020-06-18") },
      { date: new Date("2020-06-20") },
    ]);
  });

  it("orderBy inversed", () => {
    expect(
      new KlArray([
        { date: new Date("2020-06-18") },
        { date: new Date("2020-06-15") },
        { date: new Date("2020-06-17") },
        { date: new Date("2020-06-20") },
      ]).orderBy("date", "desc"),
    ).toEqual([
      { date: new Date("2020-06-20") },
      { date: new Date("2020-06-18") },
      { date: new Date("2020-06-17") },
      { date: new Date("2020-06-15") },
    ]);
  });

  it("shuffleArray", () => {
    const originalArray = new KlArray([{ id: 1 }, { id: 2 }, { id: 3 }]);
    const shuffledArray = new KlArray(originalArray).shuffle();

    expect(
      JSON.stringify(originalArray) !== JSON.stringify(shuffledArray),
    ).toBe(true);
  });

  it("clearEmptyValues", () => {
    expect(new KlArray([1, 2, null, 3]).clearEmptyValues()).toEqual([1, 2, 3]);
  });

  it("map returns KlArray", () => {
    const result = new KlArray([1, 2, 3]).map((value) => value * 2);
    expect(result).toBeInstanceOf(KlArray);
    expect(result).toEqual([2, 4, 6]);
  });

  it("filter returns KlArray", () => {
    const result = new KlArray([1, 2, 3, 4]).filter((value) => value % 2 === 0);
    expect(result).toBeInstanceOf(KlArray);
    expect(result).toEqual([2, 4]);
  });

  it("slice returns KlArray", () => {
    const result = new KlArray([1, 2, 3, 4]).slice(1, 3);
    expect(result).toBeInstanceOf(KlArray);
    expect(result).toEqual([2, 3]);
  });

  it("flatMap returns KlArray", () => {
    const result = new KlArray([1, 2]).flatMap((value) => [value, value * 10]);
    expect(result).toBeInstanceOf(KlArray);
    expect(result).toEqual([1, 10, 2, 20]);
  });

  it("concat returns KlArray", () => {
    const result = new KlArray([1, 2]).concat([3, 4]);
    expect(result).toBeInstanceOf(KlArray);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("map chains with orderBy", () => {
    expect(
      new KlArray([{ a: 2 }, { a: 1 }]).map((item) => item).orderBy("a"),
    ).toEqual([{ a: 1 }, { a: 2 }]);
  });
});
