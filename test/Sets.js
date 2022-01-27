'use strict'

const assert = require('assert');

const ArrayList = require(__dirname + '/../main/ArrayList.js');
const Collections = require(__dirname + '/Collections.js');
const Set = require(__dirname + '/../main/Set.js');
const Util = require(__dirname + '/../main/Util.js');

function run(setClass, options={}) {

  Collections.run(setClass);
  assert(Util.isSubClassOf(setClass, Set));

  describe('#add', function() {

    it('{1} + 1 -> false & {1}', function() {
      let set = new setClass();
      set.add(1);
      assert(!set.add(1));
      assert(set.size() == 1);
      assert(set.contains(1));
    });
  });

  describe('#addAll', function() {

    it('{1} + {1} -> false & {1}', function() {
      let set = new setClass();
      set.add(1);
      assert(!set.addAll([1]));
      assert(set.size() == 1);
      assert(set.contains(1));
    });
  });

  describe('#equals', function() {

    it('{} equals [] -> false', function() {
      let set = new setClass();
      let list = new ArrayList();
      assert(!set.equals(list));
    });
  });
}

module.exports = {
  run: run
};
