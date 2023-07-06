# Koala Utils

## Install

```bash
npm i @koalarx/utils
```

# String

### maskCpf
```typescript
import { maskCpf } from '@koalarx/utils/operators/string';

maskCpf('11111111111')

// Result: 111.111.111-11
```

### maskCnpj
```typescript
import { maskCnpj } from '@koalarx/utils/operators/string';

maskCnpj('11111111000111')

// Result: 11.111.111/0001-11
```

### unmaskCpf
```typescript
import { unmaskCpf } from '@koalarx/utils/operators/string';

unmaskCpf('111.111.111-11')

// Result: 11111111111
```

### unmaskCnpj
```typescript
import { unmaskCnpj } from '@koalarx/utils/operators/string';

unmaskCnpj('11.111.111/0001-11')

// Result: 11111111000111
```

### validateCpf
```typescript
import { validateCpf } from '@koalarx/utils/operators/string';

validateCpf('111.111.111-11')

// Result: false
```

### validateCnpj
```typescript
import { validateCnpj } from '@koalarx/utils/operators/string';

validateCnpj('11.111.111/0001-11')

// Result: false
```

### randomString
```typescript
import { randomString } from '@koalarx/utils/operators/string';

randomString(4, true, true, true, true)

// Result: 1Aa$
```

### clear
```typescript
import { clear } from '@koalarx/utils/operators/string';

clear('Olá Mundo')

// Result: Ola Mundo
```

### unmaskCoin
```typescript
import { unmaskCoin } from '@koalarx/utils/operators/string';

unmaskCoin('R$ 1.000,00')

// Result: 1000
```

### toCamelCase
```typescript
import { toCamelCase } from '@koalarx/utils/operators/string';

toCamelCase('Olá Mundo')

// Result: olaMundo
```

### nbl2br
```typescript
import { nbl2br } from '@koalarx/utils/operators/string';

nbl2br('Line1\nLine2') 

// Result: Line1<br/>Line2
```

# Number

### maskCoin
```typescript
import { maskCoin } from '@koalarx/utils/operators/number';

maskCoin(1000)

// Result: R$ 1.000,00
```

### random
```typescript
import { klNumber } from '@koalarx/utils/operators/number';

klNumber(0).random(1000, 2000).getValue()

// Result: 3000
```

# Date

### format
```typescript
import { format } from '@koalarx/utils/operators/date';

format('2020-01-01', 'DD/MM/YYYY')

// Result: 01/01/2020
```

### isHoliday
```typescript
import { isHoliday } from '@koalarx/utils/operators/date';

isHoliday('2020-01-01')

// Result: true
```

### add
```typescript
import { format } from '@koalarx/utils/operators/date';

add('2020-01-01', 2)

// Result: 2020-01-03
```

### sub
```typescript
import { format } from '@koalarx/utils/operators/date';

sub('2020-01-03', 2)

// Result: 2020-01-01
```

### diff
```typescript
import { format } from '@koalarx/utils/operators/date';

diff('2020-01-01', '2020-01-03')

// Result: 2
```

# Delay 
```typescript
import { delay } from '@koalarx/utils/operators/delay';

async () => {
  //some code...

  await delay(2000);

  //some code...
}
```

# Array

### map
```typescript
import { klArray } from '@koalarx/utils/operators/array';

klArray([{ name: 'test1' }, { name: 'test2' }])
  .map((item) => {
    if (item.name === 'test2') {
      item.name = 'Hello World'
    }
    return item
  })
  .getValue() 

// Result: [{ name: 'test1' }, { name: 'Hello World' }]
```

### mapAsync
```typescript
import { klArray } from '@koalarx/utils/operators/array';

async () => {
  // some code...
  (await klArray([
    { proposal: '123' },
    { proposal: '456' },
    { proposal: '789' },
  ]).mapAsync<number>(async (item) => {
    await klDelay(300)
    return parseInt(item.proposal, 10)
  })).getValue()
  // some code...
}

// Result: [123, 456, 789]
```

