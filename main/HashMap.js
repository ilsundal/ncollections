'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');
const Map = require(__dirname + '/Map.js');

// needs to be reviewed - and possible redone, so e.g. containsKey, containsValue, size, etc. can be fast
class HashMap extends Map {
  #map = {}; // maps key hash code -> entry list, where each entry is a { key: ..., value: ... } object

  constructor(options={}) {
    super(options);
  }

  clear() {
    this.#map = {};
  }

  entries() {
    let entries = new ArrayList();
    for (let values of Object.values(this.#map))
      entries.addAll(values);
    return entries;
  }

  get(key) {
    let key_hash_code = Collection.hash_code_fn(key);
    let key_hash_code_entries = this.#map[key_hash_code];
    if (key_hash_code_entries) {
      for (let key_hash_code_entry of key_hash_code_entries) {
        if (Collection.equals_fn(key, key_hash_code_entry.key))
          return key_hash_code_entry.value;
      }
    }
    return undefined;
  }

  put(key, value) {
    let key_hash_code = Collection.hash_code_fn(key);
    let key_hash_code_entries = this.#map[key_hash_code];
    if (!key_hash_code_entries) {
      this.#map[key_hash_code] = key_hash_code_entries = new ArrayList();
      key_hash_code_entries.add({ key: key, value: value });
      return undefined;
    }
    for (let key_hash_code_entry of key_hash_code_entries) {
      if (Collection.equals_fn(key, key_hash_code_entry.key)) {
        let old_value = key_hash_code_entry.value;
        key_hash_code_entry.value = value;
        return old_value;
      }
    }
    key_hash_code_entries.add({ key: key, value: value });
    return undefined;
  }

  remove(key) {
    let key_hash_code = Collection.hash_code_fn(key);
    let key_hash_code_entries = this.#map[key_hash_code];
    let key_hash_code_entry_to_remove_index = -1;
    if (key_hash_code_entries) {
      for (let i = 0; i != key_hash_code_entries.length; i++) {
        let key_hash_code_entry = key_hash_code_entries.getAt(i);
        if (Collection.equals_fn(key, key_hash_code_entry.key)) {
          key_hash_code_entry_to_remove_index = i;
          break;
        }
      }
    }
    if (key_hash_code_entry_to_remove_index >= 0) {
      let key_hash_code_entry_removed = key_hash_code_entries.removeAt(key_hash_code_entry_to_remove_index);
      if (key_hash_code_entries.isEmpty())
        delete this.#map[key_hash_code]; // clean up
      return key_hash_code_entry_removed.value;
    }
    return undefined;
  }
}

module.exports = HashMap;
