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
    return this.keys().contains(key);
  }

  // Returns true if the value is a map value, i.e. if some key maps to it, and false otherwise.
  containsValue(value) {
    return this.values().contains(value);
  }

  // Returns a Set of key-value pair objects.
  // Implementation note: if the returned Collection is backed by the map then it should be wrapped as an UnmodifiableCollection to prevent modification.
  entries() {
    throw new UnsupportedOperationException();
  }

  // Two maps are equal if they contain the same entries (in any order).
  equals(collection) {
    if (this === collection)
      return true;
    if (!(collection instanceof Map))
      return false;
    if (this.size() != collection.size())
      return false;
    return this.entries().equals(collection.entries());
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

  // Returns a Set (without duplicates since keys are unique).
  // Implementation note: if the returned Collection is backed by the map then it should be wrapped as an UnmodifiableCollection to prevent modification.
  keys() {
    let keys = new HashSet();
    for (let entry of this.entries())
      keys.add(entry.key);
    return keys;
  }

  next() {
    return this.entries().next();
  }

  // Puts the key and value into the map.
  // Returns the previous value at key, or undefined if no value at key.
  put(key, value) {
    throw new UnsupportedOperationException();
  }

  // Puts the (iterable) key-value pairs into the map.
  // Returns nothing.
  putAll(kvPairs) {
    for (let kvPair of kvPairs)
      this.put(kvPair.key, kvPair.value);
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

  // Implementation note: The default implementation is inefficient.
  size() {
    return this.entries().size();
  }

  toString() {
    return super.toString({ start: '{', end: '}', element_fn: function(element) {
      return Util.toString(element.key) + '->' + Util.toString(element.value);
    }});
  }

  // Returns an Collection (which may contain duplicate values). The collection size will equal size().
  // Implementation note: if the returned Collection is backed by the map then it should be wrapped as an UnmodifiableCollection to prevent modification,
  values() {
    let values = new ArrayList(); // duplicates are possible
    for (let entry of this.entries())
      values.add(entry.value);
    return values;
  }
}

module.exports = Map;
