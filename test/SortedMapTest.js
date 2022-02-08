'use strict'

const assert = require('assert');

const Util = require(__dirname + '/../main/Util.js');

const MapTest = require(__dirname + '/MapTest.js');

class SortedMapTest extends MapTest {

  class_method_names = this.class_method_names.concat([
    'peekFirst',
    'peekLast',
    'pollFirst',
    'pollLast'
  ]);

  constructor(set_class, options={}) {
    super(set_class, options);
  }

  test_peekFirst(test) {
/*
    it('{1,2,3} -> 1', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.peekFirst() === 1);
      assert(set.size() === 3);
    });
*/
  }

  test_peekLast(test) {
/*
    it('{1,2,3} -> 3', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.peekLast() === 3);
      assert(set.size() === 3);
    });
*/
  }

  test_pollFirst(test) {
/*
    it('{1,2,3} -> 1 & {2,3}', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.pollFirst() === 1);
      assert(Util.equals(set.toArray(), [2,3]));
    });
*/
  }

  test_pollLast(test) {
/*
    it('{1,2,3} -> 3 & {2,3}', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.pollLast() === 3);
      assert(Util.equals(set.toArray(), [1,2]));
    });
*/
  }
}

module.exports = SortedMapTest;
