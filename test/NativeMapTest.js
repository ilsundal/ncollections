'use strict'

const NativeMap = require(__dirname + '/../main/NativeMap.js');

const MapTest = require(__dirname + '/MapTest.js');

class NativeMapTest extends MapTest {

  constructor(options={}) {
    super(NativeMap, options);
  }
}

module.exports = NativeMapTest;
