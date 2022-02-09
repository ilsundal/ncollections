'use strict'

const assert = require('assert');

const NoSuchElementException = require(__dirname + '/../main/NoSuchElementException.js');
const Util = require(__dirname + '/../main/Util.js');

const MapTest = require(__dirname + '/MapTest.js');

class SortedMapTest extends MapTest {

  class_method_names = this.class_method_names.concat([
    'peekFirst',
    'peekLast',
    'removeFirst',
    'removeLast'
  ]);

  constructor(set_class, options={}) {
    super(set_class, options);
  }

  test_peekFirst(test) {
    it('{} -> undefined', function() {
      let map = test.newInstance();
      assert(map.peekFirst() === undefined);
    });
    it('{2->3,3->4,1->2} -> 1->2', function() {
      let map = test.newInstance();
      map.put(2,3);
      map.put(3,4);
      map.put(1,2);
      assert(Util.equals(map.peekFirst(), { key: 1, value: 2 }));
      assert(map.size() === 3);
    });
  }

  test_peekLast(test) {
    it('{} -> undefined', function() {
      let map = test.newInstance();
      assert(map.peekLast() === undefined);
    });
    it('{2->3,3->4,1->2} -> 3->4', function() {
      let map = test.newInstance();
      map.put(2,3);
      map.put(3,4);
      map.put(1,2);
      assert(Util.equals(map.peekLast(), { key: 3, value: 4 }));
      assert(map.size() === 3);
    });
  }

  test_removeFirst(test) {
    it('{} -> NoSuchElementException', function() {
      let map = test.newInstance();
      let methodCall = () => map.removeFirst();
      assert.throws(methodCall, NoSuchElementException);
    });
    it('{2->3,3->4,1->2} -> 1->2 & [2->3,3->4]', function() {
      let map = test.newInstance();
      map.put(2,3);
      map.put(3,4);
      map.put(1,2);
      assert(Util.equals(map.removeFirst(), { key: 1, value: 2 }));
      assert(map.size() === 2);
      assert(map.get(2) === 3);
      assert(map.get(3) === 4);
    });
  }

  test_removeLast(test) {
    it('{} -> NoSuchElementException', function() {
      let map = test.newInstance();
      let methodCall = () => map.removeLast();
      assert.throws(methodCall, NoSuchElementException);
    });
    it('{2->3,3->4,1->2} -> 1->2 & [2->3,3->4]', function() {
      let map = test.newInstance();
      map.put(2,3);
      map.put(3,4);
      map.put(1,2);
      assert(Util.equals(map.removeLast(), { key: 3, value: 4 }));
      assert(map.size() === 2);
      assert(map.get(1) === 2);
      assert(map.get(2) === 3);
    });
  }
}

module.exports = SortedMapTest;
