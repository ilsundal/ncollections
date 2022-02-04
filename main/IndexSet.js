'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');
const HashMap = require(__dirname + '/HashMap.js');
const HashSet = require(__dirname + '/HashSet.js');
const Set_ = require(__dirname + '/Set.js');

class IndexSet extends Set_ {
  #set = new HashSet(); // contains all added elements
  #map = new HashMap(); // maps indexed property values to elements
  #indexes = new HashSet(); // contains all added indexes, each index being an array of (element) property names

  constructor(options={}) {
    super(options);
  }

  add(element) {
    let added = this.#set.add(element);
    if (!added)
      return false;
    this.#set.add(element);
    for (let index of this.#indexes)
      this.#addMap(element, index);
    return true;
  }

  #addMap(element, index) {
    let properties = new HashSet();
    for (let property_name of index) {
      let property = { name: property_name, value: element[property_name] };
      properties.add(property);
    }
    let index_values = properties;
    let index_values_set = this.#map.get(index_values);
    if (!index_values_set) {
      index_values_set = new HashSet();
      this.#map.put(index_values, index_values_set);
    }
    index_values_set.add(element);
  }

  // Adds a new index on the set elements.
  // Returns true if the index was added, and false if not (i.e. the index already exists).
  addIndex(index) {
    if (this.#indexes.contains(index))
      return false;
    this.#indexes.add(index);
    for (let element of this.#set)
      this.#addMap(element, index);
    return true;
  }

  clear() {
    this.#set.clear();
    this.#map.clear();
    this.#indexes.clear();
  }

  clone() {
    let clone = new IndexSet();
    for (let index of this.#indexes)
      clone.addIndex(index);
    clone.addAll(this);
    return clone;
  }

  contains(element) {
    return this.#set.contains(element);
  }

  #determineIndexes(property_names) {
    let indexes = new ArrayList();
    for (let index of this.#indexes) {
      for (let property_name of property_names) {
        if (index.includes(property_name)) {
          indexes.add(index);
          break;
        }
      }
    }
    return indexes;
  }

  // Returns an iterable of the elements that match the (iterable) "where" properties.
  findAll(where) {
    // find the index values with the least number of elements
    let property_names = where ? Object.keys(where) : [];
    if (property_names.length == 0) // special case: find all
      return this.#set;
    let indexes = this.#determineIndexes(property_names);
    let smallest_index_values_set = this.#set;
    let chosen_index = null;
    for (let index of indexes) {
      let index_values = new HashSet();
      for (let property_name of index)
        index_values.add({ name: property_name, value: where[property_name] });
      let index_values_set = this.#map.get(index_values) || new HashSet();
      if (index_values_set.size() < smallest_index_values_set.size()) {
        smallest_index_values_set = index_values_set;
        chosen_index = index;
      }
    }
    if (!chosen_index || (chosen_index.length < property_names.length)) { // filter smallest_index_values_set linearly
      let matches = new HashSet();
      for (let element of smallest_index_values_set) {
        let element_matches = true;
        for (let [property_name, property_value] of Object.entries(where)) {
          let property_equals = Collection.equals_fn(property_value, element[property_name]);
          if (!property_equals) {
             element_matches = false;
             break;
          }
        }
        if (element_matches)
          matches.add(element);
      }
      return matches;
    } else {
      return smallest_index_values_set;
    }
  }

  // Returns an element that matches the (iterable) "where" properties, or undefined if no match.
  findOne(where) {
    let matches = this.findAll(where);
    return matches.isEmpty() ? undefined : matches.next().next().value;
  }

  next() {
    return this.#set.next();
  }

  remove(element) {
    let removed = this.#set.remove(element);
    if (!removed)
      return false;
    for (let index of this.#indexes)
      this.#removeMap(element, index);
    return true;
  }

  #removeMap(element, index) {
    let property_name_value_pairs = new HashSet();
    for (let property_name of index) {
      let property_name_value_pair = { name: property_name, value: element[property_value] };
      property_name_value_pairs.add(property_name_value_pair);
    }
    let index_values = property_name_value_pairs;
    let index_values_set = this.#map.get(index_values);
    index_values_set.remove(element);
    if (index_values_set.isEmpty())
      this.#map.remove(index_values); // clean up
  }

  size() {
    return this.#set.size();
  }
}

module.exports = IndexSet;
