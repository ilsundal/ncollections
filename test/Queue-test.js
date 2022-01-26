'use strict'

const assert = require('assert');

const Collections = require(__dirname + '/Collections.js');
const Queue = require(__dirname + '/../main/Queue.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');
const Util = require(__dirname + '/../main/Util.js');

describe('Queue', function() {

  Collections.run(Queue, { skip: ['remove'] });

  describe('#peek', function() {

    it('[] -> undefined', function() {
      let queue = new Queue();
      assert(queue.peek() == undefined);
    });

    it('[1,2] -> 1', function() {
      let queue = new Queue();
      queue.add(1);
      queue.add(2);
      assert(queue.peek() == 1);
    });
  });

  describe('#poll', function() {

    it('[] -> undefined', function() {
      let queue = new Queue();
      assert(queue.poll() == undefined);
    });

    it('[1,2] -> 1 & [2]', function() {
      let queue = new Queue();
      queue.add(1);
      queue.add(2);
      assert(queue.poll() == 1);
      assert(Util.equals(queue.toArray(), [2]));
    });
  });
  
  describe('#remove', function() {

    it('UnsupportedOperationException', function() {
      let queue = new Queue();
      queue.add(1);
      let methodCall = () => queue.remove(1);
      assert.throws(methodCall, UnsupportedOperationException);
    });
  });

  describe('#removeAll', function() {

    it('UnsupportedOperationException', function() {
      let queue = new Queue();
      let methodCall = () => queue.removeAll([]);
      assert.throws(methodCall, UnsupportedOperationException);
    });
  });
});
