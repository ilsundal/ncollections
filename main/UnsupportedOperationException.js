'use strict'

class UnsupportedOperationException extends Error {
  
  constructor() {
    super()
    this.name = 'UnsupportedOperationException';
  }
}

module.exports = UnsupportedOperationException;
