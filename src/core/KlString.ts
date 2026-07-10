import { isCNPJ, isCPF } from "validation-br";
import { KlArray } from "./KlArray";
import { KlNumber } from "./KlNumber";

interface KlStringRandomOptions {
  numbers?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  specialCharacters?: boolean;
}

export class KlString extends String {
  /**
   * Divide a string em um `KlArray` de substrings.
   * @param separator Separador (string ou expressão regular).
   * @param limit Número máximo de divisões.
   * @returns Um `KlArray` contendo as partes da string.
   */
  // @ts-expect-error String retorna string[]; KlString retorna KlArray para encadeamento fluente.
  split(separator: string | RegExp, limit?: number): KlArray<string> {
    return new KlArray(Array.from(super.split(separator as any, limit)));
  }

  /**
   * Substitui ocorrências na string e retorna um novo `KlString`.
   * @param searchValue Valor ou expressão a ser substituído.
   * @param replaceValue Valor de substituição ou função replacer.
   * @returns Uma nova instância de `KlString` com as substituições aplicadas.
   */
  // @ts-expect-error String retorna string; KlString retorna wrapper para encadeamento fluente.
  replace(
    searchValue: string | RegExp,
    replaceValue: string | ((substring: string, ...args: any[]) => string),
  ): KlString {
    return new KlString(super.replace(searchValue as any, replaceValue as any));
  }

  /**
   * Substitui todas as ocorrências na string e retorna um novo `KlString`.
   * @param searchValue Valor ou expressão a ser substituído.
   * @param replaceValue Valor de substituição ou função replacer.
   * @returns Uma nova instância de `KlString` com as substituições aplicadas.
   */
  // @ts-expect-error String retorna string; KlString retorna wrapper para encadeamento fluente.
  replaceAll(
    searchValue: string | RegExp,
    replaceValue: string | ((substring: string, ...args: any[]) => string),
  ): KlString {
    return new KlString(
      super.replaceAll(searchValue as any, replaceValue as any),
    );
  }

  /**
   * Remove espaços em branco do início e do fim da string.
   * @returns Uma nova instância de `KlString` sem espaços nas extremidades.
   */
  // @ts-expect-error String retorna string; KlString retorna wrapper para encadeamento fluente.
  trim(): KlString {
    return new KlString(super.trim());
  }

  /**
   * Remove espaços em branco do início da string.
   * @returns Uma nova instância de `KlString` sem espaços no início.
   */
  // @ts-expect-error String retorna string; KlString retorna wrapper para encadeamento fluente.
  trimStart(): KlString {
    return new KlString(super.trimStart());
  }

  /**
   * Remove espaços em branco do fim da string.
   * @returns Uma nova instância de `KlString` sem espaços no fim.
   */
  // @ts-expect-error String retorna string; KlString retorna wrapper para encadeamento fluente.
  trimEnd(): KlString {
    return new KlString(super.trimEnd());
  }

  /**
   * Converte a string para minúsculas.
   * @returns Uma nova instância de `KlString` em minúsculas.
   */
  // @ts-expect-error String retorna string; KlString retorna wrapper para encadeamento fluente.
  toLowerCase(): KlString {
    return new KlString(super.toLowerCase());
  }

  /**
   * Converte a string para maiúsculas.
   * @returns Uma nova instância de `KlString` em maiúsculas.
   */
  // @ts-expect-error String retorna string; KlString retorna wrapper para encadeamento fluente.
  toUpperCase(): KlString {
    return new KlString(super.toUpperCase());
  }

  /**
   * Extrai uma porção da string.
   * @param start Índice inicial.
   * @param end Índice final (exclusivo).
   * @returns Uma nova instância de `KlString` com a porção selecionada.
   */
  // @ts-expect-error String retorna string; KlString retorna wrapper para encadeamento fluente.
  slice(start?: number, end?: number): KlString {
    return new KlString(super.slice(start, end));
  }

  /**
   * Extrai caracteres entre dois índices.
   * @param start Índice inicial.
   * @param end Índice final (exclusivo).
   * @returns Uma nova instância de `KlString` com a porção selecionada.
   */
  // @ts-expect-error String retorna string; KlString retorna wrapper para encadeamento fluente.
  substring(start: number, end?: number): KlString {
    return new KlString(super.substring(start, end));
  }

