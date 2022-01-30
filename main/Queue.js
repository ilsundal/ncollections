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

  // Removes the front element of the queue.
  // Returns the removed element, or undefined if the queue is empty.
  dequeue() {
    return this.#list.isEmpty() ? undefined : this.#list.removeFirst();
  }

  clear() {
    return this.#list.clear();
  }

  clone() {
    return super.clone0('enqueue');
  }

  // Adds the element to the end of the queue.
  // Returns the queue itself.
  enqueue(element) {
    this.#list.addLast(element);
    return this;
  }

  next() {
    return this.#list.next();
  }

  // Returns the front element of the queue, or undefined if the queue is empty.
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
