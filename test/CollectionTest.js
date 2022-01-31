'use strict'

const assert = require('assert');

const Collection = require(__dirname + '/../main/Collection.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');
const Util = require(__dirname + '/../main/Util.js');

class CollectionTest {
  #collection_class;
  #options;

  get collection_class() { return this.#collection_class };
  get options() { return this.#options };

  constructor(collection_class, options={}) {
    this.#collection_class = collection_class;
    this.#options = options;
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
    'toArray',
    'toString'
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

  test_constructor() {
    throw new Error('test_constructor() not implemented!');
  }

  test_clear() {
    throw new Error('test_clear() not implemented!');
  }

  test_clone() {
    throw new Error('test_clone() not implemented!');
  }

  test_equals() {
    throw new Error('test_equals() not implemented!');
  }

  test_hashCode() {
    throw new Error('test_hashCode() not implemented!');
  }

  test_isEmpty() {
    throw new Error('test_isEmpty() not implemented!');
  }

  test_next() {
    throw new Error('test_next() not implemented!');
  }

  test_size() {
    throw new Error('test_size() not implemented!');
  }

  test_toArray() {
    throw new Error('test_toArray() not implemented!');
  }

  test_toString() {
    throw new Error('test_toString() not implemented!');
  }
}

module.exports = CollectionTest;
