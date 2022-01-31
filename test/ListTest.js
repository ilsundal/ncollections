'use strict'

const assert = require('assert');

const IndexOutOfBoundsException = require(__dirname + '/../main/IndexOutOfBoundsException.js');
const NoSuchElementException = require(__dirname + '/../main/NoSuchElementException.js');
const Util = require(__dirname + '/../main/Util.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class ListTest extends CollectionTest {

  class_method_names = this.class_method_names.concat([
    'add',
    'addAll',
    'addFirst',
    'addLast',
    'contains',
    'containsAll',
    'getAt',
    'getFirst',
    'getLast',
    'insertAt',
    'remove',
    'removeAll',
    'removeAt',
    'removeFirst',
    'removeLast',
    'reverse',
    'setAt',
    'setFirst',
    'setLast',
    'sort'
  ]);

  constructor(listClass, options={}) {
    super(listClass, options);
  }

  test_add(test) {
    super.test_add_like_method(test);
    it('[1,2] + 3 -> this & [1,2,3]', function() {
      let list = test.newInstance([1,2]);
      assert(list.add(3) === list);
      assert(Util.equals(list.toArray(), [1,2,3]));
    });
  }

  test_addAll(test) {
    it('[] + [1,2] -> this & [1,2]', function() {
      let list = test.newInstance();
      assert(list.addAll([1,2]) == list);
      assert(Util.equals(list.toArray(), [1,2]));
    });
    it('[1,2] + [3,4] -> this & [1,2,3,4]', function() {
      let list = test.newInstance([1,2]);
      assert(list.addAll([3,4]) == list);
      assert(Util.equals(list.toArray(), [1,2,3,4]));
    });
  }

  test_addFirst(test) {
    it('[] + 1 -> this & [1]', function() {
      let list = test.newInstance();
      assert(list.addFirst(1) === list);
      assert(Util.equals(list.toArray(), [1]));
    });
    it('[2,2] + 1 -> this & [1,2,2]', function() {
      let list = test.newInstance([2,2]);
      assert(list.addFirst(1) === list);
      assert(Util.equals(list.toArray(), [1,2,2]));
    });
  }

  test_addLast(test) {
    it('[] + 1 -> this & [1]', function() {
      let list = test.newInstance();
      assert(list.addLast(1) === list);
      assert(Util.equals(list.toArray(), [1]));
    });
    it('[2,2] + 1 -> this & [2,2,1]', function() {
      let list = test.newInstance([2,2]);
      assert(list.addLast(1) === list);
      assert(Util.equals(list.toArray(), [2,2,1]));
    });
  }

  test_contains(test) {
    it('[] contains 1 -> false', function() {
      let list = test.newInstance();
      assert(list.contains(1) == false);
    });
    it('[1,2] contains 3 -> false', function() {
      let list = test.newInstance([1,2]);
      assert(list.contains(3) == false);
    });
    it('[1,2] contains 2 -> true', function() {
      let list = test.newInstance([1,2]);
      assert(list.contains(2));
    });
  }

  test_containsAll(test) {
    it('[] contains all of [1] -> false', function() {
      let list = test.newInstance();
      assert(list.containsAll([1]) == false);
    });
    it('[1,2] contains all of [2] -> true', function() {
      let list = test.newInstance([1,2]);
      assert(list.containsAll([2]) == true);
    });
    it('[1,2,3] contains all of [1,3] -> true', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.containsAll([1,3]) == true);
    });
  }

  test_getAt(test) {
    it('[1,2,3] at 1 -> 2', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.getAt(1) == 2);
    });
    it('[1,2,3] at 3 -> IndexOutOfBoundsException', function() {
      let list = test.newInstance([1,2,3]);
      let methodCall = () => list.getAt(3);
      assert.throws(methodCall, IndexOutOfBoundsException);
    });
  }

  test_getFirst(test) {
    it('[] -> NoSuchElementException', function() {
      let list = test.newInstance();
      let methodCall = () => list.getFirst();
      assert.throws(methodCall, NoSuchElementException);
    });
    it('[1,2,3] -> 1', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.getFirst() == 1);
    });
  }

  test_getLast(test) {
    it('[] -> NoSuchElementException', function() {
      let list = test.newInstance();
      let methodCall = () => list.getLast();
      assert.throws(methodCall, NoSuchElementException);
    });
    it('[1,2,3] -> 3', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.getLast() == 3);
    });
  }

  test_insertAt(test) {
    it('[] at 0 insert 1 -> IndexOutOfBoundsException', function() {
      let list = test.newInstance();
      let methodCall = () => list.insertAt(0, 1);
      assert.throws(methodCall, IndexOutOfBoundsException);
    });
    it('[1,2,4] at 2 insert 3 -> this & [1,2,3,4]', function() {
      let list = test.newInstance([1,2,4]);
      assert(list.insertAt(2, 3) === list);
      assert(Util.equals(list.toArray(), [1,2,3,4]));
    });
  }

  test_removeAt(test) {
    it('[] at 0 -> IndexOutOfBoundsException', function() {
      let list = test.newInstance();
      let methodCall = () => list.removeAt(0);
      assert.throws(methodCall, IndexOutOfBoundsException);
    });
    it('[1,2,3] at 1 -> 2 & [1,3]', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.removeAt(1) == 2);
      assert(Util.equals(list.toArray(), [1,3]));
    });
  }

  test_remove(test) {
    it('[] - 1 -> false', function() {
      let list = test.newInstance();
      assert(list.remove(1) == false);
    });
    it('[1,2,3] - 2 -> true & [1,3]', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.remove(2) == true);
      assert(Util.equals(list.toArray(), [1,3]));
    });
  }

  test_removeAll(test) {
    it('[1,2,3,4] - [1,2,5] -> truish & [3,4]', function() {
      let list = test.newInstance([1,2,3,4]);
      assert(list.removeAll([1,2,5]));
      assert(Util.equals(list.toArray(), [3,4]));
    });
  }

  test_removeFirst(test) {
    it('[] -> NoSuchElementException', function() {
      let list = test.newInstance();
      let methodCall = () => list.removeFirst();
      assert.throws(methodCall, NoSuchElementException);
    });
    it('[1,2,3] -> 1 & [2,3]', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.removeFirst() == 1);
      assert(Util.equals(list.toArray(), [2,3]));
    });
  }

  test_removeLast(test) {
    it('[] -> NoSuchElementException', function() {
      let list = test.newInstance();
      let methodCall = () => list.removeLast();
      assert.throws(methodCall, NoSuchElementException);
    });
    it('[1,2,3] -> 3 & [1,2]', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.removeLast() == 3);
      assert(Util.equals(list.toArray(), [1,2]));
    });
  }

  test_reverse(test) {
    it('[1,2,3] -> this & [3,2,1]', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.reverse() === list);
      assert(Util.equals(list.toArray(), [3,2,1]));
    });
  }

  test_setAt(test) {
    it('[] at 0 set 1 -> IndexOutOfBoundsException', function() {
      let list = test.newInstance();
      let methodCall = () => list.setAt(0, 1);
      assert.throws(methodCall, IndexOutOfBoundsException);
    });
    it('[1,2,4] at 2 set 3 -> [1,2,3]', function() {
      let list = test.newInstance([1,2,4]);
      list.setAt(2, 3);
      assert(Util.equals(list.toArray(), [1,2,3]));
    });
  }

  test_setFirst(test) {
    it('[] set 1 -> NoSuchElementException', function() {
      let list = test.newInstance();
      let methodCall = () => list.setFirst(1);
      assert.throws(methodCall, NoSuchElementException);
    });
    it('[1,2,3] set 2 -> [2,2,3]', function() {
      let list = test.newInstance([1,2,3]);
      list.setFirst(2);
      assert(Util.equals(list.toArray(), [2,2,3]));
    });
  }

  test_setLast(test) {
    it('[] set 1 -> NoSuchElementException', function() {
      let list = test.newInstance();
      let methodCall = () => list.setLast(1);
      assert.throws(methodCall, NoSuchElementException);
    });
    it('[1,2,3] set 2 -> [1,2,2]', function() {
      let list = test.newInstance([1,2,3]);
      list.setLast(2);
      assert(Util.equals(list.toArray(), [1,2,2]));
    });
  }

  test_sort(test) {
    it('[3,2,1] -> this & [1,2,3]', function() {
      let list = test.newInstance([3,2,1]);
      assert(list.sort() === list);
      assert(Util.equals(list.toArray(), [1,2,3]));
    });
    it('[1,2,3] with reversing compare_fn -> this & [3,2,1]', function() {
      let list = test.newInstance([1,2,3]);
      let compare_fn = function(e1, e2) { return e2 - e1; }
      assert(list.sort(compare_fn) === list);
      assert(Util.equals(list.toArray(), [3,2,1]));
    });
  }
}

module.exports = ListTest;
