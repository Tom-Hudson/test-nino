import { maxNumber, numberLength, validPrefixes, validSuffixes } from './internal/data'
import { toFixedDigitString } from './internal/utils'

/**
 * Returns a generator instance to allow you to call `next()`
 * to go through all valid ni numbers in sequence, starting at
 * AA000000A up to ZY999999D
 * @returns Generator<string>
 */
export const incremental = function * (): Generator<string> {
  for (const prefix of validPrefixes) {
    for (let n = 0; n <= maxNumber; n++) {
      for (const suffix of validSuffixes) {
        const numbers = toFixedDigitString(n, numberLength)

        yield `${prefix}${numbers}${suffix}`
      }
    }
  }
}
