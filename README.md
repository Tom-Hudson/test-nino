# test-nino

<p> 
  <img src="https://badgen.net/npm/v/test-nino" />
  <img src="https://badgen.net/bundlephobia/dependency-count/test-nino" />
  <img src="https://badgen.net/bundlephobia/minzip/test-nino" />
  <img src="https://badgen.net/npm/dt/test-nino" />
  <img src="https://badgen.net/github/last-commit/Tom-Hudson/test-nino" />
  <img src="https://badgen.net/npm/license/test-nino" />
</p>

The fastest random UK National Insurance number generator.

- [Getting Started](#getting-started)
  * [Install](#install)
  * [Import](#import)
- [Available functions](#available-functions)
  * [random](#random)
  * [incremental](#incremental)
- [How fast can it be?](#how-fast-can-it-be)
  * [What makes it so fast?](#what-makes-it-so-fast)
- [What is a valid UK National Insurance number?](#what-is-a-valid-uk-national-insurance-number)
- [How many valid UK National Insurance numbers are there?](#how-many-valid-uk-national-insurance-numbers-are-there)

## Getting Started

### Install
```
npm i test-nino
```

### Import

 ```js
// ESM/TypeScript
import * as testNino from 'test-nino';

// CommonJS
const testNino = require('test-nino');

// Deno
import * as testNino from "https://deno.land/x/test_nino@vX.X.X/deno_dist/mod.ts";
```

## Available functions
There are 2 available functions exposed:

### random
To generate a single valid NINO, you can simply run the `random` function:
 ```js
const nino = testNino.random();
// Returns a valid UK National Insurance number e.g. AA000000A
```
> Warning: it is not guaranteed that you couldn't generate the same NINO more than once using this method. If you require a unique NINO every time, I suggest you use the [incremental](#incremental) generator

### incremental
This method is best if you want to ensure you don't generate a duplicate NINO and utilises a [JavaScript Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) to enumerate through all possible valid UK NI numbers `AA000000A-ZY999999D` (there are [1,492,000,000 in total](#how-many-valid-uk-national-insurance-numbers-are-there)). 

The generator will enumerate on prefix, number and then suffix.

```js
// Create a generator instance
const uniqueNiGenerator = testNino.incremental();

for(let i = 0; i <= 10000000; i++) {
    uniqueNiGenerator.next()
    // Returns the next instance from the generator
    // on the 1st iteration it will return { value: 'AA000000A', done: false }
    // on the 2nd iteration it will return { value: 'AA000000B', done: false }
    // ...
    // on the 10000000th iteration it will return { value: 'AC500000A', done: false }
}
```

> The `done` property will only return `true` once all possible combinations have been enumerated (with the value `ZY999999D`).

## How fast can it be?
Here is how `test-nino`'s [random](#random) function fares against other packages:

| package                                                        | function | ops/sec   |
|----------------------------------------------------------------|----------|-----------|
| [fake-nino](https://www.npmjs.com/package/fake-nino)           | generate | 3,027,256 |
| [random_uk_nino](https://www.npmjs.com/package/random_uk_nino) | generate | 3,876,490 |
| **test-nino**                                                  | random   | 8,162,494 |

> Benchmarks ran using [benchmark.js](https://www.npmjs.com/package/benchmark) on an i7 3.0Ghz with 16GB RAM, using Node 16.

As you can see, `test-nino` is more than 2x faster than the next fastest random NI number generator

### What makes it so fast?
Other packages use loops which go through the process of `Generate random NINO > is it valid? > no > repeat`, until a valid nino is given.

This costs precious CPU time and [blocks the Node Event Loop](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/).

`test-nino` is made different and instead stores the complete list of valid prefixes which are then picked at random. No loops, so this gives the `random` function a BigO complexity of O(1)

## What is a valid UK National Insurance number?
To cite the rules at the time of implementation from [Gov.uk](https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim39110):
> A NINO is made up of 2 letters, 6 numbers and a suffix, which is always A, B, C, or D.
> 
> It looks something like this: QQ 12 34 56 A
>
>All prefixes are valid except:
>
>* The characters D, F, I, Q, U, and V are not used as either the first or second letter of a NINO prefix.
>* The letter O is not used as the second letter of a prefix.
>* Prefixes BG, GB, KN, NK, NT, TN and ZZ are not to be used

## How many valid UK National Insurance numbers are there?
First, let's consider the restrictions on the first two letters of the NINO prefix:

* The characters D, F, I, Q, U, and V are not used as either the first or second letter of the prefix, so there are 20 possible choices for the first letter (A-Z excluding D, F, I, Q, U, and V) and 19 possible choices for the second letter (A-Z excluding D, F, I, Q, U, V, and O).
* The prefixes BG, GB, KN, NK, NT, TN and ZZ are not to be used, so there are 20 x 19 - 7 = 373 possible combinations of the first two letters.

Next, let's consider the restrictions on the final letter, which is the suffix:

* The suffix can only be A, B, C, or D, so there are 4 possible suffixs.

Finally, let's consider the six numbers in the NINO:

* Each of the six numbers can have 10 possible values (0-9), so there are 10^6 (1 million) possible combinations of the six numbers.

Putting this all together, the number of possible unique NINOs would be:

373 (for the first two letters) x 10^6 (for the six numbers) x 4 (for the final letter) = **1,492,000,000** possible NINOs.