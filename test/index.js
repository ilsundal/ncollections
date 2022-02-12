'use strict'

require(__dirname + '/index-test.js');
require(__dirname + '/Util-test.js');

const HashSet = require(__dirname + '/../main/HashSet.js');
const UnmodifiableCollection = require(__dirname + '/../main/UnmodifiableCollection.js');

const ArrayListTest = require(__dirname + '/ArrayListTest.js');
const DequeTest = require(__dirname + '/DequeTest.js');
const HashMapTest = require(__dirname + '/HashMapTest.js');
const HashSetTest = require(__dirname + '/HashSetTest.js');
const IndexSetTest = require(__dirname + '/IndexSetTest.js');
const LinkedListTest = require(__dirname + '/LinkedListTest.js');
const PriorityQueueTest = require(__dirname + '/PriorityQueueTest.js');
const SimpleQueueTest = require(__dirname + '/SimpleQueueTest.js');
const StackTest = require(__dirname + '/StackTest.js');
const TreeMapTest = require(__dirname + '/TreeMapTest.js');
const TreeSetTest = require(__dirname + '/TreeSetTest.js');
const UnmodifiableCollectionTest = require(__dirname + '/UnmodifiableCollectionTest.js');

describe('ArrayList', function() { new ArrayListTest().run(); });
describe('Deque', function() { new DequeTest().run(); });
describe('HashMap', function() { new HashMapTest().run(); });
describe('HashSet', function() { new HashSetTest().run(); });
describe('IndexSet', function() { new IndexSetTest().run(); });
describe('LinkedList', function() { new LinkedListTest().run(); });
describe('PriorityQueue', function() { new PriorityQueueTest().run(); });
describe('SimpleQueue', function() { new SimpleQueueTest().run(); });
describe('Stack', function() { new StackTest().run(); });
describe('TreeMap', function() { new TreeMapTest().run(); });
describe('TreeSet', function() { new TreeSetTest().run(); });
describe('UnmodifiableCollectionTest(UnmodifiableCollection,HashSet)', function() { new UnmodifiableCollectionTest(UnmodifiableCollection, HashSet).run(); });

