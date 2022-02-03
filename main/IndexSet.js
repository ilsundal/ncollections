'use strict'

const HashSet = require(__dirname + '/HashSet.js');
const Set = require(__dirname + '/Set.js');

class IndexSet extends Set {
  #all_set = new HashSet();

  constructor(options={}) {
    super(options);
  }

  add(element) {
    return this.#all_set.add(element);
  }

  clear() {
    this.#all_set.clear();
  }

  contains(element) {
    return this.#all_set.contains(element);
  }

  next() {
    return this.#all_set.next();
  }

  remove(element) {
    return this.#all_set.remove(element);
  }

  size() {
    return this.#all_set.size();
  }
}

module.exports = IndexSet;
