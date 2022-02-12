'use strict'

const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');
const SortedSet = require(__dirname + '/SortedSet.js');
const TreeMap = require(__dirname + '/TreeMap.js');

class TreeSet extends SortedSet {
  #tree_map;

  constructor(options={}) {
    super(options);
    this.#tree_map = new TreeMap({ compare_fn: options.compare_fn });
  }

  add(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    if (this.contains(element))
      return false;
    this.#tree_map.put(element, true);
    return true;
  }

  clear() {
    this.#tree_map.clear();
  }

  contains(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    return this.#tree_map.containsKey(element);
  }

  getFirst() {
    return this.#tree_map.getFirst().key;
  }

  getLast() {
    return this.#tree_map.getLast().key;
  }

  next() {
    return this.#tree_map.keys();
  }

  remove(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    return this.#tree_map.remove(element) === true; // true because we always put "true" as the entry value
  }

  removeFirst() {
    return this.#tree_map.removeFirst().key;
  }

  removeLast() {
    return this.#tree_map.removeLast().key;
  }

  size() {
    return this.#tree_map.size();
  }
}

module.exports = TreeSet;
