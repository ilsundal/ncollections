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

All Collections implement the following methods:

**clear()** clears (empties) the collection.

**clone()** returns a shallow clone of the collection.

**equals(collection)** returns true if the collection is equal to the argument collection, and false if not.

**hashCode()** returns an integer hash code of the collection.

**isEmpty()** returns true if the collection is empty, and false if not.

**size()** returns the collection size.

**toArray()** returns an array of the collection elements in iteration order.

**toString()** returns a string representation of the collection in iteration order.

All collections implement the [iteration and iterable protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

## Lists: ArrayList and LinkedList

A List is an ordered collection that allows for duplicates.

There are two List-types: ArrayList and LinkedList.
- The ArrayList is backed by a JavaScript array. Thus, the *getAt()*, *add()* and *addLast()* operations run in constant time, while inserting and removing elements within the list runs in linear time (due to element shifting).
- The LinkedList is backed by a next-previous (double-linked) node structure. Thus, adding, retrieving and removing elements from the front or end of the list run in constant time, while indexed operations run in linear time. (Index searching automatically choses whether to search forwards or backwards depending on what is fastest.)

All Lists implement the following methods:

**add(element)** adds the argument element to the end of the list. Returns the list itself.

**addAll(elements)** adds all the argument elements (an iterable) to the end of the list, in iteration order. Returns the list itself.

**addFirst(element)** adds the argument element to the front of the list. Returns the list itself.

**addLast(element)** adds the argument element to the end of the list. Returns the list itself.

**contains(element)** returns true if the list contains the argument element, and false if not.

**containsAll(elements)** returns true if the list contains all of the argument elements (an iterable), and false if not.

**getAt(index)** returns the element at the argument index position. An IndexOutOfBoundsException is thrown if the index is out of bounds.

**getFirst()** returns the first element of the list. A NoSuchElementException is thrown if the list is empty.

**getLast()** returns the last element of the list. A NoSuchElementException is thrown if the list is empty.

**indexOf(element)** returns the first occurrence of the argument element in the list, or undefined if the list does not contain the argument element.

**insertAt(index, element)** inserts the argument element at the argument index position in the list. Returns the list itself.

**lastIndexOf(element)** returns the last occurrence of the argument element in the list, or undefined if the list does not contain the argument element.

**remove(element)** removes the argument element from the collection. Returns true if an element was removed from the list, and false if not. If the list contains several elements that are equal to the argument element then only the first such element will be removed.

**removeAll(elements)** removes the argument elements (an iterable) from the collection. Returns true if any element was removed from the list, and false if not. If the list contains several elements that are equal to any of argument elements then only the first such element will be removed.

**removeAt(index)** removes the element at the argument index position in the list. It returns the removed element. An IndexOutOfBoundsException is thrown if the index is out of bounds.

**removeFirst()** removes the first element of the list. It returns the removed element. A NoSuchElementException is thrown if the list is empty.

**removeLast()** removes the last element of the list. It returns the removed element. A NoSuchElementException is thrown if the list is empty.

**reverse()** reverses the list in place. Returns the list itself.

**setAt(index, element)** replaces the element at the argument index position in the list with the argument element. The replaced element is returned. An IndexOutOfBoundsException is thrown if the index is out of bounds.

**setFirst(element)** replaces the first element of the list with the argument element. The replaced element is returned. A NoSuchElementException is thrown if the list is empty.

**setLast(element)** replaces the last element of the list with the argument element. The replaced element is returned. A NoSuchElementException is thrown if the list is empty.

**sort(compare_fn)** sorts the list in place, optionally with a custom compare function. Returns the list itself.

## Maps: HashMap

## Sets: HashSet

## Deque

## Stack

## Queue

## PriorityQueue

# A note on *equals*, *hashCode* and *compare*
