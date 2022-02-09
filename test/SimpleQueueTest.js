'use strict'

const SimpleQueue = require(__dirname + '/../main/SimpleQueue.js');

const QueueTest = require(__dirname + '/QueueTest.js');

class SimpleQueueTest extends QueueTest {

  constructor(options={}) {
    super(SimpleQueue, options);
  }
}

module.exports = SimpleQueueTest;
