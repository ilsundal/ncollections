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

  get(key) {
    return this.#map.get(key);
  }

  keys() {
    return this.#map.keys();
  }

  next() {
    let entries_iterator = this.#map.entries();
    return {
      next: function() {
        let entries_iterator_next = entries_iterator.next();
        if (entries_iterator_next.done)
          return { done: true };
        let key = entries_iterator_next.value[0];
        let value = entries_iterator_next.value[1];
        let entry = { key: key, value: value };
        return { value: entry, done: false };
      }
    }
  }

  put(key, value) {
    let previous_value = this.#map.get(key);
    this.#map.set(key, value);
    return previous_value;
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
