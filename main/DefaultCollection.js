'use strict'

const Collection = require(__dirname + '/Collection.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');
const Util = require(__dirname + '/Util.js');

// Super class of collections with add, contains, and remove methods, e.g. lists and sets.
class DefaultCollection extends Collection {

  constructor(options={}) {
    super(options);
  }

  // Adds the element to the collection
  // Returns true if the collection was changed, and false otherwise. (The return value might be overridden by sub-classes.)
  add(element) {
    throw new UnsupportedOperationException();
  }

  // Adds the elements to the collection
  // Returns true if the collection was changed, and false otherwise. (The return value might be overridden by sub-classes.)
  addAll(elements) {
    let changed = false;
    for (let element of elements)
      changed = this.add(element) || changed;
    return changed;
  }

  clone() {
    return super.clone0();
  }

  // Returns true if collection contains the element, and false otherwise.
  contains(element) {
    for (let thisElement of this) {
      if (Collection.equals_fn(element, thisElement))
        return true;
    }
    return false;
  }

  // Returns true if collection contains all the elements, and false otherwise.
  containsAll(elements) {
    for (let element of elements) {
      if (!this.contains(element))
        return false;
    }
    return true;
  }

  // Removes the element from the collection. If the collection contains multiple instances of the element then only one instance will be removed.
  // Returns true if the element was removed, and false otherwise.
  remove(element) {
    throw new UnsupportedOperationException();
  }

  // Removes all the elements from the collection. If the collection contains multiple instances of any of the elements then only one such instance will be removed for each element.
  // Returns true if any element was removed, and false otherwise.
  removeAll(elements) {
    let removed = false;
    for (let element of elements)
      removed = this.remove(element) || removed;
    return removed;
  }
}

module.exports = DefaultCollection;
