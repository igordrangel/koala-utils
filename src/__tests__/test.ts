import { Koala } from '../Koala';

jest.setTimeout(10000000);
test('KoalaDelayHelper', async () => {
  const text =
          'Recusada\n            \n                    \n                        Recusa automatica - 27/10/2020 15:36:29\n                            \n                                    \n                                        - POLÃTICA DE CRÃ‰DITO DEFINITIVA';
  const result = new Koala(text)
    .string()
    .split()
    .map((value) => {
      value = value.trimStart().trimEnd();
      if (value.indexOf('- ') === 0) {
        value = value.replace('- ', '');
      }
      return value;
    })
    .clearEmptyValues()
    .toString(' - ')
    .normalize()
    .getValue();
  console.log(result);
  expect(true).toBe(true);
});
