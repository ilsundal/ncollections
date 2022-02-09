'use strict'

class IllegalArgumentException extends Error {

  constructor(message) {
    super(message)
    this.name = 'IllegalArgumentException';
  }
}

module.exports = IllegalArgumentException;