### merge
```typescript
import { klArray } from '@koalarx/utils/operators/array';

klArray([1]).merge([2]).getValue()

// Result: [1, 2]
```

### filter
```typescript
import { klArray } from '@koalarx/utils/operators/array';

klArray([{ teste: 123 }, { teste2: 543 }])
  .filter('123', 'teste')
  .getValue()

// Result: [{ teste: 123 }]
```

### getIndex
```typescript
import { klArray } from '@koalarx/utils/operators/array';

klArray([{ teste: 123 }, { teste: 123 }]).getIndex('teste', 123)

// Result: 0
```

### split
```typescript
import { klArray } from '@koalarx/utils/operators/array';

klArray([1, 2, 3, 4]).split(2).getValue()

// Result: [ [1, 2], [3, 4] ]
```

### toString
```typescript
import { klArray } from '@koalarx/utils/operators/array';

klArray([1, 2, 3, 4]).toString(',').getValue()

// Result: '1,2,3,4'
```

### orderBy asc
```typescript
import { klArray } from '@koalarx/utils/operators/array';

klArray([
  { date: new Date('2020-06-18') },
  { date: new Date('2020-06-15') },
  { date: new Date('2020-06-17') },
  { date: new Date('2020-06-20') },
])
  .orderBy('date')
  .getValue()

// Result: [
//   { date: new Date('2020-06-15') },
//   { date: new Date('2020-06-17') },
//   { date: new Date('2020-06-18') },
//   { date: new Date('2020-06-20') },
// ]
```

### orderBy desc
```typescript
import { klArray } from '@koalarx/utils/operators/array';

klArray([
  { date: new Date('2020-06-18') },
  { date: new Date('2020-06-15') },
  { date: new Date('2020-06-17') },
  { date: new Date('2020-06-20') },
])
  .orderBy('date', true)
  .getValue()

// Result: [
//   { date: new Date('2020-06-20') },
//   { date: new Date('2020-06-18') },
//   { date: new Date('2020-06-17') },
//   { date: new Date('2020-06-15') },
// ]
```

### toBase64
```typescript
import { klArray } from '@koalarx/utils/operators/array';

(await klArray([{ nome: 'Teste 1' }, { nome: 'Teste 2' }]).toBase64()).getValue()

// Result: 'bm9tZQpUZXN0ZSAxClRlc3RlIDI='
```

### pipe
```typescript
import { klArray } from '@koalarx/utils/operators/array';

[{ proposal: '123' }, { proposal: '456' }, { proposal: '789' }])
  .pipe((klArray) => {
    return klArray.getValue().map((item) => parseInt(item.proposal, 10))
  })
  .getValue()

// Result: [123, 456, 789]
```

### pipeAsync
```typescript
import { klArray } from '@koalarx/utils/operators/array';

(await klArray([
  { proposal: '123' },
  { proposal: '456' },
  { proposal: '789' },
]).pipeAsync(async (klArray) => {
  await klDelay(300)
  return klArray.getValue().map((item) => parseInt(item.proposal, 10))
})).getValue()

// Result: [123, 456, 789]
```

### shuffleArray
```typescript
import { klArray } from '@koalarx/utils/operators/array';

klArray([{ id: 1 }, { id: 2 }, { id: 3 }]).shuffle().getValue()

// Result: [{ id: 2 }, { id: 1 }, { id: 3 }]
```

# Object

### merge
```typescript
import { klObject } from '@koalarx/utils/operators/object';

klObject({ teste: 1 }).merge<any>({ teste2: 2 }).getValue()

// Result: { teste: 1, teste2: 2 }
```

### toString
```typescript
import { klObject } from '@koalarx/utils/operators/object';

klObject({
  param1: 'Hello',
  param2: 'World',
})
  .toString(['param1', 'param2'])
  .getValue()

// Result: 'Hello World'
```

### clone
```typescript
import { clone } from '@koalarx/utils/operators/object';

clone({id: 1})
```

# Cron

```typescript
import { klCron } from '@koalarx/utils/operators/cron';

const cron = klCron()

cron.start()
await klDelay(2000)
cron.end()

cron.duration() // Result: 2
```