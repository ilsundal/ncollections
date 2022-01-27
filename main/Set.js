'use strict'

const Collection = require(__dirname + '/Collection.js');

class Set extends Collection {

  constructor(options={}) {
    super(options);
  }

  equals(collection) {
    if (!(collection instanceof Set))
      return false;
    return super.equals(collection);
  }
}

module.exports = Set;
