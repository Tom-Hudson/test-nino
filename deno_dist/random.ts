import { maxNumber, minNumber, numberLength, validPrefixes, validSuffixes } from './internal/data.ts'
import { getRandomValue, randomNumberBetween, toFixedDigitString } from './internal/utils.ts'

/**
 * Generates a random, valid UK National Insurance number
 * https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim39110
 * @returns string
 */
export const random = (): string => {
  const prefix = getRandomValue(validPrefixes)
  const suffix = getRandomValue(validSuffixes)

  const randomNumber = randomNumberBetween(minNumber, maxNumber)
  const numbers = toFixedDigitString(randomNumber, numberLength)

  return `${prefix}${numbers}${suffix}`
}
