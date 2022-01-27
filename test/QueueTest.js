'use strict'

const assert = require('assert');

const NoSuchElementException = require(__dirname + '/../main/NoSuchElementException.js');
const Queue = require(__dirname + '/../main/Queue.js');
const Util = require(__dirname + '/../main/Util.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class QueueTest extends CollectionTest {

  constructor(queueClass=Queue, options) {
    super(queueClass, options);
  }

  run() {
    super.run();
    this.test_dequeue(this);
    this.test_enqueue(this);
    this.test_peek(this);
  }

  test_clear(test) { super.test_clear_ordered(test, 'enqueue'); }
  test_clone(test) { super.test_clone_ordered(test, 'enqueue'); }

  test_dequeue(test) {
    describe('#dequeue', function() {
      it('[] -> undefined', function() {
        let queue = test.newInstance();
        assert(queue.dequeue() == undefined);
      });
      it('[1,2] -> 1', function() {
        let queue = test.newInstance();
        queue.enqueue(1);
        queue.enqueue(2);
        assert(queue.dequeue() == 1);
      });
    });
  }

  test_enqueue(test) { super.test_add_ordered(test, 'enqueue'); }
  test_equals(test) { super.test_equals_ordered(test, 'enqueue'); }
  test_hashCode(test) { super.test_hashCode_ordered(test, 'enqueue'); }
  test_isEmpty(test) { super.test_isEmpty_ordered(test, 'enqueue'); }
  test_next(test) { super.test_next_ordered(test, 'enqueue'); }

  test_peek(test) {
    describe('#peek', function() {
      it('[] -> undefined', function() {
        let queue = test.newInstance();
        assert(queue.peek() == undefined);
      });
      it('[1,2] -> 1', function() {
        let queue = test.newInstance();
        queue.enqueue(1);
        queue.enqueue(2);
        assert(queue.peek() == 1);
      });
    });
  }

  test_size(test) { super.test_size_ordered(test, 'enqueue'); }
  test_toArray(test) { super.test_toArray_ordered(test, 'enqueue'); }
}

module.exports = QueueTest;
