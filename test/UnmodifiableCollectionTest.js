'use strict'

const assert = require('assert');

const UnmodifiableCollection = require(__dirname + '/../main/UnmodifiableCollection.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class UnmodifiableCollectionTest extends CollectionTest {
  #unmodifiable_collection_class;

  get unmodifiable_collection_class() { return this.#unmodifiable_collection_class; }

  constructor(unmodifiable_collection_class, inner_collection_class, options) {
    super(inner_collection_class, options);
    this.#unmodifiable_collection_class = unmodifiable_collection_class;
  }

  newInstance(elements) {
    let inner_collection = super.newInstance(elements);
    return new this.#unmodifiable_collection_class(inner_collection, inner_collection.constructor, this.options);
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
