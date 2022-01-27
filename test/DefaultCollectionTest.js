'use strict'

const assert = require('assert');

const DefaultCollection = require(__dirname + '/../main/DefaultCollection.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');

class DefaultCollectionTest extends CollectionTest {

  constructor(collectionClass, options) {
    super(collectionClass, options);
    assert(Util.isSubClassOf(collectionClass, DefaultCollection);
  }

  run() {
    super.run();
    this.test_add(this);
    this.test_addAll(this);
    this.test_contains(this);
    this.test_containsAll(this);
    this.test_remove(this);
    this.test_removeAll(this);
  }
  
  test_add(test) {
    throw new Error('Not implemented!');
  }

  test_addAll(test) {
    throw new Error('Not implemented!');
  }

  test_contains(test) {
    throw new Error('Not implemented!');
  }

  test_containsAll(test) {
    throw new Error('Not implemented!');
  }

  test_remove(test) {
    throw new Error('Not implemented!');
  }

  test_removeAll(test) {
    throw new Error('Not implemented!');
  }
}

module.exports = CollectionTest;
