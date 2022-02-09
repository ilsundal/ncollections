'use strict'

// based on https://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html
// as referenced on https://algs4.cs.princeton.edu/33balanced/

/******************************************************************************
 *  Compilation:  javac RedBlackBST.java
 *  Execution:    java RedBlackBST < input.txt
 *  Dependencies: StdIn.java StdOut.java  
 *  Data files:   https://algs4.cs.princeton.edu/33balanced/tinyST.txt  
 *    
 *  A symbol table implemented using a left-leaning red-black BST.
 *  This is the 2-3 version.
 *
 *  Note: commented out assertions because DrJava now enables assertions
 *        by default.
 *
 *  % more tinyST.txt
 *  S E A R C H E X A M P L E
 *  
 *  % java RedBlackBST < tinyST.txt
 *  A 8
 *  C 4
 *  E 12
 *  H 5
 *  L 11
 *  M 9
 *  P 10
 *  R 3
 *  S 0
 *  X 7
 *
 ******************************************************************************/

const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');
const NoSuchElementException = require(__dirname + '/NoSuchElementException.js');

/**
 *  The {@code BST} class represents an ordered symbol table of generic
 *  key-value pairs.
 *  It supports the usual <em>put</em>, <em>get</em>, <em>contains</em>,
 *  <em>delete</em>, <em>size</em>, and <em>is-empty</em> methods.
 *  It also provides ordered methods for finding the <em>minimum</em>,
 *  <em>maximum</em>, <em>floor</em>, and <em>ceiling</em>.
 *  It also provides a <em>keys</em> method for iterating over all of the keys.
 *  A symbol table implements the <em>associative array</em> abstraction:
 *  when associating a value with a key that is already in the symbol table,
 *  the convention is to replace the old value with the new value.
 *  Unlike {@link java.util.Map}, this class uses the convention that
 *  values cannot be {@code null}—setting the
 *  value associated with a key to {@code null} is equivalent to deleting the key
 *  from the symbol table.
 *  <p>
 *  It requires that
 *  the key type implements the {@code Comparable} interface and calls the
 *  {@code compareTo()} and method to compare two keys. It does not call either
 *  {@code equals()} or {@code hashCode()}.
 *  <p>
 *  This implementation uses a <em>left-leaning red-black BST</em>. 
 *  The <em>put</em>, <em>get</em>, <em>contains</em>, <em>remove</em>,
 *  <em>minimum</em>, <em>maximum</em>, <em>ceiling</em>, <em>floor</em>,
 *  <em>rank</em>, and <em>select</em> operations each take
 *  &Theta;(log <em>n</em>) time in the worst case, where <em>n</em> is the
 *  number of key-value pairs in the symbol table.
 *  The <em>size</em>, and <em>is-empty</em> operations take &Theta;(1) time.
 *  The <em>keys</em> methods take
 *  <em>O</em>(log <em>n</em> + <em>m</em>) time, where <em>m</em> is
 *  the number of keys returned by the iterator.
 *  Construction takes &Theta;(1) time.
 *  <p>
 *  For alternative implementations of the symbol table API, see {@link ST},
 *  {@link BinarySearchST}, {@link SequentialSearchST}, {@link BST},
 *  {@link SeparateChainingHashST}, {@link LinearProbingHashST}, and
 *  {@link AVLTreeST}.
 *  For additional documentation, see
 *  <a href="https://algs4.cs.princeton.edu/33balanced">Section 3.3</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 *  @author Robert Sedgewick
 *  @author Kevin Wayne
 */

// BST helper node data type
class Node {
  key;           // key
  val;         // associated data
  left;
  right;  // links to left and right subtrees
  color;     // color of parent link
  size;          // subtree count

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

  root;     // root of the BST

  compare_fn;

  /**
   * Initializes an empty symbol table.
   */
  constructor(compare_fn) {
    this.compare_fn = compare_fn;
  }

 /***************************************************************************
  *  Node helper methods.
  ***************************************************************************/
  // is node x red; false if x is null ?
  isRed(x) {
      if (x == null) return false;
      return x.color == RedBlackBST.RED;
  }

