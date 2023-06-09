import { validate } from './validate'

describe('validate', () => {
  it.each([
    'AA000000A',
    'aa000000a',
    'HL123456C',
    'ZX999999D'
  ])('should return valid result for NINO %s', (nino) => {
    expect(validate(nino)).toEqual({
      rules: {
        type: true,
        length: true,
        prefix: true,
        number: true,
        suffix: true
      },
      outcome: true
    })
  })

  it.each([
    { nino: 1, validKeys: [], invalidKeys: ['type'] },
    { nino: 'A', validKeys: ['type'], invalidKeys: ['length'] },
    { nino: 'ZZ000000A', validKeys: ['type', 'length'], invalidKeys: ['prefix'] },
    { nino: 'AAO00000A', validKeys: ['type', 'length', 'prefix'], invalidKeys: ['number'] },
    { nino: 'AA0O0000A', validKeys: ['type', 'length', 'prefix'], invalidKeys: ['number'] },
    { nino: 'AA00O000A', validKeys: ['type', 'length', 'prefix'], invalidKeys: ['number'] },
    { nino: 'AA000O00A', validKeys: ['type', 'length', 'prefix'], invalidKeys: ['number'] },
    { nino: 'AA0000O0A', validKeys: ['type', 'length', 'prefix'], invalidKeys: ['number'] },
    { nino: 'AA00000OA', validKeys: ['type', 'length', 'prefix'], invalidKeys: ['number'] },
    { nino: 'AAOOOOOOA', validKeys: ['type', 'length', 'prefix'], invalidKeys: ['number'] },
    { nino: 'AA000000E', validKeys: ['type', 'length', 'prefix', 'number'], invalidKeys: ['suffix'] }
  ])('should return invalid result for $nino with valid keys $validKeys and invalid keys $invalidKeys', ({
    nino,
    validKeys,
    invalidKeys
  }: {
    nino: string
    validKeys: string[]
    invalidKeys: string[]
  }) => {
    const expectedOutcome = {
      rules: {},
      outcome: false
    }

    invalidKeys.forEach(invalidKey => {
      expectedOutcome.rules[invalidKey] = false
    })

    validKeys.forEach(validKey => {
      expectedOutcome.rules[validKey] = true
    })

    expect(validate(nino)).toEqual(expectedOutcome)
  })
})
