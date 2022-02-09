'use strict'

const assert = require('assert');

const NoSuchElementException = require(__dirname + '/../main/NoSuchElementException.js');
const Stack = require(__dirname + '/../main/Stack.js');
const Util = require(__dirname + '/../main/Util.js');

const ListishTest = require(__dirname + '/ListishTest.js');

class StackTest extends ListishTest {

  constructor(stackClass=Stack, options) {
    super(stackClass, options);
  }

  class_method_names = this.class_method_names.concat([
    'peek',
    'pop',
    'push'
  ]);

  add_fn = function(stack, element) {
    return stack.push(element);
  }

  test_peek(test) {
    it('[] -> undefined', function() {
      let stack = test.newInstance();
      assert(stack.peek() === undefined);
    });
    it('[1] -> 1', function() {
      let stack = test.newInstance([1]);
      assert(stack.peek() === 1);
    });
  }

  test_pop(test) {
    it('[] -> NoSuchElementException', function() {
      let stack = test.newInstance();
      let methodCall = () => stack.pop();
      assert.throws(methodCall, NoSuchElementException);
    });
    it('[1,2] -> 2 & [1]', function() {
      let stack = test.newInstance();
      stack.push(1);
      stack.push(2);
      assert(stack.pop() === 2);
      assert(Util.equals(stack.toArray(), [1]));
    });
  }

  test_push(test) {
    super.test_add0(test);
  }
}

module.exports = StackTest;
