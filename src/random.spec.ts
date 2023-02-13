import { expect, describe, it } from '@jest/globals'
import { random } from './random'

describe('random', () => {
  it('should generate a valid nino when requested 5000 time', () => {
    for (let i = 1; i <= 5000; i++) {
      expect(random()).toMatch(/^(?!BG|GB|KN|NK|NT|TN|ZZ)[^DFIQUV][^DFIQUVO][0-9]{6}[ABCD]$/img)
    }
  })
})
