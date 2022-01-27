'use strict'

const assert = require('assert');

const PriorityQueue = require(__dirname + '/../main/PriorityQueue.js');
const Util = require(__dirname + '/../main/Util.js');

const QueueTest = require(__dirname + '/QueueTest.js');

class PriorityQueueTest extends QueueTest {

  constructor(queueClass=PriorityQueue, options) {
    super(queueClass, options);
  }

  test_enqueue(test) {
    super.test_add_ordered(test, 'enqueue');
    describe('#enqueue', function() {
      it('[2,3] + 1 -> [1,2,3]', function() {
        let pQueue = test.newInstance();
        pQueue.enqueue(2);
        pQueue.enqueue(3);
        pQueue.enqueue(1);
        assert(Util.equals(pQueue.toArray(), [1,2,3]));
      });
      it('[1,3] + 2 -> [1,2,3]', function() {
        let pQueue = test.newInstance();
        pQueue.enqueue(1);
        pQueue.enqueue(3);
        pQueue.enqueue(2);
        assert(Util.equals(pQueue.toArray(), [1,2,3]));
      });
      it('[1,2] + 3 -> [1,2,3]', function() {
        let pQueue = test.newInstance();
        pQueue.enqueue(1);
        pQueue.enqueue(2);
        pQueue.enqueue(3);
        assert(Util.equals(pQueue.toArray(), [1,2,3]));
      });
      it('[1,2] + 1 -> [1,1,2]', function() {
        let pQueue = test.newInstance();
        pQueue.enqueue(1);
        pQueue.enqueue(2);
        pQueue.enqueue(1);
        assert(Util.equals(pQueue.toArray(), [1,1,2]));
      });
    });
  }
}

module.exports = PriorityQueueTest;
