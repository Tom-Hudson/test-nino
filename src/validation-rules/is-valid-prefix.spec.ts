import { isValidPrefix } from './is-valid-prefix'

describe('isValidPrefix', () => {
  const validNinos = ['AA', 'HL', 'MN', 'RS', 'ZX']
  const invalidNinos = ['DA', 'FA', 'IA', 'QA', 'UA', 'VA', 'AD', 'AF', 'AI', 'AQ', 'AU', 'AV', 'DD', 'FF', 'II', 'QQ', 'UU', 'VV', 'BG', 'GB', 'KN', 'NK', 'NT', 'TN', 'ZZ']

  test.each(validNinos)('returns true for %s', (nino) => {
    expect(isValidPrefix(nino)).toBe(true)
  })

  test.each(invalidNinos)('returns false for %s', (nino) => {
    expect(isValidPrefix(nino)).toBe(false)
  })
})
