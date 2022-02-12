'use strict'

const Collection = require(__dirname + '/Collection.js');
const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');
const LinkedList = require(__dirname + '/LinkedList.js');
const List = require(__dirname + '/List.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');
const Util = require(__dirname + '/Util.js');

class Queue extends Collection {

  constructor(options={}) {
    super(options);
  }

  // Removes the front element of the queue.
  // Returns the removed element, or undefined if the queue is empty.
  dequeue() {
    throw new UnsupportedOperationException();
  }

  clone() {
    return super.clone0('enqueue');
  }

  // Adds the element to the end of the queue.
  // Returns the queue itself.
  // Throws IllegalArgumentException if element is undefined.
  enqueue(element) {
    throw new UnsupportedOperationException();
  }

  equals(collection) {
    return super.equals0(collection, Queue);
  }

  // Returns the front element of the queue, or undefined if the queue is empty.
  peek() {
    throw new UnsupportedOperationException();
  }
}

module.exports = Queue;
