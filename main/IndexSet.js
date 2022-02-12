'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');
const HashMap = require(__dirname + '/HashMap.js');
const HashSet = require(__dirname + '/HashSet.js');
const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');
const Set_ = require(__dirname + '/Set.js');

class IndexSet extends Set_ {
  #set = new HashSet(); // contains all added elements
  #map = new HashMap(); // maps indexed property values to elements
  #indexes = new ArrayList(); // contains all added indexes (sorted), each index being an array of sorted (element) property names

  constructor(options={}) {
    super(options);
  }

  add(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    let added = this.#set.add(element);
    if (!added)
      return false;
    this.#set.add(element);
    for (let index of this.#indexes)
      this.#addMap(element, index);
    return true;
  }

  // Adds a new index on the set elements.
  // Returns the added index, or undefined if not added (because the index already exists).
  // Throws IllegalArgumentException if index is undefined or contains a non-string.
  addIndex(index) {
    if ((typeof index !== 'object') || (typeof index[Symbol.iterator] !== 'function'))
      throw new IllegalArgumentException('index is not an iterable');
    for (let property_name of index) {
      if (typeof property_name !== 'string')
        throw new IllegalArgumentException('index contains a non-string: ' + JSON.stringify(property_name));
    }
    let property_names_set = new HashSet();
    property_names_set.addAll(index); // remove duplicate property names
    let property_names = new ArrayList().addAll(property_names_set).sort().toArray(); // sort to ignore property name order
    if (this.#indexes.contains(property_names))
      return undefined;
    this.#indexes.add(property_names);
    this.#indexes.sort();
    for (let element of this.#set)
      this.#addMap(element, property_names);
    return property_names;
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
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    return this.#set.contains(element);
  }

  // Returns { chosen_index: ..., scan_count: ..., match_count: ... };
  // Throws IllegalArgumentException if "where" is not an object.
  examine(where) {
    if (typeof where !== 'object')
      throw new IllegalArgumentException('where is not an object');
    let query_result = this.#query(where);
    return { chosen_index: query_result.chosen_index, scan_count: query_result.scan_count, match_count: query_result.matches.size() };
  }

  // Returns an iterable of the elements that match the (iterable) "where" properties.
  // Throws IllegalArgumentException if "where" is not an object.
  findAll(where) {
    if (typeof where !== 'object')
      throw new IllegalArgumentException('where is not an object');
    return this.#query(where).matches;
  }

  // Returns an element that matches the (iterable) "where" properties, or undefined if no match.
  // Throws IllegalArgumentException if "where" is not an object.
  findOne(where) {
    if (typeof where !== 'object')
      throw new IllegalArgumentException('where is not an object');
    let matches = this.findAll(where);
    return matches.isEmpty() ? undefined : matches.next().next().value;
  }

  // Returns the added indexes as an array
  get indexes() { return this.#indexes.toArray(); }

  next() {
    return this.#set.next();
  }

  // Returns { chosen_index: ..., scan_count: ..., matches: smallest_index_values_set };
  #query(where) {

    // Find the index values with the least number of elements
    let property_names = where ? Object.keys(where) : [];
    if (property_names.length == 0) // special case: find all
      return { chosen_index: null, scan_count: 0, matches: this.#set };

    // Find applicable indexes
    let applicable_indexes = [];
    for (let index of this.#indexes) {
      // use index only if all its property names are contained in the where clause property names, e.g. don't use index ['name','age'] if "where" is { name: 'some_name' }
      let containsAll = index.every(property_name => { return property_names.includes(property_name); });
      if (containsAll)
        applicable_indexes.push(index);
    }

    // Note that we don't filter away shorter indexes because the loop below essentially does this. For example, if "where" is { name: 'some_name', age: 14 } and we have indexes [['name','age'],['name']] then we don't filter away ['name'] index.

    // Loop indexes to find the smallest index values set
    let smallest_index_values_set = this.#set;
    let chosen_index = null;
    for (let index of applicable_indexes) {
      let index_values = new HashSet();
      for (let property_name of index)
        index_values.add({ name: property_name, value: where[property_name] });
      let index_values_set = this.#map.get(index_values) || new HashSet();
      if (index_values_set.size() < smallest_index_values_set.size()) {
        smallest_index_values_set = index_values_set;
        chosen_index = index;
      }
    }

    // Check for perfect index match
    if (chosen_index && (chosen_index.length >= property_names.length))
      return { chosen_index: chosen_index, scan_count: 0, matches: smallest_index_values_set };

    // Scan smallest index values set
    let matches = new HashSet();
    for (let element of smallest_index_values_set) {
      let element_matches = true;
      for (let [property_name, property_value] of Object.entries(where)) {
        if (chosen_index && chosen_index.includes(property_name))
          continue; // no need to check for equality for property names in the chosen_index (if any)
        let property_equals = Collection.equals_fn(property_value, element[property_name]);
        if (!property_equals) {
           element_matches = false;
           break;
        }
      }
      if (element_matches)
        matches.add(element);
    }
    return { chosen_index: chosen_index, scan_count: smallest_index_values_set.size(), matches: matches };
  }

  remove(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
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
