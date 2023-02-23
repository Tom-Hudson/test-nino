import { normalise } from './normalise'

describe('normalise', () => {
  it.each([
    { input: 'AA 00 00 00 B', output: 'AA000000B' },
    { input: '  aA 00 00 00 B ', output: 'AA000000B' },
    { input: 'Aa\t00\t00\t00\tb ', output: 'AA000000B' },
    { input: 'AA 00\t00   00 B ', output: 'AA000000B' },
    { input: 'AA 000000 B ', output: 'AA000000B' }
  ])('should normalise $input to $output', ({ input, output }) => {
    expect(normalise(input)).toEqual(output)
  })
})
