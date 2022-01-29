'use strict'

const DefaultCollection = require(__dirname + '/DefaultCollection.js');

class Set extends DefaultCollection {

  constructor(options) {
    super(options);
  }
}

module.exports = Set;
