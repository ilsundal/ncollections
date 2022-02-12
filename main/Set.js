'use strict'

const Collection = require(__dirname + '/Collection.js');
const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');

class Set extends Collection {

  constructor(options) {
    super(options);
  }

  // Adds the element to the set.
  // Returns true if the set was changed, and false otherwise.
  // Throws IllegalArgumentException if element is undefined.
  add(element) {
    throw new UnsupportedOperationException();
  }

  // Adds the elements to the collection.
  // Returns true if the collection was changed, and false otherwise.
  // Throws IllegalArgumentException if elements is not an iterable or contains an undefined element.
  addAll(elements) {
    if ((typeof elements !== 'object') || (typeof elements[Symbol.iterator] !== 'function'))
      throw new IllegalArgumentException('elements is not an iterable');
    let changed = false;
    for (let element of elements)
      changed = this.add(element) || changed;
    return changed;
  }

  clone() {
    return super.clone0();
  }

  // Returns true if set contains the element, and false otherwise.
  // Throws IllegalArgumentException if element is undefined.
  contains(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    for (let thisElement of this) {
      if (Collection.equals_fn(element, thisElement))
        return true;
    }
    return false;
  }

  // Returns true if set contains all the elements, and false otherwise.
  // Throws IllegalArgumentException if elements is not an iterable or contains an undefined element.
  containsAll(elements) {
    if ((typeof elements !== 'object') || (typeof elements[Symbol.iterator] !== 'function'))
      throw new IllegalArgumentException('elements is not an iterable');
    for (let element of elements) {
      if (!this.contains(element))
        return false;
    }
    return true;
  }

  // Two sets are equal if they contain the same elements (in any order).
  equals(collection) {
    if (this === collection)
      return true;
    if (!(collection instanceof Set))
      return false;
    if (this.size() != collection.size())
      return false;
    return this.containsAll(collection);
  }

  // Two sets with the same elements must have the same hash code regardless of iteration order.
  hashCode() {
    let hash = 17;
    for (let element of this)
      hash += Collection.hash_code_fn(element);
    return hash;
  }

  // Removes the element from the list.
  // Returns true if the element was removed, and false otherwise.
  // Throws IllegalArgumentException if element is undefined.
  remove(element) {
    throw new UnsupportedOperationException();
  }

  // Removes all the elements from the collection.
  // Returns true if any element was removed, and false otherwise.
  // Throws IllegalArgumentException if elements is not an iterable or contains an undefined element.
  removeAll(elements) {
    if ((typeof elements !== 'object') || (typeof elements[Symbol.iterator] !== 'function'))
      throw new IllegalArgumentException('elements is not an iterable');
    let removed = false;
    for (let element of elements)
      removed = this.remove(element) || removed;
    return removed;
  }

  toString() {
    return super.toString({ start: '{', end: '}' });
  }
}

module.exports = Set;
