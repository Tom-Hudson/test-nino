const Benchmark = require('benchmark')
const avris = require('avris-generator')
const fakeNino = require('fake-nino')
const { randomNino } = require('random_uk_nino')
const { random: testNinoRandom } = require('../../dist')

const suite = new Benchmark.Suite()

suite
  .add('avris-generator', function () {
    avris.generate('GB', 'nino')
  })
  .add('fake-nino', function () {
    fakeNino.generate()
  })
  .add('random_uk_nino', function () {
    randomNino.generate()
  })
  .add('test-nino', function () {
    testNinoRandom()
  })
  .on('complete', function () {
    const parsedResult = this.map(({ name, hz }) => ({ package: name, result: +hz.toPrecision(3) }))
    console.table(parsedResult)
  })
  .run()
