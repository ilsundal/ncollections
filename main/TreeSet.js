'use strict'

const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');
const SortedSet = require(__dirname + '/Set.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

class TreeSet extends SortedSet {
  #root_node = null;
  #compare_fn;

  constructor(options) {
    super(options);
    this.#compare_fn = options.compare_fn ? options.compare_fn : Collection.compare_fn;
  }

  add(element) {
    if (this.#root_node == null)
      this.#root_node = new Node(null, null, null, 1, element);
    let current_node = this.#root_node;
    while (current_node != null) {
      let compare = this.#compare_fn(element, this.#root_node.element);
      if (compare == 0)
        return false; // element already exists
      if (compare < 0) {
        if (current_node.less_node) {
          current_node = current_node.less_node;
          continue;
        } else {
          current_node.less_node = new Node(current_node, null, null, 1, element);
        }
      } else if (compare > 0) {
        if (current_node.more_node) {
          current_node = current_node.more_node;
          continue;
        } else {
          current_node.more_node = new Node(current_node, null, null, 1, element);
        }
      }
      this.#updateSize(current_node, this.#root_node, 1);
      return true;
    }
  }

  contains(element) {
    let current_node = this.#root_node;
    while (current_node != null) {
      let compare = this.#compare_fn(element, this.#root_node.element);
      if (compare == 0)
        return true;
      if (compare < 0)
        current_node = current_node.less_node;
      else // compare > 0
        current_node = current_node.more_node;
    }
    return false;
  }

  #firstNode(from_node) {
    if (from_node == null)
      return undefined;
    let current_node = from_node;
    while (current_node.left_node != null)
      current_node = current_node.left_node;
    return current_node;
  }

  #lastNode(from_node) {
    if (from_node == null)
      return undefined;
    let current_node = from_node;
    while (current_node.left_node != null)
      current_node = current_node.left_node;
    return current_node;
  }

  next() {
    throw new UnsupportedOperationException();
  }

  // Returns the first element, or undefined if the set is empty.
  peekFirst() {
    let first_node = this.#firstNode(this.#root_node);
    return first_node ? first_node.element : undefined;
  }

  // Returns the last element, or undefined if the set is empty.
  peekLast() {
    let last_node = this.#lastNode(this.#root_node);
    return first_node ? first_node.element : undefined;
  }

  // Removes the first element.
  // Returns the removed element, or undefined if the set is empty.
  pollFirst() {
    let first_node = this.#firstNode();
    return first_node ? this.#removeNode(first_node).element : undefined;
  }

  // Removes the last element.
  // Returns the removed element, or undefined if the set is empty.
  pollLast() {
    let last_node = this.#lastNode();
    return last_node ? this.#removeNode(last_node).element : undefined;
  }

  #removeNode(node) {
    if (current_node == this.#root_node) { // if root_node
      this.#root_node = null;
      return;
    }

    // find replacing_node:
    //  (a) if current_node.less_node != null then find last node on less_node subtree, or
    //  (b) if current_node.more_node != null then find first node on more_node subtree, or
    //  (c) if both current_node.less_node == null and current_node.more_node == null then just remove current_node
    //
    // 
    //
    // decrement parent node sizes by 1
/*
     9
   5   ...
 3   7
2 4 6 8
*/
  }

  remove(element) {
    let current_node = this.#root_node;
    while (current_node != null) {
      let compare = this.#compare_fn(element, this.#root_node.element);
      if (compare == 0) {
        this.#removeNode(current_node);
        return true;
      }
      else if (compare < 0)
        current_node = current_node.less_node;
      else // compare > 0
        current_node = current_node.more_node;
    }
    return false;
  }

  size() {
    return this.#root_node == null ? 0 : this.#root_node.size;
  }

  // updates the size of the nodes from the path from child_node to ancestor_node with the given change
  #updateSize(child_node, ancestor_node, change) {
    for ( ; child_node != ancestor_node.parent_node; child_node = child_node.parent_node)
      current_node.size += change;
  }
}

class Node {
  parent_node; // the node's parent; only null for root node
  less_node; // null only if node has no lesser nodes
  more_node; // null only if node has no greater ("more") nodes
  size; // size of the (sub)tree below this node, including the node itself (equals less_node.size + more_node.size + 1)
  element;

  constructor(parent_node, less_node, more_node, size, element) {
    this.parent_node = parent_node;
    this.less_node = less_node;
    this.more_node = more_node;
    this.size = size;
    this.element = element;
  }
}

module.exports = TreeSet;