  // number of node in subtree rooted at x; 0 if x is null
  size0(x) {
      if (x == null) return 0;
      return x.size;
  } 


  /**
   * Returns the number of key-value pairs in this symbol table.
   * @return the number of key-value pairs in this symbol table
   */
  size() {
      return this.size0(this.root);
  }

 /**
   * Is this symbol table empty?
   * @return {@code true} if this symbol table is empty and {@code false} otherwise
   */
  isEmpty() {
      return this.root == null;
  }


 /***************************************************************************
  *  Standard BST search.
  ***************************************************************************/

  /**
   * Returns the value associated with the given key.
   * @param key the key
   * @return the value associated with the given key if the key is in the symbol table
   *     and {@code null} if the key is not in the symbol table
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  get(key) {
      if (key == null) throw new IllegalArgumentException("argument to get() is null");
      return this.get0(this.root, key);
  }

  // value associated with the given key in subtree rooted at x; null if no such key
  get0(x, key) {
      while (x != null) {
          let cmp = this.compare_fn(key, x.key);
          if      (cmp < 0) x = x.left;
          else if (cmp > 0) x = x.right;
          else              return x.val;
      }
      return undefined; // CHANGED by Morten Helles
//      return null;
  }

  /**
   * Does this symbol table contain the given key?
   * @param key the key
   * @return {@code true} if this symbol table contains {@code key} and
   *     {@code false} otherwise
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  contains(key) {
      return this.get(key) !== undefined; // CHANGED by Morten Helles
//      return this.get(key) != null;
  }

 /***************************************************************************
  *  Red-black tree insertion.
  ***************************************************************************/

  /**
   * Inserts the specified key-value pair into the symbol table, overwriting the old 
   * value with the new value if the symbol table already contains the specified key.
   * Deletes the specified key (and its associated value) from this symbol table
   * if the specified value is {@code null}.
   *
   * @param key the key
   * @param val the value
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  put(key, val) {
      if (key == null) throw new IllegalArgumentException("first argument to put() is null");
/* MORTEN HELLES: COMMENTED OUT because we want to allow null values
      if (val == null) {
          delete(key);
          return;
      }
*/
      let old_value = this.get(key); // ADDED by Morten Helles

      this.root = this.put0(this.root, key, val);
      this.root.color = RedBlackBST.BLACK;
      
