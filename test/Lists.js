'use strict'

const assert = require('assert');

const Collections = require(__dirname + '/Collections.js');
const HashSet = require(__dirname + '/../main/HashSet.js');
const IndexOutOfBoundsException = require(__dirname + '/../main/IndexOutOfBoundsException.js');
const List = require(__dirname + '/../main/List.js');
const NoSuchElementException = require(__dirname + '/../main/NoSuchElementException.js');
const Util = require(__dirname + '/../main/Util.js');

function run(listClass, options={}) {

  Collections.run(listClass, options);
  assert(Util.isSubClassOf(listClass, List));

  describe('#add', function() {

    // duplicates
    it('[1] + 1 -> true & [1,1] (allow duplicates)', function() {
      let list = new listClass();
      list.add(1);
      assert(list.add(1));
      assert(Util.equals(list.toArray(), [1, 1]));
    });

    // order
    it('[1] + 2 -> true & [1,2] (addition order)', function() {
      let list = new listClass();
      list.add(1);
      assert(list.add(2));
      assert(Util.equals(list.toArray(), [1, 2]));
    });
  });

  describe('#addFirst', function() {

    it('[1] + 2 -> true & [2,1]', function() {
      let list = new listClass();
      list.add(1);
      assert(list.addFirst(2));
      assert(Util.equals(list.toArray(), [2, 1]));
    });
  });

  describe('#addLast', function() {

    it('[1] + 2 -> true & [1,2]', function() {
      let list = new listClass();
      list.add(1);
      assert(list.addLast(2));
      assert(Util.equals(list.toArray(), [1, 2]));
    });
  });

  describe('#equals', function() {

    it('[] equals {} -> false', function() {
      let list = new listClass();
      let set = new HashSet();
      assert(!list.equals(set));
    });
  });

  describe('#getAt', function() {

    it('[1] at 0 -> 1', function() {
      let list = new listClass();
      list.add(1);
      assert(list.getAt(0) == 1);
    });

    it('[1] at 1 -> IndexOutOfBoundsException', function() {
      let list = new listClass();
      list.add(1);
      let methodCall = () => list.getAt(1);
      assert.throws(methodCall, IndexOutOfBoundsException);
    });
  });

  describe('#getFirst', function() {

    it('[1,2] -> 1', function() {
      let list = new listClass();
      list.addAll([1, 2]);
      assert(list.getFirst() == 1);
    });

    it('[] -> NoSuchElementException', function() {
      let list = new listClass();
      let methodCall = () => list.getFirst();
      assert.throws(methodCall, NoSuchElementException);
    });
  });

  describe('#getLast', function() {

    it('[1,2] -> 2', function() {
      let list = new listClass();
      list.addAll([1, 2]);
      assert(list.getLast() == 2);
    });

    it('[] -> NoSuchElementException', function() {
      let list = new listClass();
      let methodCall = () => list.getLast();
      assert.throws(methodCall, NoSuchElementException);
    });
  });

  describe('#insertAt', function() {

    it('[1,3] + 0@0 -> [0,1,3]', function() {
      let list = new listClass();
      list.addAll([1, 3]);
      list.insertAt(0,0);
      assert(Util.equals(list.toArray(), [0, 1, 3]));
    });

    it('[1,3] + 2@1 -> [1,2,3]', function() {
      let list = new listClass();
      list.addAll([1, 3]);
      list.insertAt(1, 2);
      assert(Util.equals(list.toArray(), [1, 2, 3]));
    });

    it('[1,3] + 4@2 -> IndexOutOfBoundsException', function() {
      let list = new listClass();
      list.addAll([1, 3]);
      let methodCall = () => list.insertAt(2, 4);
      assert.throws(methodCall, IndexOutOfBoundsException);
    });
  });

  describe('#removeAt', function() {

    it('[1,2,3] - @0 -> [2,3]', function() {
      let list = new listClass();
      list.addAll([1, 2, 3]);
      list.removeAt(0);
      assert(Util.equals(list.toArray(), [2, 3]));
    });

    it('[1,2,3] - @1 -> [1,3]', function() {
      let list = new listClass();
      list.addAll([1, 2, 3]);
      list.removeAt(1);
      assert(Util.equals(list.toArray(), [1, 3]));
    });
    
    it('[1,2,3] - @2 -> [1,2]', function() {
      let list = new listClass();
      list.addAll([1, 2, 3]);
      list.removeAt(2);
      assert(Util.equals(list.toArray(), [1, 2]));
    });

    it('[1,2,3] - @3 -> IndexOutOfBoundsException', function() {
      let list = new listClass();
      list.addAll([1, 2, 3]);
      let methodCall = () => list.removeAt(3);
      assert.throws(methodCall, IndexOutOfBoundsException);
    });
  });

  describe('#removeFirst', function() {

    it('[1,2] -> true & [2]', function() {
      let list = new listClass();
      list.addAll([1, 2]);
      assert(list.removeFirst() == 1);
      assert(Util.equals(list.toArray(), [2]));
    });

    it('[] -> NoSuchElementException', function() {
      let list = new listClass();
      let methodCall = () => list.removeFirst();
      assert.throws(methodCall, NoSuchElementException);
    });
  });

  describe('#removeLast', function() {

    it('[1,2] -> [1]', function() {
      let list = new listClass();
      list.addAll([1, 2]);
      list.removeLast();
      assert(Util.equals(list.toArray(), [1]));
    });

    it('[] -> NoSuchElementException', function() {
      let list = new listClass();
      let methodCall = () => list.removeFirst();
      assert.throws(methodCall, NoSuchElementException);
    });
  });

  describe('#reverse', function() {

    it('[] -> []', function() {
      let list = new listClass();
      list.reverse();
      assert(Util.equals(list.toArray(), []));
    });

    it('[1] -> [1]', function() {
      let list = new listClass();
      list.add(1);
      list.reverse();
      assert(Util.equals(list.toArray(), [1]));
    });

    it('[1,2,3] -> [3,2,1]', function() {
      let list = new listClass();
      list.addAll([1, 2, 3]);
      list.reverse();
      assert(Util.equals(list.toArray(), [3, 2, 1]));
    });
  });

  describe('#setAt', function() {

    it('[1,2,3] = 4@1 -> [1,4,3]', function() {
      let list = new listClass();
      list.addAll([1, 2, 3]);
      list.setAt(1, 4);
      assert(Util.equals(list.toArray(), [1, 4, 3]));
    });

    it('[1,2,3] = 4@3 -> IndexOutOfBoundsException', function() {
      let list = new listClass();
      list.addAll([1, 2, 3]);
      let methodCall = () => list.setAt(3, 4);
      assert.throws(methodCall, IndexOutOfBoundsException);
    });
  });

  describe('#setFirst', function() {

    it('[1,2] = 0 -> [0,2]', function() {
      let list = new listClass();
      list.addAll([1, 2]);
      list.setFirst(0);
      assert(Util.equals(list.toArray(), [0, 2]));
    });

    it('[] = 0 -> NoSuchElementException', function() {
      let list = new listClass();
      let methodCall = () => list.setFirst(0);
      assert.throws(methodCall, NoSuchElementException);
    });
  });

  describe('#setLast', function() {

    it('[1,2] = 0 -> [1,0]', function() {
      let list = new listClass();
      list.addAll([1, 2]);
      list.setLast(0);
      assert(Util.equals(list.toArray(), [1, 0]));
    });

    it('[] = 0 -> NoSuchElementException', function() {
      let list = new listClass();
      let methodCall = () => list.setLast(0);
      assert.throws(methodCall, NoSuchElementException);
    });
  });
  
  describe('#sort', function() {

    it('[4,5,1,3,2] -> [1,2,3,4,5]', function() {
      let list = new listClass();
      list.addAll([4, 5, 1, 3, 2]);
      list.sort();
      assert(Util.equals(list.toArray(), [1, 2, 3, 4, 5]));
    });

    it('[1,2,3,4,5] -> [5,4,3,2,1] (reverse compare fn)', function() {
      let list = new listClass();
      list.addAll([4, 5, 1, 3, 2]);
      list.sort(function(element1, element2) {
        return element2 - element1;
      });
      assert(Util.equals(list.toArray(), [5, 4, 3, 2, 1]));
    });
  });
}

module.exports = {
  run: run
};
