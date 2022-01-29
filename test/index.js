'use strict'

require(__dirname + '/index-test.js');
require(__dirname + '/Util-test.js');

const HashSet = require(__dirname + '/../main/HashSet.js');

const DequeTest = require(__dirname + '/DequeTest.js');
const HashMapTest = require(__dirname + '/HashMapTest.js');
const HashSetTest = require(__dirname + '/HashSetTest.js');
const PriorityQueueTest = require(__dirname + '/PriorityQueueTest.js');
const QueueTest = require(__dirname + '/QueueTest.js');
const StackTest = require(__dirname + '/StackTest.js');
const UnmodifiableCollectionTest = require(__dirname + '/UnmodifiableCollectionTest.js');

describe('Deque', function() { new DequeTest().run(); });
describe('HashMap', function() { new HashMapTest().run(); });
describe('HashSet', function() { new HashSetTest().run(); });
describe('PriorityQueue', function() { new PriorityQueueTest().run(); });
describe('Queue', function() { new QueueTest().run(); });
describe('Stack', function() { new StackTest().run(); });
describe('UnmodifiableCollectionTest(HashSet)', function() { new UnmodifiableCollectionTest(HashSet).run(); });

