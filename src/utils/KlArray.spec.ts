import { klArray } from "../operators/array";
import { klDelay } from "../operators/delay";
import { clone } from "../operators/object";

describe("KlArray", () => {
  it("map", () => {
    expect(
      klArray([{ name: "test1" }, { name: "test2" }])
        .map((item) => {
          if (item.name === "test2") {
            item.name = "Hello World";
          }
          return item;
        })
        .getValue(),
    ).toStrictEqual([{ name: "test1" }, { name: "Hello World" }]);
  });

  it("mapAsync", async () =>
    expect(
      (
        await klArray([
          { proposal: "123" },
          { proposal: "456" },
          { proposal: "789" },
        ]).mapAsync<number>(async (item) => {
          await klDelay(300);
          return parseInt(item.proposal, 10);
        })
      ).getValue(),
    ).toStrictEqual([123, 456, 789]));

  it("merge", () =>
    expect(klArray([1]).merge([2]).getValue()).toStrictEqual([1, 2]));

  it("filter", () =>
    expect(
      klArray([{ teste: 123 }, { teste2: 543 }])
        .filter("123", "teste")
        .getValue(),
    ).toStrictEqual([{ teste: 123 }]));

  it("getIndex", () =>
    expect(
      klArray([{ teste: 123 }, { teste: 123 }]).getIndex("teste", 123),
    ).toBe(0));

  it("split", () =>
    expect(klArray([1, 2, 3, 4]).split(2).getValue()).toStrictEqual([
      [1, 2],
      [3, 4],
    ]));

  it("toString", () =>
    expect(klArray([1, 2, 3, 4]).toString(",").getValue()).toStrictEqual(
      "1,2,3,4",
    ));

  it("orderBy", () =>
    expect(
      klArray([
        { date: new Date("2020-06-18") },
        { date: new Date("2020-06-15") },
        { date: new Date("2020-06-17") },
        { date: new Date("2020-06-20") },
      ])
        .orderBy("date")
        .getValue(),
    ).toStrictEqual([
      { date: new Date("2020-06-15") },
      { date: new Date("2020-06-17") },
      { date: new Date("2020-06-18") },
      { date: new Date("2020-06-20") },
    ]));

  it("orderBy inversed", () =>
    expect(
      klArray([
        { date: new Date("2020-06-18") },
        { date: new Date("2020-06-15") },
        { date: new Date("2020-06-17") },
        { date: new Date("2020-06-20") },
      ])
        .orderBy("date", true)
        .getValue(),
    ).toStrictEqual([
      { date: new Date("2020-06-20") },
      { date: new Date("2020-06-18") },
      { date: new Date("2020-06-17") },
      { date: new Date("2020-06-15") },
    ]));

  it("toBase64", async () =>
    expect(
      (
        await klArray([{ nome: "Teste 1" }, { nome: "Teste 2" }]).toBase64()
      ).getValue(),
    ).toBe("bm9tZQpUZXN0ZSAxClRlc3RlIDI="));

  it("pipe", () =>
    expect(
      klArray([{ proposal: "123" }, { proposal: "456" }, { proposal: "789" }])
        .pipe((klArray) => {
          return klArray.getValue().map((item) => parseInt(item.proposal, 10));
        })
        .getValue(),
    ).toStrictEqual([123, 456, 789]));

  it("pipeAsync", async () =>
    expect(
      (
        await klArray([
          { proposal: "123" },
          { proposal: "456" },
          { proposal: "789" },
        ]).pipeAsync(async (klArray) => {
          await klDelay(300);
          return klArray.getValue().map((item) => parseInt(item.proposal, 10));
        })
      ).getValue(),
    ).toStrictEqual([123, 456, 789]));

  it("shuffleArray", () => {
    const originalArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const shuffledArray = klArray(clone(originalArray)).shuffle().getValue();
    expect(
      JSON.stringify(originalArray) !== JSON.stringify(shuffledArray),
    ).toBe(true);
  });
});
