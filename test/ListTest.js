'use strict'

const assert = require('assert');

const IllegalArgumentException = require(__dirname + '/../main/IllegalArgumentException.js');
const IndexOutOfBoundsException = require(__dirname + '/../main/IndexOutOfBoundsException.js');
const NoSuchElementException = require(__dirname + '/../main/NoSuchElementException.js');
const Util = require(__dirname + '/../main/Util.js');

const ListishTest = require(__dirname + '/ListishTest.js');

class ListTest extends ListishTest {

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
    'indexOf',
    'insertAt',
    'lastIndexOf',
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
    super.test_add0(test);
    it('[1,2] + 3 -> this & [1,2,3]', function() {
      let list = test.newInstance([1,2]);
      assert(list.add(3) === list);
      assert(Util.equals(list.toArray(), [1,2,3]));
    });
  }

  test_addAll(test) {
    it('[] + undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.addAll(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[] + [1,undefined] -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.addAll(1, undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[] + [1,2] -> this & [1,2]', function() {
      let list = test.newInstance();
      assert(list.addAll([1,2]) === list);
      assert(Util.equals(list.toArray(), [1,2]));
    });
    it('[1,2] + [3,4] -> this & [1,2,3,4]', function() {
      let list = test.newInstance([1,2]);
      assert(list.addAll([3,4]) === list);
      assert(Util.equals(list.toArray(), [1,2,3,4]));
    });
  }

  test_addFirst(test) {
    it('[] + undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.addFirst(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
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
    it('[] + undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.addLast(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
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
    it('[] contains undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.contains(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[] contains 1 -> false', function() {
      let list = test.newInstance();
      assert(list.contains(1) === false);
    });
    it('[1,2] contains 3 -> false', function() {
      let list = test.newInstance([1,2]);
      assert(list.contains(3) === false);
    });
    it('[1,2] contains 2 -> true', function() {
      let list = test.newInstance([1,2]);
      assert(list.contains(2));
    });
  }

  test_containsAll(test) {
    it('[] contains undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.containsAll(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[] contains [undefined] -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.containsAll([undefined]);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[] contains [1] -> false', function() {
      let list = test.newInstance();
      assert(list.containsAll([1]) === false);
    });
    it('[1,2] contains [2] -> true', function() {
      let list = test.newInstance([1,2]);
      assert(list.containsAll([2]) === true);
    });
    it('[1,2,3] contains [1,3] -> true', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.containsAll([1,3]) === true);
    });
  }

  test_getAt(test) {
    it('[] at undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.getAt(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[1,2,3] at 1 -> 2', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.getAt(1) === 2);
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
      assert(list.getFirst() === 1);
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
      assert(list.getLast() === 3);
    });
  }

  test_indexOf(test) {
    it('[] index undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.indexOf(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[1,null,2] index null -> 1', function() {
      let list = test.newInstance([1,null,2]);
      assert(list.indexOf(null) === 1);
    });
    it('[1,2,3,2,1] index 4 -> undefined', function() {
      let list = test.newInstance([1,2,3,2,1]);
      assert(list.indexOf(4) === undefined);
    });
    it('[1,2,3,2,1] index 2 -> 1', function() {
      let list = test.newInstance([1,2,3,2,1]);
      assert(list.indexOf(2) === 1);
    });
  }

  test_insertAt(test) {
    it('[1,2] at undefined insert 1 -> IllegalArgumentException', function() {
      let list = test.newInstance([1,2]);
      let methodCall = () => list.insertAt(undefined, 1);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[1,2] at 0 insert undefined -> IllegalArgumentException', function() {
      let list = test.newInstance([1,2]);
      let methodCall = () => list.insertAt(0, undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
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

  test_lastIndexOf(test) {
    it('[] index undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.lastIndexOf(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[1,2,3,2,1] index 4 -> undefined', function() {
      let list = test.newInstance([1,2,3,2,1]);
      assert(list.lastIndexOf(4) === undefined);
    });
    it('[1,2,3,2,1] index 2 -> 3', function() {
      let list = test.newInstance([1,2,3,2,1]);
      assert(list.lastIndexOf(2) === 3);
    });
  }

  test_removeAt(test) {
    it('[] at undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.removeAt(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[] at 0 -> IndexOutOfBoundsException', function() {
      let list = test.newInstance();
      let methodCall = () => list.removeAt(0);
      assert.throws(methodCall, IndexOutOfBoundsException);
    });
    it('[1,2,3] at 1 -> 2 & [1,3]', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.removeAt(1) === 2);
      assert(Util.equals(list.toArray(), [1,3]));
    });
  }

  test_remove(test) {
    it('[] - undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.remove(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[] - null -> false', function() {
      let list = test.newInstance();
      assert(list.remove(null) === false);
    });
    it('[1,null,2] - null -> true & [1,2]', function() {
      let list = test.newInstance([1,null,2]);
      assert(list.remove(null) === true);
      assert(Util.equals(list.toArray(), [1,2]));
    });
    it('[] - 1 -> false', function() {
      let list = test.newInstance();
      assert(list.remove(1) === false);
    });
    it('[1,2,3] - 2 -> true & [1,3]', function() {
      let list = test.newInstance([1,2,3]);
      assert(list.remove(2) === true);
      assert(Util.equals(list.toArray(), [1,3]));
    });
  }

  test_removeAll(test) {
    it('[] - undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.removeAll(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[] - [1,undefined] -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.removeAll([1, undefined]);
      assert.throws(methodCall, IllegalArgumentException);
    });
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
      assert(list.removeFirst() === 1);
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
      assert(list.removeLast() === 3);
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
    it('[1,2] at undefined set 1 -> IllegalArgumentException', function() {
      let list = test.newInstance([1,2]);
      let methodCall = () => list.setAt(undefined, 1);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('[1,2] at 0 set undefined -> IllegalArgumentException', function() {
      let list = test.newInstance([1,2]);
      let methodCall = () => list.setAt(1, undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
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
    it('[] set undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.setFirst(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
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
    it('[] set undefined -> IllegalArgumentException', function() {
      let list = test.newInstance();
      let methodCall = () => list.setLast(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
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
