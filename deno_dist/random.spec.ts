import { expect, describe, it } from '@jest/globals DENOIFY: UNKNOWN NODE BUILTIN'
import { random } from './random.ts'

describe('random', () => {
  it('should generate a valid nino', () => {
    expect(random()).toMatch(/^(?!BG|GB|KN|NK|NT|TN|ZZ)[^DFIQUV][^DFIQUVO][0-9]{6}[ABCD]$/img)
  })
})
