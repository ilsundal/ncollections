# ncollections - neat collections for JavaScript
ncollections provides a selection of neatly designed collections for JavaScript.

The collections are
- ArrayList and LinkedList
- HashSet and NativeSet
- HashMap and NativeMap
- Queue and PriorityQueue
- Deque and Stack

Why use ncollections?
- **More collections** With standard JavaScript, you only have maps (via objects), arrays and sets.
- **Well-designed** ncollections is small and neat and easy-to-use, flexible and extendable. Elements (and keys) can be any value, both primitive values and objects.
- **Small foot-print** ncollections does not use any packages. The main directory is small and can be zipped to ~16KB.
- **Plain JavaScript** Use both in browsers and Node.js.
- **Equals and hash code** You can optionally provide your own custom *equals* and *hashCode* methods for you own objects e.g. to boost performance.

The design has been inspired by the [Java Collections Framework](https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html). Default and solid implementations are provided for *equals* and *hashcode* to make ncollections even easier to use.

# Example

```javascript
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

// The other Collections (Stack, Deque, Queue, etc.) are similarly designed.
```

# Installation

## Server-side usage

```
npm install ncollections
```

## Client-side usage

No distributables are yet provided, such as through a CDN.

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

### LinkedList

The LinkedList is backed by a next-previous (double-linked) node structure. Thus, adding, retrieving and removing elements from the front or end of the list is fast, while *getAt* and *setAt* are slower due to linear search. (The linear search automatically chooses whether to search forwards from the first node or backwards from the last node depending on what is fastest.)

## Maps

A Map is a key-value collection where a (unique) key is mapped to a value. Collectively, a key and its mapped-to value is called an entry and is simply an object with two properties: "key" and "value". Both keys and values can be primitive values or objects. To get all the entries of a map simply iterate over it; thus, there is no *entries* method.

All Maps implement the following methods:

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

### NativeMap

