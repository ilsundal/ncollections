'use strict'

const Collection = require(__dirname + '/Collection.js');
const List = require(__dirname + '/List.js');
const Set = require(__dirname + '/Set.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

// Should be sub-classed into UnmodifiableList, UnmodifiableSet, etc.
class UnmodifiableCollection extends Collection {
  #inner_collection;
  #inner_collection_class;

  constructor(inner_collection, inner_collection_class, options={}) {
    super(options);
    if (!(inner_collection instanceof inner_collection_class))
      throw new Error('inner_collection is not an instance of ' + inner_collection_class);
    this.#inner_collection = inner_collection;
  }

  get inner_collection() { return this.#inner_collection; }
  get inner_collection_class() { return this.#inner_collection_class; }

  clear() {
    throw new UnsupportedOperationException();
  }

  clone() {
    return this.#inner_collection.clone();
  }

  equals(collection) {
    let innermost_collection = collection;
    while (innermost_collection instanceof UnmodifiableCollection)
      innermost_collection = innermost_collection.inner_collection;
    return this.#inner_collection.equals(innermost_collection);
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

  toString() {
    return this.#inner_collection.toString();
  }
}

module.exports = UnmodifiableCollection;
