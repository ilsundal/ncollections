'use strict'

const assert = require('assert');

const ArrayList = require(__dirname + '/../main/ArrayList.js');
const HashSet = require(__dirname + '/../main/HashSet.js');
const Map = require(__dirname + '/../main/Map.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');
const Util = require(__dirname + '/../main/Util.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class MapTest extends CollectionTest {

  constructor(mapClass, options={}) {
    super(mapClass, options);
  }

  class_method_names = this.class_method_names.concat([
    'containsKey',
    'containsValue',
    'entries',
    'get',
    'keys',
    'put',
    'putAll',
    'remove',
    'values'
  ]);

  test_clear(test) {
    it('{1->2} -> (empty)', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.clear();
      assert(map.isEmpty());
    });
  }

  test_clone(test) {
    it('{1->2,3->4} -> {1->2,3->4}', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      let clone = map.clone();
      assert(map.equals(clone));
    });
  }

  test_containsKey(test) {
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
  }

  test_containsValue(test) {
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
  }

  test_entries(test) {
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
  }

  test_equals(test) {
    it('{1->2,3->4} == {3->4,1->2}', function() {
      let map1 = test.newInstance();
      map1.put(1,2);
      map1.put(3,4);
      let map2 = test.newInstance();
      map2.put(3,4);
      map2.put(1,2);
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
  }

  test_get(test) {
    it('{1->2,3->4} get 1 -> 2', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      assert(map.get(1) == 2);
    });
    it('{1->2,3->4} get 5 -> undefined', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      assert(map.get(5) == undefined);
    });
  }

  test_hashCode(test) {
    it('{1->2,3->4} -> ', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      assert(map.hashCode() == 1697693009220);
    });
    it('hash code of {1->2,3->4} == hash code of {1->2,3->4}', function() {
      let map1 = test.newInstance();
      map1.put(1,2);
      map1.put(3,4);
      let map2 = test.newInstance();
      map2.put(1,2);
      map2.put(3,4);
      assert(map1.hashCode() == map2.hashCode());
    });
    it('hash code of {1->2,3->4} != hash code of {1->2,3->5}', function() {
      let map1 = test.newInstance();
      map1.put(1,2);
      map1.put(3,4);
      let map2 = test.newInstance();
      map2.put(1,2);
      map2.put(3,5);
      assert(map1.hashCode() != map2.hashCode());
    });
  }

  test_isEmpty(test) {
    it('{} -> true', function() {
      let map = test.newInstance();
      assert(map.isEmpty());
    });
    it('{1->2} -> false', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(!map.isEmpty());
    });
  }

  test_keys(test) {
    it('{1->2,3->4} -> {1,3}', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      assert(Util.equals(map.keys().toArray().sort(), [1,3]));
    });
  }

  test_next(test) {
    it('{1->2,3->4} -> (1->2) -> (3->4)', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      let entries = new ArrayList();
      entries.addAll(map);
      assert(entries.size() == 2);
      assert(entries.contains({key:1,value:2}));
      assert(entries.contains({key:3,value:4}));
    });
  }

  test_put(test) {
    it('{} + (1->2) -> undefined & {1->2}', function() {
      let map = test.newInstance();
      assert(map.put(1,2) == undefined);
      assert(map.size() == 1);
      assert(map.get(1) == 2);
    });
    it('{1.>2} + (1->3) -> 2 & {1->3}', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(map.put(1,3) == 2);
      assert(map.size() == 1);
      assert(map.get(1) == 3);
    });
  }

  test_putAll(test) {
    it('{1->2} + [{1->3},{2->3}] -> & {1->3,2->3}', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.putAll([{key:1,value:3},{key:2,value:3}]);
      assert(map.size() == 2);
      assert(map.get(1) == 3);
      assert(map.get(2) == 3);
    });
  }

  test_remove(test) {
    it('{1->2} - 2 -> undefined & {1->2}', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(map.remove(2) == undefined);
      assert(map.size() == 1);
      assert(map.get(1) == 2);
    });
    it('{1->2,2->3} - 1 -> 2 & {2->3}', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(2,3);
      assert(map.remove(1) == 2);
      assert(map.size() == 1);
      assert(map.get(2) == 3);
    });
  }

  test_size(test) {
    it('{} -> 0', function() {
      let map = test.newInstance();
      assert(map.size() == 0);
    });
    it('{1->2,2->3} -> 2', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(2,3);
      assert(map.size() == 2);
    });
  }

  test_toArray(test) {
    it('{} -> []', function() {
      let map = test.newInstance();
      assert(Util.equals(map.toArray(), []));
    });
    it('{1->2} -> [{1->2}]', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(Util.equals(map.toArray(), [{key:1,value:2}]));
    });
    it('{1->2,3->4} -> an array containing (1->2) and (3->4)', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      let array = map.toArray();
      assert(array.length == 2);
      let list = new ArrayList();
      list.addAll(map.toArray());
      assert(list.contains({key:1,value:2}));
      assert(list.contains({key:3,value:4}));
    });
  }

  test_toString(test) {
    let string_fn = function(map) {
      let array = map.toArray();
      let str = '{';
      for (let i = 0; i != array.length; i++) {
        let entry = array[i];
        str += Util.toString(entry.key) + '->' + Util.toString(entry.value);
        if (i < (array.length - 1))
          str += ',';
      }
      str += '}';
      return str;
    }
    it('(empty) -> (stringified empty)', function() {
      let map = test.newInstance();
      assert(map.toString() == string_fn(map));
    });
    it('{1->2,"my_string"->"my_value",{a:1}->{b:2}} -> (stringified elements in iteration order)', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put("my_string","my_value");
      map.put({a:1},{b:2});
      assert(map.toString() == string_fn(map));
    });
  }

  test_values(test) {
    it('{} -> (empty collection)', function() {
      let map = test.newInstance();
      assert(map.values().isEmpty());
    });
    it('{1->2,2->2,3->3} -> {2,2,3}', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(2,2);
      map.put(3,3);
      assert(Util.equals(map.values().toArray().sort(), [2,2,3]));
    });
  }
}

module.exports = MapTest;
