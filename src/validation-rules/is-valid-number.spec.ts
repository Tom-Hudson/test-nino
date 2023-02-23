import { isValidNumber } from './is-valid-number'

describe('isValidNumber', () => {
  const validNinos = ['XX123456XX', 'XX000000XX', 'XX999999X']
  const invalidNinos = ['XX12345X', '123456', '1']

  test.each(validNinos)('returns true for %s', (nino) => {
    expect(isValidNumber(nino)).toBe(true)
  })

  test.each(invalidNinos)('returns false for %s', (nino) => {
    expect(isValidNumber(nino)).toBe(false)
  })
})
