'use strict'

const Collection = require(__dirname + '/Collection.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

class List extends Collection {

  constructor(options={}) {
    super(options);
  }

  // Adds the element to the end of the list.
  // Returns the list itself.
  add(element) {
    return this.addLast(element);
  }

  // Adds the elements to the end of the list.
  // Returns the list itself.
  addAll(elements) {
    let changed = false;
    for (let element of elements)
      changed = this.add(element) || changed;
    return changed;
  }

  // Adds the element so it becomes the first element of the list.
  // Returns the list itself.
  addFirst(element) {
    throw new UnsupportedOperationException();
  }

  // Adds the element so it becomes the last element of the list.
  // Returns the list itself.
  addLast(element) {
    throw new UnsupportedOperationException();
  }

  clone() {
    return super.clone0();
  }

  // Returns true if list contains the element, and false otherwise.
  contains(element) {
    for (let thisElement of this) {
      if (Collection.equals_fn(element, thisElement))
        return true;
    }
    return false;
  }

  // Returns true if list contains all the elements, and false otherwise.
  containsAll(elements) {
    for (let element of elements) {
      if (!this.contains(element))
        return false;
    }
    return true;
  }

  equals(collection) {
    return super.equals0(collection, List);
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

  // Returns the index of the first occurrence of the element in the list, or undefined if not in the list.
  // Implementation note: The default implementation iterates the list, stopping at the first occurrence.
  indexOf(element) {
    let index = 0;
    for (let list_element of this) {
      if (Collection.equals_fn(list_element, element))
        return index;
      index++;
    }
    return undefined;
  }

  // Inserts the element at the index.
  // Returns the list itself.
  // Throws IndexOutOfBoundsException if index is not within bounds.
  insertAt(index, element) {
    throw new UnsupportedOperationException();
  }

  // Returns the index of the last occurrence of the element in the list, or undefined if not in the list.
  // Implementation note: The default implementation iterates the entire list, returning the last occurrence. A sub-class might do this more effectively by searching backends from the end of the list.
  lastIndexOf(element) {
    let index = 0;
    let last_index = undefined;
    for (let list_element of this) {
      if (Collection.equals_fn(list_element, element))
        last_index = index;
      index++;
    }
    return last_index;
  }

  // Removes the element from the list. If the list contains multiple instances of the element then only the first instance will be removed.
  // Returns true if the element was removed, and false otherwise.
  remove(element) {
    throw new UnsupportedOperationException();
  }

  // Removes all the elements from the list. If the list contains multiple instances of any of the elements then only the first such instance will be removed for each element.
  // Returns true if any element was removed, and false otherwise.
  removeAll(elements) {
    let removed = false;
    for (let element of elements)
      removed = this.remove(element) || removed;
    return removed;
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
  // throws NoSuchElementException if list is empty.
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
