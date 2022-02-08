'use strict'

const Collection = require(__dirname + '/Collection.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');
const SortedMap = require(__dirname + '/SortedMap.js');
const Stack = require(__dirname + '/Stack.js');

// based on https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html
// as referenced on https://algs4.cs.princeton.edu/33balanced/

// RedBlackBST
class TreeMap extends SortedMap {

  static #RED   = true;
  static #BLACK = false;

  #root = null;
  #compare_fn;

  constructor(options={}) {
    super(options);
    this.#compare_fn = options.compare_fn ? options.compare_fn : Collection.compare_fn;
  }

  // --------------------------------------------------------------------------
  // Node helper methods
  // --------------------------------------------------------------------------

  // Returns true if node is not null and red, and false otherwise.
  #isRed(node) {
    return (node != null) && (node.color === TreeMap.#RED);
  }

  // Returns the number nodes in the subtree rooted at node, or 0 if node is null.
  #size0(node) {
    return node != null ? node.size : 0;
  } 

  // --------------------------------------------------------------------------
  // Standard BST search methods
  // --------------------------------------------------------------------------

  // Returns the value associated with the key.
  #get(key) {
    return this.#get0(this.#root, key);
  }

  // Returns the value associated with the key in subtree rooted at node, or undefined if no such key.
  #get0(node, key) {
    while (node != null) {
      let cmp = this.#compare_fn(key, node.key);
      if      (cmp < 0) node = node.left;
      else if (cmp > 0) node = node.right;
      else              return node.val;
    }
    return undefined;
  }

  // Returns true if the tree contains the key, and false if not.
  #contains(key) {
    return this.get(key) != undefined;
  }

  // --------------------------------------------------------------------------
  // Red-black tree insertion methods
  // --------------------------------------------------------------------------

  // Inserts (or replaces) the value at key.
  #put(key, val) {
    this.#root = this.#put0(this.#root, key, val);
    this.#root.color = TreeMap.#BLACK;
  }

  // Inserts (or replaces) the value at key in subtree rooted at node.
  #put0(node, key, val) { 
    if (node == null) return new Node(key, val, TreeMap.#RED, 1);

    let cmp = this.#compare_fn(key, node.key);
    if      (cmp < 0) node.left  = this.#put0(node.left,  key, val); 
    else if (cmp > 0) node.right = this.#put0(node.right, key, val); 
    else              node.val   = val;

    // fix-up any right-leaning links
    if (this.#isRed(node.right) && !this.#isRed(node.left))      node = this.#rotateLeft(node);
    if (this.#isRed(node.left)  &&  this.#isRed(node.left.left)) node = this.#rotateRight(node);
    if (this.#isRed(node.left)  &&  this.#isRed(node.right))     this.#flipColors(node);
    node.size = this.#size0(node.left) + this.#size0(node.right) + 1;

    return node;
  }

  // --------------------------------------------------------------------------
  // Red-black tree deletion methods
  // --------------------------------------------------------------------------

  // Deletes the key-value pair with the smallest key.
  #deleteMin() {
    if (this.#root == null) throw new NoSuchElementException();

    // if both children of root are black, set root to red
    if (!this.#isRed(this.#root.left) && !this.#isRed(this.#root.right))
      this.#root.color = TreeMap.#RED;

    this.#root = this.#deleteMin0(this.#root);
    if (this.#root != null) this.#root.color = TreeMap.#BLACK;
  }

  // Deletes the key-value pair with the smallest key in the subtree rooted at node.
  #deleteMin0(node) { 
    if (node.left == null) return null;

    if (!this.#isRed(h.left) && !this.#isRed(h.left.left))
      node = this.#moveRedLeft(node);

    node.left = this.#deleteMin0(node.left);
    return this.#balance(node);
  }

  // Deletes the key-value pair with the largest key.
  #deleteMax() {
    if (this.#root == null) throw new NoSuchElementException();

    // if both children of root are black, set root to red
    if (!this.#isRed(this.#root.left) && !this.#isRed(this.#root.right))
      this.#root.color = TreeMap.#RED;

    this.#root = this.#deleteMax0(this.#root);
    if (this.#root != null) this.#root.color = TreeMap.#BLACK;
  }

  // Deletes the key-value pair with the largest key in the subtree rooted at node.
  #deleteMax0(node) { 
    if (this.#isRed(node.left))
        node = this.#rotateRight(node);

    if (node.right == null)
        return null;

    if (!this.#isRed(node.right) && !this.#isRed(node.right.left))
        node = moveRedRight(node);

    node.right = this.#deleteMax0(node.right);

    return this.#balance(node);
  }

  // Deletes the key-value with the key.
  #delete(key) { 
    if (!this.#contains(key)) return;

    // if both children of root are black, set root to red
    if (!this.#isRed(this.#root.left) && !this.#isRed(this.#root.right))
        this.#root.color = TreeMap.#RED;

    this.#root = this.#delete0(this.#root, key);
    if (this.#root != null) this.#root.color = TreeMap.#BLACK;
  }

  // Deletes the key-value with the key in the subtree rooted by node.
  #delete0(node, key) { 
    let cmp = this.#compare_fn(key, node.key);
  
    if (cmp < 0)  {
      if (!this.#isRed(node.left) && !this.#isRed(node.left.left))
        node = this.#moveRedLeft(node);
      node.left = this.#delete0(node.left, key);
    }
    else {
      if (this.#isRed(node.left))
        node = this.#rotateRight(node);
      if ((cmp == 0) && (node.right == null))
        return null;
      if (!this.#isRed(node.right) && !this.#isRed(node.right.left))
        node = this.#moveRedRight(node);
      if (cmp == 0) {
        let node_right_min = this.#min0(node.right);
        node.key = node_right_min.key;
        node.val = node_right_min.val;
        // h.val = get(h.right, min(h.right).key);
        // h.key = min(h.right).key;
        node.right = this.#deleteMin0(node.right);
      }
      else node.right = this.#delete0(node.right, key);
    }
    return this.#balance(node);
  }

  // --------------------------------------------------------------------------
  // Red-black tree helper methods
  // --------------------------------------------------------------------------

  // Makes a left-leaning subtree rooted at node lean to the right.
  #rotateRight(node) {
    let node_left = node.left;
    node.left = node_left.right;
    node_left.right = node;
    node_left.color = node_left.right.color;
    node_left.right.color = TreeMap.#RED;
    node_left.size = node.size;
    node.size = this.#size0(node.left) + this.#size0(node.right) + 1;
    return node_left;
  }

  // Makes a right-leaning subtree rooted at node lean to the left.
  #rotateLeft(node) {
    let node_right = node.right;
    node.right = node_right.left;
    node_right.left = node;
    node_right.color = node_right.left.color;
    node_right.left.color = TreeMap.#RED;
    node_right.size = node.size;
    node.size = this.#size0(node.left) + this.#size0(node.right) + 1;
    return node_right;
  }

  // Flips the colors of the node and its two children.
  #flipColors(node) {
    node.color = !node.color;
    node.left.color = !node.left.color;
    node.right.color = !node.right.color;
  }

  // Assuming that h is red and both h.left and h.left.left are black, make h.left or one of its children red.
  #moveRedLeft(node) {
    this.#flipColors(node);
    if (this.#isRed(node.right.left)) { 
      node.right = this.#rotateRight(node.right);
      node = this.#rotateLeft(node);
      this.#flipColors(node);
    }
    return node;
  }

  // Assuming that h is red and both h.right and h.right.left are black, make h.right or one of its children red.
  #moveRedRight(node) {
    this.#flipColors(node);
    if (this.#isRed(node.left.left)) { 
      node = this.#rotateRight(node);
      this.#flipColors(node);
    }
    return node;
  }

  // restore red-black tree invariant
  #balance(node) {
    if (this.#isRed(node.right) && !this.#isRed(node.left))    node = this.#rotateLeft(node);
    if (this.#isRed(node.left) && this.#isRed(node.left.left)) node = this.#rotateRight(node);
    if (this.#isRed(node.left) && this.#isRed(node.right))     this.#flipColors(node);

    node.size = this.#size0(node.left) + this.#size0(node.right) + 1;
    return node;
  }

  // --------------------------------------------------------------------------
  // Ordered symbol table methods
  // --------------------------------------------------------------------------

  // Returns the smallest key.
  // throws NoSuchElementException if the tree is empty.
  #min() {
    if (this.#root == null) throw new NoSuchElementException();
    return this.#min0(this.#root).key;
  } 

  // Returns the smallest key in the subtree rooted at node.
  #min0(node) { 
    if (node.left == null) return node; 
    else                   return min(node.left); 
  } 

  // Returns the smallest key.
  // throws NoSuchElementException if the tree is empty.
  #max() {
    if (this.#root == null) throw new NoSuchElementException();
    return this.#max0(this.#root).key;
  } 

  // Returns the largest key in the subtree rooted at node.
  #max0(node) { 
    if (node.right == null) return node; 
    else                    return this.#max0(node.right); 
  } 

  // --------------------------------------------------------------------------
  // Collection methods
  // --------------------------------------------------------------------------

  clear() {
    this.#root = null;
  }

  containsKey(key) {
    return this.#contains(key);
  }

  containsValue(value) {
    return super.containsValue0(value);
  }

  get(key) {
    return this.#get(key);
  }

  next() {
    let node_stack = new Stack();
    // initialize stack with sub-tree from root to first node
    for (let node = this.#root; node != null; node = node.left)
      node_stack.push(node);
    return {
      next: function() {
        while (!node_stack.isEmpty()) {
          let next_node = node_stack.pop();
          if (next_node.more_node) {
            for (let node = next_node.more_node; node != null; node = node.left)
              node_stack.push(node);
          }
          return { value: { key: next_node.key, value: next_node.val }, done: false };
        }
        return { done: true };
      }
    }
  }

  put(key, val) {
    this.#put(key, val);
  }

  remove(key) {
    return this.#delete(key);
  }

  // Returns the number of nodes in the tree.
  size() {
    return this.#root == null ? 0 : this.#root.size;
  }
}

class Node {
  key;   // key
  val;   // associated data
  left;  // link to left (less) subtree
  right; // links to right (more) subtree
  color; // color of parent link
  size;  // subtree count

  constructor(key, val, color, size) {
    this.key = key;
    this.val = val;
    this.color = color;
    this.size = size;
  }
}

module.exports = TreeMap;
