import { koala } from '../index';
import { KlDateDay } from '../enums/KlDateDay';
import { KlDelay } from '../utils/KlDelay';

jest.setTimeout(10000000);
test('Array Utils', async () => {
  expect(
    koala([{ name: 'test1' }, { name: 'test2' }])
      .array<any>()
      .map((item) => {
        if (item.name === 'test2') {
          item.name = 'Hello World';
        }
        return item;
      })
      .getValue(),
  ).toStrictEqual([{ name: 'test1' }, { name: 'Hello World' }]);
  expect(koala([1]).array<number>().merge([2]).getValue()).toStrictEqual([1, 2]);
  expect(
    koala([{ teste: 123 }, { teste2: 543 }])
      .array()
      .filter('123', 'teste')
      .getValue(),
  ).toStrictEqual([{ teste: 123 }]);
  expect(
    koala([{ teste: 123 }, { teste: 123 }])
      .array()
      .getIndex('teste', 123),
  ).toBe(0);
  expect(koala([1, 2, 3, 4]).array().split(2).getValue()).toStrictEqual([
    [1, 2],
    [3, 4],
  ]);
  expect(koala([1, 2, 3, 4]).array().toString(',').getValue()).toStrictEqual('1,2,3,4');
  expect(
    koala([
      { date: new Date('2020-06-18') },
      { date: new Date('2020-06-15') },
      { date: new Date('2020-06-17') },
      { date: new Date('2020-06-20') },
    ])
      .array()
      .orderBy('date')
      .getValue(),
  ).toStrictEqual([
    { date: new Date('2020-06-15') },
    { date: new Date('2020-06-17') },
    { date: new Date('2020-06-18') },
    { date: new Date('2020-06-20') },
  ]);
  expect(
    koala([
      { date: new Date('2020-06-18') },
      { date: new Date('2020-06-15') },
      { date: new Date('2020-06-17') },
      { date: new Date('2020-06-20') },
    ])
      .array()
      .orderBy('date', true)
      .getValue(),
  ).toStrictEqual([
    { date: new Date('2020-06-20') },
    { date: new Date('2020-06-18') },
    { date: new Date('2020-06-17') },
    { date: new Date('2020-06-15') },
  ]);
  expect(
    (
      await koala([{ nome: 'Teste 1' }, { nome: 'Teste 2' }])
        .array()
        .toBase64()
    ).getValue(),
  ).toBe('bm9tZQpUZXN0ZSAxClRlc3RlIDI=');
  expect(
    koala([{ proposal: '123' }, { proposal: '456' }, { proposal: '789' }])
      .array<{ proposal: string }>()
      .pipe((klArray) => {
        return klArray.getValue().map((item) => parseInt(item.proposal, 10));
      })
      .getValue(),
  ).toStrictEqual([123, 456, 789]);
  expect(
    (
      await koala([{ proposal: '123' }, { proposal: '456' }, { proposal: '789' }])
        .array<{ proposal: string }>()
        .pipeAsync(async (klArray) => {
          await KlDelay.waitFor(300);
          return klArray.getValue().map((item) => parseInt(item.proposal, 10));
        })
    ).getValue(),
  ).toStrictEqual([123, 456, 789]);
  expect(
    koala([{ proposal: '123' }, { proposal: '456' }, { proposal: '789' }])
      .array<{ proposal: string }>()
      .map<string>((item) => item.proposal)
      .getValue(),
  ).toStrictEqual(['123', '456', '789']);
  expect(
    (
      await koala([{ proposal: '123' }, { proposal: '456' }, { proposal: '789' }])
        .array<{ proposal: string }>()
        .mapAsync<number>(async (item) => {
          await KlDelay.waitFor(300);
          return parseInt(item.proposal, 10);
        })
    ).getValue(),
  ).toStrictEqual([123, 456, 789]);
});

test('String Utils', async () => {
  expect(koala('Olá Mundo').string().clear('-').getValue()).toBe('Ola-Mundo');
  expect(koala('Olá\nMundo').string().nbl2br().getValue()).toBe('Olá<br/>Mundo');
  expect(koala('9964085842').string().maskCpf().getValue()).toBe('099.640.858-42');
  expect(koala('5581451000183').string().maskCnpj().getValue()).toBe('05.581.451/0001-83');
  expect(koala('Olá Mundo').string().toCamelCase().getValue()).toBe('olaMundo');
  expect(koala('1,2').string().split().getValue()).toStrictEqual(['1', '2']);
  expect(koala('1.000,00').string().unmaskCoin().getValue()).toBe(1000);
  expect(koala('').string().random(4, true, true, true, true).getValue());
  expect(koala('teste').string().toBase64().getValue()).toBe('dGVzdGU=');
  expect(koala('teste').string().concat('1').getValue()).toBe('teste1');
  expect(koala('').string().concat('Olá').concat(' Mundo').concat(' 123').getValue()).toBe('Olá Mundo 123');
  expect(koala('Hellow World').string().replace('Hellow', 'Hello').getValue()).toBe('Hello World');
});

test('Number Utils', async () => {
  expect(koala(0).number().random(1000, 2000).getValue());
  expect(koala(1000).number().maskCoin().getValue()).toBe('R$ 1.000,00');
});

test('Date Utils', () => {
  expect(koala('1993-11-02').date().format('DD/MM/YYYY').getValue()).toBe('02/11/1993');
  expect(koala('2020-06-20 00:00:00').date().format('HH:mm:ss').getValue()).toBe('00:00:00');
  expect(koala('2020-06-20 00:00:00').date().format().getValue()).toBe('20/06/2020 00:00:00');
  expect(koala('2020-06-20T13:51:00').date('+0300').format().getValue()).toBe('20/06/2020 07:51:00');
  expect(koala('2020-01-01').date().add({ qtd: 1, type: 'days' }).format('DD/MM/YYYY').getValue()).toBe('02/01/2020');
  expect(koala('2020-01-02').date().sub({ qtd: 1, type: 'days' }).format('DD/MM/YYYY').getValue()).toBe('01/01/2020');
  expect(
    koala('2020-11-03')
      .date()
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
    koala({ teste: 1 })
      .object<{ teste: number }>()
      .merge<any>({ teste2: 2 })
      .getValue(),
  ).toStrictEqual({ teste: 1, teste2: 2 });
  expect(
    koala({
      param1: 'Hello',
      param2: 'World',
    })
      .object()
      .toString(['param1', 'param2'])
      .getValue(),
  ).toBe('Hello World');
});
