'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const IllegalArgumentException = require(__dirname + '/IllegalArgumentException.js');
const LinkedList = require(__dirname + '/LinkedList.js');
const Queue = require(__dirname + '/Queue.js');
const TreeMap = require(__dirname + '/TreeMap.js');

// Probably the underlying data structure should be changed to a tree-based one.
class PriorityQueue extends Queue {
  #tree_map; // maps an element to a linked list of elements (containing at least 1 element)

  // options.list_class = the class of the backing list; defaults to ArrayList
  // options.compare_fn = the compare_fn (to override default)
  constructor(options={}) {
    super(Object.assign({ list_class: ArrayList }, options));
    this.#tree_map = new TreeMap({ compare_fn: options.compare_fn });
  }

  dequeue() {
    if (this.#tree_map.isEmpty())
      return undefined;
    let list = this.#tree_map.getFirst().value;
    let element = list.removeFirst();
    if (list.isEmpty())
      this.#tree_map.remove(element); // cleanup
    return element;
  }

  clear() {
    return this.#tree_map.clear();
  }

  enqueue(element) {
    if (element === undefined)
      throw new IllegalArgumentException('element is undefined');
    let list = this.#tree_map.get(element);
    if (!list) {
      list = new LinkedList();
      this.#tree_map.put(element, list);
    }
    list.addLast(element);
    return this;
  }

  next() {
    let tree_map = this.#tree_map;
    let key_iterator = this.#tree_map.keys();
    let current_key = null;
    let list_iterator = null;
    return {
      next: function() {
        while (true) {
          if (current_key == null) {
            let key_iterator_next = key_iterator.next();
            if (key_iterator_next.done) {
              return { done: true };
            }
            current_key = key_iterator_next.value;
            let current_list = tree_map.get(current_key);
            list_iterator = current_list.next();
          }
          let list_iterator_next = list_iterator.next();
          if (list_iterator_next.done) {
            current_key = null;
            continue;
          }
          return { value: list_iterator_next.value, done: false };
        }
      }
    }
  }

  peek() {
    return this.#tree_map.isEmpty() ? undefined : this.#tree_map.getFirst().value.getFirst();
  }

  size() {
    return this.#tree_map.size();
  }

  toArray() {
    let array = [];
    for (let list of this.#tree_map.values())
      array = array.concat(list.toArray());
    return array;
  }
}

module.exports = PriorityQueue;
