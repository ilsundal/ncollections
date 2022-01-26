'use strict'

const Collection = require(__dirname + '/Collection.js');
const IndexOutOfBoundsException = require(__dirname + '/IndexOutOfBoundsException.js');
const List = require(__dirname + '/List.js');

class LinkedList extends List {
  #first_node = null;
  #last_node = null;
  #length = 0;

  constructor(options={}) {
    super(options);
  }

  // implements Collection
  add(element) {
    this.#insert(element, this.#length);
    return true;
  }

  // implements List
  addFirst(element) {
    this.#insert(element, 0);
    return true;
  }

  // implements Collection
  clear() {
    this.#first_node = null;
    this.#last_node = null;
    this.#length = 0;
  }

  // implements List
  getAt(index) {
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
      this.#first_node = this.#last_node = { next_node: null, previous_node: null, element: element };
    } else if (index == 0) { // new first
      let new_first_node = { next_node: this.#first_node, previous_node: null, element: element }; 
      this.#first_node.previous_node = new_first_node;
      this.#first_node = new_first_node;
    } else if (index == this.#length) { // new last
      let new_last_node = { next_node: null, previous_node: this.#last_node, element: element }; 
      this.#last_node.next_node = new_last_node;
      this.#last_node = new_last_node;
    } else { // between first and last
      let old_node = this.#getNode(index);
      let new_node = { next_node: old_node, previous_node: old_node.previous_node, element: element };
      old_node.previous_node.next_node = new_node;
      old_node.previous_node = new_node;
    }
    this.#length++;
  }

  // implements List
  insertAt(index, element) {
    if ((index < 0) || (index >= this.#length))
      throw new IndexOutOfBoundsException(index);
    this.#insert(element, index);
  }

  // implements Collection
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

  // implements Collection
  remove(element) {
    for (let current_node = this.#first_node; current_node != null; current_node = current_node.next_node) {
      if (Collection.equals_fn(element, current_node.element)) {
        this.#removeNode(current_node);
        return true;
      }
    }
    return false;
  }

  // implements List
  removeAt(index) {
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

  // implements List
  setAt(index, element) {
    if ((index < 0) || (index >= this.#length))
      throw new IndexOutOfBoundsException(index);
    this.#getNode(index).element = element;
  }

  // implements Collection
  size() {
    return this.#length;
  }
}

module.exports = LinkedList;
