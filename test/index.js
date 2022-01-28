'use strict'

require(__dirname + '/index-test.js');
require(__dirname + '/Util-test.js');

const HashMapTest = require(__dirname + '/HashMapTest.js');
const PriorityQueueTest = require(__dirname + '/PriorityQueueTest.js');
const QueueTest = require(__dirname + '/QueueTest.js');
const StackTest = require(__dirname + '/StackTest.js');

describe('HashMap', function() { new HashMapTest().run(); });
describe('PriorityQueue', function() { new PriorityQueueTest().run(); });
describe('Queue', function() { new QueueTest().run(); });
describe('Stack', function() { new StackTest().run(); });

