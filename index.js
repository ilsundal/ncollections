'use strict'

const COLLECTIONS = {
  ArrayList: require(__dirname + '/main/ArrayList.js'),
  Deque: require(__dirname + '/main/Deque.js'),
  HashSet: require(__dirname + '/main/HashSet.js'),
  LinkedList: require(__dirname + '/main/LinkedList.js'),
  List: require(__dirname + '/main/ArrayList.js'), // default list: ArrayList
  PriorityQueue: require(__dirname + '/main/PriorityQueue.js'),
  Queue: require(__dirname + '/main/Queue.js'),
  Set: require(__dirname + '/main/HashSet.js'), // default set: HashSet
  Stack: require(__dirname + '/main/Stack.js')
}

module.exports = {};

for (let [collectionName, collectionClass] of Object.entries(COLLECTIONS)) {
  module.exports[collectionName] = collectionClass;
  module.exports['new' + collectionName] = function(options) { return new collectionClass(options); };
}
