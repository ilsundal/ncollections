'use strict'

const Collection = require(__dirname + '/Collection.js');
const HashSet = require(__dirname + '/HashSet.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

class Map extends Collection {

  constructor(options={}) {
    super(options);
  }

  containsKey(key) {
    return this.keys().contains(key);
  }

  containsValue(value) {
    return this.values().contains(value);
  }

  entries() {
    throw new UnsupportedOperationException();
  }

  equals(collection) {
    if (!(collection instanceof Map))
      return false;
    return super.equals(collection);
  }

  get(key) {
    throw new UnsupportedOperationException();
  }

  keys() {
    let keys = new HashSet();
    for (let entry of this.entries())
      keys.add(entry.key);
    return keys;
  }

  next() {
    return this.entries().next();
  }

  put(key, value) {
    throw new UnsupportedOperationException();
  }

  putAll(kvPairs) {
    for (let kvPair of kvPairs)
      this.put(kvPair.key, kvPair.value);
  }

  remove(key) {
    throw new UnsupportedOperationException();
  }

  size() {
    return this.entries().size();
  }

  values() {
    let values = new HashSet();
    for (let entry of this.entries())
      values.add(entry.value);
    return values;
  }
}

module.exports = Map;
