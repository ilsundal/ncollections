# ncollections - neat collections for JavaScript
ncollections provides a selection of neatly designed collections for JavaScript.

The collections are
- [Lists](#Lists): [ArrayList](#ArrayList) and [LinkedList](#LinkedList)
- [Sets](#Sets): [HashSet](#HashSet), [SortedSet](#SortedSet) ([TreeSet](#TreeSet)), [IndexSet](#IndexSet) and [NativeSet](#NativeSet)
- [Maps](#Maps): [HashMap](#HashMap), [SortedMap](#SortedMap) ([TreeMap](#TreeMap)) and [NativeMap](#NativeMap)
- [Queue](#Queues) and [PriorityQueue](#PriorityQueue)
- [Deque](#Deque) and [Stack](#Stack)

Why use ncollections?
- **More collections** With standard JavaScript, you only have maps (via objects), arrays and sets.
- **Well-designed** ncollections is small and neat and easy-to-use, flexible and extendable. Elements (and keys) can be any value, both primitive values and objects.
- **Small foot-print** ncollections does not use any packages. The main directory is small and can be zipped to ~16KB.
- **Plain JavaScript** Use both in browsers and Node.js.
- **Equals and hash code** You can optionally provide your own custom *equals* and *hashCode* methods for you own objects e.g. to boost performance.

The design has been inspired by the [Java Collections Framework](https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html). Robust and fast default implementations are provided for *equals* and *hashCode* functions to make ncollections even easier to use. (In most cases, you don't have to worry about value equality and hash codes at all; it just works. [Read more.](#A-Note-On-equals-hashcode-And-compare_fn))

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

// Note that the ncollections work naturally with object elements (and keys), unlike the built-in JavaScript array, Set and Map that are based on the == equality operator
let native_array = [{ a: 1 }];
console.log(native_array.includes({ a: 1 })); // outputs false
let native_set = new Set();
native_set.add({ a: 1 });
console.log(native_set.has({ a: 1 })); // outputs false
let native_map = new Map();
native_map.set({ a: 1 }, 'some_value');
console.log(native_map.get({ a: 1 })); // outputs undefined
```
[Try ncollections on Runkit.](https://npm.runkit.com/ncollections)

# Installation

```
npm install ncollections
```

# The Collections

All Collections implement the following methods:

**clear()** clears (empties) the collection.

**clone()** returns a shallow clone of the collection.

**equals(collection)** returns true if the collection is equal to the argument collection, and false if not.

**hashCode()** returns an integer hash code for the collection.

**isEmpty()** returns true if the collection is empty, and false if not.

**size()** returns the collection size, i.e. the number of elements in the collection.

**toArray()** returns an array of the collection elements in iteration order. This array might be backed directly by the collection and thus should not be changed unless noted otherwise in the collection description.

**toString()** returns a string representation of the collection in iteration order.

All collections implement the [iteration and iterable protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

## Lists

A List is an ordered collection that allows for duplicates.

To instantiate the default List (which is an [ArrayList](#ArrayList)):

```javascript
let list = Collections.newList();
```

A List implements the following methods:

**add(element)** adds the argument element to the end of the list. Returns the list itself.

**addAll(elements)** adds all the argument elements (an iterable) to the end of the list, in iteration order. Returns the list itself.

**addFirst(element)** adds the argument element to the front of the list. Returns the list itself.

**addLast(element)** adds the argument element to the end of the list. Returns the list itself.

**contains(element)** returns true if the list contains the argument element, and false if not.

**containsAll(elements)** returns true if the list contains all of the argument elements (an iterable), and false if not.

**getAt(index)** returns the element at the argument index position. An IndexOutOfBoundsException is thrown if the index is out of bounds.

**getFirst()** returns the first element of the list. A NoSuchElementException is thrown if the list is empty.

**getLast()** returns the last element of the list. A NoSuchElementException is thrown if the list is empty.

**indexOf(element)** returns the first occurrence of the argument element in the list, or undefined if the list does not contain the element.

**insertAt(index, element)** inserts the argument element at the argument index position in the list. Returns the list itself. An IndexOutOfBoundsException is thrown if the index is out of bounds.

**lastIndexOf(element)** returns the last occurrence of the argument element in the list, or undefined if the list does not contain the element.

**remove(element)** removes the argument element from the collection. Returns true if an element was removed from the list, and false if not. If the list contains several elements that are equal to the argument element then only the first such element will be removed.

**removeAll(elements)** removes the argument elements (an iterable) from the collection. Returns true if any element was removed from the list, and false if not. For each element to be removed, if the list contains several elements that are equal to it, then only the first such element will be removed.

**removeAt(index)** removes the element at the argument index position in the list. It returns the removed element. An IndexOutOfBoundsException is thrown if the index is out of bounds.

**removeFirst()** removes the first element of the list. It returns the removed element. A NoSuchElementException is thrown if the list is empty.

**removeLast()** removes the last element of the list. It returns the removed element. A NoSuchElementException is thrown if the list is empty.

**reverse()** reverses the list in place. Returns the list itself.

**setAt(index, element)** replaces the element at the argument index position in the list with the argument element. The replaced element is returned. An IndexOutOfBoundsException is thrown if the index is out of bounds.

**setFirst(element)** replaces the first element of the list with the argument element. The replaced element is returned. A NoSuchElementException is thrown if the list is empty.

**setLast(element)** replaces the last element of the list with the argument element. The replaced element is returned. A NoSuchElementException is thrown if the list is empty.

**sort(compare_fn)** sorts the list in place, optionally with a custom compare function. Returns the list itself.

### ArrayList

The ArrayList is backed by [JavaScript's built-in array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Thus, the *getAt* and *setAt* methods are fast, while list insertions and removals are slower (due to possible element shifting and array resizing). The *toAtray* method returns the backed array directly which thus allows you to access and modify the ArrayList directly using any JavaScript array function, such as *splice*.

To instantiate an ArrayList:

```javascript
let array_list = Collections.newArrayList();
```

### LinkedList

The LinkedList is backed by a next-previous (double-linked) node structure. Thus, adding, retrieving and removing elements from the front or end of the list is fast, while *getAt* and *setAt* are slower due to linear search. (The linear search automatically chooses whether to search forwards from the first node or backwards from the last node depending on what is fastest.)

To instantiate a LinkedList:

```javascript
let linked_list = Collections.newLinkedList();
```

## Maps

A Map is a key-value collection where a (unique) key is mapped to a value. Collectively, a key and its mapped-to value is called an entry and is simply an object with two properties: "key" and "value". Both keys and values can be primitive values or objects. To get all the entries of a map simply iterate over it; thus, there is no *entries* method.

To instantiate the default Map (which is a [HashMap](#HashMap)):

```javascript
let map = Collections.newMap();
```

A Map implements the following methods:

**containsKey(key)** returns true if the map contains the argument key, and false if not.

**containsValue(value)** returns true if the map contains the argument value, and false if not.

**get(key)** returns the value mapped-to by the argument key, or undefined if the map does not contain the key.

**keys()** returns an iterable over the map's keys.

**put(key, value)** maps the argument key to the argument value. Returns the value previously mapped-to by the key, or undefined if the map contained no such key before.

**putAll(entries)** puts the argument entries (an iterable) into the map. Returns nothing.

**remove(key)** removes the argument key and its mapped-to value from the map. Returns the mapped-to value of the key, or undefined if the map contained no such key before.

**removeAll(keys)** removes the argument keys and their mapped-to values from the map. Returns the removed map entries.

**values()** returns an iterable over the map's values.

### HashMap

The HashMap is backed by [JavaScript's built-in Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). Thus, the *containsKey*, *get*, *put*, and *remove* methods are fast.

To instantiate a HashMap:

```javascript
let hash_map = Collections.newHashMap();
```

### NativeMap

The NativeMap is a thin wrapper around [JavaScript's built-in Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and adapts it to the ncollections framework. NativeMap is (slightly) faster than HashMap but is based on == equality and thus does not support *equals* and *hashCode* methods.

To instantiate a NativeMap:

```javascript
let native_map = Collections.newNativeMap();
```

### SortedMap

The SortedMap is a Maps that orders its keys according to a *compare_fn*, which can be provided during instantiation via an options object. (See [TreeMap](#TreeMap) below for an example.) If no *compare_fn* is provided then a default (natural) ordering is used.

To instantiate the default SortedMap (which is a [TreeMap](#TreeMap)):

```javascript
let tree_map = Collections.newSortedMap({ compare_fn: your_compare_fn }); // compare_fn is optional
```

A SortedMap implements the following methods:

**getFirst()** returns the entry (element) with the lowest key in the map. A NoSuchElementException is thrown if the map is empty.

**getLast()** returns the entry (element) with the greatest key in the map. A NoSuchElementException is thrown if the map is empty.

**removeFirst()** removes the entry (element) with the lowest key in the map. Returns the removed entry. A NoSuchElementException is thrown if the map is empty.

**removeLast()** removes the entry (element) with the greatest key in the map. Returns the removed entry. A NoSuchElementException is thrown if the map is empty.

#### TreeMap

The TreeMap is a SortedMap that is backed by a self-balanced binary tree structure.

To instantiate a TreeMap:

```javascript
let tree_map = Collections.newTreeMap({ compare_fn: your_compare_fn }); // compare_fn is optional
```

## Sets

A Set is collection without duplicates.

To instantiate the default Set (which is a [HashSet](#HashSet)):

```javascript
let set = Collections.newSet();
```

A Set implements the following methods:

**add(element)** adds the argument element to the set. Returns true if the set was changed (i.e. the set did not already contain the element), and false if not.

**addAll(elements)** adds the argument elements (an iterable) to the set. Returns true if the set was changed, and false if not.

**contains(element)** returns true if the set contains the argument element, and false if not.

**containsAll(elements)** returns true if the set contains all of the argument elements (an iterable), and false if not.

**remove(element)** removes the argument elment from the set. Returns true if the set was changed (i.e. the set contained the element), and false if not.

**removeAll(elements)** removes the argument elments (an iterable) from the set. Returns true if the set was changed, and false if not.

### HashSet

The HashSet is a Set that is backed by [JavaScript's built-in Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). Thus, the *add*, *contains*, and *remove* methods are fast. A HashSet is not ordered.

To instantiate a HashSet:

```javascript
let hash_set = Collections.newHashSet();
```

### IndexSet

The IndexSet is a Set that indexes the added elements based on their property values, much like a simple in-memory database. It is useful if you have a lot of objects in memory (normally of the same class or with the same property names) and need to retrieve them fast based on their property values. While adding many indexes will improve retrieval speed, they may consume too much memory, so a suitable balance must be found.

Retrieval is based on a "where" object, which is just an object of properties.

To instantiate an IndexSet:

```javascript
let index_set = Collections.newIndexSet();
```

The IndexSet adds implementations of the following methods:

**addIndex(index)** adds the argument index. The index is simply an iterable of element property names. Returns true if the index was added, and false if not (because it already exists).

**examine(where)** examines the execution of the argument "where". It returns an object with three properties: *chosen_index* is the chosen index (or null if none), *scan_count* is the number of elements scanned, and *match_count* is the number of matching elements.

**findAll(where)** returns an iterable of the set elements that matches the optional argument "where". If the argument "where" is omitted or is empty then an iterable of all the set's elements will be returned.

**findOne(where)** returns the single (first) element that matches the optional argument "where", or undefined if no match. If the argument "where" is omitted or is empty then one of the set's elements will be returned, or undefined if the set is empty.

**indexes** returns the added indexes.

Here is an example of how to use the IndexSet:

```javascript
const Collections = require('ncollections');

class Person {
  name;
  age;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

let index_set = new Collections.newIndexSet();
index_set.addIndex(['name']); // adds an index on the (person) "name" property
index_set.addAll([
  new Person('Morten', 48),
  new Person('Morten', 45),
  new Person('Maximillian', 17)
]);

let all_named_morten = index_set.findAll({ name: 'Morten' }); // uses the added "name" index to quickly find both "Morten"s
console.log(all_named_morten.toString()); // outputs {{"name":"Morten","age":48},{"name":"Morten","age":45}}
console.log(index_set.examine({ name: 'Morten' })); // outputs { chosen_index: [ 'name' ], scan_count: 0, match_count: 2 }

let all_aged_48 = index_set.findAll({ age: 17 }); // no "age" index so scans all elements for a match
console.log(all_aged_48.toString()); // outputs {{"name":"Maximillian","age":17}}
console.log(index_set.examine({ age: 17 })); // { chosen_index: null, scan_count: 3, match_count: 1 }

let one_named_morten = index_set.findOne({ name: 'Morten', age: 48 }); // uses the added "name" index to find both "Morten"s then scans those for a single match
console.log(one_named_morten); // outputs Person { name: 'Morten', age: 48 }
console.log(index_set.examine({ name: 'Morten', age: 48 })); // outputs { chosen_index: [ 'name' ], scan_count: 2, match_count: 1 }
```

### NativeSet

The NativeSet is a thin wrapper around [JavaScript's built-in Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and adapts it to the ncollections framework. NativeSet is (slightly) faster than HashSet but is based on == equality and thus does not support *equals* and *hashCode* methods. A NativeSet follows insertion order.

To instantiate a NativeSet:

```javascript
let native_set = Collections.newNativeSet();
```

### SortedSet

The SortedSet is a Set that orders its elements according to a *compare_fn*, which can be provided during instantiation via an options object. If no *compare_fn* is provided then a default (natural) ordering is used.

To instantiate the default SortedSet (which is a [TreeSet](#TreeSet)):

```javascript
let sorted_set = Collections.newSortedSet({ compare_fn: your_compare_fn }); // compare_fn is optional
```

A SortedSet implements the following methods:

**getFirst()** returns the first element of the set. A NoSuchElementException is thrown if the set is empty.

**getLast()** returns the last element of the set. A NoSuchElementException is thrown if the set is empty.

**removeFirst()** removes the first element of the set. Returns the removed element. A NoSuchElementException is thrown if the set is empty.

**removeLast()** removes the last element of the set. Returns the removed element. A NoSuchElementException is thrown if the set is empty.

#### TreeSet

The TreeSet is a SortedSet that is backed by a [TreeMap](#TreeMap).

To instantiate a TreeSet:

```javascript
let tree_set = Collections.newTreeSet({ compare_fn: your_compare_fn }); // compare_fn is optional
```

## Deque

A Deque is an ordered collection where you can add, peek and poll the first (front) and last (end) elements. It is backed by a LinkedList and thus the associated methods are all fast.

To instantiate a Deque:

```javascript
let deque = Collections.newDeque();
```

A Deque implements the following methods:

**addFirst(element)** adds the argument element to the front of the deque. Returns the deque itself.

**addLast(element)** adds the argument element to the end of the deque. Returns the deque itself.

**peekFirst()** returns the first element of the deque, or undefined if the deque is empty.

**peekLast()** returns the last element of the deque, or undefined if the deque is empty.

**pollFirst()** removes the first element of the deque, if any. Returns the removed element, or undefined if the deque is empty.

**pollLast()** removes the last element of the deque, if any. Returns the removed element, or undefined if the deque is empty.

## Stack

A Stack is an ordered collection where you can pop and push elements in Last-In First-Out (LIFO) order.  It is backed by a LinkedList and thus the associated methods are all fast.

To instantiate a Stack:

```javascript
let stack = Collections.newStack();
```

A Stack implements the following methods:

**peek()** returns the last-pushed element, or undefined if the stack is empty.

**pop()** removes the last-pushed element. Returns the removed element, or undefined if the stack is empty.

**push(element)** adds the argument element to the (end of, or top of) the stack. Returns the stack itself.

## Queues

A Queue is an ordered collection where you can enqueue and dequeue elements in First-In First-Out (FIFO) order. It is backed by a LinkedList and thus the associated methods are all fast.

To instantiate a Queue:

```javascript
let queue = Collections.newQueue();
```

A Queue implements the following methods:

**dequeue()** removes the front element of the queue. Returns the removed element, or undefined if the queue is empty.

**enqueue(element)** adds the argument element to the end of the queue.

**peek()** returns the front element of the queue, or undefined if the queue is empty.

### PriorityQueue

A PriorityQueue is a Queue that orders its elements according to a *compare_fn*, which can be provided during instantiation via an options object. If no *compare_fn* is provided then a default (natural) ordering is used.

To instantiate a To instantiate a Queue:

```javascript
let priority_queue = Collections.newPriorityQueue({ compare_fn: your_compare_fn }); // compare_fn is optional
```

# A note on *equals*, *hashCode* and *compare_fn*

To figure out whether any given object is contained in a collection, the collection must have a way of testing whether two objects are equal to one another. This is done by an *equals* function. If you do not provide an *equals(obj)* function on the objects that you add to the collection then a default implementation is used that (via object reflection) works just fine (in most cases). However, you might want to provide an *equals(obj)* function on your objects to speed up performance (since object reflection is not particularly fast). Note that *a.equals(b)* and *b.equals(a)* must return the same value.

Similary, to index elements efficiently within a collection, the collection must have a way of creating indexes (or hash codes) for the objects to be added to the collection. This is done by a *hashCode* function. If you do not provide a *hashCode* function on the objects that you add to the collection then a default implementation is used that (via object reflection) works just fine (in most cases). However, you might want to provide an *hashCode(obj)* function on your objects to speed up performance (since object reflection is not particularly fast). Note that if *a.equals(b)* is true then *a.hashCode() === b.hashCode()* must be true as well. Writing a good *hashCode* function takes some skill, but you can use the example below as inspiration. You can also find plenty of help online.

Lastly, some collections need sorting. For example, the PriorityQueue keeps its elements in priority order. Such sorting is done by a "compare_fn" function. If you do not provide a "compare_fn" then a default implementation is used that uses natural ordering (converting objects to strings if necessary). However, you might want to provide a *compare_fn(obj1, obj2)* function for greater flexibility and/or to speed up performance (since e.g. stringification is not particularly fast). The *compare_fn(obj1, obj2)* function must return a value as follows:
- Less than 0 (zero) if obj1 comes before obj2.
- 0 (zero) if obj1 and obj2 have the same sorting order. Normally, to be consistent with the *equals()* function mentioned above, then if *obj1.equals(obj2)* is true then *compare_fn(obj1, obj2) == 0* must be true as well.
- Greater than 0 (zero) if obj1 comes after obj2.

Here is an example of *equals*, *hashCode* and *compare_fn* implementations:

```javascript
const Collections = require('ncollections');

class Person {
  name;
  age;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  equals(obj) {
    if (this == obj)
      return true;
    if (!(obj instanceof Person))
      return false;
    return this.name == obj.name && this.age == obj.age;
  }
  hashCode() {
    let hash = 17;
    hash = hash * 23 + this.#hashCodeFromString(this.name);
    hash = hash * 23 + this.age;
    hash |= 0; // Convert to 32bit integer
    return hash;
  }
  #hashCodeFromString(str) { // should be in a utility module for re-use purposes
    let hash = 0, i, chr;
    if (!str) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
    }
    hash |= 0; // Convert to 32bit integer
    return hash;
  }
}

let person1 = new Person('Morten', 48);
let person2 = new Person('Morten', 48);
let person3 = new Person('Alexander', 15);
let person4 = new Person('Alexander', 30);

console.log(person1.equals(person2)); // outputs true
console.log(person1.equals(person3)); // outputs false

console.log(person1.hashCode()); // outputs 1601127516
console.log(person4.hashCode()); // outputs -1159287671

// sort by name then age
let compare_fn = function(person1, person2) {
  let compare = person1.name.localeCompare(person2.name);
  if (compare != 0) return compare;
  return person1.age - person2.age;
}

let persons = Collections.newArrayList().addAll([ person1, person2, person3, person4 ]).sort(compare_fn);
console.log(persons.toString()); // outputs [{"name":"Alexander","age":15},{"name":"Alexander","age":30},{"name":"Morten","age":48},{"name":"Morten","age":48}]
```
