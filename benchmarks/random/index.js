const Benchmark = require('benchmark')
const numeral = require('numeral');
const avris = require('avris-generator')
const fakeNino = require('fake-nino')
const { randomNino } = require('random_uk_nino')
const { generateRandomNINO } = require('nino-validator');
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
  .add('nino-validator', function () {
    generateRandomNINO()
  })
  .add('test-nino', function () {
    testNinoRandom()
  })
  .on('complete', function () {
    const parsedResult = this.map(({ name, hz }) => ({ package: name, result: numeral(+hz.toPrecision(3)).format() }))
    console.log(parsedResult)
  })
  .run()
