const Benchmark = require('benchmark')
const avris = require('avris-generator')
const validNino = require('valid-nino').default
const isNiNumber = require('is-national-insurance-number')
const { validate: testNinoValidate } = require('../../dist')

const scenarios = [
  { scenario: 'valid', input: 'AA000000A' },
  { scenario: 'invalid', input: 'A' },
  { scenario: 'invalid', input: null },
  { scenario: 'invalid', input: 'AAX00000A' },
  { scenario: 'invalid', input: 'AA00000XA' }
]

const execute = (input) => new Promise(resolve => {
  const suite = new Benchmark.Suite()

  suite
    .add('avris-generator', function () {
      try {
        avris.validate('GB', 'nino', input)
      } catch (err) {
        // Needed as avris will throw when invalid
      }
    })
    .add('valid-nino', function () {
      validNino(input)
    })
    .add('is-national-insurance-number', function () {
      isNiNumber(input)
    })
    .add('test-nino', function () {
      testNinoValidate(input)
    })
    .on('complete', function () {
      const parsedResult = this.map(({ name, hz }) => ({ package: name, result: +hz.toPrecision(3) }))
      resolve(parsedResult)
    })
    .run()
});

(async () => {
  for (const scenario of scenarios) {
    console.log(`Scenario: ${scenario.scenario} (${scenario.input})`)
    const result = await execute(scenario.input)
    console.table(result)
  }
})()