The NativeMap is a thin wrapper around [JavaScript's built-in Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and adapts it to the ncollections framework. NativeMap is (slightly) faster than HashMap but is based on == equality and thus does not support *equals* and *hashCode* methods.

## Sets

A Set is collection without duplicates.

All Sets implement the following methods:

**add(element)** adds the argument element to the set. Returns true if the set was changed (i.e. the set did not already contain the element), and false if not.

**addAll(elements)** adds the argument elements (an iterable) to the set. Returns true if the set was changed, and false if not.

**contains(element)** returns true if the set contains the argument element, and false if not.

**containsAll(elements)** returns true if the set contains all of the argument elements (an iterable), and false if not.

**remove(element)** removes the argument elment from the set. Returns true if the set was changed (i.e. the set contained the element), and false if not.

**removeAll(elements)** removes the argument elments (an iterable) from the set. Returns true if the set was changed, and false if not.

### HashSet

The HashSet is a Set that is backed by [JavaScript's built-in Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). Thus, the *add*, *contains*, and *remove* methods are fast. A HashSet is not ordered.

### NativeSet

The NativeSet is a thin wrapper around [JavaScript's built-in Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and adapts it to the ncollections framework. NativeSet is (slightly) faster than HashSet but is based on == equality and thus does not support *equals* and *hashCode* methods.

## Deque

A Deque is an ordered collection where you can add, peek and poll the first (front) and last (end) elements. It is backed by a LinkedList and thus the associated methods are all fast.

The Deque implements the following methods:

**addFirst(element)** adds the argument element to the front of the deque. Returns the deque itself.

**addLast(element)** adds the argument element to the end of the deque. Returns the deque itself.

**peekFirst()** returns the first element of the deque, or undefined if the deque is empty.

**peekLast()** returns the last element of the deque, or undefined if the deque is empty.

**pollFirst()** removes the first element of the deque, if any. Returns the removed element, or undefined if the deque is empty.

**pollLast()** removes the last element of the deque, if any. Returns the removed element, or undefined if the deque is empty.

## Stack

A Stack is an ordered collection where you can pop and push elements in Last-In First-Out (LIFO) order.  It is backed by a LinkedList and thus the associated methods are all fast.

The Stack implements the following methods:

**peek()** returns the last-pushed element, or undefined if the stack is empty.

**pop()** removes the last-pushed element. Returns the removed element, or undefined if the stack is empty.

**push(element)** adds the argument element to the (end of, or top of) the stack. Returns the stack itself.

## Queues

A Queue is an ordered collection where you can enqueue and dequeue elements in First-In First-Out (FIFO) order. It is backed by a LinkedList and thus the associated methods are all fast.

The Queue implements the following methods:

**dequeue()** removes the front element of the queue. Returns the removed element, or undefined if the queue is empty.

**enqueue(element)** adds the argument element to the end of the queue.

**peek()** returns the front element of the queue, or undefined if the queue is empty.

### PriorityQueue

A PriorityQueue is (a sub-class of) a Queue that orders its elements according to a *compare_fn* provided during instantiation via an options object, e.g.:
```javascript
let priority_queue = Collections.newPriorityQueue({ compare_fn: your_compare_fn });
```
If no *compare_fn* is provided then a default (natural) ordering is used. Note that keeping order in a LinkedList requires linear operations, which is not fast (but is only really an issue with big queues). When a sorted Set (such as a TreeSet) is added as a new collection type, the PriorityQueue may optionally be backed by that instead of by the LinkedList.

# A note on *equals*, *hashCode* and *compare_fn*

To figure out whether any given object is contained in a collection, the collection must have a way of testing whether two objects are equal to one another. This is done by an *equals* function. If you do not provide an *equals(obj)* function on the objects that you add to the collection then a default implementation is used that (via object reflection) works just fine (in most cases). However, you might want to provide an *equals(obj)* function on your objects to speed up performance (since object reflection is not particularly fast). Note that if *a.equals(b)* is true then *b.equals(a)* should also be true.

Similary, to index elements efficiently within a collection, the collection must have a way of creating indexes (or hash codes) for the objects to be added to the collection. This is done by a *hashCode* function. If you do not provide a *hashCode* function on the objects that you add to the collection then a default implementation is used that (via object reflection) works just fine (in most cases). However, you might want to provide an *hashCode(obj)* function on your objects to speed up performance (since object reflection is not particularly fast). Note that if *a.equals(b)* is true then *a.hashCode() == b.hashCode()* must be true as well. Writing a good *hashCode* function takes some skill, but you can use the example below as inspiration. You can find plenty of help online.

Lastly, some collections need sorting. For example, the PriorityQueue keeps its elements in priority order. Such sorting is done by a "compare_fn" function. If you do not provide a "compare_fn" then a default implementation is used that uses natural ordering (converting objects to strings if necessary). However, you might want to provide a *compare_fn(obj1, obj2)* function for greater flexibility and/or to speed up performance (since e.g. stringification is not particularly fast). The *compare_fn(obj1, obj2)* function must return a value as follows:
- Less than 0 (zero) if obj1 comes before obj2.
- 0 (zero) if obj1 and obj2 have the same sorting order. Normally, to be consistent with the *equals()* function mentioned above, then if *obj1.equals(obj2)* is true then *compare_fn(obj1, obj2) == 0* must be true as well.
- Greater than 0 (zero) if obj1 comes after obj2.

Here is an example of *equals*, *hashCode* and *compare_fn* implementations:

```javascript
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
- **Well-designed** ncollections is small and neat and easy-to-use, flexible and extendable. Elements can be any value, both primitive values and objects.
- **Small foot-print** ncollections does not use any packages. The main directory is small and can be zipped to 15KB.
- **Plain JavaScript** Use both in browsers and Node.js.
- **Equals and hash code** You can optinally provide your own custom *equals* and *hashCode* methods for you own objects e.g. to boost performance.

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

## Client-side usage

No distributables are yet provided, such as through a CDN.

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

## Lists: ArrayList and LinkedList

A List is an ordered collection that allows for duplicates.

There are two List-types: ArrayList and LinkedList.
- The ArrayList is backed by a JavaScript array. Thus, the *getAt()* and *setAt()* methods are fast, while list insertions and removals are slower (due to possible element shifting and array resizing). The *toAtray()* method returns the backed array directly which thus allows you to access and modify the ArrayList directly using any JavaScript array function, such as *splice()*.
- The LinkedList is backed by a next-previous (double-linked) node structure. Thus, adding, retrieving and removing elements from the front or end of the list is fast, while *getAt()* and *setAt()* are slower due to linear search. (The linear search automatically chooses whether to search forwards from the first node or backwards from the last node depending on what is fastest.)

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

## Maps: HashMap

A Map is a key-value collection where a (unique) key is mapped to a value. Collectively, a key and its mapped-to value is called an entry and is simply an object with two properties: "key" and "value". Both keys and values can be primitive values or objects.

There is only one Map-type at the moment: HashMap.
- The HashMap is backed by JavaScript's built-in Map. Thus, the *containsKey()*, *get()*, *put()*, and *remove()* methods are fast.

All Maps implement the following methods:

**containsKey(key)** returns true if the map contains the argument key, and false if not.

**containsValue(value)** returns true if the map contains the argument value, and false if not.

**entries()** returns the map's entries in a Set. The returned Set might be backed directly by the map and thus should not be modified.

**get(key)** returns the value mapped-to by the argument key, or undefined if the map does not contain the key.

**keys** returns map's keys in a Set. The returned Set might be backed directly by the map and thus should not be modified.

**put(key, value)** maps the argument key to the argument value. Returns the value previously mapped-to by the key, or undefined if the map contained no such key before.

**putAll(entries)** puts the argument entries (an iterable) into the map. Returns nothing.

**remove(key)** removes the argument key and its mapped-to value from the map. Returns the mapped-to value of the key, or undefined if the map contained no such key before.

**removeAll(keys)** removes the argument keys and their mapped-to values from the map. Returns the removed map entries.

## Sets: HashSet

A Set is collection without duplicates.

There is only one Set-type at the moment: HashSet.
- The HashSet is backed by JavaScript's built-in Map. Thus, the *add()*, *contains()*, and *remove()* methods are fast. A HashSet is not ordered.

All Sets implement the following methods:

**add(element)** adds the argument element to the set. Returns true if the set was changed (i.e. the set did not already contain the element), and false if not.

**addAll(elements)** adds the argument elements (an iterable) to the set. Returns true if the set was changed, and false if not.

**contains(element)** returns true if the set contains the argument element, and false if not.

**containsAll(elements)** returns true if the set contains all of the argument elements (an iterable), and false if not.

**remove(element)** removes the argument elment from the set. Returns true if the set was changed (i.e. the set contained the element), and false if not.

**removeAll(elements)** removes the argument elments (an iterable) from the set. Returns true if the set was changed, and false if not.

## Deque

A Deque is an ordered collection where you can add, peek and poll the first (front) and last (end) elements. It is backed by a LinkedList and thus the associated methods are all fast.

The Deque implements the following methods:

**addFirst(element)** adds the argument element to the front of the deque. Returns the deque itself.

**addLast(element)** adds the argument element to the end of the deque. Returns the deque itself.

**peekFirst()** returns the first element of the deque, or undefined if the deque is empty.

**peekLast()** returns the last element of the deque, or undefined if the deque is empty.

**pollFirst()** removes the first element of the deque, if any. Returns the removed element, or undefined if the deque is empty.

**pollLast()** removes the last element of the deque, if any. Returns the removed element, or undefined if the deque is empty.

## Stack

A Stack is an ordered collection where you can pop and push elements in Last-In First-Out (LIFO) order.  It is backed by a LinkedList and thus the associated methods are all fast.

The Stack implements the following methods:

**peek()** returns the last-pushed element, or undefined if the stack is empty.

**pop()** removes the last-pushed element. Returns the removed element, or undefined if the stack is empty.

**push(element)** adds the argument element to the (end of, or top of) the stack. Returns the stack itself.

## Queue and PriorityQueue

A Queue is an ordered collection where you can enqueue and dequeue elements in First-In First-Out (FIFO) order. It is backed by a LinkedList and thus the associated methods are all fast.

The Queue implements the following methods:

**dequeue()** removes the front element of the queue. Returns the removed element, or undefined if the queue is empty.

**enqueue(element)** adds the argument element to the end of the queue.

**peek()** returns the front element of the queue, or undefined if the queue is empty.

### PriorityQueue

A PriorityQueue is (a sub-class of) a Queue that orders its elements according to a *compare_fn* provided during instantiation via an options object, e.g.:
```javascript
let priority_queue = Collections.newPriorityQueue({ compare_fn: your_compare_fn });
```
If no *compare_fn* is provided then a default (natural) ordering is used. Note that keeping order in a LinkedList requires linear operations, which is not fast (but is only really an issue with big queues).

# A note on *equals*, *hashCode* and *compare_fn*

To figure out whether any given object is contained in a collection, the collection must have a way of testing whether two objects are equal to one another. This is done by an *equals* function. If you do not provide an *equals(obj)* function on the objects that you add to the collection then a default implementation is used that (via object reflection) works just fine (in nearly all cases). However, you might want to provide an *equals(obj)* function on your objects to speed up performance (since object reflection is not particularly fast). Note that if *a.equals(b)* is true then *b.equals(a)* should also be true.

Similary, to index elements efficiently within a collection, the collection must have a way of creating indexes (or hash codes) for the objects to be added to the collection. This is done by a *hashCode* function. If you do not provide a *hashCode* function on the objects that you add to the collection then a default implementation is used that (via object reflection) works just fine (in nearly all cases). However, you might want to provide an *hashCode(obj)* function on your objects to speed up performance (since object reflection is not particularly fast). Note that if *a.equals(b)* is true then *a.hashCode() == b.hashCode()* must be true as well. Writing a good *hashCode* function takes some skill, but you can use the example below as inspiration. You can find plenty of help online.

Lastly, some collections need sorting. For example, the PriorityQueue keeps its elements in priority order. Such sorting is done by a "compare_fn" function. If you do not provide a "compare_fn" then a default implementation is used that uses natural ordering (converting objects to strings if necessary). However, you might want to provide a *compare_fn(obj1, obj2)* function for greater flexibility and/or to speed up performance (since e.g. stringification is not particularly fast). The *compare_fn(obj1, obj2)* function must return a value as follows:
- Less than 0 (zero) if obj1 comes before obj2.
- 0 (zero) if obj1 and obj2 have the same sorting order. Normally, to be consistent with the *equals()* function mentioned above, then if *obj1.equals(obj2)* is true then *compare_fn(obj1, obj2) == 0* must be true as well.
- Greater than 0 (zero) if obj1 comes after obj2.

Here is an example of *equals*, *hashCode* and *compare_fn* implementations:

```javascript
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

let person1 = new Person('Morten Helles', 48);
let person2 = new Person('Morten Helles', 48);
let person3 = new Person('Alexander Helles', 15);
let person4 = new Person('Alexander Helles', 30);

console.log(person1.equals(person2)); // outputs true
console.log(person1.equals(person3)); // outputs false

console.log(person1.hashCode()); // outputs 1465413891
console.log(person4.hashCode()); // outputs -2103045166

// sort by name then age
let compare_fn = function(person1, person2) {
  let compare = person1.name.localeCompare(person2.name);
  if (compare != 0) return compare;
  return person1.age - person2.age;
}

let persons = Collections.newArrayList().addAll([ person1, person2, person3, person4 ]).sort(compare_fn);
console.log(persons.toString()); // outputs [{"name":"Alexander Helles","age":15},{"name":"Alexander Helles","age":30},{"name":"Morten Helles","age":48},{"name":"Morten Helles","age":48}]
```
