'use strict'

const Collection = require(__dirname + '/Collection.js');
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

  // implements Collection
  add(element) {
    return this.#list.addLast(element);
  }

  addFirst(element) {
    return this.#list.addFirst(element);
  }

  addLast(element) {
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
  
  peekFirst() {
    return this.#list.isEmpty() ? undefined : this.#list.getFirst();
  }

  peekLast() {
    return this.#list.isEmpty() ? undefined : this.#list.getLast();
  }

  pollFirst() {
    return this.#list.isEmpty() ? undefined : this.#list.removeFirst();
  }

  pollLast() {
    return this.#list.isEmpty() ? undefined : this.#list.removeLast();
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

module.exports = Deque;
