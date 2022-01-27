'use strict'

const assert = require('assert');

const Map = require(__dirname + '/../main/Map.js');
const Util = require(__dirname + '/../main/Util.js');

const Collections = require(__dirname + '/Collections.js');

function run(mapClass, options={}) {

  Collections.run(mapClass, options);
  assert(Util.isSubClassOf(mapClass, Map));
}

module.exports = {
  run: run
};
