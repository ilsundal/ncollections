'use strict'

const Collection = require(__dirname + '/Collection.js');
const DefaultCollection = require(__dirname + '/DefaultCollection.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

class List extends DefaultCollection {

  constructor(options={}) {
    super(options);
  }

  // Adds the element to the end of the list.
  // Returns the List itself.
  add(element) {
    return this.addLast(element);
  }

  // Adds the element so it becomes the first element of the list.
  // Returns the List itself.
  addFirst(element) {
    throw new UnsupportedOperationException();
  }

  // Adds the element so it becomes the last element of the list.
  // Returns the List itself.
  addLast(element) {
    throw new UnsupportedOperationException();
  }

  // Returns the element at index.
  // Throws IndexOutOfBoundsException if index is not within bounds.
  getAt(index) {
    throw new UnsupportedOperationException();
  }

  // Returns the first element.
  // Throws NoSuchElementException if list is empty.
  getFirst() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.getAt(0);
  }

  // Returns the last element.
  // Throws NoSuchElementException if list is empty.
  getLast() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.getAt(this.size() - 1);
  }

  // Returns the List itself.
  // Throws IndexOutOfBoundsException if index is not within bounds.
  insertAt(index, element) {
    throw new UnsupportedOperationException();
  }

  // Returns the removed element previous at index.
  // Throws IndexOutOfBoundsException if index is not within bounds.
  removeAt(index) {
    throw new UnsupportedOperationException();
  }

  // Returns the previous first element.
  // Throws NoSuchElementException if list is empty.
  removeFirst() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.removeAt(0);
  }

  // Returns the previous last element.
  // Throws NoSuchElementException if list is empty.
  removeLast() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.removeAt(this.size() - 1);
  }

  // Reverses the list in place.
  // Returns the list itself.
  reverse() {
    let reversedArray = Array.from(this).reverse();
    this.clear();
    this.addAll(reversedArray);
    return this;
  }

  // Returns the previous element at index.
  // Throws IndexOutOfBoundsException if index is not within bounds.
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

  // Returns the previous last element.
  // Throws NoSuchElementException if list is empty.
  setLast(element) {
    if (this.isEmpty())
      throw new NoSuchElementException();
    return this.setAt(this.size() - 1, element);
  }

  // Sorts the list in place.
  // Returns the list itself.
  sort(compare_fn=Collection.compare_fn) {
    let sortedArray = Array.from(this).sort(compare_fn);
    this.clear();
    this.addAll(sortedArray);
    return this;
  }
}

module.exports = List;
