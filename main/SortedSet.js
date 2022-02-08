'use strict'

const Set = require(__dirname + '/Set.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

class SortedSet extends Set {

  constructor(options) {
    super(options);
  }

  // Returns the first element, or undefined if the set is empty.
  peekFirst() {
    throw new UnsupportedOperationException();
  }

  // Returns the last element, or undefined if the set is empty.
  peekLast() {
    throw new UnsupportedOperationException();
  }

  // Removes the first element.
  // Returns the removed element, or undefined if the set is empty.
  pollFirst() {
    throw new UnsupportedOperationException();
  }

  // Removes the last element.
  // Returns the removed element, or undefined if the set is empty.
  pollLast() {
    throw new UnsupportedOperationException();
  }
}

module.exports = SortedSet;
