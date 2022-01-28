'use strict'

const DefaultCollection = require(__dirname + '/DefaultCollection.js');

class Set extends DefaultCollection {

  constructor(options) {
    super(options);
  }

  equals(collection) {
    return super.equals0(collection, Set);
  }
}

module.exports = Set;
