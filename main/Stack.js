'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');
const List = require(__dirname + '/List.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');
const Util = require(__dirname + '/Util.js');

class Stack extends Collection {
  #list;

  constructor(options={}) {
    super(options);
    let list_class = options.list_class ? options.list_class : ArrayList;
    if (!(Util.isSubClassOf(list_class, List)))
      throw new Error('Not a List sub-class: ' + list_class);
    this.#list = new list_class();
  }

  // implements Collection
  add(element) {
    return this.#list.addLast(element);
  }

  // implements Collection
  clear() {
    return this.#list.clear();
  }

  // implements Collection
  next() {
    return this.#list.next();
  }

  peek() {
    return this.#list.isEmpty() ? undefined : this.#list.getFirst();
  }

  pop() {
    if (this.#list.isEmpty())
      throw new NoSuchElementException()
    return this.#list.removeLast();
  }

  push(element) {
    return this.#list.addLast(element);
  }

  // implements Collection (not supported)
  remove(element) {
    throw new UnsupportedOperationException();
  }

  // implements Collection (not supported)
  removeAll(element) {
    throw new UnsupportedOperationException();
  }

  // implements Collection
  size() {
    return this.#list.size();
  }
}

module.exports = Stack;
