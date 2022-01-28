'use strict'

const assert = require('assert');

const DefaultCollectionTest = require(__dirname + '/DefaultCollectionTest.js');

class SetTest extends DefaultCollectionTest {

  constructor(setClass, options={}) {
    super(setClass, options);
  }

  getClassMethodNames() {
console.log('Set');
    return super.getClassMethodNames();
  }
/*
  test_add(test) { super.test_add_ordered(test); }
  test_clear(test) { super.test_clear_ordered(test); }
  test_clone(test) { super.test_clone_ordered(test); }
  test_equals(test) { super.test_equals_ordered(test); }
  test_hashCode(test) { super.test_hashCode_ordered(test); }
  test_isEmpty(test) { super.test_isEmpty_ordered(test); }
  test_next(test) { super.test_next_ordered(test); }
  test_size(test) { super.test_size_ordered(test); }
  test_toArray(test) { super.test_toArray_ordered(test); }

  test_add(test) { 
    assert(false);
  }

  test_addAll(test) {
    assert(false);
  }

  test_clear(test) {
    assert(false);
  }

  test_clone(test) {
    assert(false);
  }

  test_contains(test) {
    assert(false);
  }

  test_containsAll(test) {
    assert(false);
  }

  test_equals(test) {
    assert(false);
  }

  test_hashCode(test) {
    assert(false);
  }

  test_isEmpty(test) {
    assert(false);
  }

  test_next(test) {
    assert(false);
  }

  test_remove(test) {
    assert(false);
  }

  test_removeAll(test) {
    assert(false);
  }

  test_size(test) {
    assert(false);
  }

  test_toArray(test) {
    assert(false);
  }
*/
}

module.exports = SetTest;
