'use strict'

const DefaultCollection = require(__dirname + '/DefaultCollection.js');

class Set extends DefaultCollection {

  constructor(options) {
    super(options);
  }

  // Two sets are equal if they contain the same elements (in any order).
  equals(collection) {
    if (this === collection)
      return true;
    if (!(collection instanceof Set))
      return false;
    if (this.size() != collection.size())
      return false;
    return this.containsAll(collection);
  }

  toString() {
    return super.toString({ start: '{', end: '}' });
  }
}

module.exports = Set;
