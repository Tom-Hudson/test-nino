const Benchmark = require('benchmark');
const avris = require('avris-generator');
const validNino = require("valid-nino").default;
const isNiNumber = require('is-national-insurance-number');
const { validate: testNinoValidate } = require('../../dist');

const validNinoStr = 'AA000000A';

const suite = new Benchmark.Suite;

suite
    .add('avris-generator', function () {
        avris.validate('GB', 'nino', validNinoStr);
    })
    .add('valid-nino', function () {
        validNino(validNinoStr);
    })
    .add('is-national-insurance-number', function () {
        isNiNumber(validNinoStr);
    })
    .add('test-nino', function () {
        testNinoValidate(validNinoStr);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();