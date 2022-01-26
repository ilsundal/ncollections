'use strict'

class NoSuchElementException extends Error {

  constructor(message) {
    super(message)
    this.name = 'NoSuchElementException';
  }
}

module.exports = NoSuchElementException;
