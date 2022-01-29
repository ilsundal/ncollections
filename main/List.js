'use strict'

const Collection = require(__dirname + '/Collection.js');
const DefaultCollection = require(__dirname + '/DefaultCollection.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

class List extends DefaultCollection {

  constructor(options={}) {
    super(options);
  }

  // returns the List itself
  add(element) {
    return this.addLast(element);
  }

  // returns the List itself
  addFirst(element) {
    throw new UnsupportedOperationException();
  }

  // returns the List itself
  addLast(element) {
    throw new UnsupportedOperationException();
  }

  // returns the element at index
  // throws IndexOutOfBoundsException if index is not within bounds
  getAt(index) {
    throw new UnsupportedOperationException();
  }

  // returns the first element
  // throws NoSuchElementException if list is empty
  getFirst() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.getAt(0);
  }

  // returns the last element
  // throws NoSuchElementException if list is empty
  getLast() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.getAt(this.size() - 1);
  }

  // returns the List itself
  // throws IndexOutOfBoundsException if index is not within bounds
  insertAt(index, element) {
    throw new UnsupportedOperationException();
  }

  // returns the removed element previous at index
  // throws IndexOutOfBoundsException if index is not within bounds
  removeAt(index) {
    throw new UnsupportedOperationException();
  }

  // returns the previous first element
  // throws NoSuchElementException if list is empty
  removeFirst() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.removeAt(0);
  }

  // returns the previous last element
  // throws NoSuchElementException if list is empty
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

  // returns the previous element at index
  // throws IndexOutOfBoundsException if index is not within bounds
  setAt(index, element) {
    throw new UnsupportedOperationException();
  }

  // returns the previous first element
  // throws NoSuchElementException if list is empty
  setFirst(element) {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.setAt(0, element);
  }

  // returns the previous last element
  // throws NoSuchElementException if list is empty
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
