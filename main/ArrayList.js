'use strict'

const Collection = require(__dirname + '/Collection.js');
const IndexOutOfBoundsException = require(__dirname + '/IndexOutOfBoundsException.js');
const List = require(__dirname + '/List.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');

class ArrayList extends List {
  #array = [];

  constructor(options={}) {
    super(options);
  }

  addFirst(element) {
    this.#array.splice(0, 0, element);
    return true;
  }

  addLast(element) {
    this.#array.push(element);
    return true;
  }

  clear() {
    this.#array.length = 0;
  }

  getAt(index) {
    if ((index < 0) || (index >= this.#array.length))
      throw new IndexOutOfBoundsException(index);
    return this.#array[index];
  }

  insertAt(index, element) {
    if ((index < 0) || (index >= this.#array.length))
      throw new IndexOutOfBoundsException(index);
    this.#array.splice(index, 0, element);
  }

  next() {
    let array = this.#array;
    let next_index = 0;
    return {
      next: function() {
        return next_index < array.length ? {
          value: array[next_index++],
          done: false
        } : {
          done: true
        };
      }
    }
  }

  remove(element) {
    for (let i = 0; i != this.#array.length; i++) {
      if (Collection.equals_fn(element, this.#array[i])) {
        this.#array.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  removeAt(index) {
    if ((index < 0) || (index >= this.#array.length))
      throw new IndexOutOfBoundsException(index);
    return this.#array.splice(index, 1)[0];
  }

  reverse() {
    this.#array.reverse();
    return this;
  }

  setAt(index, element) {
    if ((index < 0) || (index >= this.#array.length))
      throw new IndexOutOfBoundsException(index);
    this.#array[index] = element;
  }

  size() {
    return this.#array.length;
  }

  sort(compare_fn=Collection.compare_fn) {
    this.#array.sort(compare_fn);
    return this;
  }
  
  toArray() {
    return this.#array;
  }
}

module.exports = ArrayList;
