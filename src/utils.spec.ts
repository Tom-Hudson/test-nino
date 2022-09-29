import { expect, describe, it } from '@jest/globals'
import { getRandomValue, randomNumberBetween } from './utils'

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
})
