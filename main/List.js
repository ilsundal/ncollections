'use strict'

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

  equals(collection) {
    if (!(collection instanceof List))
      return false;
    return super.equals(collection);
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

  // reverses the list in place
  reverse() {
    let reversedArray = Array.from(this).reverse();
    this.clear();
    this.addAll(reversedArray);
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

  sort(compare_fn=Collection.compare_fn) {
    let sortedArray = Array.from(this).sort(compare_fn);
    this.clear();
    this.addAll(sortedArray);
  }
}

module.exports = List;
