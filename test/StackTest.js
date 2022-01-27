'use strict'

const assert = require('assert');

const NoSuchElementException = require(__dirname + '/../main/NoSuchElementException.js');
const Stack = require(__dirname + '/../main/Stack.js');
const Util = require(__dirname + '/../main/Util.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class StackTest extends CollectionTest {

  constructor(stackClass=Stack, options) {
    super(stackClass, options);
  }

  run() {
    super.run();
    this.test_peek(this);
    this.test_pop(this);
    this.test_push(this);
  }

  test_clear(test) { super.test_clear_ordered(test, 'push'); }
  test_clone(test) { super.test_clone_ordered(test, 'push'); }
  test_equals(test) { super.test_equals_ordered(test, 'push'); }
  test_hashCode(test) { super.test_hashCode_ordered(test, 'push'); }
  test_isEmpty(test) { super.test_isEmpty_ordered(test, 'push'); }
  test_next(test) { super.test_next_ordered(test, 'push'); }

  test_peek(test) {
    describe('#peek', function() {
      it('[] -> undefined', function() {
        let stack = test.newInstance();
        assert(stack.peek() == undefined);
      });
      it('[1] -> 1', function() {
        let stack = new Stack();
        stack.push(1);
        assert(stack.peek() == 1);
      });
    });
  }

  test_pop(test) {
    describe('#pop', function() {
      it('[1,2] -> 2 & [1]', function() {
        let stack = test.newInstance();
        stack.push(1);
        stack.push(2);
        assert(stack.pop() == 2);
        assert(Util.equals(stack.toArray(), [1]));
      });
      it('[] -> NoSuchElementException', function() {
        let stack = new Stack();
        let methodCall = () => stack.pop();
        assert.throws(methodCall, NoSuchElementException);
      });
    });
  }

  test_push(test) { super.test_add_ordered(test, 'push'); }
  test_size(test) { super.test_size_ordered(test, 'push'); }
  test_toArray(test) { super.test_toArray_ordered(test, 'push'); }
}

module.exports = StackTest;
