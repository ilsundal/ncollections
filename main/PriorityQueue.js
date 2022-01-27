'use strict'

const ArrayList = require(__dirname + '/ArrayList.js');
const Collection = require(__dirname + '/Collection.js');
const Queue = require(__dirname + '/Queue.js');

// probably the underlying data structure should be changed to a tree-based one
class PriorityQueue extends Queue {
  #compare_fn;

  // options.list_class = the class of the backing list; defaults to ArrayList
  // options.compare_fn = the compare_fn (to override default)
  constructor(options={}) {
    super(Object.assign({ list_class: ArrayList }, options));
    this.#compare_fn = options.compare_fn ? options.compare_fn : Collection.compare_fn;
  }

  // O(n) - therefore not suitable for big queues
  // the implementation searches backwards to reduce the amount of right-shifting on inserts (when backed by an ArrayList, which is the default); this also means that if elements are added in order of increasing priority than then time complexity is O(1); also, if two elements have the same priority then the one that was added first will also be first in the underlying list (i.e. FIFO).
  enqueue(element) {
    for (let index = this.list.size() - 1; index >= 0; index--) {
      let compareValue = this.#compare_fn(element, this.list.getAt(index));
      if (compareValue >= 0) {
        if (index == (this.list.size() - 1)) {
          this.list.addLast(element);
        } else {
          this.list.insertAt(index + 1, element);
        }
        return true;
      }
    }
    this.list.addFirst(element);
    return true;
  }
}

module.exports = PriorityQueue;
