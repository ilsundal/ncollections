'use strict'

const assert = require('assert');

const LinkedList = require(__dirname + '/../main/LinkedList.js');

const ListTest = require(__dirname + '/ListTest.js');

class LinkedListTest extends ListTest {

  constructor(options={}) {
    super(LinkedList, options);
  }
}

module.exports = LinkedListTest;
