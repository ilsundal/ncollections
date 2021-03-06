'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');
const HashSet = require(__dirname + '/HashSet.js');
const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');
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
  // Throws IllegalArgumentException if key is undefined.
  containsKey(key) {
    throw new UnsupportedOperationException();
  }

  // Basic implementation of containsKey for use by sub-classes.
  // Throws IllegalArgumentException if key is undefined.
  containsKey0(key) {
    if (key === undefined)
      throw new IllegalArgumentException('key is undefined');
    for (let entry of this) {
      if (Collection.equals_fn(entry.key, key))
        return true;
    }
    return false;
  }

  // Returns true if the value is a map value, i.e. if some key maps to it, and false otherwise.
  // Throws IllegalArgumentException if value is undefined.
  containsValue(value) {
    throw new UnsupportedOperationException();
  }

  // Basic implementation of containsKey for use by sub-classes.
  // Throws IllegalArgumentException if value is undefined.
  containsValue0(value) {
    if (value === undefined)
      throw new IllegalArgumentException('value is undefined');
    for (let entry of this) {
      if (Collection.equals_fn(entry.value, value))
        return true;
    }
    return false;
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
  // Throws IllegalArgumentException if key is undefined.
  get(key) {
    throw new UnsupportedOperationException();
  }

  // Returns an iterable over the map's keys.
  keys() {
    let entries_iterator = this.next();
    return {
      next: function() {
        let entries_iterator_next = entries_iterator.next();
        return entries_iterator_next.done ? { done: true } : { value: entries_iterator_next.value.key, done: false };
      },
      [Symbol.iterator]: function() { return this; }
    };
  }


  // Puts the key and value into the map.
  // Returns the previous value at key, or undefined if no value at key.
  // Throws IllegalArgumentException if key or value is undefined.
  put(key, value) {
    throw new UnsupportedOperationException();
  }

  // Puts the (iterable) entries (of key-value pairs) into the map.
  // Returns nothing.
  // Throws IllegalArgumentException if entries is not an iterable or contains a non-object.
  putAll(entries) {
    if ((typeof entries !== 'object') || (typeof entries[Symbol.iterator] !== 'function'))
      throw new IllegalArgumentException('entries is not an iterable');
    for (let entry of entries) {
      if (typeof entry !== 'object')
        throw new IllegalArgumentException('entries contains an entry that is not an object: ' + JSON.stringify(entry));
      this.put(entry.key, entry.value);
    }
  }

  // Removes the key and its associated value from the map.
  // Returns the previous value at key, or undefined if no value at key.
  // Throws IllegalArgumentException if key is undefined.
  remove(key) {
    throw new UnsupportedOperationException();
  }

  // Removes all the keys and their associated values from the map.
  // Returns the removed entries.
  // Throws IllegalArgumentException if keys is not an iterable or contains a non-object.
  removeAll(keys) {
    if ((typeof keys !== 'object') || (typeof keys[Symbol.iterator] !== 'function'))
      throw new IllegalArgumentException('keys is not an iterable');
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
  values() {
    let entries_iterator = this.next();
    return {
      next: function() {
        let entries_iterator_next = entries_iterator.next();
        return entries_iterator_next.done ? { done: true } : { value: entries_iterator_next.value.value, done: false };
      },
      [Symbol.iterator]: function() { return this; }
    };
  }
}

module.exports = Map;
