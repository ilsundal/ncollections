'use strict'

const assert = require('assert');

const HashSet = require(__dirname + '/../main/HashSet.js');
const Sets = require(__dirname + '/Sets.js');

describe('HashSet', function() {

  Sets.run(HashSet);
});
