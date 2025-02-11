# test-nino

<p> 
  <img src="https://badgen.net/npm/v/test-nino" />
  <img src="https://badgen.net/bundlephobia/dependency-count/test-nino" />
  <img src="https://badgen.net/bundlephobia/minzip/test-nino" />
  <img src="https://badgen.net/npm/dt/test-nino" />
  <img src="https://badgen.net/github/last-commit/Tom-Hudson/test-nino" />
  <img src="https://badgen.net/npm/license/test-nino" />
  <a href="https://codecov.io/github/Tom-Hudson/test-nino" > 
    <img src="https://codecov.io/github/Tom-Hudson/test-nino/branch/master/graph/badge.svg?token=XEMCXN2P7A"/> 
  </a>
</p>

The fastest NINO (UK National Insurance number) generator and validator. Generates and validates UK NI numbers to NIM39110 specifications on Gov.uk.

`test-nino` is a performance focused and has zero dependencies. The [benchmarks](#benchmarks) speak for themselves.

- [Getting Started](#getting-started)
  * [Install](#install)
  * [Import](#import)
- [Available functions](#available-functions)
  * [random](#random)
  * [incremental](#incremental)
  * [validate](#validate)
  * [normalise](#normalise)
- [Benchmarks](#benchmarks)
- [What is a valid UK National Insurance number?](#what-is-a-valid-uk-national-insurance-number)
- [How many valid UK National Insurance numbers are there?](#how-many-valid-uk-national-insurance-numbers-are-there)

## Getting Started

### Install
You can install the [test-nino](https://www.npmjs.com/package/test-nino) package from npm:
```
npm i test-nino
```

### Import
```js
// ESM/TypeScript
import * as testNino from 'test-nino';

// CommonJS
const testNino = require('test-nino');
```

## Available functions

### random
Used to generate a random NINO:
 ```js
const nino = testNino.random();
// Returns a valid UK National Insurance number e.g. AA000000A
```
> Warning: it is not guaranteed that you couldn't generate the same NINO more than once using this method. If you require a unique NINO every time, I suggest you use the [incremental](#incremental) generator.

### incremental
This method is best if you want to ensure you don't generate a duplicate NINO. This function utilises a [JavaScript Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) to enumerate through all possible valid UK NI numbers `AA000000A-ZY999999D` (there are [1,492,000,000 in total](#how-many-valid-uk-national-insurance-numbers-are-there)). 

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

> The `done` property will only return `true` once all possible combinations have been enumerated.

### validate
This function will validate the provided NINO and return an object which details which rules have passed or failed.
> It is expected that the NINO is already without formatting etc. - you can use [`normalise`](#normalise) to prepare the NINO if required.

```js
// A valid NINO
testNino.validate("AB123456C");
// {
//   rules: {
//     type: true,
//     length: true,
//     prefix: true,
//     number: true,
//     suffix: true
//   },
//   outcome: true
// }

// An invalid NINO
testNino.validate(1);
// {
//   rules: {
//     type: false,
//   },
//   outcome: false
// }
```
> The object returned will always have an `outcome` property but the function fails fast and so will only return a result for each tested element of the NINO.

### normalise
This function will normalise NINOs, stripping whitespace and converting it to uppercase characters.
```js
testNino.normalise('aa 00 00 00 a') // AA000000A
testNino.normalise('BB 123456 B') // BB123456B
```
> This can be used as a primer for the [`validate`](#validate) function

## Benchmarks
All benchmarks are ran using [benchmark.js](https://www.npmjs.com/package/benchmark) on Node v18.16.0. CommonJS imports are used for all packages to keep things fair. You can run the benchmarks yourself from the `benchmarks` folder. Results have been rounded to 3 significant figures to smooth out variances between runs and provide more comparable results.

### random
`test-nino` is more than **2.6x faster** than the next fastest random NI number generator:

| package                                                          | version | ops/sec    |
|------------------------------------------------------------------|---------|------------|
| [fake-nino](https://www.npmjs.com/package/fake-nino)             | 0.0.1   | 5,810,000  |
| [random_uk_nino](https://www.npmjs.com/package/random_uk_nino)   | 1.0.3   | 6,340,000  |
| [avris-generator](https://www.npmjs.com/package/avris-generator) | 0.8.2   | 2,900,000  |
| **test-nino**                                                    | latest  | 17,000,000 |

> Other packages use loops which go through the process of `Generate random NINO > is it valid? > no > repeat`, until a valid nino is given. This costs precious CPU time and [blocks the Node Event Loop](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/). `test-nino` is made different and instead stores the complete list of valid prefixes which are then picked at random. No loops result in consistent performance that is not guaranteed with other packages. 

### validate
`test-nino` is more than **14x faster** than the next fastest validate function when validating a valid nino:

| package                                                                                    | version | valid (AA000000A) | invalid (A)      | invalid (null)   | invalid (AAX00000A) | invalid (AA00000XA) |
|--------------------------------------------------------------------------------------------|---------|-------------------| -----------------| ---------------- | ------------------- | ------------------- |
| [valid-nino](https://www.npmjs.com/package/valid-nino)                                     | 1.0.0   | 34,000,000        | 84,600,000       | 64,100,000       | 75,200,000          | 27,000,000          |
| [is-national-insurance-number](https://www.npmjs.com/package/is-national-insurance-number) | 1.0.0   | 42,800,000        | 1,030,000,000    | 1,030,000,000    | 80,000,000          | 33,000,000          |
| [avris-generator](https://www.npmjs.com/package/avris-generator)                           | 0.8.2   | 4,190,000         | 232,000 (throws) | 105,000 (throws) | 230,000 (throws)    | 230,000 (throws)    |
| **test-nino**                                                                              | latest  | 609,000,000       | 1,030,000,000    | 1,030,000,000    | 1,020,000,000       | 601,000,000         |

> Most other packages rely on Regex patterns, the validate function in `test-nino` instead utilises indexed character lookups which are much faster. The function also fails fast, meaning even bigger gains for specific invalid scenarios.

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

* The suffix can only be A, B, C, or D, so there are 4 possible suffixes.

Finally, let's consider the six numbers in the NINO:

* Each of the six numbers can have 10 possible values (0-9), so there are 10^6 (1 million) possible combinations of the six numbers.

Putting this all together, the number of possible unique NINOs would be:

373 (for the first two letters) x 10^6 (for the six numbers) x 4 (for the final letter) = **1,492,000,000** possible NINOs.