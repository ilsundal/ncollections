'use strict'

const assert = require('assert');

const Collections = require(__dirname + '/Collections.js');
const PriorityQueue = require(__dirname + '/../main/PriorityQueue.js');
const Util = require(__dirname + '/../main/Util.js');

describe('PriorityQueue', function() {

  Collections.run(PriorityQueue, { skip: ['remove'] });

  describe('#add', function() {

    it('[] + 1 -> true & 1', function() {
      let queue = new PriorityQueue();
      assert(queue.add(1));
      assert(Util.equals(queue.toArray(), [1]));
    });

    it('[1] + 1 -> true & [1,1]', function() {
      let queue = new PriorityQueue();
      queue.add(1);
      assert(queue.add(1));
      assert(Util.equals(queue.toArray(), [1, 1]));
    });

    it('[2,3] + 1 -> true & [1,2,3]', function() {
      let queue = new PriorityQueue();
      queue.add(2);
      queue.add(3);
      assert(queue.add(1));
      assert(Util.equals(queue.toArray(), [1, 2, 3]));
    });

    it('[1,3] + 2 -> true & [1,2,3]', function() {
      let queue = new PriorityQueue();
      queue.add(1);
      queue.add(3);
      assert(queue.add(2));
      assert(Util.equals(queue.toArray(), [1, 2, 3]));
    });

    it('[1,2] + 3 -> true & [1,2,3]', function() {
      let queue = new PriorityQueue();
      queue.add(1);
      queue.add(2);
      assert(queue.add(3));
      assert(Util.equals(queue.toArray(), [1, 2, 3]));
    });
  });

  describe('#peek', function() {

    it('[] -> undefined', function() {
      let queue = new PriorityQueue();
      assert(queue.peek() == undefined);
    });

    it('[1,2] -> 1', function() {
      let queue = new PriorityQueue();
      queue.add(1);
      queue.add(2);
      assert(queue.peek() == 1);
    });
  });

  describe('#poll', function() {

    it('[] -> undefined', function() {
      let queue = new PriorityQueue();
      assert(queue.poll() == undefined);
    });

    it('[1,2] -> 1 & [2]', function() {
      let queue = new PriorityQueue();
      queue.add(1);
      queue.add(2);
      assert(queue.poll() == 1);
      assert(Util.equals(queue.toArray(), [2]));
    });
  });
});
