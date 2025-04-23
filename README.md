# @koalarx/utils

Biblioteca utilitária para validações, conversões e abstrações de problemas comuns em JavaScript/TypeScript.

## Instalação

```bash
npm install @koalarx/utils
```

## Funcionalidades

### KlString

Classe para manipulação avançada de strings.

#### Métodos Disponíveis

- **normalizeAndRemoveSpecialChars**: Remove caracteres especiais e normaliza a string.
- **removeSpaces**: Remove espaços, substituindo-os por um delimitador.
- **clear**: Remove espaços e caracteres especiais.
- **toCamelCase**: Converte a string para camelCase.
- **unmaskCoin**: Remove a máscara de moeda e converte para número.
- **maskCpf**: Aplica a máscara de CPF.
- **maskCnpj**: Aplica a máscara de CNPJ.
- **validateCpf**: Valida se a string é um CPF válido.
- **validateCnpj**: Valida se a string é um CNPJ válido.
- **onlyNumbers**: Remove todos os caracteres não numéricos.
- **nbl2br**: Substitui quebras de linha por `<br/>`.
- **toBase64**: Converte a string para Base64.
- **random**: Gera uma string aleatória.

#### Exemplos de Uso

```typescript
import { KlString, maskCpf, toCamelCase } from '@koalarx/utils'

const str = new KlString('Olá Mundo!')
console.log(str.normalizeAndRemoveSpecialChars().toString()) // "Ola Mundo"
console.log(maskCpf('12345678909')) // "123.456.789-09"
console.log(toCamelCase('Olá Mundo')) // "olaMundo"
```

---

### KlNumber

Classe para manipulação avançada de números.

#### Métodos Disponíveis

- **random**: Gera um número aleatório entre dois valores.
- **maskCoin**: Formata o número como moeda.

#### Exemplos de Uso

```typescript
import { KlNumber, maskCoin, randomNumber } from '@koalarx/utils'

console.log(maskCoin(1000)) // "R$ 1.000,00"
console.log(randomNumber(1, 100)) // Exemplo: 42
```

---

### KlDate

Classe para manipulação avançada de datas.

#### Métodos Disponíveis

- **format**: Formata a data com base em uma máscara.
- **changeGMT**: Altera o fuso horário da data.
- **toUTC**: Converte a data para UTC.
- **add**: Adiciona tempo à data.
- **sub**: Subtrai tempo da data.
- **diff**: Calcula a diferença entre duas datas.
- **isHoliday**: Verifica se a data é um feriado.

#### Exemplos de Uso

```typescript
import { KlDate, isHoliday } from '@koalarx/utils'

const date = new KlDate('2023-10-01')
console.log(date.format('dd/MM/yyyy')) // "01/10/2023"
console.log(isHoliday(date, 'BR')) // true ou false
```

---

### KlArray

Classe para manipulação avançada de arrays.

#### Métodos Disponíveis

- **clearEmptyValues**: Remove valores "falsy" do array.
- **split**: Divide o array em subarrays.
- **orderBy**: Ordena o array por uma propriedade.
- **shuffle**: Embaralha os elementos do array.

#### Exemplos de Uso

```typescript
import { KlArray } from '@koalarx/utils'

const array = new KlArray([1, 2, 3, 4])
console.log(array.split(2)) // [[1, 2], [3, 4]]
console.log(array.shuffle()) // Exemplo: [3, 1, 4, 2]
```

---

### KlDelay

Classe para criar atrasos no código.

#### Métodos Disponíveis

- **waitFor**: Aguarda um período de tempo especificado.

#### Exemplos de Uso

```typescript
import { delay } from '@koalarx/utils'

await delay(1000)
console.log('Aguardou 1 segundo')
```

---

### KlCron

Classe para medir a duração de execuções.

#### Métodos Disponíveis

- **start**: Inicia o cronômetro.
- **end**: Finaliza o cronômetro.
- **duration**: Calcula a duração entre o início e o fim.

#### Exemplos de Uso

```typescript
import { KlCron } from '@koalarx/utils'

const cron = new KlCron()
cron.start()
// ... código a ser medido ...
cron.end()
console.log(cron.duration()) // Duração em segundos
```

---

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou envie um pull request no [repositório do GitHub](https://github.com/igordrangel/koala-utils).

## Licença

MIT © [Igor D. Rangel](https://github.com/igordrangel)