  /**
   * Concatena a string atual com outras strings (API nativa de `String`).
   * @param strings Strings a serem concatenadas.
   * @returns Uma nova instância de `KlString` com o resultado.
   */
  // @ts-expect-error String retorna string; KlString retorna wrapper para encadeamento fluente.
  concat(...strings: string[]): KlString {
    return new KlString(super.concat(...strings));
  }

  /**
   * Normaliza a string de acordo com a forma Unicode informada.
   * @param form Forma de normalização Unicode.
   * @returns Uma nova instância de `KlString` normalizada.
   */
  // @ts-expect-error String retorna string; KlString retorna wrapper para encadeamento fluente.
  normalize(form?: "NFC" | "NFD" | "NFKC" | "NFKD"): KlString {
    return new KlString(super.normalize(form));
  }

  /**
   * Normaliza a string atual e remove caracteres especiais, como acentos.
   * @returns Uma nova instância de `KlString` contendo a string normalizada e sem caracteres especiais.
   */
  // @ts-expect-error Conflito com String.prototype (prototypes); KlString preserva wrapper fluente.
  normalizeAndRemoveSpecialChars() {
    return new KlString(this.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  }

  /**
   * Remove espaços da string atual, substituindo-os por um delimitador.
   * @param delimiter O delimitador que substituirá os espaços (padrão: '').
   * @returns Uma nova instância de `KlString` sem espaços.
   */
  // @ts-expect-error Conflito com String.prototype (prototypes); KlString preserva wrapper fluente.
  removeSpaces(delimiter = "") {
    return new KlString(this.normalize("NFD").replace(/\s/g, delimiter));
  }

  /**
   * Remove espaços e caracteres especiais de uma string.
   * @param delimiter O delimitador que substituirá os espaços e caracteres especiais (padrão: ' ').
   * @returns Uma nova instância de `KlString` contendo a string limpa.
   */
  // @ts-expect-error Conflito com String.prototype (prototypes); KlString preserva wrapper fluente.
  clear(delimiter = " ") {
    return new KlString(
      this.normalizeAndRemoveSpecialChars()
        .replace(/([^\w]+|\s+)/g, delimiter) // Substitui espaço e outros caracteres por hífen
        .replace(/\-\-+/g, "-") // Substitui multiplos hífens por um único hífen
        .replace(/(^-+|-+$)/, ""),
    );
  }

  /**
   * Converte a string atual para o formato camelCase.
   * @returns Uma nova instância de `KlString` no formato camelCase.
   */
  // @ts-expect-error Conflito com String.prototype (prototypes); KlString preserva wrapper fluente.
  toCamelCase() {
    // Primeiro, normaliza e remove caracteres especiais
    const cleaned = this.normalizeAndRemoveSpecialChars().toString();

    // Converte para camelCase preservando PascalCase
    const camel = cleaned
      // Adiciona espaço antes de letras maiúsculas (para dividir PascalCase)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Remove caracteres especiais e substitui por espaços
      .replace(/[^a-zA-Z0-9]/g, " ")
      // Remove espaços múltiplos
      .replace(/\s+/g, " ")
      .trim()
      // Converte para camelCase
      .split(" ")
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join("");

    return new KlString(camel);
  }

  /**
   * Remove a máscara de moeda da string atual e converte para um número.
   * @param decimalCount Número de casas decimais (padrão: 2).
   * @returns Uma instância de `KlNumber` contendo o valor numérico sem a máscara.
   */
  // @ts-expect-error Conflito com String.prototype (prototypes); KlString preserva wrapper fluente.
  unmaskCoin(decimalCount = 2) {
    return new KlNumber(
      parseFloat(
        Number(
          this.replace("R$", "")
            .replace(/\s(?=\s)/g, "")
            .replace(/[\n\r\t]/g, "")
            .replace(
              /[^0-9a-zA-Z\(,\@\-\!\#\\$\%\&\*\(\)\_\+\=\{\[\}\]\/\?\;\:\.\|)\.]+/g,
              "",
            )
            .replace(/\./g, "")
            .replace(/,/g, "."),
        ).toFixed(decimalCount),
      ),
    );
  }

  /**
   * Concatena a string atual com outras strings fornecidas.
   * @param stringValue As strings a serem concatenadas.
   * @returns Uma nova instância de `KlString` com as strings concatenadas.
   */
  contatenate(...stringValue: string[]) {
    return new KlString(super.concat(...stringValue));
  }

  /**
   * Concatena a string atual com outra string no início.
   * @param value A string a ser adicionada no início.
   * @returns Uma nova instância de `KlString` com a string concatenada.
   */
  // @ts-expect-error Conflito com String.prototype (prototypes); KlString preserva wrapper fluente.
  concatenateToStart(value: string) {
    return new KlString(`${value}${this}`);
  }

  /**
   * Gera uma string aleatória com o comprimento e opções especificados.
   * @param length O comprimento da string gerada.
   * @param options Opções para incluir letras maiúsculas, minúsculas, números e caracteres especiais.
   * @returns Uma nova instância de `KlString` contendo a string aleatória gerada.
   */
  random(
    length: number,
    { lowercase, uppercase, numbers, specialCharacters }: KlStringRandomOptions,
  ) {
    const lmin = "abcdefghijklmnopqrstuvwxyz";
    const lmai = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "1234567890";
    const simb = "@%_-#$%&*!";
    let result = "";
    let characters = "";

    if (lowercase) characters += lmin;
    if (uppercase) characters += lmai;
    if (numbers) characters += num;
    if (specialCharacters) characters += simb;

    const len = characters.length;
    for (let n = 1; n <= length; n++) {
      const rand = Math.floor(Math.random() * (len - 1 + 1)) + 1;
      result += characters[rand - 1];
    }

    return new KlString(result);
  }

  /**
   * Aplica a máscara de CPF à string atual.
   * @returns Uma nova instância de `KlString` formatada como CPF (ex.: '123.456.789-00').
   */
  // @ts-expect-error Conflito com String.prototype (prototypes); KlString preserva wrapper fluente.
  maskCpf() {
    return new KlString(
      this.leftPad(this.onlyNumbers(), 11)
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2"),
    );
  }

  /**
   * Aplica a máscara de CNPJ à string atual.
   * @returns Uma nova instância de `KlString` formatada como CNPJ (ex.: '12.345.678/0001-00').
   */
  // @ts-expect-error Conflito com String.prototype (prototypes); KlString preserva wrapper fluente.
  maskCnpj() {
    return new KlString(
      this.leftPad(this, 14).replace(
        /^([a-zA-Z\d]{2})([a-zA-Z\d]{3})?([a-zA-Z\d]{3})?([a-zA-Z\d]{4})?([a-zA-Z\d]{2})?/,
        "$1.$2.$3/$4-$5",
      ),
    );
  }

  /**
   * Valida se a string atual é um CPF válido.
   * @returns `true` se o CPF for válido, caso contrário `false`.
   */
  validateCpf() {
    return isCPF(this.onlyNumbers().toString());
  }

  /**
   * Valida se a string atual é um CNPJ válido.
   * @returns `true` se o CNPJ for válido, caso contrário `false`.
   */
  validateCnpj() {
    return isCNPJ(this.toString());
  }

  /**
   * Remove todos os caracteres não numéricos da string.
   * @returns Uma nova instância de `KlString` contendo apenas os números.
   */
  // @ts-expect-error Conflito com String.prototype (prototypes); KlString preserva wrapper fluente.
  onlyNumbers() {
    return new KlString(this.replace(/\D/g, ""));
  }

  /**
   * Substitui quebras de linha (`\n`, `\r\n`, `\r`) por tags HTML `<br/>`.
   * @returns Uma nova instância de `KlString` com as quebras de linha substituídas.
   */
  // @ts-expect-error Conflito com String.prototype (prototypes); KlString preserva wrapper fluente.
  nbl2br() {
    return new KlString(this.replace(/\r\n|\r|\n/gi, "<br/>"));
  }

  /**
   * Converte a string atual para Base64.
   * @returns Uma nova instância de `KlString` contendo a string codificada em Base64.
   */
  // @ts-expect-error Conflito com String.prototype (prototypes); KlString preserva wrapper fluente.
  toBase64() {
    return new KlString(Buffer.from(this).toString("base64"));
  }

  /**
   * Adiciona caracteres de preenchimento à esquerda de uma string até atingir o comprimento total especificado.
   * @param value A string que será preenchida.
   * @param totalWidth O comprimento total desejado.
   * @param paddingChar O caractere de preenchimento (padrão: '0').
   * @returns Uma string preenchida com o caractere especificado.
   */
  private leftPad(value: KlString, totalWidth: number, paddingChar?: string) {
    const length = totalWidth - value.length + 1;
    return Array(length).join(paddingChar || "0") + value;
  }
}

/**
 * Aplica a máscara de CPF a uma string.
 * @param value A string contendo o CPF (apenas números ou com formatação).
 * @returns Uma string formatada como CPF (ex.: '123.456.789-00').
 */
export function maskCpf(value: string) {
  return new KlString(value).maskCpf().toString();
}

/**
 * Aplica a máscara de CNPJ a uma string.
 * @param value A string contendo o CNPJ (apenas números ou com formatação).
 * @returns Uma string formatada como CNPJ (ex.: '12.345.678/0001-00').
 */
export function maskCnpj(value: string) {
  return new KlString(value).maskCnpj().toString();
}

/**
 * Gera uma string aleatória com o comprimento e opções especificados.
 * @param length O comprimento da string gerada.
 * @param options Opções para incluir letras maiúsculas, minúsculas, números e caracteres especiais.
 * @returns Uma string aleatória gerada com base nas opções fornecidas.
 */
export function randomString(length: number, options?: KlStringRandomOptions) {
  return new KlString("")
    .random(length, options ?? { lowercase: true, uppercase: true })
    .toString();
}

/**
 * Remove espaços e caracteres especiais de uma string.
 * @param value A string a ser limpa.
 * @param delimiter O delimitador que substituirá os espaços e caracteres especiais (padrão: '').
 * @returns Uma string limpa.
 */
export function clear(value: string, delimiter?: string) {
  return new KlString(value).clear(delimiter).toString();
}

/**
 * Remove a máscara de moeda de uma string e converte para número.
 * @param value A string contendo o valor monetário.
 * @param decimalCount Número de casas decimais (padrão: 2).
 * @returns O valor numérico sem a máscara.
 */
export function unmaskCoin(value: string, decimalCount?: number) {
  return new KlString(value).unmaskCoin(decimalCount).toNumber();
}

/**
 * Remove a máscara de CPF de uma string, retornando apenas os números.
 * @param value A string contendo o CPF.
 * @returns Uma string contendo apenas os números do CPF.
 */
export function unmaskCpf(value: string) {
  return new KlString(value).onlyNumbers();
}

/**
 * Remove a máscara de CNPJ de uma string, retornando apenas os números.
 * @param value A string contendo o CNPJ.
 * @returns Uma string contendo apenas os números do CNPJ.
 */
export function unmaskCnpj(value: string) {
  return new KlString(value).onlyNumbers();
}

/**
 * Converte uma string para o formato camelCase.
 * @param value A string a ser convertida.
 * @returns Uma string no formato camelCase.
 */
export function toCamelCase(value: string) {
  return new KlString(value).toCamelCase().toString();
}

/**
 * Substitui quebras de linha (`\n`, `\r\n`, `\r`) por tags HTML `<br/>`.
 * @param value A string contendo quebras de linha.
 * @returns Uma string com as quebras de linha substituídas por `<br/>`.
 */
export function nbl2br(value: string) {
  return new KlString(value).nbl2br().toString();
}

/**
 * Valida se uma string é um CPF válido.
 * @param value A string contendo o CPF.
 * @returns `true` se o CPF for válido, caso contrário `false`.
 */
export function validateCpf(value: string) {
  return new KlString(value).validateCpf();
}

/**
 * Valida se uma string é um CNPJ válido.
 * @param value A string contendo o CNPJ.
 * @returns `true` se o CNPJ for válido, caso contrário `false`.
 */
export function validateCnpj(value: string) {
  return new KlString(value).validateCnpj();
}
