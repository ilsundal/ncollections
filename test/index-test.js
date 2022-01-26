'use strict'

const assert = require('assert');

const Collections = require(__dirname + '/../index.js');
const Util = require(__dirname + '/../main/Util.js');

const collectionNameToClassMap = {
  ArrayList: require(__dirname + '/../main/ArrayList.js'),
  Deque: require(__dirname + '/../main/Deque.js'),
  HashSet: require(__dirname + '/../main/HashSet.js'),
  LinkedList: require(__dirname + '/../main/LinkedList.js'),
  List: require(__dirname + '/../main/ArrayList.js'),
  PriorityQueue: require(__dirname + '/../main/PriorityQueue.js'),
  Queue: require(__dirname + '/../main/Queue.js'),
  Set: require(__dirname + '/../main/HashSet.js'),
  Stack: require(__dirname + '/../main/Stack.js')
};

describe('index', function() {

  for (let [collectionName, collectionClass] of Object.entries(collectionNameToClassMap)) {
    describe(`#${collectionName}`, function() {
      it('should work', function() { assert(Collections[collectionName] === collectionClass); });
    });
    describe(`#new${collectionName}`, function() {
      it('should work', function() { assert(Collections['new' + collectionName]() instanceof collectionClass); });
    });
  };
});
