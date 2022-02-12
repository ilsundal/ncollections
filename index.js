'use strict'

const COLLECTIONS = {
  ArrayList: require(__dirname + '/main/ArrayList.js'),
  Deque: require(__dirname + '/main/Deque.js'),
  HashMap: require(__dirname + '/main/HashMap.js'),
  HashSet: require(__dirname + '/main/HashSet.js'),
  IndexSet: require(__dirname + '/main/IndexSet.js'),
  LinkedList: require(__dirname + '/main/LinkedList.js'),
  List: require(__dirname + '/main/ArrayList.js'), // default list: ArrayList
  Map: require(__dirname + '/main/HashMap.js'), // default map: HashMap
  PriorityQueue: require(__dirname + '/main/PriorityQueue.js'),
  Queue: require(__dirname + '/main/Queue.js'), // default queue: SimpleQueue
  Set: require(__dirname + '/main/HashSet.js'), // default set: HashSet
  SimpleQueue: require(__dirname + '/main/SimpleQueue.js'),
  SortedMap: require(__dirname + '/main/TreeSet.js'), // default set: TreeSet
  SortedSet: require(__dirname + '/main/TreeSet.js'), // default set: TreeSet
  Stack: require(__dirname + '/main/Stack.js'),
  TreeMap: require(__dirname + '/main/TreeMap.js'),
  TreeSet: require(__dirname + '/main/TreeSet.js')
}

module.exports = {};

for (let [collectionName, collectionClass] of Object.entries(COLLECTIONS)) {
  module.exports[collectionName] = collectionClass; // expose class directly
  module.exports['new' + collectionName] = function(options) { return new collectionClass(options); }; // expose builder function
}
