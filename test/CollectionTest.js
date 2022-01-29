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

  class_method_names = [
    'constructor',
    'clear',
    'clone',
    'equals',
    'hashCode',
    'isEmpty',
    'next',
    'size',
    'toArray'
  ];

  test(method_name) {
    let test_method_name = 'test_' + method_name;
    let test_method_fn = this[test_method_name];
    assert(test_method_fn, 'Missing test method: ' + test_method_name);
    let collection_test = this;
    describe(`#${method_name}`, function() {
      test_method_fn(collection_test);
    });
  }

  run() {
    let sorted_class_method_names = Array.from(this.class_method_names).sort();
    for (let class_method_name of sorted_class_method_names)
      this.test(class_method_name);
  }
  
  // default test case implementations below make no assumption about collection ordering or duplicates; thus, they work with both lists and sets.

  add_fn = function(collection, element) {
    collection.add(element);
  }

  newInstance(elements) {
    let collection = new this.#collectionClass(this.#options);
    if (elements) {
      for (let element of elements)
        this.add_fn(collection, element);
    }
    return collection;
  }

  test_constructor(test) {
    it('() -> instance', function() {
      let collection = test.newInstance();
      assert(collection instanceof Collection);
    });
  }

  test_clear(test) {
    it('[1] -> (empty)', function() {
      let collection = test.newInstance([1]);
      collection.clear();
      assert(collection.isEmpty() == true);
    });
  }

  test_clone(test) {
    it('[1,2] -> [1,2]', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.equals(collection.clone()));
    });
  }

  test_equals(test) {
    it('[1,2] == [1,2]', function() {
      let collection1 = test.newInstance([1,2]);
      let collection2 = test.newInstance([1,2]);
      assert(collection1.equals(collection2));
      assert(collection2.equals(collection1));
    });
    it('[1,2] != [1,3]', function() {
      let collection1 = test.newInstance([1,2]);
      let collection2 = test.newInstance([1,3]);
      assert(!collection1.equals(collection2));
      assert(!collection2.equals(collection1));
    });
  }

  test_hashCode(test) {
    it('[1,2] -> 40025650', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.hashCode() == 40025650);
    });
    it('hash code of [1,2] == hash code of [1,2]', function() {
      let collection1 = test.newInstance([1,2]);
      let collection2 = test.newInstance([1,2]);
      assert(collection1.hashCode() == collection2.hashCode());
    });
    it('hash code of [1,2] != hash code of [1,3]', function() {
      let collection1 = test.newInstance([1,2]);
      let collection2 = test.newInstance([1,3]);
      assert(collection1.hashCode() != collection2.hashCode());
    });
  }

  test_isEmpty(test) {
    it('[] -> true', function() {
      let collection = test.newInstance();
      assert(collection.isEmpty() == true);
    });
    it('[1] -> false', function() {
      let collection = test.newInstance([1]);
      assert(collection.isEmpty() == false);
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
      let array = [];
      for (let element of collection)
        array.push(element);
      assert(collection.size() == array.length);
      assert(array[0] == 1);
      assert(array[1] == 2);
    });
  }

  test_size(test) {
    it('[] -> 0', function() {
      let collection = test.newInstance();
      assert(collection.size() == 0);
    });
    it('[1,2] -> 2', function() {
      let collection = test.newInstance([1,2]);
      assert(collection.size() == 2);
    });
  }

  test_toArray(test) {
    it('[1,2] -> [1,2]', function() {
      let collection = test.newInstance([1,2]);
      assert(Util.equals(collection.toArray(), [1,2]));
    });
  }

  // generic helper method for use by sub-classes with an add method with possibly another name, e.g. 'enqueue' or 'push'. defaults to 'add'.
  // options.add_method_name is the name of the add-like method, i.e. "enqueue" for a Queue, "push" for a Stack, etc. defaults to "add"
  // options.return_type specifies the type of the return value; it is either "changed" (if the add method returns true if the element was added, and false if not), or "collection" (if the add method returns the collection itself); defaults to "collection"
  test_add_like_method(test, options={}) {
    let add_method_name = options.add_method_name || 'add';
    let assert_return_value_fn = function(collection, element, return_value) {
       if (options.return_type == 'changed')
         assert(return_value == true);
       else
         assert(return_value === collection);
    }
    it('[] + 1 -> [1]', function() {
      let collection = test.newInstance();
      let return_value = collection[add_method_name](1);
      assert_return_value_fn(collection, 1, return_value);
      assert(Util.equals(collection.toArray(), [1]));
    });
  }
}

module.exports = CollectionTest;
