'use strict'

const assert = require('assert');

const HashMap = require(__dirname + '/../main/HashMap.js');

const MapTest = require(__dirname + '/MapTest.js');

class HashMapTest extends MapTest {
  #collectionClass;

  constructor(options={}) {
    super(HashMap, options);
  }

  run() {
    super.run();
  }

  // override
  test_constructor(test) {
    super.test_constructor(test);
  }
/*
  // override
  test_add(test) {
    // todo
  }

  // override
  test_addAll(test) {
    // todo
  }

  // override
  test_clear(test) {
    // todo
  }

  // override
  test_clone(test) {
    // todo
  }

  // override
  test_contains(test) {
    // todo
  }

  // override
  test_containsAll(test) {
    // todo
  }

  // override
  test_containsKey(test) {
    // todo
  }

  // override
  test_containsValue(test) {
    // todo
  }

  // override
  test_entries(test) {
    // todo
  }

  // override
  test_equals(test) {
    // todo
  }

  // override
  test_get(test) {
    // todo
  }

  // override
  test_hashCode(test) {
    // todo
  }

  // override
  test_isEmpty(test) {
    // todo
  }

  // override
  test_keys(test) {
    // todo
  }

  // override
  test_next(test) {
    // todo
  }

  // override
  test_put(test) {
    // todo
  }

  // override
  test_putAll(test) {
    // todo
  }

  // override
  test_remove(test) {
    // todo
  }

  // override
  test_removeAll(test) {
    // todo
  }

  // override
  test_size(test) {
    // todo
  }

  // override
  test_toArray(test) {
    // todo
  }

  // override
  test_values(test) {
    // todo
  }
*/
}

module.exports = HashMapTest;
