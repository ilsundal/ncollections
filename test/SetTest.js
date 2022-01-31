'use strict'

const assert = require('assert');

const Util = require(__dirname + '/../main/Util.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class SetTest extends CollectionTest {

  class_method_names = this.class_method_names.concat([
    'add',
    'addAll',
    'contains',
    'containsAll',
    'remove',
    'removeAll'
  ]);

  constructor(setClass, options={}) {
    super(setClass, options);
  }

  test_add(test) {
    super.test_add_like_method(test, { return_type: 'changed' });
    it('{1,2} + 1 -> false & {1,2}', function() {
      let set = test.newInstance([1,2]);
      assert(set.add(1) == false);
      assert(Util.equals(set.toArray().sort(), [1,2]));
    });
  }

  test_addAll(test) {
    it('{} + {1,2} -> true & {1,2}', function() {
      let set = test.newInstance();
      assert(set.addAll([1,2]) == true);
      assert(Util.equals(set.toArray().sort(), [1,2]));
    });
    it('{1,2} + [3,4] -> true & {1,2,3,4}', function() {
      let set = test.newInstance([1,2]);
      assert(set.addAll([3,4]) == true);
      assert(Util.equals(set.toArray().sort(), [1,2,3,4]));
    });
  }

  test_contains(test) {
    it('{} contains 1 -> false', function() {
      let set = test.newInstance();
      assert(set.contains(1) == false);
    });
    it('{1,2} contains 3 -> false', function() {
      let set = test.newInstance([1,2]);
      assert(set.contains(3) == false);
    });
    it('{1,2} contains 2 -> true', function() {
      let set = test.newInstance([1,2]);
      assert(set.contains(2));
    });
  }

  test_containsAll(test) {
    it('{} contains all of [1] -> false', function() {
      let set = test.newInstance();
      assert(set.containsAll([1]) == false);
    });
    it('{1,2} contains all of [2] -> true', function() {
      let set = test.newInstance([1,2]);
      assert(set.containsAll([2]) == true);
    });
    it('{1,2,3} contains all of [1,3] -> true', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.containsAll([1,3]) == true);
    });
  }

  test_equals(test) {
    super.test_equals(test);
    it('{1,2} == {2,1}', function() {
      let set1 = test.newInstance([1,2]);
      let set2 = test.newInstance([2,1]);
      assert(set1.equals(set2));
      assert(set2.equals(set1));
    });
  }

  test_remove(test) {
    it('{} - 1 -> false', function() {
      let set = test.newInstance();
      assert(set.remove(1) == false);
    });
    it('{1,2,3} - 2 -> true & {1,3}', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.remove(2) == true);
      assert(Util.equals(set.toArray().sort(), [1,3]));
    });
  }

  test_removeAll(test) {
    it('{1,2,3,4} - [1,2,5] -> true & {3,4}', function() {
      let set = test.newInstance([1,2,3,4]);
      assert(set.removeAll([1,2,5]) == true);
      assert(Util.equals(set.toArray().sort(), [3,4]));
    });
  }

  test_toString(test) {
    super.test_toString(test, { start: '{', end: '}' });
  }
}

module.exports = SetTest;