      // assert check();
      return old_value;
  }

  // insert the key-value pair in the subtree rooted at h
  put0(h, key, val) { 
      if (h == null) return new Node(key, val, RedBlackBST.RED, 1);

      let cmp = this.compare_fn(key, h.key);
      if      (cmp < 0) h.left  = this.put0(h.left,  key, val); 
      else if (cmp > 0) h.right = this.put0(h.right, key, val); 
      else              h.val   = val;

      // fix-up any right-leaning links
      if (this.isRed(h.right) && !this.isRed(h.left))      h = this.rotateLeft(h);
      if (this.isRed(h.left)  &&  this.isRed(h.left.left)) h = this.rotateRight(h);
      if (this.isRed(h.left)  &&  this.isRed(h.right))     this.flipColors(h);
      h.size = this.size0(h.left) + this.size0(h.right) + 1;

      return h;
  }

 /***************************************************************************
  *  Red-black tree deletion.
  ***************************************************************************/

  /**
   * Removes the smallest key and associated value from the symbol table.
   * @throws NoSuchElementException if the symbol table is empty
   */
  deleteMin() {
      if (this.isEmpty()) throw new NoSuchElementException("BST underflow");

      let min_node = this.minNode(); // ADDED by Morten Helles

      // if both children of root are black, set root to red
      if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
          this.root.color = RedBlackBST.RED;

      this.root = this.deleteMin0(this.root);
      if (!this.isEmpty()) this.root.color = RedBlackBST.BLACK;
      
      // assert check();
      return min_node; // ADDED by Morten Helles
  }

  // delete the key-value pair with the minimum key rooted at h
  deleteMin0(h) { 
      if (h.left == null)
          return null;

      if (!this.isRed(h.left) && !this.isRed(h.left.left))
          h = this.moveRedLeft(h);

      h.left = this.deleteMin0(h.left);
      return this.balance(h);
  }


  /**
   * Removes the largest key and associated value from the symbol table.
   * @throws NoSuchElementException if the symbol table is empty
   */
  deleteMax() {
      if (this.isEmpty()) throw new NoSuchElementException("BST underflow");

      let max_node = this.maxNode(); // ADDED by Morten Helles

      // if both children of root are black, set root to red
      if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
          this.root.color = RedBlackBST.RED;

      this.root = this.deleteMax0(this.root);
      if (!this.isEmpty()) this.root.color = RedBlackBST.BLACK;

      // assert check();
      return max_node; // ADDED by Morten Helles
  }

  // delete the key-value pair with the maximum key rooted at h
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

  /**
   * Removes the specified key and its associated value from this symbol table     
   * (if the key is in this symbol table).    
   *
   * @param  key the key
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  delete(key) { 
      if (key == null) throw new IllegalArgumentException("argument to delete() is null");

//    if (!this.contains(key)) return; COMMENTED OUT by Morten Helles

// ADDED by Morten Helles - start
      let old_value = this.get(key);
      if (old_value === undefined)
        return old_value;
// ADDED by Morten Helles - end

      // if both children of root are black, set root to red
      if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
          this.root.color = RedBlackBST.RED;

      this.root = this.delete0(this.root, key);
      if (!this.isEmpty()) this.root.color = RedBlackBST.BLACK;
      // assert check();
      return old_value; // ADDED by Morten Helles
  }

  // delete the key-value pair with the given key rooted at h
  delete0(h, key) { 
      // assert get(h, key) != null;

      if (this.compare_fn(key, h.key) < 0)  {
          if (!this.isRed(h.left) && !this.isRed(h.left.left))
              h = this.moveRedLeft(h);
          h.left = this.delete0(h.left, key);
      }
      else {
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
              // h.val = get(h.right, min(h.right).key);
              // h.key = min(h.right).key;
              h.right = this.deleteMin0(h.right);
          }
          else h.right = this.delete0(h.right, key);
      }
      return this.balance(h);
  }

 /***************************************************************************
  *  Red-black tree helper functions.
  ***************************************************************************/

  // make a left-leaning link lean to the right
  rotateRight(h) {
      // assert (h != null) && this.isRed(h.left);
      // assert (h != null) && this.isRed(h.left) &&  !this.isRed(h.right);  // for insertion only
      let x = h.left;
      h.left = x.right;
      x.right = h;
      x.color = x.right.color;
      x.right.color = RedBlackBST.RED;
      x.size = h.size;
      h.size = this.size0(h.left) + this.size0(h.right) + 1;
      return x;
  }

  // make a right-leaning link lean to the left
  rotateLeft(h) {
      // assert (h != null) && this.isRed(h.right);
      // assert (h != null) && this.isRed(h.right) && !this.isRed(h.left);  // for insertion only
      let x = h.right;
      h.right = x.left;
      x.left = h;
      x.color = x.left.color;
      x.left.color = RedBlackBST.RED;
      x.size = h.size;
      h.size = this.size0(h.left) + this.size0(h.right) + 1;
      return x;
  }

  // flip the colors of a node and its two children
  flipColors(h) {
      // h must have opposite color of its two children
      // assert (h != null) && (h.left != null) && (h.right != null);
      // assert (!this.isRed(h) &&  this.isRed(h.left) &&  this.isRed(h.right))
      //    || (this.isRed(h)  && !this.isRed(h.left) && !this.isRed(h.right));
      h.color = !h.color;
      h.left.color = !h.left.color;
      h.right.color = !h.right.color;
  }

  // Assuming that h is red and both h.left and h.left.left
  // are black, make h.left or one of its children red.
  moveRedLeft(h) {
      // assert (h != null);
      // assert this.isRed(h) && !this.isRed(h.left) && !this.isRed(h.left.left);

      this.flipColors(h);
      if (this.isRed(h.right.left)) { 
          h.right = this.rotateRight(h.right);
          h = this.rotateLeft(h);
          this.flipColors(h);
      }
      return h;
  }

  // Assuming that h is red and both h.right and h.right.left
  // are black, make h.right or one of its children red.
  moveRedRight(h) {
      // assert (h != null);
      // assert this.isRed(h) && !this.isRed(h.right) && !this.isRed(h.right.left);
      this.flipColors(h);
      if (this.isRed(h.left.left)) { 
          h = this.rotateRight(h);
          this.flipColors(h);
      }
      return h;
  }

  // restore red-black tree invariant
  balance(h) {
      // assert (h != null);

      if (this.isRed(h.right) && !this.isRed(h.left))    h = this.rotateLeft(h);
      if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h);
      if (this.isRed(h.left) && this.isRed(h.right))     this.flipColors(h);

      h.size = this.size0(h.left) + this.size0(h.right) + 1;
      return h;
  }


 /***************************************************************************
  *  Utility functions.
  ***************************************************************************/

  /**
   * Returns the height of the BST (for debugging).
   * @return the height of the BST (a 1-node tree has height 0)
   */
  height() {
      return this.height0(this.root);
  }
  height0(x) {
      if (x == null) return -1;
      return 1 + Math.max(this.height0(x.left), this.height0(x.right));
  }

 /***************************************************************************
  *  Ordered symbol table methods.
  ***************************************************************************/

  /**
   * Returns the smallest key in the symbol table.
   * @return the smallest key in the symbol table
   * @throws NoSuchElementException if the symbol table is empty
   */
  min() {
      if (this.isEmpty()) throw new NoSuchElementException("calls min() with empty symbol table");
      return this.min0(this.root).key;
  }

