'use strict'

const assert = require('assert');

const UnmodifiableCollection = require(__dirname + '/../main/UnmodifiableCollection.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');
const Util = require(__dirname + '/../main/Util.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

// NOT USED CURRENTLY

// Intended to be sub-classed into UnmodifiableListTest, UnmodifiableSetTest, etc.
class UnmodifiableCollectionTest extends CollectionTest {
  #inner_collection_class;

  get inner_collection_class() { return this.#inner_collection_class; }

  // inner_collection_class must have an add method; no assumptions are made in regards to order and duplicity
  constructor(unmodifiable_collection_class, inner_collection_class, options) {
    super(unmodifiable_collection_class, options);
    this.#inner_collection_class = inner_collection_class;
  }

  newInstance(elements=[]) {
    let inner_collection = new this.#inner_collection_class();
    for (let element of elements)
      inner_collection.add(element);
    return new this.collection_class(inner_collection, this.#inner_collection_class, this.options);
  }

  test_constructor(test) {
    it('() -> instance', function() {
      let collection = test.newInstance();
      assert(collection instanceof test.collection_class);
    });
  }

  test_clear(test) {
    it('[1] -> UnsupportedOperationException', function() {
      let collection = test.newInstance([1]);
      let methodCall = () => collection.clear();
      assert.throws(methodCall, UnsupportedOperationException);
    });
  }

  test_clone(test) {
    it('[1,2] === clone [1,2]', function() {
      let collection = test.newInstance([1,2]);
      let collection_clone = collection.clone();
      assert(collection === collection_clone);
      assert(collection.equals(collection_clone));
      assert(collection_clone.equals(collection));
    });
  }

  test_equals(test) {
    it('[1,2] === [1,2]', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.equals(collection) === true);
      assert(collection.equals(collection.inner_collection) === true);
      // note that inner_collection.equals(collection) is false until we implement UnmodifiableSet
    });
    it('[1,2] !== [1,2]', function() {
      let collection1 = test.newInstance([1,2]);
      let collection2 = test.newInstance([1,3]);
      assert(collection1.equals(collection2) === false);
      assert(collection2.equals(collection1) === false);
    });
  }

  test_hashCode(test) {
    it('hash code of [1,2] === inner hash code of [1,2]', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.hashCode() === collection.inner_collection.hashCode());
    });
  }

  test_isEmpty(test) {
    it('[] === inner []', function() {
      let collection = test.newInstance();
      assert(collection.isEmpty() === collection.inner_collection.isEmpty());
    });
    it('[1,2] === inner [1,2]', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.isEmpty() === collection.inner_collection.isEmpty());
    });
  }

  test_next(test) {
    it('[1,2] === inner [1,2]', function() {
      let collection = test.newInstance([1,2]);
      let array_collection = Array.from(collection);
      let array_inner_collection = Array.from(collection.inner_collection);
      assert(Util.equals(array_collection, array_inner_collection));
    });
  }

  test_size(test) {
    it('[] === inner []', function() {
      let collection = test.newInstance();
      assert(collection.size() === collection.inner_collection.size());
    });
    it('[1,2] === inner [1,2]', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.size() === collection.inner_collection.size());
    });
  }

  test_toArray(test) {
    it('[1,2] -> [1,2]', function() {
      let collection = test.newInstance([1,2]);
      assert(Util.equals(collection.toArray(), collection.inner_collection.toArray()));
    });
  }

  test_toString(test) {
    it('[] === inner []', function() {
      let collection = test.newInstance();
      assert(collection.toString() === collection.inner_collection.toString());
    });
    it('[1,"my_string",{some:"value"}] === inner [1,"my_string",{"some":"value"}]', function() {
      let collection = test.newInstance([1,"my_string",{some:"value"}]);
      assert(collection.toString() === collection.inner_collection.toString());
    });
  }
}

module.exports = UnmodifiableCollectionTest;
