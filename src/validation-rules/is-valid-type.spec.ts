import { isValidType } from './is-valid-type'

describe('isValidType', () => {
  const validTypes = ['string', String(123)]
  const invalidTypes = [123, [], {}, undefined, NaN, Infinity, Symbol, new Set(), new Date()]

  test.each(validTypes)('returns true for %s', (type) => {
    expect(isValidType(type)).toBe(true)
  })

  test.each(invalidTypes)('returns false for %s', (type) => {
    expect(isValidType(type as string)).toBe(false)
  })
})
