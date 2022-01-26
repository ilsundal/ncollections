'use strict'

class IndexOutOfBoundsException extends Error {
  #index;

  constructor(index) {
    super('Index out of bounds: ' + index)
    this.name = 'IndexOutOfBoundsException';
    this.#index = index;
  }
  
  get index() { return this.#index; }
}

module.exports = IndexOutOfBoundsException;
