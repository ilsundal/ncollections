'use strict'

const assert = require('assert');

const UnmodifiableCollection = require(__dirname + '/../main/UnmodifiableCollection.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class UnmodifiableCollectionTest extends CollectionTest {
  #inner_collection_class;

  // inner_collection_class must be a Collection with an "add" method.
  constructor(inner_collection_class, options={}) {
    super(UnmodifiableCollection, options);
    this.#inner_collection_class = inner_collection_class;
  }

  newInstance(elements) {
    let inner_collection = new this.#inner_collection_class();
    if (elements) {
      for (let element of elements)
        inner_collection.add(element);
    }
    return new UnmodifiableCollection(inner_collection);
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