// ADDED by Morten Helles - start
  minNode() {
      if (this.isEmpty()) throw new NoSuchElementException("calls min() with empty symbol table");
      return this.min0(this.root);
  }
// ADDED by Morten Helles - end

  // the smallest key in subtree rooted at x; null if no such key
  min0(x) { 
      // assert x != null;
      if (x.left == null) return x; 
      else                return this.min0(x.left); 
  } 

  /**
   * Returns the largest key in the symbol table.
   * @return the largest key in the symbol table
   * @throws NoSuchElementException if the symbol table is empty
   */
  max() {
      if (this.isEmpty()) throw new NoSuchElementException("calls max() with empty symbol table");
      return this.max0(this.root).key;
  } 

// ADDED by Morten Helles - start
  maxNode() {
      if (this.isEmpty()) throw new NoSuchElementException("calls max() with empty symbol table");
      return this.max0(this.root);
  }
// ADDED by Morten Helles - end

  // the largest key in the subtree rooted at x; null if no such key
  max0(x) { 
      // assert x != null;
      if (x.right == null) return x; 
      else                 return this.max0(x.right); 
  } 


  /**
   * Returns the largest key in the symbol table less than or equal to {@code key}.
   * @param key the key
   * @return the largest key in the symbol table less than or equal to {@code key}
   * @throws NoSuchElementException if there is no such key
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  floor(key) {
      if (key == null) throw new IllegalArgumentException("argument to floor() is null");
      if (this.isEmpty()) throw new NoSuchElementException("calls floor() with empty symbol table");
      let x = this.floor0(this.root, key);
      if (x == null) throw new NoSuchElementException("argument to floor() is too small");
      else           return x.key;
  }    

  // the largest key in the subtree rooted at x less than or equal to the given key
  floor0(x, key) {
      if (x == null) return null;
      let cmp = this.compare_fn(key, x.key);
      if (cmp == 0) return x;
      if (cmp < 0)  return this.floor0(x.left, key);
      let t = this.floor0(x.right, key);
      if (t != null) return t; 
      else           return x;
  }

  /**
   * Returns the smallest key in the symbol table greater than or equal to {@code key}.
   * @param key the key
   * @return the smallest key in the symbol table greater than or equal to {@code key}
   * @throws NoSuchElementException if there is no such key
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  ceiling(key) {
      if (key == null) throw new IllegalArgumentException("argument to ceiling() is null");
      if (this.isEmpty()) throw new NoSuchElementException("calls ceiling() with empty symbol table");
      let x = this.ceiling0(this.root, key);
      if (x == null) throw new NoSuchElementException("argument to ceiling() is too small");
      else           return x.key;  
  }

  // the smallest key in the subtree rooted at x greater than or equal to the given key
  ceiling(x, key) {  
      if (x == null) return null;
      let cmp = this.compare_fn(key, x.key);
      if (cmp == 0) return x;
      if (cmp > 0)  return this.ceiling0(x.right, key);
      let t = this.ceiling0(x.left, key);
      if (t != null) return t; 
      else           return x;
  }

  /**
   * Return the key in the symbol table of a given {@code rank}.
   * This key has the property that there are {@code rank} keys in
   * the symbol table that are smaller. In other words, this key is the
   * ({@code rank}+1)st smallest key in the symbol table.
   *
   * @param  rank the order statistic
   * @return the key in the symbol table of given {@code rank}
   * @throws IllegalArgumentException unless {@code rank} is between 0 and
   *        <em>n</em>–1
   */
  select(rank) {
      if (rank < 0 || rank >= this.size()) {
          throw new IllegalArgumentException("argument to select() is invalid: " + rank);
      }
      return this.select0(this.root, rank);
  }

  // Return key in BST rooted at x of given rank.
  // Precondition: rank is in legal range.
  select0(x, rank) {
      if (x == null) return null;
      let leftSize = this.size0(x.left);
      if      (leftSize > rank) return this.select0(x.left,  rank);
      else if (leftSize < rank) return this.select0(x.right, rank - leftSize - 1); 
      else                      return x.key;
  }

  /**
   * Return the number of keys in the symbol table strictly less than {@code key}.
   * @param key the key
   * @return the number of keys in the symbol table strictly less than {@code key}
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  rank(key) {
      if (key == null) throw new IllegalArgumentException("argument to rank() is null");
      return this.rank0(key, this.root);
  } 

  // number of keys less than key in the subtree rooted at x
  rank0(key, x) {
      if (x == null) return 0; 
      let cmp = this.compare_fn(key, x.key); 
      if      (cmp < 0) return this.rank0(key, x.left); 
      else if (cmp > 0) return 1 + this.size0(x.left) + this.rank0(key, x.right); 
      else              return this.size0(x.left); 
  } 

 /***************************************************************************
  *  Range count and range search.
  ***************************************************************************/

  /**
   * Returns all keys in the symbol table as an {@code Iterable}.
   * To iterate over all of the keys in the symbol table named {@code st},
   * use the foreach notation: {@code for (Key key : st.keys())}.
   * @return all keys in the symbol table as an {@code Iterable}
   */
