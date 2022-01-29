'use strict'

const assert = require('assert');

const DefaultCollection = require(__dirname + '/../main/DefaultCollection.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');
const Util = require(__dirname + '/../main/Util.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class DefaultCollectionTest extends CollectionTest {

  constructor(collectionClass, options) {
    super(collectionClass, options);
    assert(Util.isSubClassOf(collectionClass, DefaultCollection));
  }

  class_method_names = this.class_method_names.concat([
    'add',
    'addAll',
    'contains',
    'containsAll',
    'remove',
    'removeAll'
  ]);

  // default test case implementations below make no assumption about collection ordering or duplicates; thus, they work with both lists and sets.

  test_add(test, options) {
    super.test_add_like_method(test, options);
  }

  test_addAll(test) {
    it('[] + [1,2] -> truish & [1,2]', function() {
      let collection = test.newInstance();
      assert(collection.addAll([1,2]));
      assert(Util.equals(collection.toArray().sort(), [1,2]));
    });
    it('[1,2] + [3,4] -> truish & [1,2,3,4]', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.addAll([3,4]));
      assert(Util.equals(collection.toArray().sort(), [1,2,3,4]));
    });
  }

  test_contains(test) {
    it('[] contains 1 -> false', function() {
      let collection = test.newInstance();
      assert(!collection.contains(1));
    });
    it('[1,2] contains 3 -> false', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.contains(3) == false);
    });
    it('[1,2] contains 2 -> true', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.contains(2));
    });
  }

  test_containsAll(test) {
    it('[] contains all of [1] -> false', function() {
      let collection = test.newInstance();
      assert(collection.containsAll([1]) == false);
    });
    it('[1,2] contains all of [2] -> true', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.containsAll([2]) == true);
    });
    it('[1,2,3] contains all of [1,3] -> true', function() {
      let collection = test.newInstance([1,2,3]);
      assert(collection.containsAll([1,3]) == true);
    });
  }

  test_remove(test) {
    it('[] - 1 -> false', function() {
      let collection = test.newInstance();
      assert(!collection.remove(1));
    });
    it('[1,2,3] - 2 -> truish & [1,3]', function() {
      let collection = test.newInstance([1,2,3]);
      assert(collection.remove(2));
      assert(Util.equals(collection.toArray().sort(), [1,3]));
    });
  }

  test_removeAll(test) {
    it('[1,2,3,4] - [1,2,5] -> truish & [3,4]', function() {
      let collection = test.newInstance([1,2,3,4]);
      assert(collection.removeAll([1,2,5]));
      assert(Util.equals(collection.toArray().sort(), [3,4]));
    });
  }
}

module.exports = DefaultCollectionTest;
