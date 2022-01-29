'use strict'

const assert = require('assert');

const Util = require(__dirname + '/../main/Util.js');

const DefaultCollectionTest = require(__dirname + '/DefaultCollectionTest.js');

class SetTest extends DefaultCollectionTest {

  constructor(setClass, options={}) {
    super(setClass, options);
  }

  test_add(test) {
    super.test_add(test);
    it('[1,2] + 1 -> [1,2]', function() {
      let set = test.newInstance([1,2]);
      assert(!set.add(1));
      assert(Util.equals(set.toArray().sort(), [1,2]));
    });
  }
}

module.exports = SetTest;
