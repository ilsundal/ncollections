'use strict'

// based on https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html
// as referenced on https://algs4.cs.princeton.edu/33balanced/

class Node {
  key;   // key
  val;   // associated data
  left;  // link to left subtree
  right; // link to right subtree
  color; // color of parent link
  size;  // subtree count

  constructor(key, val, color, size) {
    this.key = key;
    this.val = val;
    this.color = color;
    this.size = size;
  }
}

class RedBlackBST {

  static RED   = true;
  static BLACK = false;

  root; // root of the BST
  compare_fn;

  constructor(compare_fn) {
    this.compare_fn = compare_fn;
  }

  balance(h) {
    if (this.isRed(h.right) && !this.isRed(h.left))    h = this.rotateLeft(h);
    if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h);
    if (this.isRed(h.left) && this.isRed(h.right))     this.flipColors(h);
    h.size = this.size0(h.left) + this.size0(h.right) + 1;
    return h;
  }

  contains(key) {
    if (key === undefined) throw new Error("key is undefined");
    return this.get(key) !== undefined;
  }

  delete(key) { 
    if (key === undefined) throw new Error("key is undefined");
    let old_value = this.get(key);
    if (old_value === undefined)
      return undefined;
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = RedBlackBST.RED;
    this.root = this.delete0(this.root, key);
    if (!this.isEmpty()) this.root.color = RedBlackBST.BLACK;
    return old_value;
  }

  delete0(h, key) {
    let cmp =  this.compare_fn(key, h.key);
    if (this.compare_fn(key, h.key) < 0)  {
      if (!this.isRed(h.left) && !this.isRed(h.left.left))
        h = this.moveRedLeft(h);
      h.left = this.delete0(h.left, key);
    } else {
      if (this.isRed(h.left))
        h = this.rotateRight(h);
      if (this.compare_fn(key, h.key) == 0 && (h.right == null))
        return null;
      if (!this.isRed(h.right) && !this.isRed(h.right.left))
        h = this.moveRedRight(h);
      if (this.compare_fn(key, h.key) == 0) {
        let x = this.min0(h.right);
        h.key = x.key;
        h.val = x.val;
        h.right = this.deleteMin0(h.right);
      }
      else h.right = this.delete0(h.right, key);
    }
    return this.balance(h);
  }

  deleteMin() {
    if (this.isEmpty()) throw new Error("empty");
    let min_node = this.min();
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = RedBlackBST.RED;
    this.root = this.deleteMin0(this.root);
    if (!this.isEmpty()) this.root.color = RedBlackBST.BLACK;
    return min_node;
  }

  deleteMin0(h) { 
    if (h.left == null)
      return null;
    if (!this.isRed(h.left) && !this.isRed(h.left.left))
      h = this.moveRedLeft(h);
    h.left = this.deleteMin0(h.left);
    return this.balance(h);
  }

  deleteMax() {
    if (this.isEmpty()) throw new Error("empty");
    let max_node = this.max();
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = RedBlackBST.RED;
    this.root = this.deleteMax0(this.root);
    if (!this.isEmpty()) this.root.color = RedBlackBST.BLACK;
    return max_node;
  }

  deleteMax0(h) { 
    if (this.isRed(h.left))
      h = this.rotateRight(h);
    if (h.right == null)
      return null;
    if (!this.isRed(h.right) && !this.isRed(h.right.left))
      h = this.moveRedRight(h);
    h.right = this.deleteMax0(h.right);
    return this.balance(h);
  }

  flipColors(h) {
    h.color = !h.color;
    h.left.color = !h.left.color;
    h.right.color = !h.right.color;
  }

  get(key) {
    if (key === undefined) throw new Error("key is undefined");
    return this.get0(this.root, key);
  }

  get0(x, key) {
    while (x != null) {
      let cmp = this.compare_fn(key, x.key);
      if      (cmp < 0) x = x.left;
      else if (cmp > 0) x = x.right;
      else              return x.val;
    }
    return undefined;
  }

  isEmpty() {
      return this.root == null;
  }

  isRed(x) {
    return (x == null) ? false : x.color == RedBlackBST.RED;
  }

  max() {
    if (this.isEmpty()) throw new Error("empty");
    return this.max0(this.root);
  } 

  max0(x) { 
    return (x.right == null) ? x : this.max0(x.right);
  } 

  min() {
    if (this.isEmpty()) throw new Error("empty");
    return this.min0(this.root);
  }

  min0(x) { 
    return(x.left == null) ? x : this.min0(x.left); 
  } 

  moveRedLeft(h) {
    this.flipColors(h);
    if (this.isRed(h.right.left)) { 
      h.right = this.rotateRight(h.right);
      h = this.rotateLeft(h);
      this.flipColors(h);
    }
    return h;
  }

  moveRedRight(h) {
    this.flipColors(h);
    if (this.isRed(h.left.left)) { 
      h = this.rotateRight(h);
      this.flipColors(h);
    }
    return h;
  }

  put(key, val) {
    if (key === undefined) throw new Error("key is undefined");
    let old_value = this.get(key);
    this.root = this.put0(this.root, key, val);
    this.root.color = RedBlackBST.BLACK;
    return old_value;
  }

  put0(h, key, val) { 
    if (h == null) return new Node(key, val, RedBlackBST.RED, 1);
    let cmp = this.compare_fn(key, h.key);
    if      (cmp < 0) h.left  = this.put0(h.left,  key, val); 
    else if (cmp > 0) h.right = this.put0(h.right, key, val); 
    else              h.val   = val;
    if (this.isRed(h.right) && !this.isRed(h.left))      h = this.rotateLeft(h);
    if (this.isRed(h.left)  &&  this.isRed(h.left.left)) h = this.rotateRight(h);
    if (this.isRed(h.left)  &&  this.isRed(h.right))     this.flipColors(h);
    h.size = this.size0(h.left) + this.size0(h.right) + 1;
    return h;
  }

  rotateLeft(h) {
    let x = h.right;
    h.right = x.left;
    x.left = h;
    x.color = x.left.color;
    x.left.color = RedBlackBST.RED;
    x.size = h.size;
    h.size = this.size0(h.left) + this.size0(h.right) + 1;
    return x;
  }

  rotateRight(h) {
    let x = h.left;
    h.left = x.right;
    x.right = h;
    x.color = x.right.color;
    x.right.color = RedBlackBST.RED;
    x.size = h.size;
    h.size = this.size0(h.left) + this.size0(h.right) + 1;
    return x;
  }

  size() {
    return this.size0(this.root);
  }

  size0(x) {
    if (x == null) return 0;
    return x.size;
  }
}

module.exports = RedBlackBST;
