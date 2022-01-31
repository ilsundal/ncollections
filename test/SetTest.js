'use strict'

const assert = require('assert');

const Util = require(__dirname + '/../main/Util.js');

const DefaultCollectionTest = require(__dirname + '/DefaultCollectionTest.js');

class SetTest extends DefaultCollectionTest {

  constructor(setClass, options={}) {
    super(setClass, options);
  }

  test_add(test) {
    super.test_add(test, { return_type: 'changed' });
    it('[1,2] + 1 -> false & [1,2]', function() {
      let set = test.newInstance([1,2]);
      assert(!set.add(1));
      assert(Util.equals(set.toArray().sort(), [1,2]));
    });
  }

  test_equals(test) {
    super.test_equals(test);
    it('[1,2] == [2,1]', function() {
      let collection1 = test.newInstance([1,2]);
      let collection2 = test.newInstance([2,1]);
      assert(collection1.equals(collection2));
      assert(collection2.equals(collection1));
    });
  }

  test_toString(test) {
    super.test_toString(test, { start: '{', end: '}' });
  }
}

module.exports = SetTest;
