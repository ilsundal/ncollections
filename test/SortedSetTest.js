'use strict'

const assert = require('assert');

const Util = require(__dirname + '/../main/Util.js');

const SetTest = require(__dirname + '/SetTest.js');

class SortedSetTest extends SetTest {

  class_method_names = this.class_method_names.concat([
    'getFirst',
    'getLast',
    'removeFirst',
    'removeLast'
  ]);

  constructor(set_class, options={}) {
    super(set_class, options);
  }

  test_getFirst(test) {
    it('{1,2,3} -> 1', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.getFirst() === 1);
      assert(set.size() === 3);
    });
  }

  test_getLast(test) {
    it('{1,2,3} -> 3', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.getLast() === 3);
      assert(set.size() === 3);
    });
  }

  test_removeFirst(test) {
    it('{1,2,3} -> 1 & {2,3}', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.removeFirst() === 1);
      assert(Util.equals(set.toArray(), [2,3]));
    });
  }

  test_removeLast(test) {
    it('{1,2,3} -> 3 & {2,3}', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.removeLast() === 3);
      assert(Util.equals(set.toArray(), [1,2]));
    });
  }
}

module.exports = SortedSetTest;
