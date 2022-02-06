'use strict'

const assert = require('assert');

const Deque = require(__dirname + '/../main/Deque.js');
const NoSuchElementException = require(__dirname + '/../main/NoSuchElementException.js');
const Util = require(__dirname + '/../main/Util.js');

const ListishTest = require(__dirname + '/ListishTest.js');

class DequeTest extends ListishTest {

  constructor(dequeClass=Deque, options) {
    super(dequeClass, options);
  }

  class_method_names = this.class_method_names.concat([
    'addFirst',
    'addLast',
    'peekFirst',
    'peekLast',
    'pollFirst',
    'pollLast',
  ]);

  add_fn = function(deque, element) {
    return deque.addLast(element);
  }

  test_addFirst(test) {
    it('[] + 1 -> true & [1]', function() {
      let deque = test.newInstance();
      assert(deque.addFirst(1));
    });
    it('[1,2] + 1 -> true & [1,1,2]', function() {
      let deque = test.newInstance([1,2]);
      assert(deque.addFirst(1));
      assert(Util.equals(deque.toArray(), [1,1,2]));
    });
  }

  test_addLast(test) {
    super.test_add0(test);
  }

  test_peekFirst(test) {
    it('[] -> undefined', function() {
      let deque = test.newInstance();
      assert(deque.peekFirst() === undefined);
    });
    it('[1,2,3] -> 1', function() {
      let deque = test.newInstance([1,2,3]);
      assert(deque.peekFirst() === 1);
    });
  }

  test_peekLast(test) {
    it('[] -> undefined', function() {
      let deque = test.newInstance();
      assert(deque.peekLast() === undefined);
    });
    it('[1,2,3] -> 2', function() {
      let deque = test.newInstance([1,2,3]);
      assert(deque.peekLast() === 3);
    });
  }

  test_pollFirst(test) {
    it('[] -> undefined', function() {
      let deque = test.newInstance();
      assert(deque.pollFirst() === undefined);
    });
    it('[1,2,3] -> 1', function() {
      let deque = test.newInstance([1,2,3]);
      assert(deque.pollFirst() === 1);
      Util.equals(deque.toArray(), [2,3]);
    });
  }

  test_pollLast(test) {
    it('[] -> undefined', function() {
      let deque = test.newInstance();
      assert(deque.pollLast() === undefined);
    });
    it('[1,2,3] -> 1', function() {
      let deque = test.newInstance([1,2,3]);
      assert(deque.pollLast() === 3);
      Util.equals(deque.toArray(), [1,2]);
    });
  }
}

module.exports = DequeTest;
