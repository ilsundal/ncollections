'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');
const Set = require(__dirname + '/Set.js');
const Util = require(__dirname + '/Util.js');

class HashSet extends Set {
  #map = new Map(); // maps key hash code -> elements
  #size = 0;

  constructor(options={}) {
    super(options);
  }

  add(element) {
    let hash_code = Collection.hash_code_fn(element);
    let hash_code_elements = this.#map.get(hash_code);
    if (!hash_code_elements) {
      hash_code_elements = new ArrayList();
      this.#map.set(hash_code, hash_code_elements);
    }
    if (hash_code_elements.contains(element))
      return false;
    hash_code_elements.add(element);
    this.#size++;
    return true;
  }

  clear() {
    this.#map.clear();
    this.#size = 0;
  }

  contains(element) {
    let hash_code = Collection.hash_code_fn(element);
    let hash_code_elements = this.#map.get(hash_code);
    return hash_code_elements ? hash_code_elements.contains(element) : false;
  }

  next() {
    return Util.mapIterator(this.#map);
  }

  remove(element) {
    let hash_code = Collection.hash_code_fn(element);
    let hash_code_elements = this.#map.get(hash_code);
    if (!hash_code_elements)
      return false;
    let removed = hash_code_elements.remove(element);
    if (!removed)
      return false;
    this.#size -= 1;
    if (hash_code_elements.isEmpty())
      this.#map.delete(hash_code); // clean up
    return true;
  }

  size() {
    return this.#size;
  }
}

module.exports = HashSet;
