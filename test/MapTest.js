'use strict'

const assert = require('assert');

const ArrayList = require(__dirname + '/../main/ArrayList.js');
const HashSet = require(__dirname + '/../main/HashSet.js');
const Map = require(__dirname + '/../main/Map.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class MapTest extends CollectionTest {

  constructor(mapClass, options={}) {
    super(mapClass, options);
  }

  run() {
    super.run();
    this.test_containsKey(this);
    this.test_containsValue(this);
    this.test_entries(this);
    this.test_get(this);
    this.test_keys(this);
    this.test_put(this);
    this.test_putAll(this);
    this.test_remove(this);
    this.test_values(this);
  }

  test_clear(test) {
    describe('#clear', function() {
      it('{1->2} -> (empty)', function() {
        let map = test.newInstance();
        map.put(1,2);
        map.clear();
        assert(map.isEmpty());
      });
    });
  }

  test_clone(test) {
    describe('#clone', function() {
      it('{1->2,3->4} -> {1->2,3->4}', function() {
        let map = test.newInstance();
        map.put(1,2);
        map.put(3,4);
        let clone = map.clone();
        assert(map.equals(clone));
      });
    });
  }

  test_containsKey(test) {
    describe('#containsKey', function() {
      it('{1->2} contains 1 -> true', function() {
        let map = test.newInstance();
        map.put(1,2);
        assert(map.containsKey(1));
      });
      it('{1->2} contains 2 -> false', function() {
        let map = test.newInstance();
        map.put(1,2);
        assert(!map.containsKey(2));
      });
    });
  }

  test_containsValue(test) {
    describe('#containsValue', function() {
      it('{1->2 contains 2 -> true', function() {
        let map = test.newInstance();
        map.put(1,2);
        assert(map.containsValue(2));
      });
      it('{1->2} contains 1 -> false', function() {
        let map = test.newInstance();
        map.put(1,2);
        assert(!map.containsValue(1));
      });
    });
  }

  test_entries(test) {
    describe('#entries', function() {
      it('{1->2,3->4} -> {1->2,3->4}', function() {
        let map = test.newInstance();
        map.put(1,2);
        map.put(3,4);
        let set = new HashSet();
        set.addAll(map.entries());
        assert(set.contains({ key: 1, value: 2 }));
        assert(set.contains({ key: 3, value: 4 }));
        assert(set.size() == 2);
      });
    });
  }

  test_equals(test) {
    describe('#equals', function() {
      it('{1->2,3->4} == {1->2,3->4}', function() {
        let map1 = test.newInstance();
        map1.put(1,2);
        map1.put(3,4);
        let map2 = test.newInstance();
        map2.put(1,2);
        map2.put(3,4);
        assert(map1.equals(map2));
        assert(map2.equals(map1));
      });
      it('{1->2,3->4} == {1->2,3->5}', function() {
        let map1 = test.newInstance();
        map1.put(1,2);
        map1.put(3,4);
        let map2 = test.newInstance();
        map2.put(1,2);
        map2.put(3,5);
        assert(!map1.equals(map2));
        assert(!map2.equals(map1));
      });
    });
  }

  test_get(test) {
    describe('#get', function() {
      it('{1->2,3-4} get 1 -> 2', function() {
        let map = test.newInstance();
        map.put(1,2);
        map.put(3,4);
        assert(map.get(1) == 2);
      });
      it('{1->2,3-4} get 5 -> undefined', function() {
        let map = test.newInstance();
        map.put(1,2);
        map.put(3,4);
        assert(map.get(5) == undefined);
      });
    });
  }

  test_hashCode(test) {
    describe('#hashCode', function() {
      it('{1->2,3-4} -> ', function() {
        let map = test.newInstance();
        map.put(1,2);
        map.put(3,4);
        assert(map.hashCode() == 1697693009220);
      });
      it('hash code of {1->2,3-4} == hash code of {1->2,3-4}', function() {
        let map1 = test.newInstance();
        map1.put(1,2);
        map1.put(3,4);
        let map2 = test.newInstance();
        map2.put(1,2);
        map2.put(3,4);
        assert(map1.hashCode() == map2.hashCode());
      });
      it('hash code of {1->2,3-4} != hash code of {1->2,3-5}', function() {
        let map1 = test.newInstance();
        map1.put(1,2);
        map1.put(3,4);
        let map2 = test.newInstance();
        map2.put(1,2);
        map2.put(3,5);
        assert(map1.hashCode() != map2.hashCode());
      });
    });
  }

  test_isEmpty(test) {
    describe('#isEmpty', function() {
      it('{} -> true', function() {
        let map = test.newInstance();
        assert(map.isEmpty());
      });
      it('{1->2} -> false', function() {
        let map = test.newInstance();
        map.put(1,2);
        assert(!map.isEmpty());
      });
    });
  }

  test_keys(test) {
    describe('#keys', function() {
      it('{1->2,3-4} -> {1,3}', function() {
        let map = test.newInstance();
        map.put(1,2);
        map.put(3,4);
        let keys = map.keys().toArray();
        assert(keys.length == 2);
        assert(keys.includes(1));
        assert(keys.includes(3));
      });
    });
  }

  test_next(test) {
    describe('#next', function() {
      it('{1->2,3-4} -> (1->2) -> (3->4)', function() {
        let map = test.newInstance();
        map.put(1,2);
        map.put(3,4);
        let entries = new ArrayList();
        entries.addAll(map);
        assert(entries.size() == 2);
        assert(entries.contains({key:1,value:2}));
        assert(entries.contains({key:3,value:4}));
      });
    });
  }

  test_put(test) {
    describe('#put', function() {
      it('{} + (1,2) -> undefined & {1,2}', function() {
        let map = test.newInstance();
        assert(map.put(1,2) == undefined);
        assert(map.size() == 1);
        assert(map.get(1) == 2);
      });
      // duplicate keys
    });
  }

  test_putAll(test) {
    // todo
  }

  test_remove(test) {
    // todo
  }

  test_size(test) {
    // todo
  }

  test_toArray(test) {
    // todo
  }

  test_values(test) {
    // duplicate values, e.g. 1->2, 2->2
    // todo
  }
}

module.exports = MapTest;
