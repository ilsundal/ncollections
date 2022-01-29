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

  class_method_names = this.class_method_names.concat([
    'dequeue',
    'enqueue',
    'peek'
  ]);

  add_fn = function(queue, element) {
    queue.enqueue(element);
  }

  test_dequeue(test) {
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
  }

  test_enqueue(test) {
    super.test_add_like_method(test, { add_method_name: 'enqueue' });
  }

  test_peek(test) {
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
  }
}

module.exports = QueueTest;
