'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
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
      let property = { name: property_name, value: element[property_value] };
      properties.add(property);
    }
    let index_values = properties;
    let index_values_set = this.#map.get(index_values);
    if (!index_values_set) {
      index_values_set = new HashSet();
      this.#map.set(index_values, index_values_set);
    }
    index_values_set.add(element);
  }

  // Indexes the set elements according to the properties.
  // Returns the set itself.
  addIndex(property_names) {
    let index = property_names;
    if (this.#indexes.contains(index))
      return;
    indexes.add(properties);
    for (let element of this.#set)
      addMap(element, index);
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

  // Returns an iterable of the elements that match the (iterable) properties.
  find(properties) {
    // find the index values with the least number of elements
    let property_names = Object.getPropertyNames(properties);
    if (property_names.length == 0) // special case: find all
      return this.#set;
    let indexes = this.#findIndexes(property_names);
    let smallest_index_values_set = this.#set;
    let chosen_index = null;
    for (let index of indexes) {
      let index_values = new HashSet();
      for (let property_name of index)
        index_values.add({ name: property_name, value: properties[property_name] });
      let index_values_set = this.#map.get(index_values);
      if (index_values_set.size() < smallest_index_values_set.size()) {
        smallest_index_values_set = index_values_set;
        chosen_index = index;
      }
    }
    if (!chosen_index || (chosen_index.size() < property_names.length)) { // filter smallest_index_values_set linearly
      let matches = new ArrayList();
      for (let element of smallest_index_values_set) {
        let element_matches = true;
        for (let property of properties) {
          let property_equals = Collection.equals_fn(property.value, element[property.name]);
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

  #findIndexes(property_names) {
    let indexes = new ArrayList();
    for (let index of this.#indexes) {
      for (let property_name of property_names) {
        if (index.contains(property_name)) {
          indexes.add(index);
          break;
        }
      }
    }
    return index;
  }

  findOne(properties) {
    let matches = this.match(properties);
    return matches.isEmpty() ? undefined : matches.getFirst();
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
