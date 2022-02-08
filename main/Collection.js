'use strict'

const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');
const Util = require(__dirname + '/Util.js');

// Super class of all collections.
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

  // Clears the collection, i.e. makes it empty.
  clear() {
    throw new UnsupportedOperationException();
  }

  // Returns a shallow clone of the collection.
  clone() {
    throw new UnsupportedOperationException();
  }

  clone0(add_method_name='add') {
    let clone = new this.constructor(this.options);
    for (let element of this)
      clone[add_method_name](element);
    return clone;
  }

  // Two collections are equal if they are both Collections and their iterators return "equal" elements in the same order.
  // Sub-classes will typically overrride this to ensure the Collection class is the same (e.g. Deque or Stack), or shares the same super-class (e.g. List or Set), using the equals0 method.
  equals(collection) {
    return this.equals0(collection, Collection);
  }

  equals0(collection, instance_of) {
    if (this == collection)
     return true;
    if (!(collection instanceof instance_of))
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

  // Source: https://stackoverflow.com/questions/1646807/quick-and-simple-hash-code-combinations
  hashCode() {
    let hash = 17;
    for (let element of this)
      hash = hash * 31 * Collection.hash_code_fn(element);
    return hash;
  }

  // Returns true if the collection size is 0.
  isEmpty() {
    return this.size() === 0;
  }

  // Implement iterator protocol.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
  next() {
    throw new UnsupportedOperationException();
  }

  // Implement iterable protocol.
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
  [Symbol.iterator]() { return this.next(); }

  // Returns the number of elements in the collection.
  size() {
    throw new UnsupportedOperationException();
  }

  size0() {
    let size = 0;
    for (let element of this)
      size++;
    return size;
  }

  // Returns the collection as an array.
  toArray() {
    return Array.from(this);
  }

  // Returns a string representation of the collection in iteration order.
  // Note that two collections (e.g. two sets) that are equal might not necessarily return the same string because their iteration order might be different.
  toString(options={}) {
    let start = options.start || '[';
    let separator = options.separator || ',';
    let end = options.end || ']';
    let element_fn = options.element_fn || function(element) { return Util.toString(element); };
    let str = start;
    let index = 0;
    let size = this.size();
    for (let element of this) {
      str += element_fn(element);
      if (index < (size - 1))
        str += separator;
      index++;
    };
    str += end;
    return str;
  }
}

module.exports = Collection;
