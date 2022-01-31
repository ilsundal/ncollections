'use strict'

const assert = require('assert');

const UnmodifiableCollection = require(__dirname + '/../main/UnmodifiableCollection.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

// NOT USED CURRENTLY

// Intended to be sub-classed into UnmodifiableListTest, UnmodifiableSetTest, etc.
class UnmodifiableCollectionTest extends CollectionTest {
  #inner_collection_class;

  get inner_collection_class() { return this.#inner_collection_class; }

  constructor(unmodifiable_collection_class, inner_collection_class, options) {
    super(unmodifiable_collection_class, options);
    this.#inner_collection_class = inner_collection_class;
  }

  newInstance(elements) {
    let inner_collection = super.newInstance(elements, { collection_class: this.#inner_collection_class });
    return new this.collection_class(inner_collection, this.#inner_collection_class, this.options);
  }

  test_clear(test) {
    let collection = test.newInstance([1]);
    let methodCall = () => collection.clear();
    assert.throws(methodCall, UnsupportedOperationException);
  }

  test_toString(test) {
    let collection = test.newInstance([1]);
    let inner_collection = collection.inner_collection;
    assert(collection.toString() == inner_collection.toString());
  }
}

module.exports = UnmodifiableCollectionTest;
