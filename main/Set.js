'use strict'

const Collection = require(__dirname + '/Collection.js');

class Set extends Collection {

  constructor(options={}) {
    super(options);
  }
}

module.exports = Set;
