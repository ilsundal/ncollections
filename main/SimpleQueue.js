'use strict'

const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');
const LinkedList = require(__dirname + '/LinkedList.js');
const Queue = require(__dirname + '/Queue.js');

class SimpleQueue extends Queue {
  #list;

  constructor(options={}) {
    super(options);
    this.#list = new LinkedList();
  }

  dequeue() {
    return this.#list.isEmpty() ? undefined : this.#list.removeFirst();
  }

  clear() {
    return this.#list.clear();
  }

  enqueue(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    this.#list.addLast(element);
    return this;
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

module.exports = SimpleQueue;
