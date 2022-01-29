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

  clear() {
    return this.#list.clear();
  }

  clone() {
    return super.clone0('push');
  }

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

  size() {
    return this.#list.size();
  }

  toArray() {
    return this.#list.toArray();
  }
}

module.exports = Stack;
