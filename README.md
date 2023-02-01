# Koala Utils

## Install

```bash
npm i @koalarx/utils
```

## Usage

<details>
 <summary><strong>Array Utils</strong></summary>
 
### merge
```bash
let arraySample = [1]
arraySample = klArray(arraySample).merge([2]).getValue();

console.log(arraySample);// [1,2]

````
### map
```bash
const result = klArray([{name: 'test1'}, {name: 'test2'}])
  .map(item => {
    if (item.name === 'test2') {
      item.name = 'Hello World';
    }
    return item;
  }).getValue();

console.log(result);// [{name: 'test1'}, {name: 'Hello World'}]
````

### filter

```bash
let result = klArray([
  {teste: 123},
  {teste2: 543}
]).filter("123", "teste").getValue();

console.log(result);// [{teste: 123}]
```

### getIndex

```bash
let index = klArray([
  {teste: 123},
  {teste: "123"}
]).getIndex("teste",123);

console.log(index);// 0
```

### split

```bash
let result = klArray([1,2,3,4]).split(2).getValue();

console.log(result);// [[1,2],[3,4]]
```

### toString

```bash
let result = klArray([1,2,3,4]).toString(',').getValue();

console.log(result);// "1,2,3,4"
```

### orderBy

```bash
let result = klArray([
  {date: new Date('2020-06-18')},
  {date: new Date('2020-06-15')},
  {date: new Date('2020-06-17')},
  {date: new Date('2020-06-20')}
]).orderBy('date').getValue();

// [
//   {date: new Date('2020-06-15')},
//   {date: new Date('2020-06-17')},
//   {date: new Date('2020-06-18')},
//   {date: new Date('2020-06-20')}
// ]
console.log(result);

//inverse
let result = klArray([
  {date: new Date('2020-06-18')},
  {date: new Date('2020-06-15')},
  {date: new Date('2020-06-17')},
  {date: new Date('2020-06-20')}
]).orderBy('date',true);

// [
//   {date: new Date('2020-06-20')},
//   {date: new Date('2020-06-18')},
//   {date: new Date('2020-06-17')},
//   {date: new Date('2020-06-15')}
// ]
console.log(result);
```

### toBase64

```bash
let result = klArray([
  {nome: 'Teste 1'},
  {nome: 'Teste 2'}
]).toBase64().getValue();

console.log(result);// "bm9tZQpUZXN0ZSAxClRlc3RlIDI="
```

### pipe

```bash
let result = klArray([
  {proposal: '123'},
  {proposal: '456'},
  {proposal: '789'}
]).pipe<number>(objProposta => {
    return klArray.getValue().map((item) => parseInt(item.proposal));
  })
  .getValue();

console.log(result);// [123,456,789]
```

### pipeAsync

```bash
let result = (await klArray([
  {proposal: '123'},
  {proposal: '456'},
  {proposal: '789'}
]).pipeAsync<number>(async objProposta => {
    await KlDelay.waitfor(300);
    return klArray.getValue().map((item) => parseInt(item.proposal));
  }))
  .getValue();

console.log(result);// [123,456,789]
```

### shuffle

```bash
let result = klArray([
  {id: 1},
  {id: 2},
  {id: 3}
]).shuffle()
  .getValue();

console.log(result);// [{id: 3},{id: 1},{id: 2}]
```

</details><br>

<details>
 <summary><strong>String Utils usage</strong></summary>
 
### clear
```bash
let result = klString('Olá Mundo').clear().getValue();

console.log(result);// "Ola Mundo"

let result = klString('Olá Mundo').clear('-').getValue();

console.log(result);// "Ola-Mundo"

````
### nbl2br
```bash
let result = klString('Olá\nMundo').nbl2br().getValue();

console.log(result);// "Olá<br/>Mundo"
````

### maskCpf

```bash
let result = klString('47695329037').maskCpf().getValue();

console.log(result);// "476.953.290-37"
```

### maskCnpj

```bash
let result = klString('5581451000183').maskCnpj().getValue();

console.log(result);// "05.581.451/0001-83"
```

### toCamelCase

```bash
let result = kLString('Olá Mundo').toCamelCase().getValue();

console.log(result);// "olaMundo"
```

### split

```bash
let result = klString('1,2').split().getValue();

console.log(result);// ['1', '2']
```

### unmaskCoin

```bash
let result = klString().unmaskCoin().getValue();

console.log(result);// 1000
```

### concat

```bash
let result = klString('teste').concat('1').getValue();

console.log(result);// "teste1"

let result = klString('1').concat('teste', true).getValue();

console.log(result);// "teste1"
```

### random

```bash
let result = klString('').random(4, true, true, true, true).getValue();

console.log(result);// "4Oa@"
```

### toBase64

```bash
let result = klString('teste').toBase64().getValue();

console.log(result);// "dGVzdGU="
```

### replace

