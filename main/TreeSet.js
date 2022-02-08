'use strict'

const Collection = require(__dirname + '/Collection.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');
const SortedSet = require(__dirname + '/SortedSet.js');
const Stack = require(__dirname + '/Stack.js');
const UnsupportedOperationException = require(__dirname + '/UnsupportedOperationException.js');

class TreeSet extends SortedSet {
  #root_node = null;
  #compare_fn;

  constructor(options) {
    super(options);
    this.#compare_fn = options.compare_fn ? options.compare_fn : Collection.compare_fn;
  }

  add(element) {
    if (this.#root_node === null) {
      this.#root_node = new Node(null, null, null, 1, element);
      return true;
    }
    let current_node = this.#root_node;
    while (current_node != null) {
      let compare = this.#compare_fn(element, current_node.element);
      if (compare === 0)
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
      this.#updateSize(current_node, 1);
      return true;
    }
  }

  clear() {
    this.#root_node = null;
  }

  contains(element) {
    let current_node = this.#root_node;
    while (current_node != null) {
      let compare = this.#compare_fn(element, current_node.element);
      if (compare === 0)
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
    while (current_node.less_node != null)
      current_node = current_node.less_node;
    return current_node;
  }

  #lastNode(from_node) {
    if (from_node == null)
      return undefined;
    let current_node = from_node;
    while (current_node.more_node != null)
      current_node = current_node.more_node;
    return current_node;
  }

  next() {
    let node_stack = new Stack();
    // initialize stack with sub-tree from root to first node
    for (let current_node = this.#root_node; current_node != null; current_node = current_node.less_node)
      node_stack.push(current_node);
    return {
      next: function() {
        while (!node_stack.isEmpty()) {
          let node = node_stack.pop();
          if (node.more_node) {
            for (let current_node = node.more_node; current_node != null; current_node = current_node.less_node)
              node_stack.push(current_node);
          }
          return { value: node.element, done: false };
        }
        return { done: true };
      }
    }
  }

  // Returns the first element, or undefined if the set is empty.
  peekFirst() {
    let first_node = this.#firstNode(this.#root_node);
    return first_node ? first_node.element : undefined;
  }

  // Returns the last element, or undefined if the set is empty.
  peekLast() {
    let last_node = this.#lastNode(this.#root_node);
    return last_node ? last_node.element : undefined;
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

/*
      9
   5    10
 3   7     11
2 4   8       13
            12
*/
  #removeNode(node) {
    if (!node.less_node && !node.more_node) { // leaf node
      if (node.parent_node) { // not root node
        if (node.parent_node.less_node === node)
          node.parent_node.less_node = null;
        else if (node.parent_node.more_node === node)
          node.parent_node.more_node = null;
        else
          throw new Error(`weird parent element ${node.parent_node.element}!`);
        this.#updateSize(node.parent_node, -1);
      } else { // root node
        this.root_node = null;
      }
    } else if (node.less_node) {
      let replace_node = this.#lastNode(node.less_node);
      node.element = replace_node.element;
      if (replace_node === node.less_node) { // direct child
        replace_node.parent_node.less_node = replace_node.less_node;
        if (replace_node.less_node)
          replace_node.less_node.parent_node = node;
      } else // non-direct leaf node
        replace_node.parent_node.more_node = null;
      this.#updateSize(replace_node.parent_node, -1);
    } else { // node.more_node
      let replace_node = this.#firstNode(node.more_node);
      node.element = replace_node.element;
      if (replace_node === node.more_node) { // direct child
        replace_node.parent_node.more_node = replace_node.more_node;
        if (replace_node.more_node)
          replace_node.more_node.parent_node = node;
      } else // non-direct leaf node
        replace_node.parent_node.less_node = null;
      this.#updateSize(replace_node.parent_node, -1);
    }
  }

  remove(element) {
    let current_node = this.#root_node;
    while (current_node != null) {
      let compare = this.#compare_fn(element, current_node.element);
      if (compare === 0) {
        this.#removeNode(current_node);
        return true;
      }
      if (compare < 0)
        current_node = current_node.less_node;
      else // compare > 0
        current_node = current_node.more_node;
    }
    return false;
  }

  size() {
    return this.#root_node === null ? 0 : this.#root_node.size;
  }

  // for debug purposes
  debug() {
    return this.#debug0(this.#root_node, 0);
  }
  #debug0(node, level) {
    if (!node)
      return 'null';
    if (node.parent_node && ((node.parent_node.less_node != node) && (node.parent_node.more_node != node)))
      return `{error:'***invalid parent*** e:${node.element},pe:${node.parent_node.element}***'}`;
    return `{e:${node.element},s:${node.size},pe:${node.parent_node ? node.parent_node.element : 'null'},l:${this.#debug0(node.less_node, level + 1)},m:${this.#debug0(node.more_node, level + 1)}}`;
  }

  // updates the size of the nodes from the path from node to root_node with the given change
  #updateSize(node, change) {
    for (let current_node = node; current_node != this.#root_node; current_node = current_node.parent_node)
      current_node.size += change;
    this.#root_node.size += change;
  }
}

class Node {
  parent_node; // the node's parent; only null for root node
  less_node; // null only if node has no lesser nodes
  more_node; // null only if node has no greater ("more") nodes
  size; // number of nodes in the (sub)tree of which this node is the root (equals less_node.size + more_node.size + 1)
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
