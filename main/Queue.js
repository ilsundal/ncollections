'use strict'

const Collection = require(__dirname + '/Collection.js');
const LinkedList = require(__dirname + '/LinkedList.js');
const List = require(__dirname + '/List.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');
const Util = require(__dirname + '/Util.js');

class Queue extends Collection {
  #list;

  constructor(options={}) {
    super(options);
    let list_class = options.list_class ? options.list_class : LinkedList;
    if (!(Util.isSubClassOf(list_class, List)))
      throw new Error('Not a List sub-class: ' + list_class);
    this.#list = new list_class();
  }

  get list() { return this.#list; }

  dequeue() {
    return this.#list.isEmpty() ? undefined : this.#list.removeFirst();
  }

  clear() {
    return this.#list.clear();
  }

  clone() {
    let clone = new this.constructor(this.options);
    for (let element of this)
      clone.enqueue(element);
    return clone;
  }

  enqueue(element) {
    return this.#list.addLast(element);
  }

  equals(collection) {
    return super.equals0(collection, Queue);
  }

  next() {
    return this.#list.next();
  }

  peek() {
    return this.#list.isEmpty() ? undefined : this.#list.getFirst();
  }

  size() {
    return this.#list.size();
  }

  toArray() {
    return this.#list.toArray();
  }
}

module.exports = Queue;
