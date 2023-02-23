import { getRandomValue, randomNumberBetween, toFixedDigitString } from './utils'

describe('utils', () => {
  describe('getRandomValue', () => {
    it('should return a random value from provided array', () => {
      const availableArray = [1, 2, 3, 4, 5]
      const actual = getRandomValue(availableArray)

      expect(availableArray).toContain(actual)
    })
  })

  describe('randomNumberBetween', () => {
    it.each([
      [0, 2],
      [0, 100],
      [101, 300],
      [9999999, 999999999]
    ])('should generate random number between %d-%d', (min, max) => {
      const actual = randomNumberBetween(min, max)

      expect(actual).toBeGreaterThanOrEqual(min)
      expect(actual).toBeLessThanOrEqual(max)
    })
  })

  describe('toFixedDigitString', () => {
    it.each([
      [6, 6, '000006'],
      [5000, 5, '05000'],
      [123, 3, '123'],
      [123, 10, '0000000123']
    ])('should ', (num, minLength, expected) => {
      const actual = toFixedDigitString(num, minLength)

      expect(actual).toEqual(expected)
    })
  })
})
