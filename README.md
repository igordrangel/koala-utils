# Koala Utils

## Install
```bash
npm i koala-utils
```
## Usage
<details>
 <summary><strong>Array Utils</strong></summary>
 
### merge
```bash
let arraySample = [1]
arraySample = koala(arraySample).array<number>()
                                .merge([2])
                                .getValue();

console.log(arraySample);// [1,2]
```
### map
```bash
const result = koala([{name: 'test1'}, {name: 'test2'}])
  .array<any>()
  .map(item => {
    if (item.name === 'test2') {
      item.name = 'Hello World';
    }    
    return item;
  }).getValue();

console.log(result);// [{name: 'test1'}, {name: 'Hello World'}]
```
### filter
```bash
let result = koala([
   {teste: 123},
   {teste2: 543}
]).array().filter("123", "teste").getValue();

console.log(result);// [{teste: 123}]
```
### getIndex
```bash
let index = koala([
  {teste: 123},
  {teste: "123"}
]).array().getIndex("teste",123);

console.log(index);// 0
```
### split
```bash
let result = koala([1,2,3,4]).array()
                             .split(2)
                             .getValue();

console.log(result);// [[1,2],[3,4]]
```
### toString
```bash
let result = koala([1,2,3,4]).array()
                             .toString(',')
                             .getValue();

console.log(result);// "1,2,3,4"
```
### orderBy
```bash
let result = koala([
   {date: new Date('2020-06-18')},
   {date: new Date('2020-06-15')},
   {date: new Date('2020-06-17')},
   {date: new Date('2020-06-20')}
]).array().orderBy('date').getValue();

// [
//   {date: new Date('2020-06-15')},
//   {date: new Date('2020-06-17')},
//   {date: new Date('2020-06-18')},
//   {date: new Date('2020-06-20')}
// ]
console.log(result);

//inverse
let result = koala([
   {date: new Date('2020-06-18')},
   {date: new Date('2020-06-15')},
   {date: new Date('2020-06-17')},
   {date: new Date('2020-06-20')}
]).array().orderBy('date',true);

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
let result = koala([
    {nome: 'Teste 1'},
    {nome: 'Teste 2'}
]).array()
  .toBase64()
  .getValue();

console.log(result);// "bm9tZQpUZXN0ZSAxClRlc3RlIDI="
```
### pipe
```bash
let result = koala([
    {proposal: '123'},
    {proposal: '456'},
    {proposal: '789'}
]).array<{proposal: string}>()
  .pipe<number>(objProposta => {
    return klArray.getValue().map((item) => parseInt(item.proposal));
  })
  .getValue();

console.log(result);// [123,456,789]
```
### pipeAsync
```bash
let result = (await koala([
    {proposal: '123'},
    {proposal: '456'},
    {proposal: '789'}
]).array<{proposal: string}>()
  .pipeAsync<number>(async objProposta => {
    await KlDelay.waitfor(300);
    return klArray.getValue().map((item) => parseInt(item.proposal));
  }))
  .getValue();

console.log(result);// [123,456,789]
```
</details><br>

<details>
 <summary><strong>String Utils usage</strong></summary>
 
### clear
```bash
let result = koala('Olá Mundo').string()
                               .clear()
                               .getValue();

console.log(result);// "Ola Mundo"

let result = koala('Olá Mundo').string()
                               .clear('-')
                               .getValue();

console.log(result);// "Ola-Mundo"
```
### nbl2br
```bash
let result = koala('Olá\nMundo').string()
                                .nbl2br()
                                .getValue();

console.log(result);// "Olá<br/>Mundo"
```
### maskCpf
```bash
let result = koala('47695329037').string()
                                 .maskCpf()
                                 .getValue();

console.log(result);// "476.953.290-37"
```
### maskCnpj
```bash
let result = koala('5581451000183').string()
                                   .maskCnpj()
                                   .getValue();

console.log(result);// "05.581.451/0001-83"
```
### toCamelCase
```bash
let result = koala('Olá Mundo').string()
                               .toCamelCase()
                               .getValue();

console.log(result);// "olaMundo"
```
### split
```bash
let result = koala('1,2').string()
                         .split()
                         .getValue();

console.log(result);// ['1', '2']
```
### unmaskCoin
```bash
let result = koala('1.000,00').string()
                              .unmaskCoin()
                              .getValue();

console.log(result);// 1000
```
### concat
```bash
let result = koala('teste').string()
                           .concat('1')
                           .getValue();

console.log(result);// "teste1"

let result = koala('1').string()
                       .concat('teste', true)
                       .getValue();

console.log(result);// "teste1"
```
### random
```bash
let result = koala('').string()
                      .random(4, true, true, true, true)
                      .getValue();

console.log(result);// "4Oa@"
```
### toBase64
```bash
let result = koala('teste').string()
                           .toBase64()
                           .getValue();

console.log(result);// "dGVzdGU="
```
### replace
```bash
let result = koala('Hellow World').string()
                              .replace('Hellow', 'Hello')
                              .getValue();

console.log(result);// 1000
</details><br>

<details>
 <summary><strong>Number Utils usage</strong></summary>
 
### random
```bash
let result = koala(0).number()
                     .random(1000, 2000)
                     .getValue();

console.log(result);// 1389
```
### maskCoin
```bash
let result = koala(1000).number()
                        .maskCoin()
                        .getValue();

console.log(result);// "R$ 1.000,00"
```
</details><br>

<details>
 <summary><strong>Date Utils usage</strong></summary>
 
### format
```bash
let result = koala('2020-06-20').date()
                                .format('DD/MM/YYYY')
                                .getValue();

console.log(result);// '20/06/2020'

let result = koala('2020-06-20').date()
                                .format('HH:mm:ss')
                                .getValue();

console.log(result);// '00:00:00'

let result = koala('2020-06-20').date()
                                .format()
                                .getValue();

console.log(result);// '20/06/2020 00:00:00'

let result = koala('2020-06-20T13:51:00').date('+0300')
                                         .format()
                                         .getValue();

console.log(result);// '20/06/2020 07:51:00'
```
### add
```bash
let result = koala('2020-01-01').date()
                                .add({qtd: 1, type: 'days'})
                                .getValue();

console.log(result);// Date('2020-01-02')

let result = koala('2020-10-30').date()
                                .add({qtd: 1, type: 'days', ignoreDays: [
                                    KlDateDay.saturday, 
                                    KlDateDay.sunday
                                ])
                                .getValue();

console.log(result);// Date('2020-11-02')
```
### sub
```bash
let result = koala('2020-01-02').date()
                                .sub({qtd: 1, type: 'days'})
                                .getValue();

console.log(result);// Date('2020-01-01')

let result = koala('2020-10-30').date()
                                .sub({qtd: 1, type: 'days', ignoreDays: [
                                    KlDateDay.saturday, 
                                    KlDateDay.sunday
                                ])
                                .getValue();

console.log(result);// Date('2020-11-23')
```
### isHoliday
```bash
let result = koala('2020-11-02').date().isHoliday();

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
let result = koala({teste: 1}).object<any>()
                              .merge({teste2: 2})
                              .getValue();

console.log(result); // {teste: 1,teste2: 2}
```
### toString
```bash
let result = koala({
    param1: "Hello",
    param2: "World"
}).object().toString(['param1','param2']).getValue();

console.log(result); // "Hello World"
```
</details><br>

<details>
 <summary><strong>Http Request Utils usage</strong></summary>
 
### request
```bash
let result = await koala('https://exemple.com')
    .request()
    .get<Users[]>('/users', {name: 'test'});

console.log(result); // {statusCode: number, data: Users[]}
```
</details><br>
