'use strict'

const assert = require('assert');

const Collection = require(__dirname + '/../main/Collection.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');
const Util = require(__dirname + '/../main/Util.js');

class CollectionTest {
  #collectionClass;
  #options;

  constructor(collectionClass, options={}) {
    this.#collectionClass = collectionClass;
  }

  newInstance() {
    return new this.#collectionClass(this.#options);
  }

  run() {
    this.test_constructor(this);
    this.test_clear(this);
    this.test_clone(this);
    this.test_equals(this);
    this.test_hashCode(this);
    this.test_isEmpty(this);
    this.test_next(this);
    this.test_size(this);
    this.test_toArray(this);
  }
  
  test_constructor(test) {
    describe('#constructor', function() {
      it('() -> instance', function() {
        let collection = test.newInstance();
        assert(collection instanceof Collection);
      });
    });
  }

  test_clear(test) {
    throw new Error('Not implemented!');
  }

  test_clone(test) {
    throw new Error('Not implemented!');
  }

  test_equals(test) {
    throw new Error('Not implemented!');
  }

  test_hashCode(test) {
    throw new Error('Not implemented!');
  }

  test_isEmpty(test) {
    throw new Error('Not implemented!');
  }

  test_next(test) {
    throw new Error('Not implemented!');
  }

  test_size(test) {
    throw new Error('Not implemented!');
  }

  test_toArray(test) {
    throw new Error('Not implemented!');
  }

  // helper methods for use by sub-classes where the elements can be of simple value types, such as integers and strings, and be added as a single argument to a method, e.g. list.add, stack.pull, queue.enqueue, set.add, etc. (thus, this does NOT work for maps where entries are objects with a key and a value.)
  // to work with both sets and non-sets, duplicate elements are not tested
  // to work with both ordered (e.g. lists) and unordered (e.g. sets) an option field can be used; default is ordered
  
  test_add_ordered(test, method_name='add') {
    describe(`#${method_name}`, function() {
      it('[] + 1 -> [1]', function() {
        let collection = test.newInstance();
        collection[method_name](1);
        assert(Util.equals(collection.toArray(), [1]));
      });
    });
  }

  test_clear_ordered(test, add_method_name='add') {
    describe('#clear', function() {
      it('[1] -> (empty)', function() {
        let collection = test.newInstance();
        collection[add_method_name](1);
        collection.clear();
        assert(collection.isEmpty());
      });
    });
  }

  test_clone_ordered(test, add_method_name='add') {
    describe('#clone', function() {
      it('[1,2] -> [1,2]', function() {
        let collection = test.newInstance();
        collection[add_method_name](1);
        collection[add_method_name](2);
        assert(collection.equals(collection.clone()));
      });
    });
  }

  test_equals_ordered(test, add_method_name='add') {
    describe('#equals', function() {
      it('[1,2] == [1,2]', function() {
        let collection1 = test.newInstance();
        collection1[add_method_name](1);
        collection1[add_method_name](2);
        let collection2 = test.newInstance();
        collection2[add_method_name](1);
        collection2[add_method_name](2);
        assert(collection1.equals(collection2));
        assert(collection2.equals(collection1));
      });
      it('[1,2] != [1,3]', function() {
        let collection1 = test.newInstance();
        collection1[add_method_name](1);
        collection1[add_method_name](2);
        let collection2 = test.newInstance();
        collection2[add_method_name](1);
        collection2[add_method_name](3);
        assert(!collection1.equals(collection2));
        assert(!collection2.equals(collection1));
      });
    });
  }
  
  test_hashCode_ordered(test, add_method_name='add') {
    describe('#hashCode', function() {
      it('[1,2] -> ', function() {
        let collection = test.newInstance();
        collection[add_method_name](1);
        collection[add_method_name](2);
        assert(collection.hashCode() == 40025650);
      });
      it('hash code of [1,2] == hash code of [1,2]', function() {
        let collection1 = test.newInstance();
        collection1[add_method_name](1);
        collection1[add_method_name](2);
        let collection2 = test.newInstance();
        collection2[add_method_name](1);
        collection2[add_method_name](2);
        assert(collection1.hashCode() == collection2.hashCode());
      });
      it('hash code of [1,2] != hash code of [1,3]', function() {
        let collection1 = test.newInstance();
        collection1[add_method_name](1);
        collection1[add_method_name](2);
        let collection2 = test.newInstance();
        collection2[add_method_name](1);
        collection2[add_method_name](3);
        assert(collection1.hashCode() != collection2.hashCode());
      });
    });
  }

  test_isEmpty_ordered(test, add_method_name='add') {
    describe('#isEmpty', function() {
      it('[] -> true', function() {
        let collection = test.newInstance();
        assert(collection.isEmpty());
      });
      it('[1] -> false', function() {
        let collection = test.newInstance();
        collection[add_method_name](1);
        assert(!collection.isEmpty());
      });
    });
  }

  test_next_ordered(test, add_method_name='add') {
    describe('#next', function() {
      it('[] -> (no iterations)', function() {
        let collection = test.newInstance();
        for (let element of collection)
          assert(false);
      });
      it('[1,2] -> 1 -> 2', function() {
        let collection = test.newInstance();
        collection[add_method_name](1);
        collection[add_method_name](2);
        let array =[];
        for (let element of collection)
          array.push(element);
        assert(collection.size() == array.length);
        assert(array[0] == 1);
        assert(array[1] == 2);
      });
    });
  }

  test_size_ordered(test, add_method_name='add') {
    describe('#size', function() {
      it('[] -> 0', function() {
        let collection = test.newInstance();
        assert(collection.size() == 0);
      });
      it('[1,2] -> 2', function() {
        let collection = test.newInstance();
        collection[add_method_name](1);
        collection[add_method_name](2);
        assert(collection.size() == 2);
      });
    });
  }

  test_toArray_ordered(test, add_method_name='add') {
    describe('#toArray', function() {
      it('[1,2] -> [1,2]', function() {
        let collection = test.newInstance();
        collection[add_method_name](1);
        collection[add_method_name](2);
        assert(Util.equals(collection.toArray(), [1,2]));
      });
    });
  }
}

module.exports = CollectionTest;
