import { expect, describe, it } from '@jest/globals'
import { random } from './index'

describe('random', () => {
  it('should generate a valid nino', () => {
    expect(random()).toMatch(/^(?!BG|GB|KN|NK|NT|TN|ZZ)[^DFIQUV][^DFIQUVO][0-9]{6}[ABCD]$/img)
  })
})
