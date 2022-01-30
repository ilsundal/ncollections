# ncollections - neat collections for JavaScript
ncollections provides a selection of neatly designed collections for JavaScript.

The collections are
- ArrayList and LinkedList
- HashSet
- HashMap
- Deque
- Stack
- Queue
- PriorityQueue

Why use ncollections?
- **More collections** With standard JavaScript, you only have maps (via objects), arrays and sets.
- **Well-designed** ncollections is small and neat and easy-to-use, flexible and extendable. Works with both simple types and objects.
- **Small foot-print** ncollections does not use any packages. The main directory is small and can be zipped to 13KB.
- **Plain JavaScript** Use both in browsers and Node.js.
- **Equals and hash code** Provide your own custom *equals* and *hashCode* methods for you own objects to boost performance and reliably use objects as keys and in sets.

The design has been inspired by the [Java Collections Framework](https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html). Default and solid implementations are provided for *equals* and *hashcode* to make ncollections even easier to use.

# Example

```javascript
const Collections = require('ncollections');

# ncollections - neat collections for JavaScript
ncollections provides a selection of neatly designed collections for JavaScript.

The collections are
- ArrayList and LinkedList
- HashSet
- HashMap
- Deque
- Stack
- Queue
- PriorityQueue

Why use ncollections?
- **More collections** With standard JavaScript, you only have maps (via objects), arrays and sets.
- **Well-designed** ncollections is small and neat and easy-to-use, flexible and extendable. Works with both simple types and objects.
- **Small foot-print** ncollections does not use any packages. The main directory is small and can be zipped to 13KB.
- **Plain JavaScript** Use both in browsers and Node.js.
- **Equals and hash code** Provide your own custom *equals* and *hashCode* methods for you own objects to boost performance and reliably use objects as keys and in sets.

The design has been inspired by the [Java Collections Framework](https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html). Default and solid implementations are provided for *equals* and *hashcode* to make ncollections even easier to use.

# Example

```javascript
const Collections = require('ncollections');

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
set.add('my_object');
set.add(1); // a duplicate which will thus not be inserted into the set because it is already contained
console.log(set.size()); // outputs 2
console.log(set.toString()); // outputs {1,"my_object"}

// The other Collections (Stack, Dequeu, Queue, etc.) are similarly designed.
```

# Installation

## Server-side usage

```
npm install ncollections
```

## Client-side usage:

No distributables are yet provided, such as through a CDN.

# The Collections

All collections implements the following methods:




## Lists: ArrayList and LinkedList

## Maps: HashMap

## Sets: HashSet

## Deque

## Stack

## Queue

## PriorityQueue

# A note on *equals*, *hashCode* and *compare*```

# Installation

## Server-side usage

```
npm install ncollections
```

## Client-side usage:

No distributables are yet provided, such as through a CDN.

# The Collections

All collections implements the following methods:




## Lists: ArrayList and LinkedList

## Maps: HashMap

## Sets: HashSet

## Deque

## Stack

## Queue

## PriorityQueue

# A note on *equals*, *hashCode* and *compare*
