'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');
const HashSet = require(__dirname + '/HashSet.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');
const Util = require(__dirname + '/Util.js');

class Map extends Collection {

  constructor(options={}) {
    super(options);
  }

  clone() {
    let clone = new this.constructor(this.options);
    for (let entry of this)
      clone.put(entry.key, entry.value);
    return clone;
  }

  // Returns true if the key is a map key, and false otherwise.
  containsKey(key) {
    throw new UnsupportedOperationException();
  }

  // Returns true if the value is a map value, i.e. if some key maps to it, and false otherwise.
  containsValue(value) {
    throw new UnsupportedOperationException();
  }

  // Two maps are equal if they contain the same keys and values for each key (in any order).
  equals(collection) {
    if (this === collection)
      return true;
    if (!(collection instanceof Map))
      return false;
    if (this.size() != collection.size())
      return false;
    for (let key of this.keys()) {
      let this_key_value = this.get(key);
      let other_key_value = collection.get(key);
      if (!Collection.equals_fn(this_key_value, other_key_value))
        return false;
    }
    return true;
  }

  // Two maps with the same entries must have the same hash code regardless of iteration order.
  hashCode() {
    let hash = 17;
    for (let entry of this)
      hash += Collection.hash_code_fn(entry);
    return hash;
  }

  // Returns the value at key, or undefined if no value at key.
  get(key) {
    throw new UnsupportedOperationException();
  }

  // Returns an iterable over the map's keys.
  // Todo: make incremental.
  keys() {
    throw new UnsupportedOperationException();
  }

  next() {
    return this.entries();
  }

  // Puts the key and value into the map.
  // Returns the previous value at key, or undefined if no value at key.
  put(key, value) {
    throw new UnsupportedOperationException();
  }

  // Puts the (iterable) entries (of key-value pairs) into the map.
  // Returns nothing.
  putAll(entries) {
    for (let entry of entries)
      this.put(entry.key, entry.value);
  }

  // Removes the key and its associated value from the map.
  // Returns the previous value at key, or undefined if no value at key.
  remove(key) {
    throw new UnsupportedOperationException();
  }

  // Removes all the keys and their associated values from the map.
  // Returns the removed entries.
  removeAll(keys) {
    let removed = new HashSet();
    for (let key of keys) {
      let value = this.remove(key);
      if (value != undefined)
        removed.add({ key: key, value: value });
    }
    return removed;
  }

  size() {
    throw new UnsupportedOperationException();
  }

  toString() {
    return super.toString({ start: '{', end: '}', element_fn: function(element) {
      return Util.toString(element.key) + '->' + Util.toString(element.value);
    }});
  }

  // Returns an iterable over the map's values.
  // Todo: make incremental.
  values() {
    throw new UnsupportedOperationException();
  }
}

module.exports = Map;
