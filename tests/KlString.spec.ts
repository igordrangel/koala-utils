import * as cnpj from "validation-br/dist/cnpj";
import { KlArray } from "../src/core/KlArray";
import { KlString } from "../src/core/KlString";

describe("KlString", () => {
  it("clear", () => {
    expect(new KlString("Olá Mundo").clear("-").toString()).toBe("Ola-Mundo");
  });

  it("nbl2br", () => {
    expect(new KlString("Olá\nMundo").nbl2br().toString()).toBe(
      "Olá<br/>Mundo",
    );
  });

  it("maskCpf", () => {
    expect(new KlString("9964085842").maskCpf().toString()).toBe(
      "099.640.858-42",
    );
  });

  it("maskCnpj", () => {
    expect(
      new KlString(cnpj.fake({ alphanumeric: false }))
        .maskCnpj()
        .validateCnpj(),
    ).toBe(true);
    expect(
      new KlString(cnpj.fake({ alphanumeric: true })).maskCnpj().validateCnpj(),
    ).toBe(true);
  });

  it("onlyNumbers", () => {
    expect(new KlString("05.581.451/0001-83").onlyNumbers().toString()).toBe(
      "05581451000183",
    );
  });

  it("validateCpf", () => {
    expect(new KlString("099.640.858-42").validateCpf()).toBe(true);
  });

  it("validateCnpj", () => {
    expect(new KlString("05.581.451/0001-83").validateCnpj()).toBe(true);
    expect(new KlString(cnpj.fake({ alphanumeric: true })).validateCnpj()).toBe(
      true,
    );
  });

  it("toCamelCase", () => {
    expect(new KlString("Olá Mundo").toCamelCase().toString()).toBe("olaMundo");
    expect(new KlString("OláMundo").toCamelCase().toString()).toBe("olaMundo");
  });

  it("split", () => {
    const result = new KlString("1,2").split(",");
    expect(result).toBeInstanceOf(KlArray);
    expect(result).toStrictEqual(["1", "2"]);
  });

  it("split chains with KlArray", () => {
    expect(new KlString("1,2,3,4").split(",").split(2)).toEqual([
      ["1", "2"],
      ["3", "4"],
    ]);
  });

  it("removeSpaces returns KlString", () => {
    const result = new KlString("a b c").removeSpaces("-");
    expect(result).toBeInstanceOf(KlString);
    expect(result.toString()).toBe("a-b-c");
  });

  it("native transforms return KlString", () => {
    expect(new KlString("  AbC  ").trim().toLowerCase().toString()).toBe("abc");
    expect(new KlString("hello").replace("h", "H").toString()).toBe("Hello");
  });

  it("unmaskCoin", () => {
    expect(new KlString("1.000,00").unmaskCoin().toNumber()).toBe(1000);
  });

  it("random", () => {
    expect(
      typeof new KlString("")
        .random(4, {
          lowercase: true,
          numbers: true,
          specialCharacters: true,
          uppercase: true,
        })
        .toString(),
    ).toBe("string");
  });

  it("toBase64", () => {
    expect(new KlString("teste").toBase64().toString()).toBe("dGVzdGU=");
  });

  it("concat", () => {
    expect(new KlString("teste").contatenate("1").toString()).toBe("teste1");
  });
});
