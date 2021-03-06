'use strict'

const Collection = require(__dirname + '/Collection.js');
const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');
const IndexOutOfBoundsException = require(__dirname + '/IndexOutOfBoundsException.js');
const List = require(__dirname + '/List.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');

class ArrayList extends List {
  array = [];

  constructor(options={}) {
    super(options);
  }

  addFirst(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    this.array.splice(0, 0, element);
    return this;
  }

  addLast(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    this.array.push(element);
    return this;
  }

  clear() {
    this.array.length = 0;
  }

  getAt(index) {
    if (!Number.isInteger(index))
      throw new IllegalArgumentException('index is not an integer');
    if ((index < 0) || (index >= this.array.length))
      throw new IndexOutOfBoundsException(index);
    return this.array[index];
  }

  insertAt(index, element) {
    if (!Number.isInteger(index))
      throw new IllegalArgumentException('index is not an integer');
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    if ((index < 0) || (index >= this.array.length))
      throw new IndexOutOfBoundsException(index);
    this.array.splice(index, 0, element);
    return this;
  }

  lastIndexOf(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    for (let index = this.array.length - 1; index != -1; index--) {
      if (Collection.equals_fn(element, this.array[index]))
        return index;
    }
    return undefined;
  }

  next() {
    let array = this.array;
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
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    for (let index = 0; index != this.array.length; index++) {
      if (Collection.equals_fn(element, this.array[index])) {
        this.array.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  removeAt(index) {
    if (!Number.isInteger(index))
      throw new IllegalArgumentException('index is not an integer');
    if ((index < 0) || (index >= this.array.length))
      throw new IndexOutOfBoundsException(index);
    return this.array.splice(index, 1)[0];
  }

  reverse() {
    this.array.reverse();
    return this;
  }

  setAt(index, element) {
    if (!Number.isInteger(index))
      throw new IllegalArgumentException('index is not an integer');
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    if ((index < 0) || (index >= this.array.length))
      throw new IndexOutOfBoundsException(index);
    this.array[index] = element;
  }

  size() {
    return this.array.length;
  }

  sort(compare_fn=Collection.compare_fn) {
    this.array.sort(compare_fn);
    return this;
  }
  
  toArray() {
    return this.array;
  }
}

module.exports = ArrayList;
