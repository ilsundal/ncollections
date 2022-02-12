'use strict'

const Collections = require(__dirname + '/../index.js');

// There are two ways to instantiate a new Collection, for example for an ArrayList:
let array_list1 = new Collections.ArrayList(); // using constructor
let array_list2 = new Collections.newArrayList(); // using builder function

// If you don't care about the Collection implementation (e.g. ArrayList or LinkedList), just do this:
let list = new Collections.newList(); // will return an ArrayList which is the default List

// Example of using a List with basic types
list.add(3).addAll([1,2]).sort(); // supports method chaining
console.log(list.toString()); // outputs [1,2,3]

// Example of using a List with object types
list.add({ my: 'object' });
console.log(list.contains({ my: 'object' })); // outputs true
console.log(list); // outputs ArrayList { array: [ 1, 2, 3, { my: 'object' } ] }
console.log(list.toString()); // outputs [1,2,3,{"my":"object"}]

// Example of using a Map with both basic types and objects
let map = Collections.newMap(); // returns a HashMap which is the default Map
map.put({ some: 'key' }, { some: 'value' }); // note that the key is an object
map.put('other_key', true);
console.log(map.get({ some: 'key' })); // outputs { some: 'value' }
console.log(map.get('other_key')); // outputs true
console.log(map.toString()); // outputs {{"some":"key"}->{"some":"value"},"other_key"->true}

// Example of using a Set
let set = Collections.newSet(); // returns a HashSet which is the default Set
set.add(1);
set.add({ a: 1 });
set.add(1); // a duplicate which will thus not be inserted into the set because it is already contained
console.log(set.contains({ a: 1 })); // outputs true
console.log(set.size()); // outputs 2
console.log(set.toString()); // outputs {1,{"a":1}}

// The other ncollections (Stack, Deque, Queue, etc.) are similarly designed.

// Note that the ncollections works naturally with object elements (and keys), unlike the built-in JavaScript array, Set and Map that are based on the == equality operator
let native_array = [{ a: 1 }];
console.log(native_array.includes({ a: 1 })); // outputs false
let native_set = new Set();
native_set.add({ a: 1 });
console.log(native_set.has({ a: 1 })); // outputs false
let native_map = new Map();
native_map.set({ a: 1 }, 'some_value');
console.log(native_map.get({ a: 1 })); // outputs undefined
