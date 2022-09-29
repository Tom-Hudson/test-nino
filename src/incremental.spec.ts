import { expect, describe, it } from '@jest/globals'
import { incremental } from './incremental'

describe('incremental', () => {
  it('should return the next incremented NI number', () => {
    const uniqueNiGenerator = incremental()

    expect(uniqueNiGenerator.next()).toEqual({ value: 'AA000000A', done: false })
    expect(uniqueNiGenerator.next()).toEqual({ value: 'AA000000B', done: false })

    let lastReturned
    for (let i = 0; i <= 10000; i++) {
      lastReturned = uniqueNiGenerator.next()
    }

    expect(lastReturned).toEqual({ value: 'AA002500C', done: false })
  })
})
