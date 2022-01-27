'use strict'

const assert = require('assert');

const Map = require(__dirname + '/../main/Map.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class MapTest extends CollectionTest {

  constructor(mapClass, options={}) {
    super(mapClass, options);
  }

  run() {
    super.run();
    this.test_containsKey(this);
    this.test_containsValue(this);
    this.test_entries(this);
    this.test_get(this);
    this.test_keys(this);
    this.test_put(this);
    this.test_putAll(this);
    this.test_values(this);
  }

  test_add(test) {
    test.assertUnsupportedOperationException('add');
  }

  // override
  test_addAll(test) {
    test.assertUnsupportedOperationException('addAll');
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

  test_containsAll(test) {
    // todo
  }

  test_containsKey(test) {
    // todo
  }

  test_containsValue(test) {
    // todo
  }

  test_entries(test) {
    // todo
  }

  // override
  test_equals(test) {
    // todo
  }

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

  test_keys(test) {
    // todo
  }

  // override
  test_next(test) {
    // todo
  }

  test_put(test) {
    // todo
  }

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

  test_values(test) {
    // todo
  }
}

module.exports = MapTest;
