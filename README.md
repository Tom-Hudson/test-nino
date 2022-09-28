# test-nino

The fastest UK National Insurance number generator.

## Getting Started

### Install
```
npm i test-nino
```

### Import

```
// ESM/TypeScript
import * as testNino from 'test-nino';

// CommonJS
const testNino = require(test-nino');
```

### Use
```
const nino = testNino.random()
// Returns a valid UK National Insurance number e.g. AA000000A
```

## How fast can it be?
Here is how `test-nino` fares against other packages:

| package                                                        | Run 1 | Run 2 | Run 3 | Average | Ops/sec |
|----------------------------------------------------------------|-------|-------|-------|---------|---------|
| [fake-nino](https://www.npmjs.com/package/fake-nino)           | 3201  | 3214  | 3213  | 3209.33 | 186,955 |
| [random_uk_nino](https://www.npmjs.com/package/random_uk_nino) | 2497  | 2459  | 2430  | 2460    | 243,902 |
| **test-nino**                                                  | 1148  | 1184  | 1150  | 1160.67 | 516,943 |

> Benchmarks ran on an i7 3.0Ghz with 16GB RAM, using Node 16. All times for runs and averages are recorded in milliseconds for 10,000,000 runs

As you can see, `test-nino` is more than 2x faster than the next fastest random NI number generator

## What makes it so fast?
Other packages out there use loops which go through the process of `Generate random NINO > is it valid? > no > repeat`, until a valid nino is given.

This can mean that precious CPU resources and the Node Event Loop is being blocked.

`test-nino` has been made a lot simpler and just stores a the complete list of valid prefixes and suffixes which are then just looked up at random. No loops, so this gives us big-O of O(1) vs O(?)

## What is a valid UK National Insurance number?
To cite the rules at the time of implementation from [Gov.uk](https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim39110):
> A NINO is made up of 2 letters, 6 numbers and a final letter, which is always A, B, C, or D.
> 
> It looks something like this: QQ 12 34 56 A
>
>All prefixes are valid except:
>
>* The characters D, F, I, Q, U, and V are not used as either the first or >second letter of a NINO prefix.
>* The letter O is not used as the second letter of a prefix.
>* Prefixes BG, GB, KN, NK, NT, TN and ZZ are not to be used
