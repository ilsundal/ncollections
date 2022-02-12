'use strict'

const assert = require('assert');

const IllegalArgumentException = require(__dirname + '/../main/IllegalArgumentException.js');
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

  constructor(set_class, options={}) {
    super(set_class, options);
  }

  newInstance(elements=[]) {
    let set = new this.collection_class(this.options);
    for (let element of elements)
      set.add(element);
    return set;
  }

  test_constructor(test) {
    it('() -> instance', function() {
      let set = test.newInstance();
      assert(set instanceof test.collection_class);
    });
  }

  test_add(test) {
    it('{} + undefined -> IllegalArgumentException', function() {
      let set = test.newInstance();
      let methodCall = () => set.add(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{} + 1 -> true & {1}', function() {
      let set = test.newInstance();
      assert(set.add(1) === true);
      assert(Util.equals(set.toArray(), [1]));
    });
    it('{1} + 2 -> true & {1,2}', function() {
      let set = test.newInstance([1]);
      assert(set.add(2) === true);
      assert(Util.equals(set.toArray().sort(), [1,2]));
    });

    it('{1,2} + 1 -> false & {1,2}', function() {
      let set = test.newInstance([1,2]);
      assert(set.add(1) === false);
      assert(Util.equals(set.toArray().sort(), [1,2]));
    });
  }

  test_addAll(test) {
    it('{} + undefined -> IllegalArgumentException', function() {
      let set = test.newInstance();
      let methodCall = () => set.addAll(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{} + [undefined] -> IllegalArgumentException', function() {
      let set = test.newInstance();
      let methodCall = () => set.addAll([undefined]);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{} + [1,2] -> true & {1,2}', function() {
      let set = test.newInstance();
      assert(set.addAll([1,2]) === true);
      assert(Util.equals(set.toArray().sort(), [1,2]));
    });
    it('{1} + [1,2] -> true & {1,2}', function() {
      let set = test.newInstance();
      assert(set.addAll([1,2]) === true);
      assert(Util.equals(set.toArray().sort(), [1,2]));
    });
    it('{1,2} + [3,4] -> true & {1,2,3,4}', function() {
      let set = test.newInstance([1,2]);
      assert(set.addAll([3,4]) === true);
      assert(Util.equals(set.toArray().sort(), [1,2,3,4]));
    });
    it('{1,2} + [1,2] -> false & {1,2}', function() {
      let set = test.newInstance([1,2]);
      assert(set.addAll([1,2]) === false);
      assert(Util.equals(set.toArray().sort(), [1,2]));
    });
  }

  test_clear(test) {
    it('{1,2} -> {}', function() {
      let set = test.newInstance([1,2]);
      set.clear();
      assert(set.isEmpty() === true);
    });
  }

  test_clone(test) {
    it('{1,2} -> {1,2}', function() {
      let set = test.newInstance([1,2]);
      let set_clone = set.clone();
      assert(set !== set_clone);
      assert(set.equals(set_clone));
      assert(set_clone.equals(set));
    });
  }

  test_contains(test) {
    it('{1} contains undefined -> IllegalArgumentException', function() {
      let set = test.newInstance([1]);
      let methodCall = () => set.contains(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{} contains 1 -> false', function() {
      let set = test.newInstance();
      assert(set.contains(1) === false);
    });
    it('{1,2} contains 3 -> false', function() {
      let set = test.newInstance([1,2]);
      assert(set.contains(3) === false);
    });
    it('{1,2} contains 2 -> true', function() {
      let set = test.newInstance([1,2]);
      assert(set.contains(2));
    });
  }

  test_containsAll(test) {
    it('{1} contains undefined -> IllegalArgumentException', function() {
      let set = test.newInstance([1]);
      let methodCall = () => set.contains(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{1} contains [undefined] -> IllegalArgumentException', function() {
      let set = test.newInstance([1]);
      let methodCall = () => set.containsAll([undefined]);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{} contains [1] -> false', function() {
      let set = test.newInstance();
      assert(set.containsAll([1]) === false);
    });
    it('{1,2} contains [2] -> true', function() {
      let set = test.newInstance([1,2]);
      assert(set.containsAll([2]) === true);
    });
    it('{1,2,3} contains [1,3] -> true', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.containsAll([1,3]) === true);
    });
  }

  test_equals(test) {
    it('{1,2} === {2,1}', function() {
      let set1 = test.newInstance([1,2]);
      let set2 = test.newInstance([2,1]);
      assert(set1.equals(set2));
      assert(set2.equals(set1));
    });
  }

  test_hashCode(test) {
    it('hash code of {1,2} === hash code of {2,1}', function() {
      let set1 = test.newInstance([1,2]);
      let set2 = test.newInstance([2,1]);
      assert(set1.hashCode() === set2.hashCode());
    });
  }

  test_isEmpty(test) {
    it('{} -> true', function() {
      let set = test.newInstance();
      assert(set.isEmpty() === true);
    });
    it('{1,2} -> false', function() {
      let set = test.newInstance([1,2]);
      assert(set.isEmpty() === false);
    });
  }

  test_next(test) {
    it('[] -> (no iterations)', function() {
      let set = test.newInstance();
      for (let element of set)
        assert(false);
    });
    it('[1,2] -> 1 -> 2 (when sorted)', function() {
      let set = test.newInstance([1,2]);
      let array = Array.from(set);
      assert(Util.equals(array.sort(), [1,2]));
    });
  }

  test_remove(test) {
    it('{1} - undefined -> IllegalArgumentException', function() {
      let set = test.newInstance([1]);
      let methodCall = () => set.remove(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{} - 1 -> false', function() {
      let set = test.newInstance();
      assert(set.remove(1) === false);
    });
    it('{1,2,3} - 2 -> true & {1,3}', function() {
      let set = test.newInstance([1,2,3]);
      assert(set.remove(2) === true);
      assert(Util.equals(set.toArray().sort(), [1,3]));
    });
  }

  test_removeAll(test) {
    it('{1} - undefined -> IllegalArgumentException', function() {
      let set = test.newInstance([1]);
      let methodCall = () => set.removeAll(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{1} - [undefined] -> IllegalArgumentException', function() {
      let set = test.newInstance([1]);
      let methodCall = () => set.removeAll([undefined]);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{1,2,3,4} - [1,2,5] -> true & {3,4}', function() {
      let set = test.newInstance([1,2,3,4]);
      assert(set.removeAll([1,2,5]) === true);
      assert(Util.equals(set.toArray().sort(), [3,4]));
    });
  }

  test_size(test) {
    it('{} -> 0', function() {
      let set = test.newInstance();
      assert(set.size() === 0);
    });
    it('{1,2} -> 2', function() {
      let set = test.newInstance([1,2]);
      assert(set.size() === 2);
    });
  }

  test_toArray(test) {
    it('{} -> []', function() {
      let set = test.newInstance();
      assert(Util.equals(set.toArray(), []));
    });
    it('{1,2} -> [1,2] sorted', function() {
      let set = test.newInstance([1,2]);
      assert(Util.equals(set.toArray().sort(), [1,2]));
    });
  }

  test_toString(test) {
    it('{} -> "{}"', function() {
      let set = test.newInstance();
      assert(set.toString() === '{}');
    });
    it('{1} -> "{1}"', function() {
      let set = test.newInstance([1]);
      assert(set.toString() === '{1}');
    });
    it('{1,2} -> "{1,2}" or "{2,1}"', function() {
      let set = test.newInstance([1,2]);
      assert(['{1,2}', '{2,1}'].includes(set.toString()));
    });
  }
}

module.exports = SetTest;
