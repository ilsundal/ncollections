'use strict'

const DefaultCollection = require(__dirname + '/DefaultCollection.js');

class Set extends DefaultCollection {

  constructor(options) {
    super(options);
  }
  
  toString() {
    return super.toString({ start: '{', end: '}' });
  }
}

module.exports = Set;
