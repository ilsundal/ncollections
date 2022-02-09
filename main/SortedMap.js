'use strict'

const Map = require(__dirname + '/Map.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

class SortedMap extends Map {

  constructor(options) {
    super(options);
  }

  // Returns the entry with the smallest key, or undefined if the map is empty.
  peekFirst() {
    throw new UnsupportedOperationException();
  }

  // Returns the entry with the largest key, or undefined if the map is empty.
  peekLast() {
    throw new UnsupportedOperationException();
  }

  // Removes the entry with the smallest key.
  // Returns the removed entry, or undefined if the map is empty.
  removeFirst() {
    throw new UnsupportedOperationException();
  }

  // Removes the entry with the largest key.
  // Returns the removed entry, or undefined if the map is empty.
  removeLast() {
    throw new UnsupportedOperationException();
  }
}

module.exports = SortedMap;