````bash
let result = klString('Hellow World').replace('Hellow', 'Hello').getValue();

console.log(result);// 1000
</details><br>

<details>
 <summary><strong>Number Utils usage</strong></summary>

### random
```bash
let result = klNumber().random(1000, 2000).getValue();

console.log(result);// 1389
````

### maskCoin

```bash
let result = klNumber(1000).maskCoin().getValue();

console.log(result);// "R$ 1.000,00"
```

</details><br>

<details>
 <summary><strong>Date Utils usage</strong></summary>
 
### format
```bash
let result = klDate('2020-06-20').format('DD/MM/YYYY').getValue();

console.log(result);// '20/06/2020'

let result = klDate().format('HH:mm:ss').getValue();

console.log(result);// '00:00:00'

let result = klDate().format().getValue();

console.log(result);// '20/06/2020 00:00:00'

let result = klDate('2020-06-20T13:51:00', '+0300').format().getValue();

console.log(result);// '20/06/2020 07:51:00'

````
### add
```bash
let result = kLDate('2020-01-01').add({qtd: 1, type: 'days'}).getValue();

console.log(result);// Date('2020-01-02')

let result = klDate('2020-10-30')
  .add({qtd: 1, type: 'days', ignoreDays: [
    KlDateDay.saturday,
    KlDateDay.sunday
  ])
  .getValue();

console.log(result);// Date('2020-11-02')
````

### sub

```bash
let result = klDate('2020-01-02').sub({qtd: 1, type: 'days'}).getValue();

console.log(result);// Date('2020-01-01')

let result = klDate('2020-10-30')
  .sub({qtd: 1, type: 'days', ignoreDays: [
      KlDateDay.saturday,
      KlDateDay.sunday
  ])
  .getValue();

console.log(result);// Date('2020-11-23')
```

### diff

```bash
let result = klDate('2020-11-02').diff('2020-11-03').getValue();

console.log(result);// 1
```

### isHoliday

```bash
let result = klDate('2020-11-02').isHoliday();

console.log(result);// true
```

</details><br>

<details>
 <summary><strong>Delay Utils usage</strong></summary>
 
### waitFor
```bash
public async ForAsyncFunctions(){
    await KlDelay.waitFor(1000); // wait's 1s after to pass new line
    // some code
}
```
</details><br>

<details>
 <summary><strong>Object Utils usage</strong></summary>
 
### merge
```bash
let result = klObject({teste: 1}).merge({teste2: 2}).getValue();

console.log(result); // {teste: 1,teste2: 2}

````
### toString
```bash
let result = klObject({
  param1: "Hello",
  param2: "World"
}).toString(['param1','param2']).getValue();

console.log(result); // "Hello World"
````

</details><br>

<details>
 <summary><strong>Http Request Utils usage</strong></summary>
 
### request
```bash
let result = await klRequest('https://exemple.com').get<Users[]>('/users', {name: 'test'});

console.log(result); // {statusCode: number, data: Users[]}

````
</details><br>

## Operators
<details>
 <summary><strong>String Operators</strong></summary>

```bash
import {
  maskCpf,
  maskCnpj,
  randomString,
  clear,
  unmaskCoin,
  toCamelCase,
  nbl2br
} from '@koalarx/utils/operators/string';

maskCpf('11111111111') //111.111.111-11
maskCnpj('11111111000111') //11.111.111/0001-11
randomString(4, true, true, true, true) //1Aa$
clear('Olá Mundo') //Ola Mundo
unmaskCoin('R$ 1.000,00') //1000
toCamelCase('Olá Mundo') //olaMundo
nbl2br('Line1\nLine2') // Line1<br/>Line2
````

</details><br>

<details>
 <summary><strong>Number Operators</strong></summary>
 
```bash
import { maskCoin } from '@koalarx/utils/operators/number';

maskCoin(1000) //R\$ 1.000,00

````
</details><br>

<details>
 <summary><strong>Date Operators</strong></summary>

```bash
import {
  format,
  isHoliday,
  add,
  sub,
  diff
} from '@koalarx/utils/operators/date';

format('2020-01-01', 'DD/MM/YYYY') //01/01/2020
isHoliday('2020-01-01') //true
add('2020-01-01', 2) //2020-01-03
sub('2020-01-03', 2) //2020-01-01
diff('2020-01-01', '2020-01-03') //2
````

</details><br>

<details>
 <summary><strong>Delay Operators</strong></summary>
 
```bash
import { delay } from '@koalarx/utils/operators/delay';

delay(2000).then();

````
</details><br>

<details>
 <summary><strong>General Operators</strong></summary>

```bash
import { clone, shuffleArray } from '@koalarx/utils/operators';

clone({test: 1}) // {test: 1};
shuffleArray([ {id: 1}, {id: 2}, {id: 3} ]);// [ {id: 3}, {id: 1}, {id: 2} ]
````

</details><br>
