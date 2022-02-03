'use strict'

const Collection = require(__dirname + '/Collection.js');
const _Set = require(__dirname + '/Set.js');

class NativeSet extends _Set {
  #set = new Set();

  constructor(options={}) {
    super(options);
  }

  add(element) {
    if (this.#set.has(element))
      return false;
    this.#set.add(element);
    return true;
  }

  clear() {
    this.#set.clear();
  }

  contains(element) {
    return this.#set.has(element);
  }

  next() {
    return this.#set.values();
  }

  remove(element) {
    return this.#set.delete(element);
  }

  size() {
    return this.#set.size;
  }
}

module.exports = NativeSet;
