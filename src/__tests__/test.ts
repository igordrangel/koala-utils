import { koala } from "../index";
import { KlDateDay } from "../enums/KlDateDay";
import { KlDelay } from "../utils/KlDelay";

// const text = 'Recusada\n            \n                    \n                        Recusa automatica - 27/10/2020 15:36:29\n                            \n                                    \n                                        - POLÃTICA DE CRÃ‰DITO DEFINITIVA';
// const result = koala(text).string()
//                           .split()
//                           .map((value) => {
//                             value = value.trimStart().trimEnd();
//                             if (value.indexOf('- ') === 0) {
//                               value = value.replace('- ', '');
//                             }
//                             return value;
//                           })
//                           .clearEmptyValues()
//                           .toString(' - ')
//                           .normalize()
//                           .getValue();

jest.setTimeout(10000000);
test('Array Utils', async () => {
  expect(koala([1]).array<number>().merge([2]).getValue()).toStrictEqual([1, 2]);
  expect(koala([{teste: 123}, {teste2: 543}]).array().filter('123', 'teste').getValue()).toStrictEqual([{teste: 123}]);
  expect(koala([{teste: 123}, {teste: 123}]).array().getIndex('teste', 123)).toBe(0);
  expect(koala([1, 2, 3, 4]).array().split(2).getValue()).toStrictEqual([
    [1, 2],
    [3, 4],
  ]);
  expect(koala([1, 2, 3, 4]).array().toString(',').getValue()).toStrictEqual('1,2,3,4');
  expect(
    koala([
      {date: new Date('2020-06-18')},
      {date: new Date('2020-06-15')},
      {date: new Date('2020-06-17')},
      {date: new Date('2020-06-20')},
    ]).array().orderBy('date').getValue(),
  ).toStrictEqual([
    {date: new Date('2020-06-15')},
    {date: new Date('2020-06-17')},
    {date: new Date('2020-06-18')},
    {date: new Date('2020-06-20')},
  ]);
  expect(
    koala([
      {date: new Date('2020-06-18')},
      {date: new Date('2020-06-15')},
      {date: new Date('2020-06-17')},
      {date: new Date('2020-06-20')},
    ]).array().orderBy('date', true).getValue(),
  ).toStrictEqual([
    {date: new Date('2020-06-20')},
    {date: new Date('2020-06-18')},
    {date: new Date('2020-06-17')},
    {date: new Date('2020-06-15')},
  ]);
});

test('String Utils', async () => {
  expect(koala('Olá Mundo').string().clear('-').getValue()).toBe('Ola-Mundo');
  expect(koala('Olá\nMundo').string().nbl2br().getValue()).toBe('Olá<br/>Mundo');
  expect(koala('9964085842').string().maskCpf().getValue()).toBe('099.640.858-42');
  expect(koala('Olá Mundo').string().toCamelCase().getValue()).toBe('olaMundo');
  expect(koala('1,2').string().split().getValue()).toStrictEqual(['1', '2']);
  expect(koala('1.000,00').string().unmaskCoin().getValue()).toBe(1000);
  expect(koala('').string().random(4, true, true, true, true).getValue());
});

test('Number Utils', async () => {
  expect(koala(0).number().random(1000, 2000).getValue());
});

test('Date Utils', () => {
  expect(koala('1993-11-02').date().format('DD/MM/YYYY').getValue()).toBe('02/11/1993');
  expect(koala('2020-06-20 00:00:00').date().format('HH:mm:ss').getValue()).toBe('00:00:00');
  expect(koala('2020-06-20 00:00:00').date().format().getValue()).toBe('20/06/2020 00:00:00');
  expect(koala('2020-01-01').date().add({qtd: 1, type: "days"}).format('DD/MM/YYYY').getValue()).toBe('02/01/2020');
  expect(koala('2020-01-02').date().sub({qtd: 1, type: "days"}).format('DD/MM/YYYY').getValue()).toBe('01/01/2020');
  expect(koala('2020-10-26').date().sub({
    qtd: 1,
    type: "days",
    ignoreDays: [KlDateDay.saturday, KlDateDay.sunday]
  }).format('DD/MM/YYYY').getValue()).toBe('23/10/2020');
});

test('Delay Util', async () => {
  await KlDelay.waitFor(1000);
  expect(true).toBe(true);
});

test('Object Util', () => {
  expect(koala({teste: 1}).object().merge({teste2: 2}).getValue()).toStrictEqual({teste: 1, teste2: 2});
  expect(koala({
    param1: 'Hello',
    param2: 'World'
  }).object().toString(['param1', 'param2']).getValue()).toBe('Hello World');
});
