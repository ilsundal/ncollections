'use strict'

const NativeSet = require(__dirname + '/../main/NativeSet.js');

const SetTest = require(__dirname + '/SetTest.js');

class NativeSetTest extends SetTest {

  constructor(options={}) {
    super(NativeSet, options);
  }
}

module.exports = NativeSetTest;
