'use strict'

const Collection = require(__dirname + '/Collection.js');
const LinkedList = require(__dirname + '/LinkedList.js');
const List = require(__dirname + '/List.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');
const Util = require(__dirname + '/Util.js');

class Stack extends Collection {
  #list;

  constructor(options={}) {
    super(options);
    let list_class = options.list_class ? options.list_class : LinkedList;
    if (!(Util.isSubClassOf(list_class, List)))
      throw new Error('Not a List sub-class: ' + list_class);
    this.#list = new list_class();
  }

  clear() {
    return this.#list.clear();
  }

  clone() {
    return super.clone0('push');
  }

  equals(collection) {
    return super.equals0(collection, Stack);
  }

  next() {
    return this.#list.next();
  }

  // Returns the top element of the stack, or undefined if the stack is empty.
  peek() {
    return this.#list.isEmpty() ? undefined : this.#list.getFirst();
  }

  // Removes the top element of the stack.
  // Returns the removed element.
  // Throws NoSuchElementException if the stack is empty.
  pop() {
    if (this.#list.isEmpty())
      throw new NoSuchElementException()
    return this.#list.removeLast();
  }

  // Pushes the element to the top of the stack.
  // Returns the stack itself.
  push(element) {
    this.#list.addLast(element);
    return this;
  }

  size() {
    return this.#list.size();
  }

  toArray() {
    return this.#list.toArray();
  }
}

module.exports = Stack;
