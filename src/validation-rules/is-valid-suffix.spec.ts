import { isValidSuffix } from './is-valid-suffix'

describe('isValidSuffix', () => {
  const validSuffix = ['A', 'B', 'C', 'D']
  const invalidSuffix = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  test.each(validSuffix)('returns true for %s', (suffix) => {
    expect(isValidSuffix(`XXXXXXXX${suffix}`)).toBe(true)
  })

  test.each(invalidSuffix)('returns false for %s', (suffix) => {
    expect(isValidSuffix(`XXXXXXXX${suffix}`)).toBe(false)
  })
})
