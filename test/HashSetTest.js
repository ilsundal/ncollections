'use strict'

const assert = require('assert');

const HashSet = require(__dirname + '/../main/HashSet.js');

const SetTest = require(__dirname + '/SetTest.js');

class HashSetTest extends SetTest {

  constructor(options={}) {
    super(HashSet, options);
  }
}

module.exports = HashSetTest;
