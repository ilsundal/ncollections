'use strict'

const assert = require('assert');

const IndexSet = require(__dirname + '/../main/IndexSet.js');

const SetTest = require(__dirname + '/SetTest.js');

class IndexSetTest extends SetTest {

  // add get methods

  constructor(options={}) {
    super(IndexSet, options);
  }
  
  // todo: add test cases for get methods
}

module.exports = IndexSetTest;
