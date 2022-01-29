'use strict'

const Collection = require(__dirname + '/Collection.js');
const DefaultCollection = require(__dirname + '/DefaultCollection.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

class List extends DefaultCollection {

  constructor(options={}) {
    super(options);
  }

  add(element) {
    return this.addLast(element);
  }

  addFirst(element) {
    throw new UnsupportedOperationException();
  }

  addLast(element) {
    throw new UnsupportedOperationException();
  }

  getAt(index) {
    throw new UnsupportedOperationException();
  }

  getFirst() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.getAt(0);
  }

  getLast() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.getAt(this.size() - 1);
  }

  // returns true
  insertAt(index, element) {
    throw new UnsupportedOperationException();
  }

  removeAt(index) {
    throw new UnsupportedOperationException();
  }

  removeFirst() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.removeAt(0);
  }

  removeLast() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.removeAt(this.size() - 1);
  }

  // returns the list itself
  // reverses the list in place
  reverse() {
    let reversedArray = Array.from(this).reverse();
    this.clear();
    this.addAll(reversedArray);
    return this;
  }

  setAt(index, element) {
    throw new UnsupportedOperationException();
  }

  setFirst(element) {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.setAt(0, element);
  }

  setLast(element) {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.setAt(this.size() - 1, element);
  }

  // returns the list itself
  // sorts the list in place
  sort(compare_fn=Collection.compare_fn) {
    let sortedArray = Array.from(this).sort(compare_fn);
    this.clear();
    this.addAll(sortedArray);
    return this;
  }
}

module.exports = List;
