'use strict'

const HashMap = require(__dirname + '/../main/HashMap.js');

const MapTest = require(__dirname + '/MapTest.js');

class HashMapTest extends MapTest {

  constructor(options={}) {
    super(HashMap, options);
  }
}

module.exports = HashMapTest;
