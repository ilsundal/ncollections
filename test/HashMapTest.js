'use strict'

const assert = require('assert');

const HashMap = require(__dirname + '/../main/HashMap.js');

const MapTest = require(__dirname + '/MapTest.js');

class HashMapTest extends MapTest {
  #collectionClass;

  constructor(options={}) {
    super(HashMap, options);
  }
}

module.exports = HashMapTest;
