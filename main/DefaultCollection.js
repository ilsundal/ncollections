'use strict'

const Collection = require(__dirname + '/Collection.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');
const Util = require(__dirname + '/Util.js');

// super class of collections with add, contains, and remove methods, e.g. lists and sets
class DefaultCollection extends Collection {

  constructor(options={}) {
    super(options);
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

  clone() {
    let clone = new this.constructor(this.options);
    for (let element of this)
      clone.add(element);
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
}

module.exports = Collection;
