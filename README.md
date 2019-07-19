# io-ts-excess

A type for [io-ts](https://github.com/gcanti/io-ts) library, which will fail on any additional properties.

Thanks to [@gcanti](https://github.com/gcanti) for the [original code](https://github.com/gcanti/io-ts/issues/322#issuecomment-513170377).

> Warning! Does not work from inside intersection!

## Usage

```typescript
import * as t from "io-ts";
import excess from "io-ts-excess";

const C = excess(
  t.type({
    a: t.string,
  }),
);

import { PathReporter } from "io-ts/lib/PathReporter";

console.log(PathReporter.report(C.decode({ a: "a", b: 1 })));
// [ 'Invalid value {"a":"a","b":1} supplied to : { a: string }, excess properties: ["b"]' ]
```

## TODO

- [ ] Make it to work inside intersection. The following code does not work for now:
```typescript
const I = t.intersection([C, t.type({ b: t.number })])

console.log(PathReporter.report(I.decode({ a: 'a', b: 1 })))
// [ 'Invalid value {"a":"a","b":1} supplied to : { a: string }, excess properties: ["b"]' ]
```
