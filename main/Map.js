'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');
const HashSet = require(__dirname + '/HashSet.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

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

  containsKey(key) {
    return this.keys().contains(key);
  }

  containsValue(value) {
    return this.values().contains(value);
  }

  // returns a Collection of key-value pair objects; if the returned Collection is backed by the map then it is wrapped as an UnmodifiableCollection to prevent modification
  entries() {
    throw new UnsupportedOperationException();
  }

  // returns the value at key, or undefined if no value at key
  get(key) {
    throw new UnsupportedOperationException();
  }

  // returns a Collection (without duplicates since keys are unique); if the returned Collection is backed by the map then it is wrapped as an UnmodifiableCollection to prevent modification
  keys() {
    let keys = new HashSet();
    for (let entry of this.entries())
      keys.add(entry.key);
    return keys;
  }

  next() {
    return this.entries().next();
  }

  // returns the previous value at key, or undefined if no value at key
  put(key, value) {
    throw new UnsupportedOperationException();
  }

  // returns nothing
  putAll(kvPairs) {
    for (let kvPair of kvPairs)
      this.put(kvPair.key, kvPair.value);
  }

  // returns the previous value at key, or undefined if no value at key
  remove(key) {
    throw new UnsupportedOperationException();
  }

  size() {
    return this.entries().size();
  }

  // returns an Collection (which may contain duplicate values) - its size == size(); if the returned Collection is backed by the map then it is wrapped as an UnmodifiableCollection to prevent modification
  values() {
    let values = new ArrayList(); // duplicates are possible
    for (let entry of this.entries())
      values.add(entry.value);
    return values;
  }
}

module.exports = Map;