/*
  public Iterable<Key> keys() {
      if (isEmpty()) return new Queue<Key>();
      return keys(min(), max());
  }
*/
  /**
   * Returns all keys in the symbol table in the given range,
   * as an {@code Iterable}.
   *
   * @param  lo minimum endpoint
   * @param  hi maximum endpoint
   * @return all keys in the symbol table between {@code lo} 
   *    (inclusive) and {@code hi} (inclusive) as an {@code Iterable}
   * @throws IllegalArgumentException if either {@code lo} or {@code hi}
   *    is {@code null}
   */
/*
  public Iterable<Key> keys(Key lo, Key hi) {
      if (lo == null) throw new IllegalArgumentException("first argument to keys() is null");
      if (hi == null) throw new IllegalArgumentException("second argument to keys() is null");

      Queue<Key> queue = new Queue<Key>();
      // if (isEmpty() || lo.compareTo(hi) > 0) return queue;
      keys(this.root, queue, lo, hi);
      return queue;
  } 
*/
  // add the keys between lo and hi in the subtree rooted at x
  // to the queue
/*
  private void keys(Node x, Queue<Key> queue, Key lo, Key hi) { 
      if (x == null) return; 
      int cmplo = lo.compareTo(x.key); 
      int cmphi = hi.compareTo(x.key); 
      if (cmplo < 0) keys(x.left, queue, lo, hi); 
      if (cmplo <= 0 && cmphi >= 0) queue.enqueue(x.key); 
      if (cmphi > 0) keys(x.right, queue, lo, hi); 
  } 
*/
  /**
   * Returns the number of keys in the symbol table in the given range.
   *
   * @param  lo minimum endpoint
   * @param  hi maximum endpoint
   * @return the number of keys in the symbol table between {@code lo} 
   *    (inclusive) and {@code hi} (inclusive)
   * @throws IllegalArgumentException if either {@code lo} or {@code hi}
   *    is {@code null}
   */
