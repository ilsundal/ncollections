'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');
const Set = require(__dirname + '/Set.js');

class HashSet extends Set {
  #map = {};
  #size = 0;

  constructor(options={}) {
    super(options);
  }

  // implements Collection
  add(element) {
    let hash_code = Collection.hash_code_fn(element);
    let map_key_list = this.#map[hash_code];
    if (!map_key_list)
      this.#map[hash_code] = map_key_list = new ArrayList();
    if (map_key_list.contains(element))
      return false;
    map_key_list.add(element);
    this.#size++;
    return true;
  }

  // implements Collection
  clear() {
    this.#map = {};
    this.#size = 0;
  }

  // implements Collection more effectively
  contains(element) {
    let hash_code = Collection.hash_code_fn(element);
    let map_key_list = this.#map[hash_code];
    if (!map_key_list)
      return false;
    return map_key_list.contains(element);
  }

  // implements Collection
  // inefficient if only iterating over a few of the elements
  // todo: a more efficient implementation is to iterate over the map values by key
  next() {
    let all = new ArrayList();
    for (let [hash_code, elements] of Object.entries(this.#map))
      all.addAll(elements);
    return all.next();
  }

  // implements Collection
  remove(element) {
    let hash_code = Collection.hash_code_fn(element);
    let map_key_list = this.#map[hash_code];
    if (!map_key_list)
      return false;
    let removed = map_key_list.remove(element);
    if (!removed)
      return false;
    this.#size -= 1;
    if (map_key_list.isEmpty())
      delete this.#map[hash_code]; // clean up
    return true;
  }

  // implements Collection
  size() {
    return this.#size;
  }
}

module.exports = HashSet;
