'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');
const HashSet = require(__dirname + '/HashSet.js');
const _Map = require(__dirname + '/Map.js');

class HashMap extends _Map {
  #map = new Map(); // maps key hash code -> entry list, where each entry is a { key: ..., value: ... } object
  #size = 0;

  constructor(options={}) {
    super(options);
  }

  clear() {
    this.#map.clear();
    this.#size = 0;
  }

  containsKey(key) {
    let key_hash_code = Collection.hash_code_fn(key);
    let key_hash_code_entries = this.#map.get(key_hash_code) || [];
    for (let key_hash_code_entry of key_hash_code_entries) {
      if (Collection.equals_fn(key_hash_code_entry.key, key))
        return true;
    }
    return false;
  }

  // inefficient
  containsValue(value) {
    for (let entry of this) {
      if (Collection.equals_fn(entry.value, value))
        return true;
    }
    return false;
  }

  // Todo: make incremental.
  entries() {
    let entries = new HashSet();
    for (let key_hash_code_entries of this.#map.values())
      entries.addAll(key_hash_code_entries);
    return entries;
  }

  get(key) {
    let key_hash_code = Collection.hash_code_fn(key);
    let key_hash_code_entries = this.#map.get(key_hash_code) || [];
    for (let key_hash_code_entry of key_hash_code_entries) {
      if (Collection.equals_fn(key, key_hash_code_entry.key))
        return key_hash_code_entry.value;
    }
    return undefined;
  }

  // Todo: make incremental.
  keys() {
    let keys = new ArrayList();
    for (let entry of this)
      keys.add(entry.key);
    return keys;
  }

  next() {
    return this.entries().next();
  }

  put(key, value) {
    let key_hash_code = Collection.hash_code_fn(key);
    let key_hash_code_entries = this.#map.get(key_hash_code);
    if (!key_hash_code_entries) {
      key_hash_code_entries = new ArrayList();
      this.#map.set(key_hash_code, key_hash_code_entries);
      key_hash_code_entries.add({ key: key, value: value });
      this.#size++; // add
      return undefined;
    }
    for (let key_hash_code_entry of key_hash_code_entries) {
      if (Collection.equals_fn(key, key_hash_code_entry.key)) {
        let old_value = key_hash_code_entry.value;
        key_hash_code_entry.value = value; // replace (size does not change)
        return old_value;
      }
    }
    key_hash_code_entries.add({ key: key, value: value });
    this.#size++; // add
    return undefined;
  }

  remove(key) {
    let key_hash_code = Collection.hash_code_fn(key);
    let key_hash_code_entries = this.#map.get(key_hash_code) || [];
    let key_hash_code_entry_to_remove_index = -1;
    for (let i = 0; i != key_hash_code_entries.length; i++) {
      let key_hash_code_entry = key_hash_code_entries.getAt(i);
      if (Collection.equals_fn(key, key_hash_code_entry.key)) {
        key_hash_code_entry_to_remove_index = i;
        break;
      }
    }
    if (key_hash_code_entry_to_remove_index >= 0) {
      let key_hash_code_entry_removed = key_hash_code_entries.removeAt(key_hash_code_entry_to_remove_index);
      if (key_hash_code_entries.isEmpty())
        this.#map.delete(key_hash_code); // clean up
      this.#size--;
      return key_hash_code_entry_removed.value;
    }
    return undefined;
  }

  size() {
    return this.#size;
  }

  // Todo: make incremental.
  values() {
    let values = new ArrayList();
    for (let entry of this)
      values.add(entry.value);
    return values;
  }
}

module.exports = HashMap;