/*
  public int size(Key lo, Key hi) {
      if (lo == null) throw new IllegalArgumentException("first argument to size() is null");
      if (hi == null) throw new IllegalArgumentException("second argument to size() is null");

      if (lo.compareTo(hi) > 0) return 0;
      if (contains(hi)) return rank(hi) - rank(lo) + 1;
      else              return rank(hi) - rank(lo);
  }
*/

 /***************************************************************************
  *  Check integrity of red-black tree data structure.
  ***************************************************************************/
/*
  private boolean check() {
      if (!isBST())            StdOut.println("Not in symmetric order");
      if (!isSizeConsistent()) StdOut.println("Subtree counts not consistent");
      if (!isRankConsistent()) StdOut.println("Ranks not consistent");
      if (!is23())             StdOut.println("Not a 2-3 tree");
      if (!isBalanced())       StdOut.println("Not balanced");
      return isBST() && isSizeConsistent() && isRankConsistent() && is23() && isBalanced();
  }

  // does this binary tree satisfy symmetric order?
  // Note: this test also ensures that data structure is a binary tree since order is strict
  private boolean isBST() {
      return isBST(this.root, null, null);
  }

  // is the tree rooted at x a BST with all keys strictly between min and max
  // (if min or max is null, treat as empty constraint)
  // Credit: Bob Dondero's elegant solution
  private boolean isBST(Node x, Key min, Key max) {
      if (x == null) return true;
      if (min != null && x.key.compareTo(min) <= 0) return false;
      if (max != null && x.key.compareTo(max) >= 0) return false;
      return isBST(x.left, min, x.key) && isBST(x.right, x.key, max);
  } 

  // are the size fields correct?
  private boolean isSizeConsistent() { return isSizeConsistent(this.root); }
  private boolean isSizeConsistent(Node x) {
      if (x == null) return true;
      if (x.size != size(x.left) + size(x.right) + 1) return false;
      return isSizeConsistent(x.left) && isSizeConsistent(x.right);
  } 

  // check that ranks are consistent
  private boolean isRankConsistent() {
      for (int i = 0; i < size(); i++)
          if (i != rank(select(i))) return false;
      for (Key key : keys())
          if (key.compareTo(select(rank(key))) != 0) return false;
      return true;
  }

  // Does the tree have no red right links, and at most one (left)
  // red links in a row on any path?
  private boolean is23() { return is23(this.root); }
  private boolean is23(Node x) {
      if (x == null) return true;
      if (this.isRed(x.right)) return false;
      if (x != this.root && this.isRed(x) && this.isRed(x.left))
          return false;
      return is23(x.left) && is23(x.right);
  } 

  // do all paths from root to leaf have same number of black edges?
  private boolean isBalanced() { 
      int black = 0;     // number of black links on path from root to min
      Node x = this.root;
      while (x != null) {
          if (!this.isRed(x)) black++;
          x = x.left;
      }
      return isBalanced(this.root, black);
  }

  // does every path from the root to a leaf have the given number of black links?
  private boolean isBalanced(Node x, int black) {
      if (x == null) return black == 0;
      if (!this.isRed(x)) black--;
      return isBalanced(x.left, black) && isBalanced(x.right, black);
  } 
*/

  /**
   * Unit tests the {@code RedBlackBST} data type.
   *
   * @param args the command-line arguments
   */
/*
  public static void main(String[] args) { 
      RedBlackBST<String, Integer> st = new RedBlackBST<String, Integer>();
      for (int i = 0; !StdIn.isEmpty(); i++) {
          String key = StdIn.readString();
          st.put(key, i);
      }
      StdOut.println();
      for (String s : st.keys())
          StdOut.println(s + " " + st.get(s));
      StdOut.println();
  }
*/
}

module.exports = RedBlackBST;

/*
let tree = new RedBlackBST();
tree.put(3,4);
tree.put(2,3);
console.log(tree);
tree.delete(3);
console.log(tree);
tree.delete(2);
console.log(tree);
*/
