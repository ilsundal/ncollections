'use strict'

const assert = require('assert');

const Util = require(__dirname + '/../main/Util.js');

const SetTest = require(__dirname + '/SetTest.js');

class SortedSetTest extends SetTest {

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
    it('{} + 1 -> true & {1}', function() {
      let set = test.newInstance();
      assert(set.add(1) === true);
      assert(Util.equals(set.toArray(), [1]));
    });
*/
  }

  test_peekLast(test) {
/*
    it('{} + 1 -> true & {1}', function() {
      let set = test.newInstance();
      assert(set.add(1) === true);
      assert(Util.equals(set.toArray(), [1]));
    });
*/
  }

  test_pollFirst(test) {
/*
    it('{} + 1 -> true & {1}', function() {
      let set = test.newInstance();
      assert(set.add(1) === true);
      assert(Util.equals(set.toArray(), [1]));
    });
*/
  }

  test_pollLast(test) {
/*
    it('{} + 1 -> true & {1}', function() {
      let set = test.newInstance();
      assert(set.add(1) === true);
      assert(Util.equals(set.toArray(), [1]));
    });
*/
  }
}

module.exports = SortedSetTest;
