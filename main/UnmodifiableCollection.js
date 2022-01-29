'use strict'

const Collection = require(__dirname + '/Collection.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

class UnmodifiableCollection extends Collection {
  #inner_collection;

  constructor(inner_collection, options={}) {
    super(options);
    this.#inner_collection = inner_collection;
  }

  get inner_collection() { return this.#inner_collection; }

  clear() {
    throw new UnsupportedOperationException();
  }

  // returns a shallow clone
  clone() {
    return this.#inner_collection.clone();
  }

  equals(collection) {
    return this.#inner_collection.equals(collection);
  }

  hashCode() {
    return this.#inner_collection.hashCode();
  }

  isEmpty() {
    return this.#inner_collection.isEmpty();
  }

  next() {
    return this.#inner_collection.next();
  }

  [Symbol.iterator]() { return this.next(); }

  size() {
    return this.#inner_collection.size();
  }

  toArray() {
    return this.#inner_collection.toArray();
  }
}

module.exports = UnmodifiableCollection;
