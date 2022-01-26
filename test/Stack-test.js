'use strict'

const assert = require('assert');

const Collections = require(__dirname + '/Collections.js');
const NoSuchElementException = require(__dirname + '/../main/NoSuchElementException.js');
const Stack = require(__dirname + '/../main/Stack.js');
const Util = require(__dirname + '/../main/Util.js');

describe('Stack', function() {

  Collections.run(Stack, { skip: ['remove'] });

  describe('#peek', function() {

    it('[] -> undefined', function() {
      let stack = new Stack();
      assert(stack.peek() == undefined);
    });

    it('[1] -> 1', function() {
      let stack = new Stack();
      stack.push(1);
      assert(stack.peek() == 1);
    });
  });

  describe('#pop', function() {

    it('[1,2] -> 2 & [1]', function() {
      let stack = new Stack();
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

  describe('#push', function() {

    it('[] + 1 -> true & [1]', function() {
      let stack = new Stack();
      assert(stack.push(1));
      assert(Util.equals(stack.toArray(), [1]));
    });

    it('[1] + 2 -> true & [1,2]', function() {
      let stack = new Stack();
      stack.push(1);
      assert(stack.push(2));
      assert(Util.equals(stack.toArray(), [1,2]));
    });
  });
});
