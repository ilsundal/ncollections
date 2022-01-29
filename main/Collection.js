'use strict'

const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');
const Util = require(__dirname + '/Util.js');

// super class of all collections
class Collection {

  static equals_fn = function(element1, element2) {
    if ((typeof element1 == 'object') && (typeof element1.equals == 'function'))
      return element1.equals(element2);
    if ((typeof element2 == 'object') && (typeof element2.equals == 'function'))
      return element2.equals(element1);
    return Util.equals(element1, element2);
  }

  static hash_code_fn = function(element) {
    if ((typeof element == 'object') && (typeof element.hashCode == 'function'))
      return element.hashCode();
    return Util.hashCode(element);
  }

  static compare_fn = function(element1, element2) {
    if ((typeof element1 == 'object') && (typeof element1.compare == 'function'))
      return element1.compare(element2);
    if ((typeof element2 == 'object') && (typeof element2.compare == 'function'))
      return element2.compare(element1);
    return Util.compare(element1, element2);
  }

  #options;
  
  get options() { return this.#options; }

  constructor(options={}) {
    this.#options = options;
  }

  clear() {
    throw new UnsupportedOperationException();
  }

  // returns a shallow clone
  clone() {
    throw new UnsupportedOperationException();
  }

  clone0(add_method_name, iterable) {
    let clone = new this.constructor(this.options);
    for (let element of (iterable || this.toArray()))
      clone[add_method_name](element);
    return clone;
  }

  // two collections are equal if they are both Collections and their iterators return "equal" elements in the same order
  equals(collection) {
    if (this == collection)
     return true;
    if (!(collection instanceof Collection))
      return false;
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

  // in principle a basic implementation based on next() could be done here, but that is too inefficient to be useful; so, in practice, this method should always be overridden.
  size() {
    throw new UnsupportedOperationException();
  }

  toArray() {
    return Array.from(this);
  }
}

module.exports = Collection;
