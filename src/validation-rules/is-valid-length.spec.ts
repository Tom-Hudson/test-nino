import { isValidLength } from './is-valid-length'

describe('isValidLength', () => {
  const validNinos = ['123456789', 'AAAAAAAAA', '*********']
  const invalidNinos = ['12345678', '1234567890', '1']

  test.each(validNinos)('returns true for %s', (nino) => {
    expect(isValidLength(nino)).toBe(true)
  })

  test.each(invalidNinos)('returns false for %s', (nino) => {
    expect(isValidLength(nino)).toBe(false)
  })
})
