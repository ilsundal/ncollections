'use strict'

const assert = require('assert');

const ArrayList = require(__dirname + '/../main/ArrayList.js');

const ListTest = require(__dirname + '/ListTest.js');

class ArrayListTest extends ListTest {

  constructor(options={}) {
    super(ArrayList, options);
  }
}

module.exports = ArrayListTest;
