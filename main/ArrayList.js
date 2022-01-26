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

  // implements Collection
  add(element) {
    this.#array.push(element);
    return true;
  }

  // implements List
  addFirst(element) {
    this.#array.splice(0, 0, element);
    return true;
  }

  // implements Collection
  clear() {
    this.#array.length = 0;
  }

  // implements List
  getAt(index) {
    if ((index < 0) || (index >= this.#array.length))
      throw new IndexOutOfBoundsException(index);
    return this.#array[index];
  }

  // implements List
  insertAt(index, element) {
    if ((index < 0) || (index >= this.#array.length))
      throw new IndexOutOfBoundsException(index);
    this.#array.splice(index, 0, element);
  }

  // implements Collection
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

  // implements Collection
  remove(element) {
    for (let i = 0; i != this.#array.length; i++) {
      if (Collection.equals_fn(element, this.#array[i])) {
        this.#array.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  // implements List
  removeAt(index) {
    if ((index < 0) || (index >= this.#array.length))
      throw new IndexOutOfBoundsException(index);
    return this.#array.splice(index, 1)[0];
  }

  // implements List more effectively
  reverse() {
    this.#array.reverse();
  }

  // implements List
  setAt(index, element) {
    if ((index < 0) || (index >= this.#array.length))
      throw new IndexOutOfBoundsException(index);
    this.#array[index] = element;
  }

  // implements Collection
  size() {
    return this.#array.length;
  }

  // implements List more effectively
  sort(compare_fn=Collection.compare_fn) {
    this.#array.sort(compare_fn);
  }
  
  // implements Collection more effectively
  toArray() {
    return this.#array;
  }
}

module.exports = ArrayList;
