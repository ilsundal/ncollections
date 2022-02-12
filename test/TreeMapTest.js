'use strict'

const assert = require('assert');

const TreeMap = require(__dirname + '/../main/TreeMap.js');

const SortedMapTest = require(__dirname + '/SortedMapTest.js');

class TreeMapTest extends SortedMapTest {

  constructor(options={}) {
    super(TreeMap, options);
  }
}

module.exports = TreeMapTest;
