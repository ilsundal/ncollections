'use strict'

const assert = require('assert');

const Util = require(__dirname + '/../main/Util.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class ListishTest extends CollectionTest {

  constructor(listish_collection_class, options={}) {
    super(listish_collection_class, options);
  }

  add_fn = function(collection, element) {
    return collection.add(element);
  }

  newInstance(elements=[]) {
    let collection = new this.collection_class(this.options);
    for (let element of elements)
      this.add_fn(collection, element);
    return collection;
  }

  // default test case implemenation below assume a natural ordering of the elements (otherwise they won't work with PriorityQueue that may have a different ordering)

  test_constructor(test) {
    it('() -> instance', function() {
      let collection = test.newInstance();
      assert(collection instanceof test.collection_class);
    });
  }

  test_clear(test) {
    it('[1] -> (empty)', function() {
      let collection = test.newInstance([1]);
      collection.clear();
      assert(collection.isEmpty() === true);
    });
  }

  test_clone(test) {
    it('[1,2] -> [1,2]', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.equals(collection.clone()));
    });
  }

  test_equals(test) {
    it('[1,2] === [1,2]', function() {
      let collection1 = test.newInstance([1,2]);
      let collection2 = test.newInstance([1,2]);
      assert(collection1.equals(collection2));
      assert(collection2.equals(collection1));
    });
    it('[1,2] !== [1,3]', function() {
      let collection1 = test.newInstance([1,2]);
      let collection2 = test.newInstance([1,3]);
      assert(!collection1.equals(collection2));
      assert(!collection2.equals(collection1));
    });
  }

  test_hashCode(test) {
    it('[1,2] -> 40025650', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.hashCode() === 40025650);
    });
    it('hash code of [1,2] === hash code of [1,2]', function() {
      let collection1 = test.newInstance([1,2]);
      let collection2 = test.newInstance([1,2]);
      assert(collection1.hashCode() === collection2.hashCode());
    });
    it('hash code of [1,2] !== hash code of [1,3]', function() {
      let collection1 = test.newInstance([1,2]);
      let collection2 = test.newInstance([1,3]);
      assert(collection1.hashCode() !== collection2.hashCode());
    });
  }

  test_isEmpty(test) {
    it('[] -> true', function() {
      let collection = test.newInstance();
      assert(collection.isEmpty() === true);
    });
    it('[1] -> false', function() {
      let collection = test.newInstance([1]);
      assert(collection.isEmpty() === false);
    });
  }

  test_next(test) {
    it('[] -> (no iterations)', function() {
      let collection = test.newInstance();
      for (let element of collection)
        assert(false);
    });
    it('[1,2] -> 1 -> 2', function() {
      let collection = test.newInstance([1,2]);
      let array = Array.from(collection);
      assert(Util.equals(array, [1,2]));
    });
  }

  test_size(test) {
    it('[] -> 0', function() {
      let collection = test.newInstance();
      assert(collection.size() === 0);
    });
    it('[1,2] -> 2', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.size() === 2);
    });
  }

  test_toArray(test) {
    it('[1,2] -> [1,2]', function() {
      let collection = test.newInstance([1,2]);
      assert(Util.equals(collection.toArray(), [1,2]));
    });
  }

  test_toString(test) {
    it('{} -> "[]"', function() {
      let collection = test.newInstance();
      assert(collection.toString() === '[]');
    });
    it('["1",2,3] -> "[\"1\",2,3]"', function() {
      let collection = test.newInstance(["1",2,3]);
      assert(collection.toString() === '["1",2,3]');
    });
  }

  // callback for collections with an add-like method (e.g. "push" for a Stack, or "enqueue" for a Queue), using add_fn
  test_add0(test) {
    it('[] + 1 -> [1]', function() {
      let collection = test.newInstance();
      assert(test.add_fn(collection, 1) === collection);
      assert(Util.equals(collection.toArray(), [1]));
    });
  }
}

module.exports = ListishTest;
