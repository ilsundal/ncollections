'use strict'

const Collection = require(__dirname + '/Collection.js');
const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');
const SortedMap = require(__dirname + '/SortedMap.js');
const Stack = require(__dirname + '/Stack.js');

const RedBlackBST = require(__dirname + '/ds/RedBlackBST.js');

// based on https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html
// as referenced on https://algs4.cs.princeton.edu/33balanced/

class TreeMap extends SortedMap {

  rbbst;

  constructor(options={}) {
    super(options);
    let compare_fn = options.compare_fn || Collection.compare_fn;
    this.rbbst = new RedBlackBST(compare_fn);
  }

  clear() {
    this.rbbst.root = null;
  }

  containsKey(key) {
    if (key === undefined)
      throw new IllegalArgumentException('key is undefined');
    return this.rbbst.contains(key);
  }

  containsValue(value) {
    if (value === undefined)
      throw new IllegalArgumentException('value is undefined');
    return super.containsValue0(value);
  }

  get(key) {
    if (key === undefined)
      throw new IllegalArgumentException('key is undefined');
    return this.rbbst.get(key);
  }

  getFirst() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    let min_node = this.rbbst.min();
    return { key: min_node.key, value: min_node.val };
  }

  getLast() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    let max_node = this.rbbst.max();
    return { key: max_node.key, value: max_node.val };
  }

  next() {
    let node_stack = new Stack();
    for (let node = this.rbbst.root; node != null; node = node.left)
      node_stack.push(node);
    return {
      next: function() {
        while (!node_stack.isEmpty()) {
          let next_node = node_stack.pop();
          if (next_node.right) {
            for (let node = next_node.right; node != null; node = node.left)
              node_stack.push(node);
          }
          return { value: { key: next_node.key, value: next_node.val }, done: false };
        }
        return { done: true };
      }
    }
  }

  put(key, value) {
    if (key === undefined)
      throw new IllegalArgumentException('key is undefined');
    if (value === undefined)
      throw new IllegalArgumentException('value is undefined');
    return this.rbbst.put(key, value);
  }

  remove(key) {
    if (key === undefined)
      throw new IllegalArgumentException('key is undefined');
    return this.rbbst.delete(key);
  }

  removeFirst() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    let min_node = this.rbbst.deleteMin();
    return { key: min_node.key, value: min_node.val };
  }

  removeLast() {
    if (this.isEmpty())
      throw new NoSuchElementException();
    let max_node = this.rbbst.deleteMax();
    return { key: max_node.key, value: max_node.val };
  }

  size() {
    return this.rbbst.size();
  }
}

module.exports = TreeMap;
