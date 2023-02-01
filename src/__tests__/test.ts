import { KlDateDay } from '../enums/KlDateDay';
import { KlDelay } from '../utils/KlDelay';
import { clone, klObject } from '../operators/object';
import { klArray, shuffleArray } from '../operators/array';
import { klString } from '../operators/string';
import { klNumber } from '../operators/number';
import { klDate } from '../operators/date';

jest.setTimeout(10000000);
test('Array Utils', async () => {
  expect(
    klArray([{ name: 'test1' }, { name: 'test2' }])
      .map((item) => {
        if (item.name === 'test2') {
          item.name = 'Hello World';
        }
        return item;
      })
      .getValue(),
  ).toStrictEqual([{ name: 'test1' }, { name: 'Hello World' }]);
  expect(klArray([1]).merge([2]).getValue()).toStrictEqual([1, 2]);
  expect(
    klArray([{ teste: 123 }, { teste2: 543 }])
      .filter('123', 'teste')
      .getValue(),
  ).toStrictEqual([{ teste: 123 }]);
  expect(klArray([{ teste: 123 }, { teste: 123 }]).getIndex('teste', 123)).toBe(0);
  expect(klArray([1, 2, 3, 4]).split(2).getValue()).toStrictEqual([
    [1, 2],
    [3, 4],
  ]);
  expect(klArray([1, 2, 3, 4]).toString(',').getValue()).toStrictEqual('1,2,3,4');
  expect(
    klArray([
      { date: new Date('2020-06-18') },
      { date: new Date('2020-06-15') },
      { date: new Date('2020-06-17') },
      { date: new Date('2020-06-20') },
    ])
      .orderBy('date')
      .getValue(),
  ).toStrictEqual([
    { date: new Date('2020-06-15') },
    { date: new Date('2020-06-17') },
    { date: new Date('2020-06-18') },
    { date: new Date('2020-06-20') },
  ]);
  expect(
    klArray([
      { date: new Date('2020-06-18') },
      { date: new Date('2020-06-15') },
      { date: new Date('2020-06-17') },
      { date: new Date('2020-06-20') },
    ])
      .orderBy('date', true)
      .getValue(),
  ).toStrictEqual([
    { date: new Date('2020-06-20') },
    { date: new Date('2020-06-18') },
    { date: new Date('2020-06-17') },
    { date: new Date('2020-06-15') },
  ]);
  expect((await klArray([{ nome: 'Teste 1' }, { nome: 'Teste 2' }]).toBase64()).getValue()).toBe(
    'bm9tZQpUZXN0ZSAxClRlc3RlIDI=',
  );
  expect(
    klArray([{ proposal: '123' }, { proposal: '456' }, { proposal: '789' }])
      .pipe((klArray) => {
        return klArray.getValue().map((item) => parseInt(item.proposal, 10));
      })
      .getValue(),
  ).toStrictEqual([123, 456, 789]);
  expect(
    (
      await klArray([{ proposal: '123' }, { proposal: '456' }, { proposal: '789' }]).pipeAsync(async (klArray) => {
        await KlDelay.waitFor(300);
        return klArray.getValue().map((item) => parseInt(item.proposal, 10));
      })
    ).getValue(),
  ).toStrictEqual([123, 456, 789]);
  expect(
    klArray([{ proposal: '123' }, { proposal: '456' }, { proposal: '789' }])
      .map<string>((item) => item.proposal)
      .getValue(),
  ).toStrictEqual(['123', '456', '789']);
  expect(
    (
      await klArray([{ proposal: '123' }, { proposal: '456' }, { proposal: '789' }]).mapAsync<number>(async (item) => {
        await KlDelay.waitFor(300);
        return parseInt(item.proposal, 10);
      })
    ).getValue(),
  ).toStrictEqual([123, 456, 789]);
  expect(shuffleArray([{ id: 1 }, { id: 2 }, { id: 3 }])[0].id !== 1).toBe(true);
});

test('String Utils', async () => {
  expect(klString('Olá Mundo').clear('-').getValue()).toBe('Ola-Mundo');
  expect(klString('Olá\nMundo').nbl2br().getValue()).toBe('Olá<br/>Mundo');
  expect(klString('9964085842').maskCpf().getValue()).toBe('099.640.858-42');
  expect(klString('5581451000183').maskCnpj().getValue()).toBe('05.581.451/0001-83');
  expect(klString('Olá Mundo').toCamelCase().getValue()).toBe('olaMundo');
  expect(klString('1,2').split().getValue()).toStrictEqual(['1', '2']);
  expect(klString('1.000,00').unmaskCoin().getValue()).toBe(1000);
  expect(klString('').random(4, true, true, true, true).getValue());
  expect(klString('teste').toBase64().getValue()).toBe('dGVzdGU=');
  expect(klString('teste').concat('1').getValue()).toBe('teste1');
  expect(klString('').concat('Olá').concat(' Mundo').concat(' 123').getValue()).toBe('Olá Mundo 123');
  expect(klString('Hellow World').replace('Hellow', 'Hello').getValue()).toBe('Hello World');
});

test('Number Utils', async () => {
  expect(klNumber(0).random(1000, 2000).getValue());
  expect(klNumber(1000).maskCoin().getValue()).toBe('R$ 1.000,00');
});

test('Date Utils', () => {
  expect(klDate('1993-11-02').format('DD/MM/YYYY').getValue()).toBe('02/11/1993');
  expect(klDate('2020-06-20 00:00:00').format('HH:mm:ss').getValue()).toBe('00:00:00');
  expect(klDate('2020-06-20 00:00:00').format().getValue()).toBe('20/06/2020 00:00:00');
  expect(klDate('2020-06-20T13:51:00', '+0300').format().getValue()).toBe('20/06/2020 07:51:00');
  expect(klDate('2020-01-01').add({ qtd: 1, type: 'days' }).format('DD/MM/YYYY').getValue()).toBe('02/01/2020');
  expect(klDate('2020-01-02').sub({ qtd: 1, type: 'days' }).format('DD/MM/YYYY').getValue()).toBe('01/01/2020');
  expect(klDate('2020-01-02').diff('2020-01-03').getValue()).toBe(1);
  expect(
    klDate('2020-11-03')
      .sub({
        qtd: 1,
        type: 'days',
        ignoreDays: [KlDateDay.saturday, KlDateDay.sunday, KlDateDay.holidays],
      })
      .format('DD/MM/YYYY')
      .getValue(),
  ).toBe('30/10/2020');
});

test('Delay Util', async () => {
  await KlDelay.waitFor(1000);
  expect(true).toBe(true);
});

test('Object Util', () => {
  expect(
    klObject({ teste: 1 })
      .merge<any>({ teste2: 2 })
      .getValue(),
  ).toStrictEqual({ teste: 1, teste2: 2 });
  expect(
    klObject({
      param1: 'Hello',
      param2: 'World',
    })
      .toString(['param1', 'param2'])
      .getValue(),
  ).toBe('Hello World');
  expect(clone({ teste: 1 })).toStrictEqual({ teste: 1 });
});
