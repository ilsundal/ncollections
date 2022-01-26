'use strict'

const assert = require('assert');

const Collections = require(__dirname + '/Collections.js');
const Deque = require(__dirname + '/../main/Deque.js');
const Util = require(__dirname + '/../main/Util.js');

describe('Deque', function() {

  Collections.run(Deque, { skip: ['remove'] });

  describe('#addFirst', function() {

    it('[] -> true & [1]', function() {
      let deque = new Deque();
      assert(deque.addFirst(1));
      assert(Util.equals(deque.toArray(), [1]));
    });

    it('[1] + 0 -> true & [0,1]', function() {
      let deque = new Deque();
      deque.addFirst(1);
      assert(deque.addFirst(0));
      assert(Util.equals(deque.toArray(), [0, 1]));
    });
  });

  describe('#addLast', function() {

    it('[] -> true & [1]', function() {
      let deque = new Deque();
      assert(deque.addLast(1));
      assert(Util.equals(deque.toArray(), [1]));
    });

    it('[1] + 2 -> true & [1,2]', function() {
      let deque = new Deque();
      deque.addLast(1);
      assert(deque.addLast(2));
      assert(Util.equals(deque.toArray(), [1, 2]));
    });
  });

  describe('#peekFirst', function() {

    it('[] -> undefined', function() {
      let deque = new Deque();
      assert(deque.peekFirst() == undefined);
    });

    it('[1,2] -> 1', function() {
      let deque = new Deque();
      deque.addLast(1);
      deque.addLast(2);
      assert(deque.peekFirst() == 1);
    });
  });

  describe('#peekLast', function() {

    it('[] -> undefined', function() {
      let deque = new Deque();
      assert(deque.peekLast() == undefined);
    });

    it('[1,2] -> 2', function() {
      let deque = new Deque();
      deque.addLast(1);
      deque.addLast(2);
      assert(deque.peekLast() == 2);
    });
  });

  describe('#pollFirst', function() {

    it('[] -> undefined', function() {
      let deque = new Deque();
      assert(deque.pollFirst() == undefined);
    });

    it('[1,2] -> 1 & [2]', function() {
      let deque = new Deque();
      deque.add(1);
      deque.add(2);
      assert(deque.pollFirst() == 1);
      assert(Util.equals(deque.toArray(), [2]));
    });
  });

  describe('#pollLast', function() {

    it('[] -> undefined', function() {
      let deque = new Deque();
      assert(deque.pollLast() == undefined);
    });

    it('[1,2] -> 1 & [2]', function() {
      let deque = new Deque();
      deque.add(1);
      deque.add(2);
      assert(deque.pollLast() == 2);
      assert(Util.equals(deque.toArray(), [1]));
    });
  });
});
