'use strict'

const Collection = require(__dirname + '/Collection.js');
const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');
const IndexOutOfBoundsException = require(__dirname + '/IndexOutOfBoundsException.js');
const List = require(__dirname + '/List.js');

class LinkedList extends List {
  #first_node = null;
  #last_node = null;
  #length = 0;

  constructor(options={}) {
    super(options);
  }

  addFirst(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    this.#insert(element, 0);
    return this;
  }

  addLast(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    this.#insert(element, this.#length);
    return this;
  }

  clear() {
    this.#first_node = null;
    this.#last_node = null;
    this.#length = 0;
  }

  getAt(index) {
    if (!Number.isInteger(index))
      throw new IllegalArgumentException('index is not an integer');
    if ((index < 0) || (index >= this.#length))
      throw new IndexOutOfBoundsException(index);
    return this.#getNode(index).element;
  }

  #getNode(index) {
    if ((index < 0) || (index >= this.#length))
      throw new IndexOutOfBoundsException(index);
    if (index == 0)
      return this.#first_node;
    if (index == (this.#length - 1))
      return this.#last_node;
    if (index < (this.#length / 2)) { // search forward from first
      let count = index;
      let current_node = this.#first_node;
      while (count--)
        current_node = current_node.next_node;
      return current_node;
    } else { // search backward from last
      let count = this.#length - index - 1;
      let current_node = this.#last_node;
      while (count--)
        current_node = current_node.last_node;
      return current_node;
    }
  }

  #insert(element, index) {
    if (this.#length == 0) { // new first/last
      this.#first_node = this.#last_node = new Node(null, null, element);
    } else if (index == 0) { // new first
      let new_first_node = new Node(this.#first_node, null, element); 
      this.#first_node.previous_node = new_first_node;
      this.#first_node = new_first_node;
    } else if (index == this.#length) { // new last
      let new_last_node = new Node(null, this.#last_node, element); 
      this.#last_node.next_node = new_last_node;
      this.#last_node = new_last_node;
    } else { // between first and last
      let old_node = this.#getNode(index);
      let new_node = new Node(old_node, old_node.previous_node, element);
      old_node.previous_node.next_node = new_node;
      old_node.previous_node = new_node;
    }
    this.#length++;
  }

  insertAt(index, element) {
    if (!Number.isInteger(index))
      throw new IllegalArgumentException('index is not an integer');
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    if ((index < 0) || (index >= this.#length))
      throw new IndexOutOfBoundsException(index);
    this.#insert(element, index);
    return this;
  }

  lastIndexOf(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    let index = this.#length - 1;
    for (let current_node = this.#last_node; current_node != null; current_node = current_node.previous_node) {
      if (Collection.equals_fn(element, current_node.element))
        return index;
      index--;
    }
    return undefined;
  }

  next() {
    let next_node = this.#first_node;
    return {
      next: function() {
        if (next_node == null)
          return { done: true };
        let result = { value: next_node.element, done: false };
        next_node = next_node.next_node;
        return result;
      }
    }
  }

  remove(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    for (let current_node = this.#first_node; current_node != null; current_node = current_node.next_node) {
      if (Collection.equals_fn(element, current_node.element)) {
        this.#removeNode(current_node);
        return true;
      }
    }
    return false;
  }

  removeAt(index) {
    if (!Number.isInteger(index))
      throw new IllegalArgumentException('index is not an integer');
    if ((index < 0) || (index >= this.#length))
      throw new IndexOutOfBoundsException(index);
    return this.#removeNode(this.#getNode(index)).element;
  }

  #removeNode(node) {
    if ((node == this.#first_node) && (node == this.#last_node)) {
      this.#first_node = this.#last_node = null;
    } else if (node == this.#first_node) {
      this.#first_node = this.#first_node.next_node;
      this.#first_node.previous_node = null;
    } else if (node == this.#last_node) {
      this.#last_node = this.#last_node.previous_node;
      this.#last_node.next_node = null;
    } else {
      node.previous_node.next_node = node.next_node;
      node.next_node.previous_node = node.previous_node;
    }
    this.#length--;
    return node;
  }

  setAt(index, element) {
    if (!Number.isInteger(index))
      throw new IllegalArgumentException('index is not an integer');
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    if ((index < 0) || (index >= this.#length))
      throw new IndexOutOfBoundsException(index);
    this.#getNode(index).element = element;
  }

  size() {
    return this.#length;
  }
}

class Node {
  next_node; // null only for first node
  previous_node; // null only for last node
  element;

  constructor(next_node, previous_node, element) {
    this.next_node = next_node;
    this.previous_node = previous_node;
    this.element = element;
  }
}

module.exports = LinkedList;
