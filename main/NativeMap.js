'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');

const _Map = require(__dirname + '/Map.js');

class NativeMap extends _Map {
  #map = new Map();

  constructor(options={}) {
    super(options);
  }

  clear() {
    this.#map.clear();
  }

  containsKey(key) {
    return this.#map.has(key);
  }

  containsValue(value) {
    for (let map_value of this.#map.values()) {
      if (Collection.equals_fn(map_value, value))
        return true;
    }
    return false;
  }

  // Todo: Make incremental.
  entries() {
    let entries = new ArrayList();
    for (let [key, value] of this.#map.entries())
      entries.add({ key: key, value: value});
    return entries;
  }

  get(key) {
    return this.#map.get(key);
  }

  keys() {
    return this.#map.keys();
  }

  next() {
    return this.entries().next();
  }

  put(key, value) {
    let previous_value = this.#map.get(key);
    this.#map.set(key, value);
    return previous_value;
  }

  putAll(kvPairs) {
    for (let kvPair of kvPairs)
      this.put(kvPair.key, kvPair.value);
  }

  remove(key) {
    let previous_value = this.#map.get(key);
    this.#map.delete(key);
    return previous_value;
  }

  size() {
    return this.#map.size;
  }

  values() {
    return this.#map.values();
  }
}

module.exports = NativeMap;
