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

  // returns a Collection
  // todo: the returned Collection should not allow any modification (if backed by the map)
  entries() {
    throw new UnsupportedOperationException();
  }

  equals(collection) {
    return super.equals0(collection, Map);
  }

  get(key) {
    throw new UnsupportedOperationException();
  }

  // returns a Collection (without duplicates since keys are unique)
  // todo: the returned Collection should not allow any modification (if backed by the map)
  keys() {
    let keys = new HashSet();
    for (let entry of this.entries())
      keys.add(entry.key);
    return keys;
  }

  next() {
    return this.entries().next();
  }

  // returns 
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

  // returns an Collection (which may contain duplicate values) - its size == size()
  // todo: the returned Collection should not allow any modification (if backed by the map)
  values() {
    let values = new ArrayList(); // duplicates are possible
    for (let entry of this.entries())
      values.add(entry.value);
    return values;
  }
}

module.exports = Map;
