'use strict'

const assert = require('assert');

const NoSuchElementException = require(__dirname + '/../main/NoSuchElementException.js');
const Queue = require(__dirname + '/../main/Queue.js');
const Util = require(__dirname + '/../main/Util.js');

const ListishTest = require(__dirname + '/ListishTest.js');

class QueueTest extends ListishTest {

  constructor(queueClass=Queue, options) {
    super(queueClass, options);
  }

  class_method_names = this.class_method_names.concat([
    'dequeue',
    'enqueue',
    'peek'
  ]);

  add_fn = function(queue, element) {
    return queue.enqueue(element);
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
    super.test_add0(test);
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
