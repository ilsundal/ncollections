'use strict'

const Collection = require(__dirname + '/Collection.js');
const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');
const LinkedList = require(__dirname + '/LinkedList.js');
const List = require(__dirname + '/List.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');
const Util = require(__dirname + '/Util.js');

class Deque extends Collection {
  #list;

  constructor(options={}) {
    super(options);
    let list_class = options.list_class ? options.list_class : LinkedList;
    if (!(Util.isSubClassOf(list_class, List)))
      throw new Error('Not a List sub-class: ' + list_class);
    this.#list = new list_class();
  }

  // Adds the element so it becomes the first element of the deque.
  // Returns the deque itself.
  // Throws IllegalArgumentException if element is undefined.
  addFirst(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    this.#list.addFirst(element);
    return this;
  }

  // Adds the element so it becomes the last element of the deque.
  // Returns the deque itself.
  // Throws IllegalArgumentException if element is undefined.
  addLast(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    this.#list.addLast(element);
    return this;
  }

  clear() {
    return this.#list.clear();
  }

  clone() {
    return super.clone0('addLast');
  }

  equals(collection) {
    return super.equals0(collection, Deque);
  }

  next() {
    return this.#list.next();
  }

  // Returns the first element, or undefined if the deque is empty.
  peekFirst() {
    return this.#list.isEmpty() ? undefined : this.#list.getFirst();
  }

  // Returns the last element, or undefined if the deque is empty.
  peekLast() {
    return this.#list.isEmpty() ? undefined : this.#list.getLast();
  }

  // Removes the first element.
  // Returns the removed element, or undefined if the deque is empty.
  pollFirst() {
    return this.#list.isEmpty() ? undefined : this.#list.removeFirst();
  }

  // Removes the last element.
  // Returns the removed element, or undefined if the deque is empty.
  pollLast() {
    return this.#list.isEmpty() ? undefined : this.#list.removeLast();
  }

  size() {
    return this.#list.size();
  }
}

module.exports = Deque;
