'use strict'

require(__dirname + '/index-test.js');
require(__dirname + '/Util-test.js');

const PriorityQueueTest = require(__dirname + '/PriorityQueueTest.js');
const QueueTest = require(__dirname + '/QueueTest.js');
const StackTest = require(__dirname + '/StackTest.js');

describe('PriorityQueue', function() { new PriorityQueueTest().run(); });
describe('Queue', function() { new QueueTest().run(); });
describe('Stack', function() { new StackTest().run(); });

