import { validPrefixes, validSuffixes } from './data'
import { getRandomValue, randomNumberBetween } from './utils'

/**
 * Generates a random, valid UK National Insurance number
 * https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim39110
 * @returns string
 */
export const random = (): string => {
  const prefix = getRandomValue(validPrefixes)
  const suffix = getRandomValue(validSuffixes)

  // 000001 is a valid, so padding the start of the string with '0' includes 000001-099999
  const numbers = randomNumberBetween(0, 999999).toString().padStart(6, '0')

  return `${prefix}${numbers}${suffix}`
}
