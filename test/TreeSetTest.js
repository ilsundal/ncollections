'use strict'

const assert = require('assert');

const TreeSet = require(__dirname + '/../main/TreeSet.js');

const SortedSetTest = require(__dirname + '/SortedSetTest.js');

class TreeSetTest extends SortedSetTest {

  constructor(options={}) {
    super(TreeSet, options);
  }
}

module.exports = TreeSetTest;
