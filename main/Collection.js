'use strict'

const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');
const Util = require(__dirname + '/Util.js');

// interface with some default implementations
class Collection {

  // equals_fn
  static equals_fn = function(element1, element2) {
    if ((typeof element1 == 'object') && (typeof element1.equals == 'function'))
      return element1.equals(element2);
    if ((typeof element2 == 'object') && (typeof element2.equals == 'function'))
      return element2.equals(element1);
    return Util.equals(element1, element2);
  }

  // hash_code_fn
  static hash_code_fn = function(element) {
    if ((typeof element == 'object') && (typeof element.hashCode == 'function'))
      return element.hashCode();
    return Util.hashCode(element);
  }

  // compare_to_fn
  static compare_fn = function(element1, element2) {
    if ((typeof element1 == 'object') && (typeof element1.compare == 'function'))
      return element1.compare(element2);
    if ((typeof element2 == 'object') && (typeof element2.compare == 'function'))
      return element2.compare(element1);
    return Util.compare(element1, element2);
  }

  #options;

  constructor(options={}) {
    this.#options = options;
  }

  // returns true if the element was added, and false otherwise
  add(element) {
    throw new UnsupportedOperationException();
  }

  addAll(elements) {
    let changed = false;
    for (let element of elements)
      changed = this.add(element) || changed;
    return changed;
  }

  clear() {
    throw new UnsupportedOperationException();
  }

  // returns a shallow clone
  clone() {
    let clone = new this.constructor(this.#options);
    clone.addAll(this);
    return clone;
  }

  contains(element) {
    for (let thisElement of this) {
      if (Collection.equals_fn(element, thisElement))
        return true;
    }
    return false;
  }

  containsAll(elements) {
    for (let element of elements) {
      if (!this.contains(element))
        return false;
    }
    return true;
  }

  // two collections are equal if their iterators return "equal" elements in the same order
  equals(collection) {
    if (this == collection)
     return true;
    if (this.size() != collection.size())
      return false;
    let this_iterator = this.next();
    let other_iterator = collection.next();
    while (true) {
      let this_next = this_iterator.next();
      if (this_next.done)
        break;
      let other_next = other_iterator.next();
      if (!Collection.equals_fn(this_next.value, other_next.value))
        return false;
    }
    return true;
  }

  // source: https://stackoverflow.com/questions/1646807/quick-and-simple-hash-code-combinations
  hashCode() {
    let hash = 17;
    for (let element of this)
      hash = hash * 31 * Collection.hash_code_fn(element);
    return hash;
  }

  isEmpty() {
    return this.size() == 0;
  }

  // implement iterator protocol
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
  next() {
    throw new UnsupportedOperationException();
  }

  // implement iterable protocol
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
  [Symbol.iterator]() { return this.next(); }

  // returns true if the element was removed, and false otherwise
  // only a single element instance will be removed
  remove(element) {
    throw new UnsupportedOperationException();
  }

  removeAll(elements) {
    let removed = false;
    for (let element of elements)
      removed = this.remove(element) || removed;
    return removed;
  }

  size() {
    throw new UnsupportedOperationException();
  }

  toArray() {
    return Array.from(this);
  }
}

module.exports = Collection;
